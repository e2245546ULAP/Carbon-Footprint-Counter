import { useState } from "react";
import "../styles/Login.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", api: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Sanitization
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
        api: "",
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password: value ? "" : "Password is required",
        api: "",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Invalid email format" });
      return;
    }
    if (!formData.password) {
      setErrors({ ...errors, password: "Password is required" });
      return;
    }

    setIsLoading(true);
    setErrors({ email: "", password: "", api: "" });

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        // Store the access token (you might want to use localStorage or a state management solution)
        localStorage.setItem("accessToken", data.accessToken);
        // Redirect or update UI after successful login
        alert(data.message); // You might want to replace this with a proper redirect
        // Optionally reset form
        setFormData({ email: "", password: "" });
      } else {
        setErrors({ ...errors, api: data.message || "Login failed" });
      }
    } catch (error) {
      setErrors({ ...errors, api: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
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
              {errors.api && (
                <span className="error-message">{errors.api}</span>
              )}
              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
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
