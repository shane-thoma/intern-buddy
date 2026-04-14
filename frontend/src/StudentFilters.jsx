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

    const handleSubmiy = async(e) =>{
        e.preventDefault();

        const res = await fetch()
    }

    return(
        <div className = "student-filters-container">
            <form className= "student-filters-form">
                <label className = "student-filters-label">Area of Work:
                    <input type="text"></input>
                </label>
                <br></br>
                <label className = "student-filters-label">Frameworks:
                    <input type="text"></input>
                </label>
                <br></br>
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