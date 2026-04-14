import './StudentFilters.css'

function StudentFilters(){
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