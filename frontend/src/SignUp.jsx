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
                <br></br>
                <button className="signUpBtn" onClick={handleSignUp}>Sign Up</button>

            </form>
        </div>

    )
}

export default SignUp;