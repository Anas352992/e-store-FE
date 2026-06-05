import React from "react";

const Footer = () => {
  return (
    <footer className="footer-dark">
      <div className="container text-center">
        <div className="d-flex justify-content-center">
          <img src="/logo.png" alt="LOGO" className="logo-img mb-4" />
        </div>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <a href="#" className="footer-link">
            FACEBOOK
          </a>
          <a href="#" className="footer-link">
            INSTAGRAM
          </a>
          <a href="#" className="footer-link">
            TWITTER
          </a>
        </div>
        <p className="mt-4 mb-0" style={{ fontSize: "11px", color: "#666" }}>
          © 2026 PREMIUM SHOE STORE. DESIGNED FOR PERFORMANCE.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
