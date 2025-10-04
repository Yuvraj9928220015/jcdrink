import React, { useState } from 'react';
import "./Main.css"

const Main = () => {
    const [selectedOptions, setSelectedOptions] = useState({
        product1: '1 BOTTLE',
        product2: '1 BOTTLE',
        product3: '1 BOTTLE'
    });

    const productData = {
        product1: {
            name: 'VITAMIN BOOST',
            image: '/Cold-1.jpg',
            options: {
                '1 BOTTLE': {
                    price: '24.99',
                },
                '3 BOTTLES': {
                    price: '69.99',
                }
            }
        },
        product2: {
            name: 'ENERGY PLUS',
            image: '/Cold-2.jpg',
            options: {
                '1 BOTTLE': {
                    price: '29.99'
                },
                '3 BOTTLES': {
                    price: '79.99',
                }
            }
        },
        product3: {
            name: 'NATURAL CARE',
            image: '/Cold-3.jpg',
            options: {
                '1 BOTTLE': {
                    price: '22.99',
                },
                '3 BOTTLES': {
                    price: '64.99',
                }
            }
        },
    };

    const handleOptionSelect = (productId, option) => {
        setSelectedOptions(prev => ({
            ...prev,
            [productId]: option
        }));
    };

    const handleShopClick = (productId) => {
        const product = productData[productId];
        const selectedOption = selectedOptions[productId];
        console.log(`Product: ${product.name} - Selected: ${selectedOption} - Price: $${product.options[selectedOption].price}`);
    };

    const renderProductCard = (productId, product) => (
        <div key={productId} className="vitamin-card">
            <div className="decorative-elements">
                <div className="decorative-circle decorative-circle-1"></div>
                <div className="decorative-circle decorative-circle-2"></div>
                <div className="decorative-circle decorative-circle-3"></div>
                <div className="decorative-circle decorative-circle-4"></div>
            </div>

            <div className="product-title">
                {product.name}
            </div>

            {/* Selection Buttons */}
            <div className="selection-buttons">
                <button
                    onClick={() => handleOptionSelect(productId, '1 BOTTLE')}
                    className={`selection-btn ${selectedOptions[productId] === '1 BOTTLE' ? 'active' : ''}`}
                >
                    1 CAN
                </button>
                <button
                    onClick={() => handleOptionSelect(productId, '3 BOTTLES')}
                    className={`selection-btn ${selectedOptions[productId] === '3 BOTTLES' ? 'active' : ''}`}
                >
                    3 PACK
                </button>
            </div>

            {/* Price Section */}
            <div className="price-section">
                <div className="price">
                    ${product.options[selectedOptions[productId]].price} USD
                </div>
            </div>

            {/* Product Images */}
            <div className="product-images">
                <div className="bottle-container">
                    <div className="bottle bottle-main">
                        <img src={product.image} alt={product.name} />
                    </div>
                </div>
            </div>

            {/* Shop Button */}
            <button
                className="shop-button"
                onClick={() => handleShopClick(productId)}
            >
                <div className="shop-button-content">
                    <a href="/Product"><span>GO SHOP</span></a>
                    <svg className="arrow-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </button>
        </div>
    );

    return (
        <div className="vitamin-container">
            <div className="vitamin-container-title">Product</div>
            <div className="vitamin-container-des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, explicabo.</div>

            <div className="cards-grid">
                {Object.entries(productData).map(([productId, product]) =>
                    renderProductCard(productId, product)
                )}
            </div>
        </div>
    );
};

export default Main;