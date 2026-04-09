import React, {useState} from 'react'
import UpdateInfo from './UpdateInfo'
import './Home.css';
import './Profile.css';
import {Link} from "react-router-dom";

function Profile(){

    const [updateInfo, setUpdateInfo] = useState(false);

    return(
        <>
            <h1 className="user-greeting">Hi User!</h1>
            <div className="user-info-box">
                <div className="username">User</div>
                <div className="university">West Virginia University</div>
                <div className = "major">Major: Computer Science</div>
                <div className="GPA">GPA: 3.8</div>
                
                <div className="update-info-button" onClick={() => setUpdateInfo(!updateInfo)}>
                    <div className="popup-update-info">
                    {updateInfo &&(
                        <div className="popup-content">
                            <UpdateInfo />
                            <button className = "popup-content-close" onClick = {()=> setUpdateInfo(false)}>Close</button>
                        </div>
                    )}
                    </div>
                </div>
            </div>

            <div className="saved-internship-container">
                

            </div>
            <div className="bottom-nav">
                    <Link to="/Login">Logout</Link>
                    <Link to="/Home">Home</Link>
                    <Link to="/Profile">Profile</Link>
            </div>
        </>
    )

}
export default Profile;