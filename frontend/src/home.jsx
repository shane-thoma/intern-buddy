import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

function home(){

    return(
        <>
            <h1>internBuddy</h1>
            <button>Filter</button>
            <section class="internship-section">
                <h2>Internships</h2>
                <div class="internship-box">
                    <div class="internship-option">
                        <p class="job-title">IT Internship</p>
                        <p class="job-company">Microsoft</p>
                    </div>
                    <div class="internship-option">
                        <p class="job-title">Machine Learning Intern</p>
                        <p class="job-company">ChatGBT</p>
                    </div>
                     <div class="internship-option">
                        <p class="job-title">Backend Developer</p>
                        <p class="job-company">Google</p>
                    </div>
                </div>

            </section>
            <section class="internship-position-info-sextion">
                <div class="internship-position-info-box">
                    
                </div>


            </section>
        </>
    )
}

export default App