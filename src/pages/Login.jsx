import { useState } from "react";
import "../styles/Login.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Sinitization
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      setErrors({ ...errors, password: value ? "" : "Password is required" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email) || !formData.password) {
      alert("Please fix the errors before submitting.");
      return;
    }
  };

  return (
    <div className="login-container">
      <div className="content">
        <div className="form-container">
          <div className="image-side">
            <img src="../public/logo.jpg" alt="Login" className="login-image" />
          </div>
          <div className="form-side">
            <h1>Login</h1>
            <hr />
            <form onSubmit={handleSubmit}>
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
                required
              />
              <span className="error-message">{errors.password}</span>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <p className="signup-prompt">
              Don't have an account?{" "}
              <a href="/signup" className="signup-link">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
