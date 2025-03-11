import { useState } from "react";
import "../styles/Signup.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Sinitization
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

    // Validation
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !validateEmail(formData.email) ||
      !validatePassword(formData.password)
    ) {
      alert("Please fix the errors before submitting.");
      return;
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
                name="name"
                placeholder="Name"
                className="input-field"
                value={formData.name}
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
