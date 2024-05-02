import { useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { useAppSelector } from "./redux";

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 500;

const useLazyLoad = ({ triggerRef, fetchData, options }: { triggerRef: any, fetchData: () => void, options?: IntersectionObserverInit }) => {

  const loading = useAppSelector(state => state.jobs.loading);

  const _handleEntry = async (entry: IntersectionObserverEntry) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;

    if (
      !loading &&
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
    ) {
      fetchData();
    }
  };
  const handleEntry = debounce(_handleEntry, LOAD_DELAY_MS);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      handleEntry(entries[0]);
    },
    [handleEntry]
  );

  useEffect(() => {
    if (triggerRef.current) {
      const container = triggerRef.current;
      const observer = new IntersectionObserver(onIntersect, options);

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, [triggerRef, onIntersect, options]);

  return {};
};

export default useLazyLoad;