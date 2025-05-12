import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css"; // Import CSS file

const Admin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/admin", { username, password });
      if (response.status == 200) {
        setError("");
        navigate("/adminpage");
      }
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Registration failed. Please check the backend server."
      );
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword"> Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin;
