import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import InputForm from "./components/InputForm";
import Results from "./components/Results";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [calculatedResult, setCalculatedResult] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={<HomePage onSelectCategory={setSelectedCategory} />}
        />
        <Route
          path="/input"
          element={
            selectedCategory ? (
              <InputForm
                category={selectedCategory}
                onBack={() => setSelectedCategory(null)}
                onResult={setCalculatedResult}
              />
            ) : (
              <HomePage onSelectCategory={setSelectedCategory} />
            )
          }
        />
        <Route
          path="/results"
          element={
            calculatedResult ? (
              <Results
                result={calculatedResult}
                onBack={() => {
                  setCalculatedResult(null);
                  setSelectedCategory(null);
                }}
              />
            ) : (
              <HomePage onSelectCategory={setSelectedCategory} />
            )
          }
        />
      </Routes>
    </Router>
  );
}
