import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/InputForm.css";

function InputForm({ category, onBack, onResult }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const categoryImages = {
    Energy: "public/energy.jpg",
    Food: "public/food.jpg",
    Waste: "public/waste.jpg",
    Transportation: "public/transportation.jpeg",
  };

  const dropdownFields = {
    Energy: [
      {
        label: "Region",
        name: "region",
        options: ["US", "EU", "Asia", "Africa"],
      },
      { label: "Unit", name: "unit", options: ["kWh", "MWh"] },
    ],
    Transportation: [
      { label: "Distance Unit", name: "unit", options: ["km", "miles"] },
    ],
    Food: [
      {
        label: "Food Type",
        name: "activity",
        options: ["Meat", "Vegetables", "Fruits", "Dairy Products"],
      },
      { label: "Weight Unit", name: "unit", options: ["kg", "g"] },
    ],
    Waste: [
      {
        label: "Waste Type",
        name: "activity",
        options: ["Recycling", "Landfill", "Compost"],
      },
      { label: "Weight Unit", name: "unit", options: ["kg", "g"] },
    ],
  };

  const numberFields = {
    Energy: [
      {
        label: "Energy Consumed",
        name: "energy",
        type: "number",
        placeholder: "e.g., 100",
      },
    ],
    Transportation: [
      {
        label: "Distance Traveled",
        name: "distance",
        type: "number",
        placeholder: "e.g., 50",
      },
    ],
    Food: [
      {
        label: "Amount Consumed",
        name: "weight",
        type: "number",
        placeholder: "e.g., 0.5",
      },
    ],
    Waste: [
      {
        label: "Amount of Waste",
        name: "weight",
        type: "number",
        placeholder: "e.g., 2",
      },
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
    const allFields = [
      ...(dropdownFields[category] || []),
      ...(numberFields[category] || []),
    ];
    allFields.forEach((field) => {
      if (!formData[field.name])
        newErrors[field.name] = "This field is required";
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        let payload;
        if (category === "Energy") {
          payload = {
            emission_factor: "electricity",
            parameters: {
              energy: Number(formData.energy),
              unit: formData.unit,
              region: formData.region,
            },
          };
        } else if (category === "Transportation") {
          payload = {
            emission_factor: "passenger_vehicle",
            parameters: {
              distance: Number(formData.distance),
              unit: formData.unit,
            },
          };
        } else {
          payload = { category, ...formData };
        }

        const response = await fetch("http://localhost:5000/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        onResult(result);
        navigate("/results");
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
            {dropdownFields[category]?.map((field, index) => (
              <div className="input-group" key={index}>
                <label htmlFor={field.name} className="input-label">
                  {field.label}:
                </label>
                <select
                  id={field.name}
                  name={field.name}
                  className="input-field"
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  {field.options.map((option, idx) => (
                    <option value={option} key={idx}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="error-message">{errors[field.name]}</span>
              </div>
            ))}
            {numberFields[category]?.map((field, index) => (
              <div className="input-group" key={index}>
                <label htmlFor={field.name} className="input-label">
                  {field.label}:
                </label>
                <input
                  id={field.name}
                  type="number"
                  name={field.name}
                  placeholder={field.placeholder}
                  className="input-field"
                  value={formData[field.name] || ""}
                  onChange={handleChange}
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
