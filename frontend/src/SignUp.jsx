// Import Statements
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./SignUp.css";

function SignUp()
{
    const skills = ["python","javascript", "C","Eclipse","VSCode","HTML","CSS",
        "flask","react","ChatGPT","Docker","Google Gemini","Github Co-Pilot",
        "Microsoft Office Suite", "Pandas", "Node.js","SQL","MySQL","GitHub",
        "teamwork", "communication", "problem solving","Microsoft Azure","AWS Cloud","java"];


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [major, setMajor] = useState("")
    const [university, setUniversity] = useState("")
    const [gpa, setGPA] = useState("")
    const [password, setPassword] = useState("")
    const [skillOptions, setSkillOptions] = useState(skills)
    const [selectedSkill, setSelectedSkill] = useState("")
    const [skillsToAdd, setSkillsToAdd] = useState([])


    const navigate = useNavigate();

    const handleSignUp = async(e) =>{

        e.preventDefault()
        try{

            const response = await fetch(`http://127.0.0.1:5002/api/account`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username, 
                        firstName, 
                        lastName, 
                        major, 
                        university,
                        gpa,
                        skillsToAdd
                    })
                }
            )
            if(!response.ok)
            {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
            }




             
        }
        catch(err)
        {
            console.log("Unable to create account.")
        }

        navigate('/Login');
       
    }

    const handleAddSkill = async(newSkill) =>{
        setSkillsToAdd(prevSkills =>[...prevSkills, newSkill])
    }


    return(
        <div className="signup-form-container">
            <form className = "signup-form">
                <h1 className = "signup-title"> Sign Up </h1>
                    <label className="signup-form-label">Username:
                        <input
                            type="text"
                            value = {username}
                            onChange = {(e) => setUsername(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <label className="signup-form-label">Email Address:
                        <input
                            type="text"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <label className="signup-form-label">Password:
                        <input
                            type="text"
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <label className="signup-form-label">First Name:
                        <input
                            type="text"
                            value = {firstName}
                            onChange = {(e) => setFirstName(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <label className="signup-form-label">Last Name:
                        <input
                            type="text"
                            value = {lastName}
                            onChange = {(e) => setLastName(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <label className="signup-form-label">Major:
                        <input
                            type="text"
                            value = {major}
                            onChange = {(e) => setMajor(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <label className="signup-form-label">University:
                        <input
                            type="text"
                            value = {university}
                            onChange = {(e) => setUniversity(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <label className="signup-form-label">GPA:
                        <input
                            type="text"
                            value = {gpa}
                            onChange = {(e) => setGPA(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <label className = "signup-form-label"> Add a Skill:
                    <select
                    value = {selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    >
                    <option value = ""> Select a skill </option>
                    {skillOptions.map((skills) => (
                        <option key = {skills} value = {skills}>
                            {skills}
                        </option>
                    ))}
                    </select>

                    <button type = "button" className = "add-skill-button" onClick = {() => handleAddSkill(selectedSkill)}>
                    Add Skill
                    </button>
                    </label>


                    <br></br>
                    <button className="signUpBtn" onClick={handleSignUp}>Sign Up</button>
                </form>
        </div>

    )
}

export default SignUp;