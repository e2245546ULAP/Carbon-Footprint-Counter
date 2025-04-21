import { useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import HomePage from "./pages/HomePage.jsx";
import InputForm from "./components/InputForm.jsx";
import Results from "./components/Results.jsx";

export default function App() {
  // Get current page from URL
  const currentPage = window.location.pathname;

  // State to handle input form and results
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [calculatedResult, setCalculatedResult] = useState(null);

  const handleResult = (result) => {
    setCalculatedResult(result);
  };

  const handleBack = () => {
    setCalculatedResult(null);
    setSelectedCategory(null);
  };

  let PageComponent;
  if (currentPage === "/login") {
    PageComponent = Login;
  } else if (currentPage === "/signup") {
    PageComponent = Signup;
  } else if (currentPage === "/home") {
    if (calculatedResult) {
      PageComponent = () => (
        <Results result={calculatedResult} onBack={handleBack} />
      );
    } else if (selectedCategory) {
      PageComponent = () => (
        <InputForm
          category={selectedCategory}
          onBack={handleBack}
          onResult={handleResult}
        />
      );
    } else {
      PageComponent = () => <HomePage onSelectCategory={setSelectedCategory} />;
    }
  } else {
    PageComponent = LandingPage;
  }

  return <PageComponent />;
}
