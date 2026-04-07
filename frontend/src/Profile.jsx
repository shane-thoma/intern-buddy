import React, {useState} from 'react'
import UpdateInfo from './UpdateInfo'
import './Home.css';
import {Link} from "react-router-dom";

function Profile(){

    const [updateInfo, setUpdateInfo] = useState(false);

    return(
        <>
            <h1 className="user-greeting">Hi User!</h1>
            <div className="user-info-box">

                <div className="update-info-button" onClick={() => setUpdateInfo(!updateInfo)}>
                    <div className="popup-content">
                        <UpdateInfo />
                        <button className = "popup-content-close" onClick = {()=> setUpdateInfo(false)}>Close</button>
                    </div>
                </div>
            </div>
            <div className="bottom-nav">
                    <Link to="/">Logout</Link>
                    <Link to="/">Home</Link>
                    <Link to="/Profile">Profile</Link>
            </div>
        </>
    )

}
export default Profile;