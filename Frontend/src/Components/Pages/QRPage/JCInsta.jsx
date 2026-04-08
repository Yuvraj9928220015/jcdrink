import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./JCInsta.css";

export default function JCInsta() {
  const [isLoading, setIsLoading] = useState(true);
  const instagramUrl = "https://www.instagram.com/jcdrinkofficial/";

  return (
    <>
      <div className="qr-page-wrapper">
        <div className="qr-section">
          <div className="qr-card">
            <div className="qr-header">
              <h2>Follow us on Instagram</h2>
              <p className="qr-subtitle">Scan QR code to visit our Instagram page</p>
            </div>

            <div className="qr-code-wrapper">
              <QRCodeCanvas
                value={instagramUrl}
                size={220}
                level="H"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}