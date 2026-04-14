import './Home.css'
import {Link} from "react-router-dom"
import React, {useState, useEffect} from 'react'
import StudentFilters from './StudentFilters'


function Home(){
    const [showFilter, setShowFilter] = useState(false);

    const [selectedInternship, setSelectedInternship] = useState(0);
    const [internships, setInternships] = useState([]);
    
    const [isLoading, setIsLoading]= useState(true);
    const [error, setError]= useState(null);

    
    useEffect(() => {
        const loadInternships = async () => {
        try {
            const result = await getInternships();
            setInternships(result);
        } 
        catch (err) {
            console.error(err);
            setError(err.message);
        } 
        finally {
            setIsLoading(false);
        }
        };

        loadInternships();
    }, []);

    async function getInternships()
    {
        const response = await fetch('http://localhost:5002/api/internships', 
            {
            method: 'GET'
            }
    
        );

        if(!response.ok)
        {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
        }

        const result= await response.json();

        console.log(result)
        return result;


    }
    // // const fetch_json = async () ->{
    //     setIsLoading(true);
    //     setError(null);

    //     try{
    //         const results = await 
    //     }

    // }
    
        
    const currentInternship = internships[selectedInternship]

    return(
        <>
            <header className = "home-header">
                <img src = "/websitelogo.png" className = "home-logo-img"/>
            </header>
            <button className= "filter-button" onClick={() =>setShowFilter(!showFilter)}>Filter</button>
            {showFilter && (
                <div className="popup-student-filters">
                    <div className="popup-content">
                        <StudentFilters />
                    </div>

                </div>
            )}

            <div className = "home-container">
                <section className="internship-section">
                    <div className="internship-section-header">Internships</div>
                    <div className="internship-box">
                    {internships.map((internship, index) =>(
                        <div
                            key = {index}
                            onClick = {() => setSelectedInternship(index)}
                        >
                            <p className = "job-title">{internship.title}</p>
                            <p className = "job-company">{internship.company}</p>
                        </div>
                    ))}
                    </div>

                </section>
            </div>
            <section className="internship-position-info-section">
                <div className="internship-position-info-box">
                    {isLoading ? (
                    <p>Loading...</p>
                    ) : currentInternship ? (
                        <>
                            <div className="position-info">{currentInternship.title}</div>
                            <div className="position-info">{currentInternship.company}</div>
                            <div className="position-info">{currentInternship.location}</div>
                            <div className="position-info">{currentInternship.salary}</div>
                            <div className="position-info"> Skills: 
                                <ul className="position-skills-list">
                                    {(currentInternship.skills || []).map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <p>No internship selected</p>
                     )}
                </div>


            </section>

             <div className="bottom-nav">
                    <Link to="/Login" className="bottom-nav-items">Logout</Link>
                    <Link to="/Home" className="bottom-nav-items">Home</Link>
                    <Link to="/Profile" className="bottom-nav-items">Profile</Link>
            </div>
        </>
    )
}

export default Home

