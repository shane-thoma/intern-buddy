import './StudentFilters.css'



function StudentFilters(){
    return(
        <form>
            <label className = "student-filters-label">Area of Work:
                <input type="text"></input>
            </label>
            <label className = "student-filters-label">Frameworks:
                <input type="text"></input>
            </label>
            <label className = "student-filters-label">Programming Language:
                <input type="text"></input>
            </label>
            <label className = "student-filters-label">IDE:
                <input type="text"></input>
            </label>
            <label className = "student-filters-label">Non Technical Tools:
                <input type="text"></input>
            </label>
            <button className="student-filters-button">Apply Filters</button>
        </form>

    )
}

export default StudentFilters;