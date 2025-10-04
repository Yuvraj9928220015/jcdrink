import './Nutrition.css';

export default function Nutrition() {
    return (
        <>
            <div className="Nutrition">
                <div className="Energizing-container-main">
                    <div className="Energizing-container-main-title">
                        Nutrition That Packs a Punch!
                    </div>
                    <div className="Energizing-container-main-des">
                        Discover the perfect blend of taste and nutrition in every sip
                    </div>
                </div>

                <div className="container">
                    <div className="row align-items-center">
                        <div data-aos="zoom-in" className="col-lg-5 col-md-5 col-sm-12 col-12">
                            <div className="Nutrition-Box-image">
                                <div className="image-glow"></div>
                                <img src="/Main-Banner-1.png" alt="Citrus Blast Energy Drink" />
                                <div className="floating-elements">
                                    <div className="floating-dot dot-1"></div>
                                    <div className="floating-dot dot-2"></div>
                                    <div className="floating-dot dot-3"></div>
                                </div>
                            </div>
                        </div>

                        <div data-aos="fade-right" className="col-lg-7 col-md-7 col-sm-12 col-12">
                            <div className="Nutrition-Box">
                                <div className="Nutrition-Box-Subtitle">
                                    <button className="subtitle-btn">
                                        <span>Nutrition</span>
                                        <div className="btn-shine"></div>
                                    </button>
                                </div>

                                <div className="Nutrition-Box-title">
                                    <span className="title-word">citrus</span>
                                    <span className="title-word highlight">blast</span>
                                    <span className="title-word">flavor</span>
                                </div>

                                <div className="Nutrition-Box-Prag">
                                    Experience the ultimate energy boost with our carefully crafted citrus blend.
                                    Packed with essential nutrients and natural flavors, this refreshing drink
                                    delivers sustained energy and incredible taste in every serving.
                                </div>

                                <div className="nutrition-stats">
                                    <div className="row g-3">
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div className="Citrus calories-card">
                                                <button>Energy</button>
                                                <span>76 kcal</span>
                                                <div className="card-glow"></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div className="Citrus caffeine-card">
                                                <button>Carbohydrate</button>
                                                <span>20g</span>
                                                <div className="card-glow"></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <div className="Citrus carbs-card">
                                                <button>Sugar</button>
                                                <span>80g</span>
                                                <div className="card-glow"></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div className="Citrus calories-card">
                                                <button>Protein</button>
                                                <span> 0g</span>
                                                <div className="card-glow"></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                            <div className="Citrus caffeine-card">
                                                <button>Fat</button>
                                                <span>0g</span>
                                                <div className="card-glow"></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                            <div className="Citrus carbs-card">
                                                <button>Sodium</button>
                                                <span>12.5%</span>
                                                <div className="card-glow"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="disclaimer">
                                        <div className="disclaimer-icon">ℹ️</div>
                                        <span>No artificial drama – just bold taste, fizz, and fun. </span>
                                    </div>
                                </div>

                                {/* <div className='See-More'>
                                    <button className="see-more-btn">
                                        <span>See Complete Nutrition Facts</span>
                                        <div className="btn-arrow">→</div>
                                        <div className="btn-ripple"></div>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-effects">
                    <div className="gradient-orb Nutrition-1"></div>
                    <div className="gradient-orb Nutrition-2"></div>
                    <div className="gradient-orb Nutrition-3"></div>
                    <div className="gradient-orb Nutrition-4"></div>
                    <div className="particle-system">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className={`particle particle-${i + 1}`}></div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}