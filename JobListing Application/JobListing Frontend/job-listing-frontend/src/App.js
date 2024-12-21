import React, { useState } from "react";
import JobList from "./components/JobList";
import AddJobForm from "./components/AddJobForm";

function App() {
    const [refresh, setRefresh] = useState(false);

    // Handle deleting a job
    const handleDelete = async id => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/jobs/delete/${id}/`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Failed to delete job with id ${id}`);
            }
            setRefresh(!refresh); // Trigger refresh
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Job Management</h1>
            {/* Add Job Form */}
            <AddJobForm onAdd={() => setRefresh(!refresh)} />
            {/* Job List */}
            <JobList onDelete={handleDelete} refresh={refresh} />
        </div>
    );
}

export default App;
