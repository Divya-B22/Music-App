import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPage.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/admin/getuser");
        if (response.status == 200) {
          setUsers(response.data.users);
        }
      } catch (e) {
        alert(e.response?.data?.message || e.message);
      }
    })();
  }, []);

  const handleClick = async (user, status) => {
    try {
      const response = await axios.put("/admin/block", {
        email: user.email,
        status,
      });
      if (response.status == 200) {
        let updatedUsers = users.map((obj) => {
          if (obj.email == user.email) obj.blocked = status;
          return obj;
        });
        setUsers(updatedUsers);
      }
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  return (
    <div
      className="admin-container"
      style={{ overflowY: "scroll", paddingTop: "550px", width: "700px" }}
    >
      <h2>Admin Dashboard - User List</h2>
      <div style={{ display: "flex", width: "100%" }}>
        <button style={{ width: "60%" }} onClick={() => navigate("/")}>
          Logout
        </button>
        <button style={{ width: "60%" }}>Add Song</button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className={`block-btn ${user.blocked && "unblock-btn"}`}
                  onClick={() =>
                    user.blocked
                      ? handleClick(user, false)
                      : handleClick(user, true)
                  }
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
