import React, { useState } from "react";

const AddJobForm = ({ onAdd }) => {
    const [jobName, setJobName] = useState("");
    const [description, setDescription] = useState("");
    const [experience, setExperience] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/jobs/add/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    job_name: jobName,
                    description,
                    experience,
                    salary,
                    location,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add job");
            }

            const data = await response.json();
            console.log("Job added:", data);
            onAdd(); // Notify App to refresh job list
            setJobName("");
            setDescription("");
            setExperience("");
            setSalary("");
            setLocation("");
        } catch (error) {
            console.error("Error adding job:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>Job Name:</label>
                <input
                    type="text"
                    value={jobName}
                    onChange={e => setJobName(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Experience:</label>
                <input
                    type="text"
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Salary:</label>
                <input
                    type="number"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Job
            </button>
        </form>
    );
};

export default AddJobForm;
