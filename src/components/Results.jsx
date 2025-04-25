import React from "react";
import "../components/Results.css";

function Results({ result, onBack }) {
  const getLevel = (value) => {
    if (value < 5) return "Low";
    if (value < 15) return "Moderate";
    return "High";
  };

  const level = getLevel(result.footprint);
  const levelColor = {
    Low: "green",
    Moderate: "orange",
    High: "red",
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <h2>Carbon Footprint Results</h2>
        <p>
          <strong>Carbon Footprint:</strong>{" "}
          <span style={{ color: levelColor[level] }}>
            {result.footprint} kg CO₂ ({level})
          </span>
        </p>

        <div className="result-bar">
          <div
            className="result-bar-fill"
            style={{
              width: `${Math.min(result.footprint * 5, 100)}%`,
              backgroundColor: levelColor[level],
            }}
          />
        </div>

        <div className="tips">
          {level === "High" && (
            <p>🚨 Consider reducing car use or switching to green energy.</p>
          )}
          {level === "Moderate" && (
            <p>
              🌿 You're doing okay! Try reducing single-use plastics or meat
              consumption.
            </p>
          )}
          {level === "Low" && (
            <p>✅ Great job! Keep up your eco-friendly lifestyle.</p>
          )}
        </div>

        <button className="back-btn" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Results;