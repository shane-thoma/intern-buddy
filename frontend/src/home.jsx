import './Home.css'
import {Link} from "react-router-dom"
import React, {useState} from 'react'
import StudentFilters from './StudentFilters'


function Home(){
    const [showFilter, setShowFilter] = useState(false);

    const [selectedInternship, setSelectedInternship] = useState(0)


    const internships = [
        {
            title: "IT Internship",
            company: "Microsoft",
            location: "Redmond, Washington",
            salary: 4500,
            skills: ['React', 'Python', 'Eclipse', 'Docker', 'Teamwork']
        },
        {
            title: "Machine Learning Intern",
            company: "ChatGPT",
            location: "San Francisco, California",
            salary: 5000,
            skills: ['React', 'Python', 'Eclipse', 'Docker', 'Teamwork']
        },
        {
            title: "Backend Developer",
            company: "Google",
            location: "Mountain View, California",
            salary: 5500,
            skills: ['React', 'Python', 'Eclipse', 'Docker', 'Teamwork']
        }
    ];

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
                    <div className="position-info">{currentInternship.title}</div>
                    <div className="position-info">{currentInternship.company}</div>
                    <div className="position-info">{currentInternship.location}</div>
                    <div className="position-info">{currentInternship.salary}</div>
                    <div className="position-info"> Skills: <ul className= "position-skills-list">
                            {(currentInternship.skills).map((skill, index) =>(
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
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

