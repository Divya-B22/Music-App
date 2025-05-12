import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { useContext } from "react";
import { userContext } from "./context/UserContext";

const UserProfile = () => {
  const user = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();
  //const { name, email } = location.state || {};
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleBackClick = () => {
    navigate("/musicapp");
  };

  return (
    <div className="profile-card">
      <div className="back-btn" onClick={handleBackClick} aria-label="Go back">
        <span className="back-icon"></span>
        <span className="back-text">Back</span>
      </div>
      <div className="profile-header">
        <img src="\krish.jpg" alt="Profile" className="profile-img" />
        <div className="profile-info">
          <br></br>
          <h2>{user.userDetails.username}</h2>
          <br></br>
          <p>{user.userDetails.email}</p>
        </div>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
