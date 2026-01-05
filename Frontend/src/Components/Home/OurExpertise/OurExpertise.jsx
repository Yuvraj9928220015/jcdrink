import "./OurExpertise.css";

function OurExpertise() {
    return (
        <>
            <div className="our-expertise-section">
                <div data-aos="fade-up"
                    data-aos-duration="3000" className="OurExpertise-container-fluid">
                    <div className="Energizing-container-main">
                        <div
                            className="Our-Energizing-container-main-title"
                        >
                            Desi Vibes, Global Swag — That’s Our Refreshment Game
                        </div>
                        <div
                            className="Energizing-container-main-des"
                        >
                            We don’t sell drinks — we serve swag
                        </div>
                    </div>

                    <div className="expertise-wrapper">
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-delay="100"
                            className="left-section"
                        >
                            <div className="cta-card animated-card">
                                <div className="cta-image">
                                    <img src="/Main-Banner-3.webp" alt="Team working" />
                                    <div className="image-overlay"></div>
                                </div>

                                <div className="floating-element floating-1"></div>
                                <div className="floating-element floating-2"></div>
                                <div className="floating-element floating-3"></div>
                            </div>
                        </div>

                        <div className="right-section">
                            <div className="content-card">
                                <div className="Our-section-header">
                                    <h2
                                        data-aos="fade-left"
                                        data-aos-duration="1000"
                                        data-aos-delay="500"
                                    >
                                        Why JC Drink Hits Different!
                                        {/* Data Driven Strategies, <span>Measurable Results</span> */}
                                    </h2>

                                    <p
                                        className="intro-text"
                                        data-aos="fade-left"
                                        data-aos-duration="800"
                                        data-aos-delay="600"
                                    >
                                        Because we don’t just refresh — we redefine chill.
                                        At JC Drink, we’re not here to play safe — we’re here to shake things up!
                                        We’ve taken desi flavours, added a blast of fizz, and packed it with full-on swag energy.
                                        From the first sip to the last drop, JC Drink isn’t just about quenching thirst — it’s about owning the vibe.
                                    </p>
                                </div>

                                <div className="content-body">
                                    <div
                                        className="services-section"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="300"
                                    >
                                        <h3>Why We Are Best ?</h3>
                                        <ul className="services-list">
                                            <li className="service-item" data-service-delay="0">
                                                <span className="service-icon">◉</span>
                                                Flavours with Full Tashan: From chatpata Tangy Orange to thanda Sweet Lemon — every sip hits different! Pure energy + attitude in a bottle.
                                            </li>
                                            <li className="service-item" data-service-delay="1">
                                                <span className="service-icon">◉</span>
                                                Fizz So Fine, You’ll Feel It! Smooth, fizzy, aur full premium feels — ek sip, aur thandak seedha dil tak!
                                            </li>
                                            <li className="service-item" data-service-delay="2">
                                                <span className="service-icon">◉</span>
                                                For the Youth, By the Swaglords: Trendy, bold, and 100% desi — JC Drink is your official chill partner-in-crime!
                                            </li>
                                            <li className="service-item" data-service-delay="3">
                                                <span className="service-icon">◉</span>
                                                Every Sip Full Celebration Mode: Chill scenes, long drives, ya gully vibes — JC Drink turns every hangout into a total vibe fest!
                                            </li>
                                            <li className="service-item" data-service-delay="4">
                                                <span className="service-icon">◉</span>
                                               India’s Way to Chill: From gully corners to glam nights — JC Drink is how the new India stays cool, one sip, one vibe, one smile at a time!
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OurExpertise;