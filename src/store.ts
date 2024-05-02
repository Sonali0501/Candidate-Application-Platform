import {configureStore} from '@reduxjs/toolkit'
import { jobsSlice } from './reducers/jobs.js'
import { jobsApi } from './services/jobs.js'

export const store = configureStore({
  reducer: {
    jobs: jobsSlice.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
