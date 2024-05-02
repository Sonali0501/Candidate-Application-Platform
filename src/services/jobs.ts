import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.weekday.technology/'}),
  endpoints: (builder) => ({
    getJobs: builder.mutation({
        query: (data) => ({
            url: 'adhoc/getSampleJdJSON',
            method: 'POST',
            body: data,
        }),
    })
  }),
})

export const { useGetJobsMutation } = jobsApi;