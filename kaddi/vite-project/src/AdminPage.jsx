import React, { useState } from "react";
import MusicLibrary from "./MusicLibrary";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import "./AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("");
  //   const music = () => {
  //     navigate("/playlistpage");
  //   };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-buttons">
        <button onClick={() => setView("music")}>Music Library</button>
        <button onClick={() => setView("users")}>User Information</button>
      </div>

      <div className="admin-content">
        {view === "music" && <MusicLibrary />}
        {view === "users" && <UserInfo />}
      </div>
    </div>
  );
};

export default AdminPage;
