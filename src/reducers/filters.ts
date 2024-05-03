import {createSlice} from '@reduxjs/toolkit'
import { Filters } from '../types/filters';

const initialState : {
    role?: string;
    location?: string;
    experience?: string;
} = {}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
        state[action.payload.name as Filters] = action.payload.value;
    }
  },
})

export const { setFilter } = filtersSlice.actions

export default filtersSlice.reducer