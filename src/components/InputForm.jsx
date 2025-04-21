import React, { useState } from "react";
import "../components/InputForm.css";

function InputForm({ category, onBack, onResult }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const categoryImages = {
    Energy: "public/energy.jpg",
    Food: "public/food.jpg",
    Waste: "public/waste.jpg",
    Transportation: "public/transportation.jpeg",
  };

  const formFields = {
    Energy: [
      {
        label: "Type of energy",
        name: "activity",
        placeholder: "e.g., electricity",
      },
      {
        label: "Amount consumed",
        name: "energy",
        placeholder: "e.g., 100",
        type: "number",
      },
      { label: "Energy unit", name: "unit", placeholder: "e.g., kWh" },
    ],
    Food: [
      { label: "Food type", name: "activity", placeholder: "e.g., beef" },
      {
        label: "Amount consumed",
        name: "weight",
        placeholder: "e.g., 0.5",
        type: "number",
      },
      { label: "Weight unit", name: "unit", placeholder: "e.g., kg" },
    ],
    Waste: [
      { label: "Waste type", name: "activity", placeholder: "e.g., recycling" },
      {
        label: "Amount of waste",
        name: "weight",
        placeholder: "e.g., 2",
        type: "number",
      },
      { label: "Weight unit", name: "unit", placeholder: "e.g., kg" },
    ],
    Transportation: [
      {
        label: "Transportation mode",
        name: "activity",
        placeholder: "e.g., bus",
      },
      {
        label: "Distance traveled",
        name: "distance",
        placeholder: "e.g., 50",
        type: "number",
      },
      { label: "Distance unit", name: "unit", placeholder: "e.g., km" },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: value ? "" : "This field is required" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    formFields[category].forEach((field) => {
      if (!formData[field.name])
        newErrors[field.name] = "This field is required";
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, ...formData }),
        });

        const result = await response.json();
        onResult(result);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="input-form-container">
      <div className="form-content">
        <div className="image-side">
          <img
            src={categoryImages[category]}
            alt={category}
            className="form-image"
          />
        </div>
        <div className="form-side">
          <h1>{category} Input Form</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            {formFields[category].map((field, index) => (
              <div className="input-group" key={index}>
                <label htmlFor={field.name} className="input-label">
                  {field.label}:
                </label>
                <input
                  id={field.name}
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="input-field"
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required
                />
                <span className="error-message">{errors[field.name]}</span>
              </div>
            ))}
            <div className="button-container">
              <button type="submit" className="submit-btn">
                Submit
              </button>
              <button type="button" onClick={onBack} className="back-btn">
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputForm;
