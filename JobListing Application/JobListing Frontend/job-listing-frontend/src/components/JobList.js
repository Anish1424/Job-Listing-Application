import { useState, useEffect } from "react";

const JobList = ({ onDelete, refresh }) => {
    const [jobs, setJobs] = useState([]);

    // Fetch jobs from the backend
    const fetchJobs = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/jobs/");
            if (!response.ok) {
                throw new Error("Failed to fetch jobs");
            }
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    // Fetch jobs on mount and when `refresh` changes
    useEffect(() => {
        fetchJobs();
    }, [refresh]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Job Listings</h2>
            <ul>
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        <li key={job.id} className="border p-2 mb-2 flex justify-between">
                            <span>{job.job_name} - {job.location}</span>
                            <button
                                onClick={() => onDelete(job.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No jobs available.</p>
                )}
            </ul>
        </div>
    );
};

export default JobList;
