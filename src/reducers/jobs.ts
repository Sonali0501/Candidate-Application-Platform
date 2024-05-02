import {createSlice} from '@reduxjs/toolkit'
import { Job } from '../types/job'

const initialState : {
    limit: number,
    offset: number,
    data: Job[]
} = {
  limit: 10,
  offset: 0,
  data: []
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    appendNewJobs: (state, action) => {
        state.data = [...state.data, ...action.payload];
        state.offset = state.offset + state.limit;
    }
  },
})

export const { appendNewJobs } = jobsSlice.actions

export default jobsSlice.reducer