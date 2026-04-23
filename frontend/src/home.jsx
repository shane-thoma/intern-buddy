import './Home.css'
import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import StudentFilters from './StudentFilters'


function Home() {
    const [showFilter, setShowFilter] = useState(false);

    const [selectedInternship, setSelectedInternship] = useState(0);
    const [internships, setInternships] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const username = localStorage.getItem('username')

    const [aggregates, setAggregates] = useState({
        matches: 0,
        max: 0,
        min: 0
    });


    useEffect(() => {
        const loadInternships = async () => {
            try {
                const result = await getInternships(username);
                setInternships(result.internships);
                setAggregates(result.aggregates);
                console.log("aggregates: ", result.aggregates)
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

    async function getInternships(username) {
        const response = await fetch(`http://localhost:5002/api/internships/filter?username=${username}`,
            {
                method: 'GET'
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        console.log(result)
        return result;
    }

    const currentInternship = internships[selectedInternship]

    return (
        <>
            <header className="home-header">
                <img src="/websitelogo.png" className="home-logo-img" />
            </header>
            <button className="filter-button" onClick={() => setShowFilter(!showFilter)}>Filter</button>
            {showFilter && (
                <div className="popup-student-filters">
                    <div className="popup-content">
                        <StudentFilters />
                    </div>

                </div>
            )}

            <div className="home-container">
                <div className="internship-section">
                    <div className="internship-section-header">Internships</div>
                    <div className="internship-box">
                        {internships.map((internship, index) => (
                            <button
                                key={index}
                                onClick={() => {setSelectedInternship(index); getAlumni();}}
                            >
                                <p className="job-title">{internship.title}</p>
                                <p className="job-company">{internship.company}</p>
                            </button>
                        ))}
                    </div>
                    <br></br>
                    <div className="aggregates-box">
                        <p> Matches : {aggregates.matches}</p>
                        <p> Max Salary: ${aggregates.max}</p>
                        <p> Min Salary: ${aggregates.min}</p>
                    </div>
                </div>

                <div className="internship-position-info-section">
                    <div className="internship-position-info-box">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : currentInternship ? (
                            <>
                                <div className="position-info">Title: {currentInternship.title}</div>
                                <div className="position-info">Company: {currentInternship.company}</div>
                                <div className="position-info">Location: {currentInternship.city}{", "}{currentInternship.state}</div>
                                <div className="position-info">Salary: ${currentInternship.salary}</div>
                                <div className="position-info"> Skills:
                                    <ul className="position-skills-list">
                                        {(currentInternship.skills || []).map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className = "position-info">Alumni:
                                    <ul className = "position-alumni-list">
                                        
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <p>No internship selected</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bottom-nav">
                <Link to="/Login" className="bottom-nav-items">Logout</Link>
                <Link to="/Home" className="bottom-nav-items">Home</Link>
                <Link to="/Profile" className="bottom-nav-items">Profile</Link>
            </div>
        </>
    )
}

export default Home

