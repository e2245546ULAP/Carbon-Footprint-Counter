import React from "react";
import "../components/Results.css";

function Results({ result, onBack }) {
  return (
    <div className="results-container">
      <div className="results-card">
        <h2>Carbon Footprint Results</h2>
        <p>
          <strong>Carbon Footprint:</strong> {result.footprint} kg CO₂
        </p>
        <button className="back-btn" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Results;
