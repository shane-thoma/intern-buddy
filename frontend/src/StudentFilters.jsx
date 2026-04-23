import './StudentFilters.css';
import React, { useState, useEffect } from "react";

function StudentFilters({ setShowFilter }) {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [skill, setSkill] = useState()

    const [skillOptions, setSkillOptions] = useState([]);

    const [filters, setFilters] = useState({
        skills: []
    });

    const [selectedSkill, setSelectedSkill] = useState("")

    const username = localStorage.getItem('username')

    useEffect(() => {
        const updateDropdown = async () => {
            try {
                setIsLoading(true);
                const skillsResponse = await fetch(`http://127.0.0.1:5002/api/dropdown?username=${username}`);
                if (!skillsResponse.ok) throw new Error("Failed to fetch skills");

                const skillsJson = await skillsResponse.json();
                setSkillOptions(skillsJson.skills || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        updateDropdown();
    }, [username]); // Only re-run if username changes

    const handleAddSkill = async () => {

        const response = await fetch(`http://127.0.0.1:5002/api/skills/insert?username=${username}&skill=${selectedSkill}`,
            {
                method: 'POST'
            }
        )

        if (response.ok) {
            setFilters((prev) => ({
                ...prev,
                skills: [...prev.skills, selectedSkill]
            }));
        }

    };

    const handleRemoveSkill = (skillToRemove) => {
        setFilters((prev) => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
        fetch(`http://127.0.0.1:5002/api/skills/delete?username=${username}&skill=${skillToRemove}`,
            {
                method: 'DELETE'
            }
        )
    };

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`http://127.0.0.1:5002/api/internships/filter?username=${username}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Filtered results:", data);
        }

        catch (err) {
            console.error("Filter failed:", err.message);
        }


    };

    return (
        <div className="student-filters-container">
            <form className="student-filters-form" onSubmit={handleSubmit}>
                <label>Skills:</label>

                <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                >
                    <option value=""> Select a skill </option>
                    {skillOptions.map((skills) => (
                        <option key={skills} value={skills}>
                            {skills}
                        </option>
                    ))}
                </select>
                <br></br>
                <button type="button" className="add-skill-button" onClick={handleAddSkill}>
                    Add Skill
                </button>
                <div>
                    {filters.skills.map((skill) => (
                        <span key={skill} style={{ marginRight: "10px" }}>
                            {skill}
                            <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                            >
                                x
                            </button>
                        </span>
                    ))}
                </div>
                <br></br>
                <button type="submit" className="student-filters-button">
                    Apply Filters
                </button>

                <button
                    type="button"
                    className="popup-content-close"
                    onClick={() => setShowFilter(false)}
                >
                    Close
                </button>
                <br></br>
                <br></br>
            </form>
        </div>

    )
}

export default StudentFilters;