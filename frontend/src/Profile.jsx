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
                
                <button className="update-info-button" onClick={() => setUpdateInfo(!updateInfo)}>Update Info</button>
                {updateInfo && (
                    <div className="popup-content">
                            <UpdateInfo />
                            <button className = "popup-content-close" onClick = {()=> setUpdateInfo(false)}>Close</button>
                    </div>

                )}
            </div>

            <div className="saved-internship-container">
                

            </div>
            <div className="bottom-nav">
                                <Link to="/Login" className="bottom-nav-items">Logout</Link>
                                <Link to="/Home" className="bottom-nav-items">Home</Link>
                                <Link to="/Profile" className="bottom-nav-items">Profile</Link>
            </div>
        </>
    )

}
export default Profile;