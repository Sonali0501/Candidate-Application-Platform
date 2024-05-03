import {configureStore} from '@reduxjs/toolkit'
import { jobsSlice } from './reducers/jobs.js'
import { jobsApi } from './services/jobs.js'
import { filtersSlice } from './reducers/filters.js';

export const store = configureStore({
  reducer: {
    jobs: jobsSlice.reducer,
    filters: filtersSlice.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
