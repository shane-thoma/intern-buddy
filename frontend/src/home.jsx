import './Home.css'
import {Link} from "react-router-dom"
import React, {useState} from 'react'
import StudentFilters from './StudentFilters'


function Home(){
    const [showFilter, setShowFilter] = useState(false);

    const skills = ['React', 'Python', 'Eclipse', 'Docker', 'Teamwork'];


    return(
        <>
            <header>
                <div className="logo">internBuddy</div>
            </header>
            <button className= "filter-button" onClick={() =>setShowFilter(!showFilter)}>Filter</button>
            {showFilter && (
                <div className="popup-student-filters">
                    <div className="popup-content">
                        <StudentFilters />
                        <button className = "popup-content-close" onClick = {()=> setShowFilter(false)}>Close</button>
                    </div>

                </div>
            )}
            <section className="internship-section">
                <div className="internship-section-header">Internships</div>
                <div className="internship-box">
                    <div className="internship-option">
                        <p className="job-title">IT Internship</p>
                        <p className="job-company">Microsoft</p>
                    </div>
                    <div className="internship-option">
                        <p className="job-title">Machine Learning Intern</p>
                        <p className="job-company">ChatGPT</p>
                    </div>
                     <div className="internship-option">
                        <p className="job-title">Backend Developer</p>
                        <p className="job-company">Google</p>
                    </div>
                </div>

            </section>
            <section className="internship-position-info-section">
                <div className="internship-position-info-box">
                    <div className="position-info">IT Internship</div>
                    <div className="position-info">Company: Microsoft</div>
                    <div className="position-info">Location: Redmond, Washington</div>
                    <div className="position-info">Salary: 4500</div>
                    <div className="position-info"> Skills: <ul className= "position-skills-list">
                            {skills.map((skill, index) =>(
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>


            </section>

             <div className="bottom-nav">
                    <Link to="/Login">Logout</Link>
                    <Link to="/Home">Home</Link>
                    <Link to="/Profile">Profile</Link>
            </div>
        </>
    )
}

export default Home

