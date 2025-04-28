import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Registration.css";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendRegistrationRequest = async () => {
    try {
      const response = await axios.post("/signup", formData);
      if (response.status === 200) {
        navigate("/musicapp");
      }
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Registration failed. Please check the backend server."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // navigate("/userprofile", { state: { name, email } });
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }

    await sendRegistrationRequest();

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input"></div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Register</button>

        <div className="register-link">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
