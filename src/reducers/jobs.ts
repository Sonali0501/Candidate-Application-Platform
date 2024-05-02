import {createSlice} from '@reduxjs/toolkit'
import { Job } from '../types/job'

const initialState : {
    limit: number;
    offset: number;
    data: Job[];
    loading: boolean;
} = {
  limit: 10,
  offset: 0,
  data: [],
  loading: false
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    appendNewJobs: (state, action) => {
        state.data = [...state.data, ...action.payload];
        state.offset = state.offset + state.limit;
        state.loading = false;
    },
    setLoading: (state) => {
        state.loading = true;
    }
  },
})

export const { appendNewJobs, setLoading } = jobsSlice.actions

export default jobsSlice.reducer