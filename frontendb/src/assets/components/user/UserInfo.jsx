import React from 'react'
import styles from "./UserInfo.module.css"
import pic from "../../../assets/profile_pic.jpg"

const UserInfo = ({userInfo}) => {
    return (
        <div className="row-mb-4 d-flex gap-5">
            <div className={`col-md-3 card py-3 ${styles.textCenter}`}>
                <img src={pic} alt="User Profile"
                    className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`} />
                <h4>{userInfo.username}</h4>
                <p className="text-muted">{`Email:${userInfo.email}`}</p>
                {/* <button className='btn mt-2' style={{ backgroundColor: "#6050DC", color: "white" }}>Edit Profile</button> */}
            </div>
            <div className="col-md-9">
                <div className="card">
                    <div className="card-header" style={{ backgroundColor: "#6050DC", color: "white" }}>
                        <h5>Account Overview</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p>
                                    <strong>First Name: </strong>{`${userInfo.first_name}  `}
                                    <strong>Last Name: </strong>{`${userInfo.last_name}`}
                                </p>
                                <p>
                                    <strong>Email</strong> {userInfo.email}
                                </p>
                                <p>
                                    <strong>Phone</strong>+91 {userInfo.phone}
                                </p>
                            </div>
                            {/* <div className="col-md-6">  
                                <p>
                                    <strong>Member Since</strong> January 2023
                                </p>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserInfo
