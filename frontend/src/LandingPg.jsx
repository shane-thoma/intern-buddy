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
            <button className = "signupBtn" onClick = {handleSignUp}> SignUp</button>

        </div>
    )

}

export default LandingPg;