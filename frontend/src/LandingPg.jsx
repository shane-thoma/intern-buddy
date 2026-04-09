import {useNavigate} from 'react-router-dom';
import "./LandingPg.css"
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
            <h1 className="landingpg-logo">internBuddies</h1>
            <button className = "loginBtn" onClick = {handleLogin}> Login</button> 
            <br></br>
            <p>Don't have an account?</p>
            <button className = "signupBtn" onClick = {handleSignUp}> SignUp</button>
            <p className = "trademark">sillygeese™ </p>
        </div>
    )

}

export default LandingPg;