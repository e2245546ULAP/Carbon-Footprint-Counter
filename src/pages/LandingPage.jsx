import "../styles/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="hero-section">
        <div className="content-box">
          <h1>Welcome to Carbon Footprint Counter</h1>
          <p>Track your daily activities and reduce your carbon footprint.</p>
          <button className="cta-button">
            <a href="/login">Get Started</a>
          </button>
          <h2>Track, Reduce, Thrive – Your Journey to a Greener Future!" 🌿</h2>
        </div>
      </div>
      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features">
          <div className="feature">
            <img src="../public/feature1.png" alt="Track Activity" />
            <h3>Track Your Activities</h3>
            <p>
              Monitor your daily activities and see how they impact your carbon
              footprint.
            </p>
          </div>
          <div className="feature">
            <img src="../public/feature2.png" alt="Analyze Data" />
            <h3>Analyze Your Data</h3>
            <p>
              Get insights and analytics to understand your carbon footprint
              better.
            </p>
          </div>
          <div className="feature">
            <img src="../public/feature3.jpg" alt="Set Goals" />
            <h3>Set Goals</h3>
            <p>
              Set goals to reduce your carbon footprint and track your progress.
            </p>
          </div>
        </div>
      </div>
      <div className="visuals-section">
        <h2>Join Our Community</h2>
        <p>
          Be part of a community committed to reducing carbon footprints and
          making a positive impact on the environment.
        </p>
        <img
          src="../public/community.jpg"
          alt="Community"
          className="community-image"
        />
      </div>
      <div className="call-to-action-section">
        <h2>Ready to Make a Difference?</h2>
        <p>
          Join us today and start tracking your carbon footprint. Together, we
          can make a positive impact on the environment.
        </p>
        <button className="cta-button">
          <a href="/signup">Join Now</a>
        </button>
      </div>
      <footer className="footer">
        <p>&copy; 2025 Carbon Footprint | All rights reserved.</p>
      </footer>
    </div>
  );
}
