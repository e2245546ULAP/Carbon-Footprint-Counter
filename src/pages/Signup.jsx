import { useState } from "react";
import "../styles/Signup.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Invalid email format",
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 8 characters",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !validateEmail(formData.email) ||
      !validatePassword(formData.password)
    ) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        alert("User registered successfully!");
        console.log("Registered User:", data.user);
        // Optional: Reset the form
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration.");
    }
  };
  return (
    <div className="signup-container">
      <div className="content">
        <div className="form-container">
          <div className="image-side">
            <img
              src="../public/logo.jpg"
              alt="Signup"
              className="signup-image"
            />
          </div>
          <div className="form-side">
            <h1>Sign Up</h1>
            <hr />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="input-field"
                value={formData.first_name}
                onChange={handleChange}
                maxLength="30"
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="input-field"
                value={formData.last_name}
                onChange={handleChange}
                maxLength="30"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                maxLength="50"
                required
              />
              <span className="error-message">{errors.email}</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input-field"
                value={formData.password}
                onChange={handleChange}
                maxLength="16"
                minLength="8"
                required
              />
              <span className="error-message">{errors.password}</span>
              <button type="submit" className="signup-button">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
         
    </div>
  );
}
