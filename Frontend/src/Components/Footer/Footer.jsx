import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { FaInstagram } from "react-icons/fa6";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="footer-section">
              <div className="logo">
                <div className="logo-container">
                  <img
                    src="./jcDrink-logo.png"
                    alt="Company Logo"
                  />
                </div>
                <p>SHREE BALAJI FOODS</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="footer-section">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/About" className="footer-link">About Us</a></li>
                <li><a href="/Product" className="footer-link">Products</a></li>
                <li><a href="/Privacy" className="footer-link">Privacy Policy</a></li>
                <li><a href="/Contact" className="footer-link">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="footer-section">
              <h3 className="footer-title">Contact</h3>
              <ul className="footer-links">
                <li className="footer-link">+91-8432221711</li>
                <li className="footer-link">Info@balajibeverages.com </li>
              </ul>
              <div className="social-icons">
                <div id='Social-Icon' className="social-icon">
                  <Facebook size={20} />
                </div>
                <div id='Social-Icon' className="social-icon">
                  <Twitter size={20} />
                </div>
                <div id='Social-Icon' className="social-icon">
                  <Linkedin size={20} />
                </div>
                <div id='Social-Icon' className="social-icon">
                  <FaInstagram size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-bottom-links">
              <a href="" className="footer-bottom-link">copyright 2025. ALL rights Reserved</a>
            </div>
            <div className="footer-bottom-links">
              <a href="https://lensclickerdigital.com/" className="footer-bottom-link">Developed By lensclickerdigital.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}