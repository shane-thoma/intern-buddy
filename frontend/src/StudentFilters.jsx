import './StudentFilters.css';
import {useState} from "react";

function StudentFilters({setShowFilter}){
    
    const [filters, setFilters] = useState({
        areaOfWork: "",
        frameworks: "",
        languages: "",
        ide:"",
        tools:""
    });

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const res = await fetch("http://127.0.0.1:5000/api/students/filter",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filters)
        });

        const data = await res.json();
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

                {/* NEED TO UPDATE THESE FIELDS TO SAVE USER INPUT LIKE ABOVE */}
                
                <label className = "student-filters-label">Programming Language:
                    <input type="text"></input>
                </label>
                <br></br>
                <label className = "student-filters-label">IDE:
                    <input type="text"></input>
                </label>
                <br></br>
                <label className = "student-filters-label">Non Technical Tools:
                    <input type="text"></input>
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