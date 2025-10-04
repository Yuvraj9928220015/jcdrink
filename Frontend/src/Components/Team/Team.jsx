import { Facebook, Twitter, Linkedin, Check } from 'lucide-react';
import { FaInstagram } from "react-icons/fa6";
import "./Team.css"

export default function Team() {
    const teamMembers = [
        {
            id: 1,
            name: "John Mayer",
            position: "VP of Product",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "blue"
        },
        {
            id: 2,
            name: "Linda Rose",
            position: "VP of Design",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "pink"
        },
        {
            id: 3,
            name: "Jessica Janet",
            position: "Project Manager",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "green"
        },
        {
            id: 4,
            name: "Samuel Lane",
            position: "Creative Director",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "blue"
        },
        {
            id: 5,
            name: "Laurel Schaela",
            position: "Supervisor",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "pink"
        },
        {
            id: 6,
            name: "Justin Hubner",
            position: "Coordinator",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi magnam voluptatibus minima accusamus.",
            bgColor: "green"
        }
    ];

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="team-container">
                    <div className="main-content">
                        {/* Meet Our Team Section */}
                        <div className="section-header">
                            <h2 className="section-title">Just Cool Our Team</h2>
                            <p className="section-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut<br />
                                spelleras tellus luctus neullamcorper mattis, lorem pibus leo dictu.
                            </p>
                        </div>

                        {/* CEO Section */}
                        <div data-aos="fade-right"
                            data-aos-offset="100"
                            data-aos-easing="ease-in-sine" className="ceo-section">
                            <div className="ceo-image-container">
                                <div className="ceo-badge">CEO & Founder</div>
                                <img
                                    src="./public/Screenshot.png"
                                    alt="Darwin Luiz - CEO & Founder"
                                    className="ceo-image"
                                />
                            </div>
                            <div className="ceo-content">
                                <h2 className="ceo-name"> Shree Balaji Foods </h2>
                                <p className="ceo-description">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                                    ut elit tetas tellus luctus non corpor mat is pulvinar pibus leo dictu
                                    ut ut tur luco lamco virput niste, lorem impor fer dese amet taxen.
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
                                    <div className="experience-points">
                                        <div className="experience-point">
                                            <div className="check-icon">
                                                <Check size={14} />
                                            </div>
                                            <span className="experience-text">Established: 2012  </span>
                                        </div>
                                        <div className="experience-point">
                                            <div className="check-icon">
                                                <Check size={14} />
                                            </div>
                                            <span className="experience-text">Industry: Beverage Manufacturing</span>
                                        </div>
                                        <div className="experience-point">
                                            <div className="check-icon">
                                                <Check size={14} />
                                            </div>
                                            <span className="experience-text">Head Office: RIICO Industrial Area, Ajmer, Rajasthan (India) </span>
                                        </div>
                                        <div className="experience-point">
                                            <div className="check-icon">
                                                <Check size={14} />
                                            </div>
                                            <span className="experience-text">Operational Region: PAN India (Urban and Rural Markets)</span>
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                                    elit tetas tellus luctus nam corpor mat is pulvinar pibus leo.
                                </p>

                            </div>

                            <div className="team-grid">
                                {teamMembers.map((member) => (
                                    <div data-aos="fade-zoom-in"
                                        data-aos-easing="ease-in-back"
                                        data-aos-delay="100"
                                        data-aos-offset="0" key={member.id} className="team-card">
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