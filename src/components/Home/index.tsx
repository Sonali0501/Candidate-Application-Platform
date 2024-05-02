import React, { RefObject, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import './Home.css';
import { useGetJobsMutation } from '../../services/jobs';
import { appendNewJobs, setLoading } from '../../reducers/jobs';
import { Job } from '../../types/job';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import JobCard from '../JobCard';
import useLazyLoad from '../../hooks/useLazyLoad';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const jobs = useAppSelector((store) => store.jobs);
    const loadMoreRef: RefObject<HTMLDivElement> = useRef(null);

    const [getJobsApi, getJobsApiResponse] = useGetJobsMutation();

    const fetchJobs = () => {
        dispatch(setLoading())
        getJobsApi({
            limit: jobs.limit,
            offset: jobs.offset,
        });
    }

    const {} = useLazyLoad({ triggerRef: loadMoreRef, fetchData: fetchJobs});

    useEffect(() => {
        fetchJobs();
    }, [])

    useEffect(() => {
        if (getJobsApiResponse.isSuccess) {
            dispatch(appendNewJobs(getJobsApiResponse.data?.jdList));
        }
    }, [getJobsApiResponse])

    return (
        <div className="home">
            <Grid container spacing={"3"} className="jobs-container-grid">
            {jobs?.data?.map((job: Job) => {
                return (
                    <Grid item xs={12} md={6} lg={4} xl={3} className="jobs-grid-item">
                        <JobCard key={job.jdUid} data={job} />
                    </Grid>
                )
            })}
            <div ref={loadMoreRef}></div>
            </Grid>
        </div>
    )
}

export default Home;