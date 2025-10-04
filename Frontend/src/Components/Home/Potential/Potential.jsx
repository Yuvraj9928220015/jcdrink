import "./Potential.css"

function Potential() {
    return (
        <>
            <div className="Potential">
                <div className="banner-container">
                    <div className="text-section">
                        <div className="text-content">
                            <div className="text-content-image">
                                <img src="/everyCelebration.png" alt="" />
                            </div>
                        </div>
                    </div>

                    {/* Red outlined section with marquee */}
                    <div className="marquee-section">
                        <div className="marquee-content">
                            <div className="main-marquee">
                                <div className="players-container">
                                    <marquee scrolldelay="5" behavior="scroll" direction="left" scrollamount="15">
                                        <div className="players-row">
                                            <img src="marquee-1.jpg" alt="Player 1" className="player-img" />
                                            <img src="marquee-3.jpg" alt="Player 2" className="player-img" />
                                            <img src="marquee-2.jpg" alt="Player 3" className="player-img" />
                                            <img src="marquee-4.jpg" alt="Player 4" className="player-img" />
                                        </div>
                                    </marquee>
                                    <marquee behavior="" direction=""></marquee>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-effects">
                    <div className="gradient-orb Potential-1"></div>
                    <div className="gradient-orb Potential-2"></div>
                    <div className="gradient-orb Potential-3"></div>
                    <div className="gradient-orb Potential-4"></div>
                    <div className="particle-system">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className={`particle particle-${i + 1}`}></div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Potential;