import { Helmet } from "react-helmet-async";
import { Facebook, Twitter, Linkedin, Check } from 'lucide-react';
import { FaInstagram } from "react-icons/fa6";
import "./Team.css"

export default function Team() {
    const teamMembers = [
        {
            id: 1,
            name: "John Mayer",
            position: "VP of Product",
            image: "/Team-8.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "blue"
        },
        {
            id: 2,
            name: "Linda Rose",
            position: "VP of Design",
            image: "/Team-7.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "pink"
        },
        {
            id: 3,
            name: "Jessica Janet",
            position: "Project Manager",
            image: "/Team-9.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "green"
        },
        {
            id: 4,
            name: "Samuel Lane",
            position: "Creative Director",
            image: "/Team-10.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "blue"
        },
        {
            id: 5,
            name: "Laurel Schaela",
            position: "Supervisor",
            image: "/Team-11.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "pink"
        },
        {
            id: 6,
            name: "Justin Hubner",
            position: "Coordinator",
            image: "/Team-12.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "green"
        }
    ];

    return (
        <>

            <Helmet>
                <title>Meet Our Team – Experts Behind JC Drink’s</title>
                <meta
                    name="description"
                    content="Meet the talented and passionate team behind JC Drink, dedicated to crafting high-quality cold drinks and delivering refreshing flavors with expert care and commitment."
                />
                <link rel="canonical" href="https://jcdrink.com/team" />
            </Helmet>

            <div className="min-h-screen bg-gray-50">
                <div className="team-container">
                    <div className="main-content">
                        {/* Meet Our Team Section */}
                        <div className="section-header">
                            <h1 className="Team-heading">Our Team</h1>
                            <p className="Team-section-description">
                                Meet the minds behind our innovation and success.
                            </p>
                        </div>

                        {/* CEO Section */}
                        <div data-aos="fade-zoom-in" className="ceo-section">
                            <div className="ceo-image-container">
                                <div className="ceo-badge">CEO & Founder</div>
                                <img
                                    src="/Screenshot.webp"
                                    alt="Darwin Luiz - CEO & Founder"
                                    className="ceo-image"
                                />
                            </div>
                            <div className="ceo-content">
                                <h2 className="ceo-name"> Shree Balaji Foods </h2>
                                <p className="ceo-description">
                                    Since establishing the company in 2012, Mr. Rajesh Sadhwani, our CEO & Founder, has demonstrated unwavering dedication and vision in building a brand that stands for quality, innovation, and excellence. His relentless commitment to growth, attention to detail, and entrepreneurial spirit have been the driving forces behind the company’s expansion across urban and rural markets in PAN India.
                                </p>
                                <div className="social-icons">
                                    <div className="social-icon">
                                        <Facebook size={20} />
                                    </div>
                                    <div className="social-icon">
                                        <Twitter size={20} />
                                    </div>
                                    <div className="social-icon">
                                        <Linkedin size={20} />
                                    </div>
                                </div>

                                <div className="experience-section">
                                    <h3>Mr. Rajesh Sadhwani </h3>
                                    <div className='experience-section-subtitle'>Under his leadership:</div>
                                    <div className="experience-points">
                                        <div className="experience-point">
                                            <div className="check-icon">
                                                <Check size={14} />
                                            </div>
                                            <span className="experience-text">Strategic planning and innovation have continually strengthened the brand. </span>
                                        </div>
                                        <div className="experience-point">
                                            <div className="check-icon">
                                                <Check size={14} />
                                            </div>
                                            <span className="experience-text">The team is inspired by his work ethic, perseverance, and passion.</span>
                                        </div>
                                        <div className="experience-point">
                                            <div className="check-icon">
                                                <Check size={14} />
                                            </div>
                                            <span className="experience-text">Customer satisfaction and product excellence remain at the heart of every decision. </span>
                                        </div>
                                        <div className="experience-point">
                                            <div className="check-icon">
                                                <Check size={14} />
                                            </div>
                                            <span className="experience-text">The company has grown to serve diverse markets while maintaining consistent quality.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Board of Directors Section */}
                        <div className="board-section">
                            <div className="board-header">
                                <h2 className="board-title">Board of Directors</h2>
                                <p className="board-description">
                                    Experienced Minds, Strategic Decisions, Strong Leadership.
                                </p>

                            </div>

                            <div className="team-grid">
                                {teamMembers.map((member) => (
                                    <div data-aos="fade-zoom-in"
                                        className="team-card">
                                        <div className={`team-image-container ${member.bgColor}`}>
                                            <div className="position-badge">{member.position}</div>
                                            <img src={member.image} alt={member.name} className="team-image" />
                                        </div>
                                        <div className="team-info">
                                            <h3 className="team-name">{member.name}</h3>
                                            <p className="team-description">{member.description}</p>
                                            <div className="team-social-icons">
                                                <div className="social-icons">
                                                    <div className="social-icon">
                                                        <Facebook size={20} />
                                                    </div>
                                                    <div className="social-icon">
                                                        <Twitter size={20} />
                                                    </div>
                                                    <div className="social-icon">
                                                        <Linkedin size={20} />
                                                    </div>
                                                    <div className="social-icon">
                                                        <FaInstagram size={20} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}