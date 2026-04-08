import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./QRPage.css";

export default function QRPage() {
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const scannedParam = urlParams.get('scanned');

        if (scannedParam === 'true') {
          setShowDetails(true);
        }
      } catch (error) {
        console.error('Error reading URL params:', error);
      }
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const qrLink = `${window.location.origin}${window.location.pathname}?scanned=true`;

  return (
    <>
      <div className="qr-page-wrapper">
        {!showDetails && (
          <div className="qr-section">
            <div className="qr-card">
              <div className="qr-header">
                <h2>Scan QR Code</h2>
                <p className="qr-subtitle">Get instant shop information for JC Drink</p>
              </div>

              <div className="qr-code-wrapper">
                <QRCodeCanvas
                  value={qrLink}
                  size={220}
                  level="H"
                />
              </div>

              <div className="qr-instruction">
                <p>
                  <span className="icon">📱</span>
                  Scan with your camera to view details
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DETAILS SECTION - Only visible after scan */}
        {showDetails && (
          <div id="details" className="details-section">
            <div className="details-container">
              <div className="details-header">
                <h2>
                  <span className="shop-icon">🏪</span>
                  Shree Balaji Foods
                </h2>
                <p className="shop-subtitle">Authorized Cold Drink Distributor</p>

                {/* GST and License Details Box */}
                <div className="license-details-box">
                  <div className="license-content">
                    <p className="gst-line">
                      <span className="label">GST:</span> 08ASXPS7974C2ZR
                    </p>
                    <p className="address-line">
                      <span className="label">Address:</span> PLOT NO. G-211, RIICO INDUSTRIAL AREA, overhead tank, plara ajmer Rajasthan, 305025
                    </p>
                    <p className="contact-line">
                      <span className="label">Mob:</span> +91-8432221711
                    </p>
                    <div className="manufacturer-section">
                      <p className="manufacturer-title">Manufactured By:</p>
                      <p className="manufacturer-name">SHUBH FOOD AGRO INDUSTRIES</p>
                      <p className="manufacturer-address">
                        Plot No.-179(A), Sector 27-28, Industrial Area, Hisar (Haryana) - 125001
                      </p>
                      <p className="fssai-line">
                        <span className="label">FSSAI LIC. NO.:</span> 10018064001597
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-grid">
                {/* Location Card */}
                <div className="info-card location-card">
                  <div className="QR-card-content">
                    <span className="card-icon">📍</span>
                    <div className="card-text">
                      <h3>Location</h3>
                      <p>SHREE BALAJI FOODS, G-211, Makhupura Industrial Area, Palra, Ajmer, Rajasthan 305001</p>
                    </div>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="info-card contact-card">
                  <div className="QR-card-content">
                    <span className="card-icon">📞</span>
                    <div className="card-text">
                      <h3>Contact</h3>
                      <p>+91-8432221711</p>
                    </div>
                  </div>
                </div>

                {/* Website Card */}
                <div className="info-card website-card">
                  <div className="QR-card-content">
                    <span className="card-icon">🌐</span>
                    <div className="card-text">
                      <h3>Website</h3>
                      <a
                        href="https://jcdrink.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Jc Drink
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}