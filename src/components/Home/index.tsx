import React, { useEffect } from 'react';
import './Home.css';
import { useGetJobsMutation } from '../../services/jobs';
import { appendNewJobs } from '../../reducers/jobs';
import { Job } from '../../types/job';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

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
            {jobs?.data?.map((job: Job) => {
                return (
                    <div key={job.jdUid} className="job-card">
                        <h1>{job.jobRole}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default Home;