import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import HomePage from "./pages/HomePage.jsx";

export default function App() {
  // Get current page from URL
  const currentPage = window.location.pathname;

  let PageComponent;
  if (currentPage === "/login") {
    PageComponent = Login;
  } else if (currentPage === "/signup") {
    PageComponent = Signup;
  } else if (currentPage === "/home") {
    PageComponent = HomePage;
  } else {
    PageComponent = LandingPage;
  }

  return <PageComponent />;
}
