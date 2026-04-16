// Import Statements
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./SignUp.css";

function SignUp()
{
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const navigate = useNavigate();

    const handleSignUp = () =>{
        navigate('/Login');
    }

    return(
        <div className="signup-form-container">
            <form className = "signup-form">
                <h1 className = "signup-title"> Sign Up </h1>
                    <label className="signup-form-label">Username: 
                        <input
                            type="text"
                            position="relative"
                            className="signup-input-bg signup-input-border"
                            value = {username}
                            onChange = {(e) => setUsername(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <label className="signup-form-label">Email Address: 
                        <input
                            type="text"
                            position="relative"
                            className="signup-input-bg signup-input-border"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <label className="signup-form-label">Password: 
                        <input
                            type="text"
                            position="relative"
                            className="signup-input-bg signup-input-border"
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                        ></input>
                        <br></br>
                    </label>
                    <br></br>
                    <button className="signUpBtn" onClick={handleSignUp}>Sign Up</button>
                </form>
        </div>

    )
}

export default SignUp;