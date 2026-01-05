import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "./Header.css"

export default function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  const slides = [
    {
      mobileImage: '/X-Factor-mobile.jpg',
      desktopImage: '/X-Factor.jpg'
    },
    {
      mobileImage: '/Just-Drink-mobile.jpg',
      desktopImage: '/Just-Drink-Banner.jpg'
    },
    {
      mobileImage: '/Pure-Desi-mobile.jpg',
      desktopImage: '/Pure-Desi-Banner.jpg'
    },
    {
      mobileImage: '/SugarFree-Banner.webp',
      desktopImage: '/Main-Banner-5.webp'
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div data-aos="fade-up" className="Header-slider-container">
        <div className="Header-slider-wrapper">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`Header-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img
                src={isDesktop ? slide.desktopImage : slide.mobileImage}
                alt={`Slide ${index + 1}`}
                className="Header-slide-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />

              <div className="Header-slide-fallback">
                Slide {index + 1}
              </div>

              <div className="Header-slide-overlay"></div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="nav-arrow nav-arrow-left"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="nav-arrow nav-arrow-right"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        <div className="dot-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`dot ${index === currentSlide ? 'dot-active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="Header-content-container">
          <div className="Header-content-wrapper">
            <div className="Header-content-grid">
              <div className="Header-content-section">
                {/* Add your content here */}
              </div>
            </div>
          </div>
        </div>

        <div className="Header-slide-counter">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </>
  );
}