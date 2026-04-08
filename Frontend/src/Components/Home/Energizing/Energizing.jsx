import { useEffect, useRef } from 'react';
import './Energizing.css';

export default function Energizing() {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force autoplay for iOS
        const forcePlay = async () => {
            try {
                video.muted = true;
                video.defaultMuted = true;
                video.setAttribute('muted', '');
                video.setAttribute('playsinline', '');

                await video.load();
                await new Promise(resolve => setTimeout(resolve, 100));

                const playPromise = video.play();
                if (playPromise !== undefined) {
                    await playPromise;
                }
            } catch (err) {
                // Silent fail, will try on interaction
                const playOnce = () => {
                    video.play().catch(() => { });
                    document.body.removeEventListener('touchstart', playOnce);
                    document.body.removeEventListener('touchend', playOnce);
                };
                document.body.addEventListener('touchstart', playOnce, { once: true, passive: true });
                document.body.addEventListener('touchend', playOnce, { once: true, passive: true });
            }
        };

        // Try immediately
        forcePlay();

        // Try again on page fully loaded
        if (document.readyState !== 'complete') {
            window.addEventListener('load', forcePlay);
            return () => window.removeEventListener('load', forcePlay);
        }
    }, []);

    return (
        <div className="energizing">
            <div className="energizing-video">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    webkit-playsinline="true"
                    className="energizing-video-element"
                >
                    <source src="videoplayback.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="energizing-container">
                <div className="energizing-row">
                    <div className="energizing-col-6">
                        <div className="energizing-content-box">
                            <h1 className="energizing-title">Unleash Your X Factor</h1>
                            <p className='energizing-Subtitle'>No Limits. No Breaks. Just Pure Power.</p>
                            <p className="energizing-description">
                                X Factor Energy Drink isn't just fuel — it's ignition.
                                Packed with explosive caffeine energy,
                                B-Vitamins, and a bold, electrifying flavor, it powers your body and sharpens your mind in every sip. Whether you're crushing workouts, gaming all night, or chasing the next big win, X Factor turns fatigue into fire.
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
                                    <h3>Feel The X Factor Live The Power</h3>
                                    <p>From workouts to wild nights — X Factor gives you the energy to break limits, dominate challenges, and own your zone.</p>
                                </div>
                            </div>
                            <button className="energizing-btn">Learn More</button>
                        </div>
                    </div>

                    <div className="energizing-col-5">
                        <div className="energizing-image-box">
                            <img
                                src="/X-Factor-(2).webp"
                                alt="X Factor Energy Drink"
                                className="energizing-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}