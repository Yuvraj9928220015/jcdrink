import React, { useState, useEffect } from 'react';
import './NFTMarketplace.css';

export default function NFTMarketplace() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setIsLoaded(true);
        }, 100);

        const timer2 = setTimeout(() => {
            setStatsVisible(true);
        }, 1500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const stats = [
        { value: '27k+', label: 'Art works' },
        { value: '20k+', label: 'Auctions' },
        { value: '7k+', label: 'Artists' }
    ];

    const handleButtonClick = (e) => {
        e.target.classList.add('button-clicked');
        setTimeout(() => {
            e.target.classList.remove('button-clicked');
        }, 300);
    };

    return (
        <>
            <div className={`nft-marketplace ${isLoaded ? 'loaded' : ''}`}>
                <div data-aos="fade-up"
                    data-aos-duration="3000" className="container" id='NFTMarketplace'>
                    <div className="Refreshing-content">
                        <img src="/Refreshing.png" alt="" />
                        <div className="Refreshing-text">
                            Welcome to JC Drinks—a world of flavor, energy, and joy in every bottle. We believe refreshment should be simple, fun, and made for everyone. Our drinks are crafted to brighten your day, fuel your moments, and keep you smiling.
                        </div>
                    </div>

                    <div className="content-right">
                        <div className="image-container">
                            <img
                                src="/Main-Banner-2.png"
                                alt="Digital Art NFT"
                                className="nft-image image-loaded"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=600&fit=crop&crop=center";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}