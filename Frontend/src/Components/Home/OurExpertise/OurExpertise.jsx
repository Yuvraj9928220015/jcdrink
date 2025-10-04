import "./OurExpertise.css";

function OurExpertise() {
    return (
        <>
            <div className="our-expertise-section">
                <div data-aos="fade-up"
                    data-aos-duration="3000" className="container">
                    <div className="Energizing-container-main">
                        <div
                            className="Energizing-container-main-title"
                        >
                            Our Expertise – We Bring the Spark!
                        </div>
                        <div
                            className="Energizing-container-main-des"
                        >
                            We don’t just make drinks. We create vibes you can taste.
                        </div>
                    </div>

                    <div className="expertise-wrapper">
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-delay="300"
                            className="left-section"
                        >
                            <div className="cta-card animated-card">
                                <div className="cta-image">
                                    <img src="/Main-Banner-3.png" alt="Team working" />
                                    <div className="image-overlay"></div>
                                </div>

                                <div className="floating-element floating-1"></div>
                                <div className="floating-element floating-2"></div>
                                <div className="floating-element floating-3"></div>
                            </div>
                        </div>

                        <div className="right-section">
                            <div className="content-card">
                                <div className="section-header">
                                    <span
                                        className="expertise-badge"
                                        data-aos="fade-left"
                                        data-aos-duration="800"
                                        data-aos-delay="400"
                                    >
                                        <span className="badge-icon">◉</span>
                                        Our Expertise
                                    </span>

                                    <h2
                                        data-aos="fade-left"
                                        data-aos-duration="1000"
                                        data-aos-delay="500"
                                    >
                                        Data Driven Strategies, <span>Measurable Results</span>
                                    </h2>

                                    <p
                                        className="intro-text"
                                        data-aos="fade-left"
                                        data-aos-duration="800"
                                        data-aos-delay="600"
                                    >
                                        At Marko, we specialize in crafting innovative digital marketing strategies that drive
                                        real business growth. Our expertise ensures
                                    </p>
                                </div>

                                <div className="content-body">
                                    <div
                                        className="services-section"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="700"
                                    >
                                        <h3>What We Do Best</h3>
                                        <ul className="services-list">
                                            <li className="service-item" data-service-delay="0">
                                                <span className="service-icon">◉</span>
                                                Flavor Revolution – Bold, crazy, and unforgettable flavors that scream "One More Sip!"
                                            </li>
                                            <li className="service-item" data-service-delay="1">
                                                <span className="service-icon">◉</span>
                                                Top-Notch Quality – Only the freshest, finest stuff goes into your bottle. No compromise. Ever.
                                            </li>
                                            <li className="service-item" data-service-delay="2">
                                                <span className="service-icon">◉</span>
                                                Made for the Youth – Energy, style, and fun packed in every fizz.
                                            </li>
                                            <li className="service-item" data-service-delay="3">
                                                <span className="service-icon">◉</span>
                                                Always On Point – Same great taste, every single time – no “good batch, bad batch” drama.
                                            </li>
                                            <li className="service-item" data-service-delay="4">
                                                <span className="service-icon">◉</span>
                                                Desi + Global Mix – Flavors that connect with every Indian heart but feel world-class.
                                            </li>
                                            <li className="service-item" data-service-delay="5">
                                                <span className="service-icon">◉</span>
                                                Planet Friendly – Cool drinks, cooler planet. 100% recyclable love for Mother Earth.
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