import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "./context/UserContext";

const Login = () => {
  const user = useContext(userContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      if (response.status === 200) {
        user.updateUserDetails(response.data.user);
        navigate("/musicapp");
      }
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Registration failed. Please check the backend server."
      );
    }
  };
  if (user.userDetails) {
    useEffect(() => {
      navigate("/musicapp");
    }, []);
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>

        <div className="register-link">
          <p style={{ position: "relative" }}>
            <Link
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
