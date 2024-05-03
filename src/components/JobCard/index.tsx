import React from 'react';
import { Paper, CardContent, Box, Typography, Button } from '@mui/material';
import './JobCard.css';
import { Job } from '../../types/job';


const JobCard: React.FC<{ data: Job }> = ({ data }) => {
    return (
        <Paper className="job-card" elevation={1}>
            <CardContent className="job-card-content">
                <Box className="job-card-header">
                    <img
                        src={data.logoUrl || "https://firebasestorage.googleapis.com/v0/b/weekday-works.appspot.com/o/referal-website-assets%2Ffavicon-64.png?alt=media"}
                        alt="Company Logo"
                    />
                    <div>
                        <div className="job-card-info">
                            <h3>{data.companyName || "Weekday"}</h3>
                            <h2>{data.jobRole || "Role Not Specified"}</h2>
                        </div>
                        <p className="job-card-info-location">
                            {data.location || "Location Not Specified"}
                        </p>
                    </div>
                </Box>
                <Typography variant="body2" className="job-card-salary">
                    {data.minJdSalary || data.maxJdSalary ? (
                        <>
                            {"Estimated Salary: "}
                            {data.minJdSalary ? `${data.minJdSalary} - ` : null}
                            {data.maxJdSalary ? data.maxJdSalary : null}{" "}
                            {data.salaryCurrencyCode || "USD"}
                            <span aria-label="Offered salary range"> ✅</span>
                        </>
                    ) : (
                        "Salary Not Specified"
                    )}
                </Typography>
                <Box className="job-card-description-container">
                    <Typography variant="body1" className="job-card-about">
                        About Company
                    </Typography>
                    <p>
                        {data.jobDetailsFromCompany || "Details Not Specified"}
                    </p>
                </Box>
                <Box className="job-card-description-more">
                    <a href={data.jdLink} target="_blank" rel="noreferrer">
                        View Job
                    </a>
                </Box>
                <Box className="job-card-experience-container">
                    <h3>Minimum Experience</h3>
                    <h2>
                        {data.minExp ? `${data.minExp} years` : " Not Specified"}
                    </h2>
                </Box>
            </CardContent>
            <Box className="job-card-footer">
                <Box className="job-card-btn-container">
                    <Button
                        className="apply-btn job-card-footer-btn"
                        href=""
                        target="_blank"
                        rel="noreferrer"
                        type="button"
                    >
                        ⚡Easy Apply
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default JobCard;