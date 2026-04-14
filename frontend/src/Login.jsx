// Import Statements
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/Home')

        localStorage.setItem('username', username)
    }

    

    return (
        <div className="login-form-container">
            <form className="lsgin-form">
                <h1 className="login-title"> Login </h1>
                <label className="login-form-label">Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        
                    ></input>
                </label>
                <br></br>
                <label className="login-form-label">Password:
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </label>
                <br></br>
                <br></br>
                <button className="login-button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}
export default Login;