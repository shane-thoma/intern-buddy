import React, { useState, useEffect } from 'react'
import UpdateInfo from './UpdateInfo'
import './Home.css';
import './Profile.css';
import { Link } from "react-router-dom";


function Profile() {

    const [updateInfo, setUpdateInfo] = useState(false);


    const username = localStorage.getItem('username')
    
    const [isLoading, setIsLoading]= useState(true);
    const [error, setError]= useState(null);
    const [userInfo, setUserInfo] = useState([])

    useEffect(() => {
            const loadProfile = async () => {
            try {
                const result = await getUserInfo(username);
                setUserInfo(result);
            } 
            catch (err) {
                console.error(err);
                setError(err.message);
            } 
            finally {
                setIsLoading(false);
            }
            };
    
            loadProfile();
        }, []);
    
    
    async function getUserInfo(username)
    {
        const response = await fetch(`http://localhost:5002/api/profile?username=${username}`,
            {
                method: 'GET'
            }
        )

        if(!response.ok)
        {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
        }

        const result= await response.json();

        console.log(result)
        return result;

    }


    return (
        <>
        <div className='profile-container'>
            <h1 className="user-greeting">Hi {userInfo.username}</h1>
            <div className="user-info-box">
                <div className="username">{userInfo.first_name}{'  '}{userInfo.last_name}</div>
                <div className="university">{userInfo.university}</div>
                <div className="major">Major: {userInfo.major}</div>
                

                <button className="update-info-button" onClick={() => setUpdateInfo(!updateInfo)}>Update Info</button>
                {updateInfo && (
                    <div className="popup-content">
                        <UpdateInfo />
                        <br></br>
                        <button className="popup-content-close" onClick={() => setUpdateInfo(false)}>Close</button>
                    </div>
                )}

                {/* ADD DELETE BUTTON ONCLICK FUNCTIONALITY*/}
                <button className="delete-account-button">Delete Account</button>
            </div>

            <div className="saved-internship-container">

            </div>
            <div className="bottom-nav">
                <Link to="/Login" className="bottom-nav-items">Logout</Link>
                <Link to="/Home" className="bottom-nav-items">Home</Link>
                <Link to="/Profile" className="bottom-nav-items">Profile</Link>
            </div>
        </div>
        </>
    )
}
export default Profile;