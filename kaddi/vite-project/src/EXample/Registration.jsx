//  EXAMPLE

import React, { useEffect, useState } from "react";
import "./Registration.css";
import { UserPlus } from "lucide-react";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // SENDING REQUEST TO SERVER

  const sendSignupRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData
      );
      if (response.status == 200) {
        alert("Good");
      }
    } catch (e) {
      alert(
        e.response?.data?.message ||
          "Error! check Registration.jsx inside Example folder"
      );
    }
  };

  const handleSubmit = async (e) => {
    if (formData.password != confirmPassword) {
      alert("Password and confirm passwords do not match");
      return;
    }
    e.preventDefault();
    // console.log(formData);
    await sendSignupRequest();
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setConfirmPassword("");
  };

  return (
    <div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <UserPlus size={28} className="icon" />
          <h2>Create Account</h2>
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Registration;
