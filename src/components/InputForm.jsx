import React from "react";
import "../components/InputForm.css";

function InputForm({ category, onBack }) {
  const formFields = {
    "Energy Usage": [
      {
        label: "Type of energy use",
        name: "activity",
        placeholder: "e.g., electricity",
      },
      { label: "Amount consumed", name: "energy", placeholder: "e.g., 100" },
      { label: "Energy unit", name: "unit", placeholder: "e.g., kWh" },
    ],
    "Food Consumption": [
      { label: "Food type", name: "activity", placeholder: "e.g., beef" },
      { label: "Amount consumed", name: "weight", placeholder: "e.g., 0.5" },
      { label: "Weight unit", name: "unit", placeholder: "e.g., kg" },
    ],
    Waste: [
      { label: "Waste type", name: "activity", placeholder: "e.g., recycling" },
      { label: "Amount of waste", name: "weight", placeholder: "e.g., 2" },
      { label: "Weight unit", name: "unit", placeholder: "e.g., kg" },
    ],
    Transportation: [
      {
        label: "Type of transport",
        name: "activity",
        placeholder: "e.g., bus",
      },
      { label: "Distance traveled", name: "distance", placeholder: "e.g., 50" },
      { label: "Distance unit", name: "unit", placeholder: "e.g., km" },
      {
        label: "Vehicle type (optional)",
        name: "vehicle_type",
        placeholder: "e.g., car_gasoline",
      },
    ],
  };

  return (
    <div className="input-form-container">
      <h2>{category} Input Form</h2>
      <form>
        {formFields[category].map((field, index) => (
          <div className="input-group" key={index}>
            <label>{field.label}:</label>
            <input
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              required
            />
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
  );
}

export default InputForm;
