import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import './Home.css';
import { useGetJobsMutation } from '../../services/jobs';
import { appendNewJobs, setLoading } from '../../reducers/jobs';
import { Job } from '../../types/job';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import JobCard from '../JobCard';
import useLazyLoad from '../../hooks/useLazyLoad';
import Filters from '../Filters';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const jobs = useAppSelector((store) => store.jobs);
    const { experience, role, location, company } = useAppSelector((store) => store.filters);
    const loadMoreRef: RefObject<HTMLDivElement> = useRef(null);
    const [filteredJobs, setFilteredJobs] = useState(jobs?.data);

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
        let newJobs = jobs.data;
        if (role?.length) {
            newJobs = newJobs.filter(job => role.toLowerCase() === job.jobRole.toLowerCase());
        }
        if (experience?.length) {
            newJobs = newJobs.filter(job => {
                const exp = Number(experience);
                if (!job.minExp && !job.maxExp) return true;
                else if (!job.minExp) {
                    return job.maxExp! >= exp;
                }
                else if (job.maxExp) {
                    return job.minExp <= exp;
                }
            });
        }
        if (company?.length) {
            newJobs = newJobs.filter(job => {
                if (job.companyName) return job.companyName.toLowerCase().includes(company.toLowerCase());
                else return false;
            });
        }
        if (location?.length) {
            newJobs = newJobs.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
        }
        setFilteredJobs(newJobs);
    }, [jobs.data, role, experience, company, location])

    useEffect(() => {
        if (getJobsApiResponse.isSuccess) {
            dispatch(appendNewJobs(getJobsApiResponse.data?.jdList));
        }
    }, [getJobsApiResponse])

    return (
        <div className="home">
            <Filters />
            <Grid container spacing={"3"} className="jobs-container-grid">
            {filteredJobs?.map((job: Job) => {
                return (
                    <Grid key={job.jdUid} item xs={12} md={6} lg={4} xl={3} className="jobs-grid-item">
                        <JobCard data={job} />
                    </Grid>
                )
            })}
            <div ref={loadMoreRef}>
            <Box sx={{ display: 'flex', padding: '100px' }}>
                <CircularProgress />
            </Box>
            </div>
            </Grid>
        </div>
    )
}

export default Home;