import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import './Home.css';
import { useGetJobsMutation } from '../../services/jobs';
import { appendNewJobs } from '../../reducers/jobs';
import { Job } from '../../types/job';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import JobCard from '../JobCard';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const jobs = useAppSelector((store) => store.jobs)

    const [getJobsApi, getJobsApiResponse] = useGetJobsMutation();

    const fetchJobs = () => {
        getJobsApi({
            limit: jobs.limit,
            offset: jobs.offset,
        });
    }

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
            </Grid>
        </div>
    )
}

export default Home;