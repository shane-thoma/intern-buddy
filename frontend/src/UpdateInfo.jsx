import React, {useState, useEffect} from 'react'
import './Home.css';
import './Profile.css';
import { Link } from "react-router-dom";

function UpdateInfo(){

    //can get the current info stored in the DB --> useEffect()
    //if anything changes, we call change the current values
    const [isLoading, setIsLoading]= useState(true);
    const [error, setError]= useState(null);
    const [info, setInfo] = useState({})
    const username = localStorage.getItem('username')


    useEffect(()=>{
        const getInfo = async () => {
            try{
                setIsLoading(true);
                const response = await fetch(`http://127.0.0.1:5002/api/info?username=${username}`)
                if (!response.ok) throw new Error("Failed to fetch skills.")

                const infoJson = await response.json()
                setInfo(infoJson || {})
            } 
            catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        getInfo();
    }, [username])

    async function updateInfo(username, info)
    {
        const response = await fetch(`http://localhost:5002/api/update/info`,
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: username, 
                    info: info 
                })
            }
        )

        if(!response.ok)
        {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
        }
    }

    return(
        <div className="update-info-container">
            <form className="update-info-form">
                <label className = "update-info-label">First Name:
                    <input 
                        type="text"
                        value={info.first_name || ""}
                        onChange={(e) =>
                            setInfo({
                                ...info,
                                first_name: e.target.value
                            })
                        }
                    ></input>
                </label>
                <br></br>
                <label className = "update-info-label">Last Name:
                    <input 
                        type="text"
                        value={info.last_name || ""}
                        onChange={(e) =>
                            setInfo({
                                ...info,
                                last_name: e.target.value
                            })
                        }
                    ></input>
                </label>
                <br></br>
                <label className = "update-info-label">University:
                    <input 
                        type="text"
                        value={info.university|| ""}
                        onChange={(e) =>
                            setInfo({
                                ...info,
                                university: e.target.value
                            })
                        }
                    ></input>
                </label>
                <br></br>
                <label className = "update-info-label">Major:
                    <input 
                        type="text"
                        value={info.major || ""}
                        onChange={(e) =>
                            setInfo({
                                ...info,
                                major: e.target.value
                            })
                        }
                    ></input>
                </label>
                <br></br>
                {/* <label className = "update-info-label">GPA:
                    <input type="text"></input>
                </label> */}
                <br></br>
                {/* <label className = "update-info-label">YOE:
                    <input type="text"></input>
                </label> */}
                <br></br>
                <button 
                    className="update-info-button"
                    type="button"
                    onClick = {() => updateInfo(username, info)}
                    >Confirm Update</button>
                <br></br>
            </form>
        </div>
    )
}

export default UpdateInfo;