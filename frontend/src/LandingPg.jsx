import {useNavigate} from 'react-router-dom';
import "./LandingPg.css";
function LandingPg(){

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/Login')
    }

    const handleSignUp = () =>{
        navigate('/SignUp')
    }

    return(
        <div className= "landingpg-container">
            <div className="landingpg-logo">
                <img src = "/websitelogo.png" className = "landingpg-logo-img"/>
            </div>
            <br></br>
            <p className = "introduction">
                Welcome to internBuddies™!  We are here for all of your internship seeking needs.
            </p>
            <button className = "loginBtn" onClick = {handleLogin}> Login</button> 
            <br></br>
            <p>Don't have an account?</p>
            <button className = "signupBtn" onClick = {handleSignUp}> SignUp</button>
            <p className = "trademark">sillygeese™ </p>
        </div>
    )

}

export default LandingPg;