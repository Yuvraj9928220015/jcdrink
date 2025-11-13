
import "./About.css"
export default function About() {
    return (
        <div className="about">
            <div className="container">
                {/* Hero Section */}
                <section className="about-content">
                    <div className="about-content-header">
                        <h2 className="about-heading">About Us</h2>
                        <p className="about-description">
                            We believe in creating extraordinary experiences through innovation,
                            dedication, and a commitment to excellence that spans every aspect of our work.
                        </p>
                    </div>

                    {/* About Company Section */}
                    <div className="about-main-section">
                        <div className="about-text-container">
                            <div className="about-text-content">
                                <h3 className="about-title">About Us</h3>
                                <p className="about-paragraph">
                                    Founded in 2012, <strong>Shree Balaji Foods</strong> is a growing name in the Indian beverage industry,
                                    dedicated to crafting refreshing and affordable drinks tailored to Indian tastes. With a vision
                                    to quench the thirst of millions across urban and rural India, we blend tradition and
                                    innovation to deliver high-quality beverages that resonate with every Indian palate.
                                </p>
                                <p className="about-paragraph">
                                    Our manufacturing facility, located in the industrial heart of Ajmer, Rajasthan, is equipped
                                    with modern machinery and stringent quality-control processes to ensure that every bottle
                                    that leaves our plant reflects excellence.
                                </p>
                                <p className="about-paragraph">
                                    What sets us apart is our founder's deep understanding of consumer needs. With over a
                                    decade of experience in food and beverage manufacturing, <strong>Mr. Rajesh Sadhwani</strong> continues
                                    to lead the company with a hands-on approach, focused on quality, trust, and customer
                                    satisfaction.
                                </p>
                                <p className="about-paragraph">
                                    At Shree Balaji Foods, we specialize in creating beverages that blend traditional Indian
                                    flavors with modern processing techniques, ensuring both taste and safety in every bottle.
                                    Our commitment to hygiene, innovation, and affordability has helped us win hearts across the
                                    country from bustling cities to the smallest villages.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision Section */}
                    <div className="mission-vision-section">
                        <div className="mission-card">
                            <h3 className="about-title">Our Mission</h3>
                            <p className="section-text">
                                To deliver safe, affordable, and flavorful beverages that cater to the diverse tastes of Indian
                                consumers — from bustling cities to remote villages.
                            </p>
                        </div>

                        <div className="vision-card">
                            <h3 className="about-title">Our Vision</h3>
                            <p className="section-text">
                                To become a household name across India by offering a range of beverages that combine
                                traditional flavors with modern standards of quality and hygiene.
                            </p>
                        </div>
                    </div>

                    {/* Target Audience Section */}
                    <div className="target-audience-section">
                        <h3 className="about-title">Target Audience</h3>
                        <p className="section-text">
                            We proudly serve both rural and urban markets across India, offering products that are not
                            only refreshing and tasty but also accessible and economical. From street-side vendors to
                            urban retailers, Shree Balaji Foods is building a wide and loyal consumer base.
                        </p>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="why-choose-us-section">
                        <h3 className="about-title">Why Choose Us</h3>
                        <div className="features-grid">
                            <div className="feature-card">
                                <h4 className="feature-title">Affordable for Every Indian</h4>
                                <p className="feature-text">
                                    From small villages to big cities, our pricing is designed to fit every pocket without
                                    compromising on quality.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4 className="feature-title">Strong Rural Distribution </h4>
                                <p className="feature-text">
                                    Unlike many brands, we focus equally on rural markets — ensuring our drinks are available
                                    in even the most remote areas
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4 className="feature-title">Customized for Indian tastes </h4>
                                <p className="feature-text">
                                    We understand what people in India like to drink. Our flavours are created by Indians, for
                                    Indians - refreshing, energizing and delicious.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4 className="feature-title">RO Purified Water in Every Drink </h4>
                                <p className="feature-text">
                                    all our beverages are made with RO-treated water, maintaining purity and protecting your
                                    health.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4 className="feature-title">Regular Lab Testing & Quality Checks </h4>
                                <p className="feature-text">
                                    Every production batch undergoes lab testing for taste, safety, and shelf-life, so only the
                                    best reaches you.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4 className="feature-title">Safe for All Age Groups</h4>
                                <p className="feature-text">
                                    Our beverages are made keeping safety in mind for both kids and adults — no excessive
                                    carbonation or harmful preservatives.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4 className="feature-title">FSSAI Certified & GMP Compliant Facility </h4>
                                <p className="feature-text">
                                    Our manufacturing follows strict Food Safety and Standards Authority of India (FSSAI) norms
                                    and Good Manufacturing Practices (GMP), ensuring every bottle meets national safety
                                    standards.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4 className="feature-title">Eco-Conscious Production</h4>
                                <p className="feature-text">
                                    We use recyclable materials and water-saving techniques to reduce environmental
                                    impact. We use BPA-free and recyclable plastic bottles, ensuring safety for
                                    consumers and the environment.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cold Drinks Section */}
                <section className="drinks-section">
                    <div className="about-content-header">
                        <h2 className="about-heading">Refreshments</h2>
                        <p className="about-description">
                            Sip. Chill. Repeat. Explore our range of bold, refreshing drinks crafted to hit the perfect taste every time and keep your vibe on point
                        </p>
                    </div>

                    <div className="drinks-grid">
                        <div className="drink-card">
                            <div className="drink-image-wrapper">
                                <img src="marquee-2.jpg" alt="Fresh Orange Juice" />
                                <div className="drink-overlay">
                                    <div className="drink-overlay-content">
                                        <h3>Cola & Sweet Lemon</h3>
                                        <p>Thoda cola, thoda lemon,
                                            Full desi blast!
                                            Fun, swag aur ultimate refreshment</p>
                                        <button className="drink-btn">
                                            <span>Learn More</span>
                                            <span className="btn-icon">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="drink-card">
                            <div className="drink-image-wrapper">
                                <img src="marquee-3.jpg" alt="Tropical Blend" />
                                <div className="drink-overlay">
                                    <div className="drink-overlay-content">
                                        <h3>X Factor</h3>
                                        <p>Kickstart your vibe, full X Factor mode!
                                            Energy ka blast, swag ka twist.
                                            Sip karo, duniya ko beat karo</p>
                                        <button className="drink-btn">
                                            <span>Learn More</span>
                                            <span className="btn-icon">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="drink-card">
                            <div className="drink-image-wrapper">
                                <img src="marquee-4.jpg" alt="Citrus Mint" />
                                <div className="drink-overlay">
                                    <div className="drink-overlay-content">
                                        <h3>Tangy Orange</h3>
                                        <p>Orange ka tadka, full-on swag!
                                            Sip karo, chill karo, vibe banao.
                                            Tangy hai boss, masti ka dose</p>
                                        <button className="drink-btn">
                                            <span>Learn More</span>
                                            <span className="btn-icon">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}