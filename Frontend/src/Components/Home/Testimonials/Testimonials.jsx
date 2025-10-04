import React, { useState, useEffect } from 'react';
import "./Testimonials.css"

const testimonialsData = [
    {
        id: 1,
        name: "EMILIANO AQUILANI",
        title: "EMILIANO AQUILANI",
        text: "Dramatically maintain clicks-and-mortar solutions without functional solutions. Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 2,
        name: "ANNA ITURBE",
        title: "ANNA ITURBE",
        text: "Outstanding service and exceptional quality. The team went above and beyond to deliver results that exceeded our expectations. Highly recommend their professional approach.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 3,
        name: "LARA ATKINSON",
        title: "LARA ATKINSON",
        text: "Innovative solutions that transformed our business processes. Their expertise and dedication made all the difference in achieving our goals efficiently.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 4,
        name: "IAN OWEN",
        title: "IAN OWE",
        text: "Professional, reliable, and results-driven. Working with this team has been a game-changer for our organization. Truly exceptional experience.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 5,
        name: "MICHAEL TEDDY",
        title: "MICHAEL TEDDY",
        text: "Cutting-edge approach with personalized attention. They understood our unique needs and delivered solutions that perfectly aligned with our vision.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
];

const TestimonialCard = ({ testimonial, isCenter, isVisible }) => (
    <div className={`testimonial-item ${isCenter ? 'center' : ''} ${isVisible ? 'visible' : ''}`}>
        <div className="shadow-effect">
            <img
                className="testimonial-img"
                src={testimonial.image}
                alt={testimonial.name}
            />
            <div className="testimonial-title">{testimonial.title}</div>
            <p className="testimonial-text">{testimonial.text}</p>
        </div>
        <div className="testimonial-name">{testimonial.name}</div>
    </div>
);

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    };

    const getVisibleTestimonials = () => {
        const visibleCount = 3;
        const result = [];

        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex - 1 + i + testimonialsData.length) % testimonialsData.length;
            result.push({
                ...testimonialsData[index],
                isCenter: i === 1,
                isVisible: true
            });
        }

        return result;
    };

    return (
        <>
            <section className="testimonials-section">
                <div  data-aos="fade-up"
                    data-aos-duration="3000" className="container">
                    <div className="testimonials-header">
                        <button>testimonials</button>
                        <div className='testimonials-header-title'>What Our Clients Say</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet facilisis lectus, a rutrum lectus lacinia vitae. In auctor aliquam aliquam. Phasellus vel dolor fermentum, placerat dui et, lacinia nibh. Praesent eu dictum tortor. Sed est turpis, pretium et libero aliquam, consectetur laoreet orci. </p>
                    </div>

                    <div className="testimonials-carousel">
                        <button
                            className="carousel-btn prev-btn"
                            onClick={prevSlide}
                            aria-label="Previous testimonial"
                        >
                            &#8249;
                        </button>

                        <div className="testimonials-container">
                            {getVisibleTestimonials().map((testimonial, idx) => (
                                <TestimonialCard
                                    key={`${testimonial.id}-${currentIndex}`}
                                    testimonial={testimonial}
                                    isCenter={testimonial.isCenter}
                                    isVisible={testimonial.isVisible}
                                />
                            ))}
                        </div>

                        <button
                            className="carousel-btn next-btn"
                            onClick={nextSlide}
                            aria-label="Next testimonial"
                        >
                            &#8250;
                        </button>
                    </div>

                    <div className="carousel-dots">
                        {testimonialsData.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
                {/* <div className="bg-effects">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>
                </div> */}
            </section>
        </>
    );
};

export default Testimonials;