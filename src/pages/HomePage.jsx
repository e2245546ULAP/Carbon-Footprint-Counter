import React from "react";
import "../styles/HomePage.css";

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="../public/logo.jpg" alt="Logo" className="logo-image" />
        <h1 className="logo-text">Carbon Footprint</h1>
      </div>

      <nav className="navbar">
        <ul>
          <li>
            <a href="#section1">About</a>
          </li>
          <li>
            <a href="#section2">Get Involved</a>
          </li>
          <li>
            <a href="#section3">Learn More</a>
          </li>
        </ul>
      </nav>

      <a href="/login" className="logout-icon">
        <i className="bx bx-log-out"></i>
      </a>
    </header>
  );
}

function Body() {
  return (
    <section>
      <div className="hero-home">
        <div className="hero-content">
          <p className="tagline">Reduce Your Carbon Footprint Today</p>
          <h2>For a Greener Tomorrow!</h2>
          <a href="#section2" className="calculate-btn">
            Get Started
          </a>
        </div>
      </div>

      <div className="section" id="section1">
        <h2>What is Carbon Footprint?</h2>
        <p>
          A carbon footprint refers to the total amount of greenhouse gases,
          primarily carbon dioxide (CO2), emitted into the atmosphere as a
          result of human activities, all of which release harmful emissions
          that accelerate climate change. By understanding and reducing our
          carbon footprint—through sustainable practices like using renewable
          energy, proper waste management, and adopting eco-friendly
          transportation options—we can significantly reduce our environmental
          impact and help combat global warming.
        </p>
        <div className="section1-images">
          <img src="/public/emissions.jpeg" alt="Industrial Emissions" />
          <img src="/public/living.jpg" alt="Sustainable Living" />
        </div>
      </div>

      <div className="section" id="section2">
        <h2>Carbon Footprint Categories</h2>
        <p>Select a category to explore its impact on carbon emissions:</p>
        <div className="category-list">
          <div className="category-item">🌍 Transportation</div>
          <div className="category-item">🏡 Energy Usage</div>
          <div className="category-item">🍔 Food Consumption</div>
          <div className="category-item">🛍️ Shopping & Lifestyle</div>
          <div className="category-item">♻️ Waste Management</div>
        </div>
      </div>

      <div className="section" id="section3">
        <h2>Learn More About Carbon Footprint</h2>
        <p>
          Watch these videos to understand more about carbon footprint and how
          to reduce it.
        </p>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/8q7_aV8eLUE"
            title="Understanding Carbon Footprint"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/J_iDcKDAwbA"
            title="How to Reduce Your Carbon Footprint"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/5bVDpmzMICE"
            title="Sustainable Living: What Does It Mean?"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Carbon Footprint | All rights reserved.</p>
        <div className="footer-links">
          <a href="#section1">About</a>
          <a href="#section2">Get Involved</a>
          <a href="#section3">Learn More</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
