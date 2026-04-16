import './StudentFilters.css';
import React, { useState, useEffect }  from "react";

function StudentFilters({setShowFilter}){
    
    const [isLoading, setIsLoading]= useState(true);
    const [error, setError]= useState(null);
    const[skill, setSkill] = useState()

    const [filters, setFilters] = useState({
        skills : []
    });

    const [selectedSkill, setSelectedSkill] = useState("")

    const skillOptions = [
        "python",
        "javascript",
        "C",
        "Eclipse",
        "VSCode",
        "HTML",
        "CSS",
        "flask",
        "react",
        "ChatGPT",
        "Docker",
        "Google Gemini",
        "Github Co-Pilot",
        "Microsoft Office Suite",
        "Pandas",
        "Node.js",
        "SQL",
        "MySQL",
        "GitHub",
        "teamwork",
        "communication",
        "problem solving",
        "Microsoft Azure",
        "AWS Cloud",
        "java"
    ];

    const handleAddSkill = () => {
        if (selectedSkill && !filters.skills.includes(selectedSkill)){
            setFilters((prev) => ({
                ...prev,
                skills: [...prev.skills, selectedSkill]
            }));
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFilters((prev) => ({
            ...prev,
            skills: prev.skills.filter(skill => skill!== skillToRemove)
        }));
    };

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const response = await fetch(`http://127.0.0.1:5000/api/students/filter?username=${username}`,{
            method: "GET",
            
        });

        if(!response.ok)
        {
             const errorData = await response.json();
            throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Filtered results:", data);
    };

    return(
        <div className = "student-filters-container">
            <form className= "student-filters-form" onSubmit = {handleSubmit}>
                <label>Skills:</label>

                <select
                    value = {selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                >
                    <option value = ""> Select a skill </option>
                    {skillOptions.map((skills) => (
                        <option key = {skills} value = {skills}>
                            {skills}
                        </option>
                    ))}
                </select>

                <button type = "button" onClick = {handleAddSkill}>
                    Add
                </button>

                <br></br>

                <div>
                    {filters.skills.map((skill) => (
                        <span key = {skill} style = {{ marginRight: "10px"}}>
                            {skill}
                            <button
                                type = "button"
                                onClick = {() => handleRemoveSkill(skill)}
                            >
                                x
                            </button>
                        </span>
                    ))}
                </div>

                <br/>

                <button type = "submit" className = "student-filters-button">
                    Apply Filters
                </button>

                <button
                    type = "button"
                    className = "popup-content-close"
                    onClick={() => setShowFilter (false)}
                >
                    Close
                </button>

                <br></br>
            </form>
        </div>

    )
}

export default StudentFilters;