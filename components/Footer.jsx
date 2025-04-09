import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-section about">
          <div className="logo">
            <img src="/logo.png" alt="Tecblic Logo" />
            <span><strong>Tecblic</strong></span>
          </div>
          <h4>An innovation-driven company</h4>
          <p>
            We are passionate about creating your success story by transforming the organization’s digital identity.
          </p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-x-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-dribbble"></i></a>
          </div>
        </div>

        {/* Menu Links */}
        <div className="footer-section">
          <h4>Menu</h4>
          <ul>
            <li><a href="#">SERVICES</a></li>
            <li><a href="#">TECHNOLOGY</a></li>
            <li><a href="#">ABOUT US</a></li>
            <li><a href="#">BLOG</a></li>
            <li><a href="#">CONTACT US</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Registerd Office:</h4>
          <p><strong>India</strong></p>
          <p>510/511, Shivalik Shilp II,<br />
            Opp. ITC Narmada<br />
            Judges Bungalow Road,<br />
            Ahmedabad, Gujarat - 380054.
          </p>
          <p>Tel : +91-7777907777</p>
        </div>
      </div>
      <hr />
      <p className="copyright">
        © Copyright <a href="#">Tecblic</a> 2025
      </p>
    </footer>
  );
}
