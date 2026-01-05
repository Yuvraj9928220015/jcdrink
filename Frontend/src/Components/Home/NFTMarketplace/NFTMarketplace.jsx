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
    
    console.log(handleButtonClick)

    return (
        <>
            <div className={`nft-marketplace ${isLoaded ? 'loaded' : ''}`}>
                <div data-aos="fade-up"
                    data-aos-duration="3000" className="container" id='NFTMarketplace'>
                    <div className="Refreshing-content">
                        <img src="/Refreshing.webp" alt="" />
                        <div className="Refreshing-text">
                            JC Drink isn’t just a drink — it’s full-on desi swag in every sip!
                            From college adda to road trips and gully hangouts — JC Drink brings the ultimate refreshment wala vibe!
                        </div>
                        <div id='Refreshing-prag' className="Refreshing-text">
                            Tangy Orange – Full On Masti, Full On Swag!
                        </div>
                        <div id='Refreshing-prag' className="Refreshing-text">
                            Sweet Lemon – Thandak with a Desi Twist!
                        </div>
                        <div id='Refreshing-prag' className="Refreshing-text">
                            Two Flavours. One Desi Revolution.
                        </div>

                        <div id='Refreshing-prag' className="Refreshing-text">
                            Dhamakedaar fizz, chatpata flavour, aur fun ka full blast!
                        </div>
                        
                        <div id='Refreshing-prag' className="Refreshing-text">
                            Ek sip lo, aur mehsoos karo woh classic refreshment wala sukoon!
                        </div>
                    </div>

                    <div className="content-right">
                        <div className="image-container">
                            <img
                                src="/Main-Banner-2.webp"
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