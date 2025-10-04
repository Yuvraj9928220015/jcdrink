import React from 'react';
import './Energizing.css';

export default function Energizing() {
    return (
        <div className="energizing">
            {/* Background Video */}
            <div className="energizing-video">
                <video
                    src="/RedLightning.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                />
            </div>
            
            {/* Content Container */}
            <div className="energizing-container">
                <div className="energizing-row">

                    {/* Content Column */}
                    <div className="energizing-col-8">
                        <div className="energizing-content-box">
                            <h1 className="energizing-title">Energizing Power</h1>
                            <p className="energizing-description">
                                Experience the incredible energy and power that drives innovation 
                                and transforms possibilities into reality. Our cutting-edge technology 
                                delivers unmatched performance and reliability.
                            </p>
                            <div className="energizing-features">
                                <div className="energizing-feature">
                                    <h3>High Performance</h3>
                                    <p>Optimized for maximum efficiency and speed</p>
                                </div>
                                <div className="energizing-feature">
                                    <h3>Reliable Technology</h3>
                                    <p>Built to last with industry-leading standards</p>
                                </div>
                                <div className="energizing-feature">
                                    <h3>Innovation Focus</h3>
                                    <p>Constantly evolving to meet future needs</p>
                                </div>
                            </div>
                            <button className="energizing-btn">Learn More</button>
                        </div>
                    </div>

                    
                    {/* Image Column */}
                    <div className="energizing-col-4">
                        <div className="energizing-image-box">
                            <img 
                                src="/marquee-3.jpg" 
                                alt="Energizing Image" 
                                className="energizing-image"
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}