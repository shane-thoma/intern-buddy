import './StudentFilters.css';
import React, { useState, useEffect }  from "react";

function StudentFilters({setShowFilter}){
    
    const [isLoading, setIsLoading]= useState(true);
    const [error, setError]= useState(null);
    const[skill, setSkill] = useState()

    const [filters, setFilters] = useState({
        areaOfWork: "",
        frameworks: "",
        languages: "",
        ide:"",
        tools:""
    });


   
    localStorage.setItem('skill', skill)
    
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
            <form className= "student-filters-form">
                <label>Area of Work:
                    <input 
                        name = "areaOfWork"
                        value = {filters.areaOfWork}
                        onChange = {handleChange} // Saving
                    />
                </label>
                <br></br>
                <label>Frameworks:
                    <input 
                        name = "frameworks"
                        value={filters.frameworks}
                        onChange={handleChange} // Saving 
                    />
                </label>
                <br></br>
                
                <label>Programming Language:
                    <input  
                        name = "lanuguages"
                        value={filters.languages}
                        onChange={handleChange} // Saving 
                    />
                </label>
                <br></br>
                <label>IDE:
                    <input  
                        name = "ide"
                        value={filters.ide}
                        onChange={handleChange} // Saving 
                    />
                </label>
                <br></br>
                <label>Non Technical Tools:
                    <input  
                        name = "tools"
                        value={filters.tools}
                        onChange={handleChange} // Saving 
                    />
                </label>
                <br></br>
                <button className="student-filters-button">Apply Filters</button>
        
                <button className = "popup-content-close" onClick = {()=> setShowFilter(false)}>Close</button>
                <br></br>
            </form>
        </div>

    )
}

export default StudentFilters;