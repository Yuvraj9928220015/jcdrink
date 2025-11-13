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
                    <div className="energizing-col-7">
                        <div className="energizing-content-box">
                            <h1 className="energizing-title">Unleash Your X Factor</h1>
                            <p className='energizing-Subtitle'>No Limits. No Breaks. Just Pure Power.</p>
                            <p className="energizing-description">
                                X Factor Energy Drink isn’t just fuel — it’s ignition.
                                Packed with explosive caffeine energy,
                                 B-Vitamins, and a bold, electrifying flavor, it powers your body and sharpens <br /> your  mind in every sip. Whether you’re crushing workouts, gaming all night, or chasing the next big win, X Factor turns fatigue into fire.
                            </p>
                            <div className="energizing-features">
                                <div className="energizing-feature">
                                    <h3>Ultimate Power Mode</h3>
                                    <p>Ignite your body, charge your mind, and rule every moment with the unstoppable surge of X Factor.</p>
                                </div>
                                <div className="energizing-feature">
                                    <h3>Turn Fatigue Into Fire</h3>
                                    <p>Fuel your grind with explosive caffeine energy and bold flavor that keeps you fierce, focused, and fearless.</p>
                                </div>
                                <div className="energizing-feature">
                                    <h3>Feel The X. Live The Power</h3>
                                    <p>From workouts to wild nights — X Factor gives you the energy to break limits, dominate challenges, and own your zone.</p>
                                </div>
                            </div>
                            <button className="energizing-btn">Learn More</button>
                        </div>
                    </div>


                    {/* Image Column */}
                    <div className="energizing-col-5">
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