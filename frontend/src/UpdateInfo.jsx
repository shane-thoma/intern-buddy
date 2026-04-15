function UpdateInfo(){

    return(
        <div className="update-info-container">
            <form className="update-info-form">
                <label className = "update-info-label">First Name:
                    <input type="text"></input>
                </label>
                <br></br>
                <label className = "update-info-label">Last Name:
                    <input type="text"></input>
                </label>
                <br></br>
                <label className = "update-info-label">University:
                    <input type="text"></input>
                </label>
                <br></br>
                <label className = "update-info-label">Major:
                    <input type="text"></input>
                </label>
                <br></br>
                <label className = "update-info-label">GPA:
                    <input type="text"></input>
                </label>
                <br></br>
                <label className = "update-info-label">Years of Experience:
                    <input type="text"></input>
                </label>
                <button className="update-info-button">Confirm Update</button>


            </form>

        </div>
    )
}

export default UpdateInfo;