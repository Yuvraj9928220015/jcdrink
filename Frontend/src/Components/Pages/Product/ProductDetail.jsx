// src/components/ProductDetail/ProductDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import './ProductDetail.css';

const API_URL = 'http://localhost:5000';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedTab, setSelectedTab] = useState('description');
    const [selectedSize, setSelectedSize] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);

    // Scroll to top whenever the component mounts or id changes
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [id]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!id || id.trim() === '') {
                    throw new Error('Invalid product ID');
                }

                console.log('Fetching product with ID:', id);

                const possibleEndpoints = [
                    `${API_URL}/api/products/${id}`,
                    `${API_URL}/api/product/${id}`,
                    `${API_URL}/products/${id}`,
                    `${API_URL}/product/${id}`
                ];

                let response = null;
                let successfulEndpoint = null;

                for (const endpoint of possibleEndpoints) {
                    try {
                        console.log('Trying endpoint:', endpoint);
                        response = await fetch(endpoint);
                        if (response.ok) {
                            successfulEndpoint = endpoint;
                            console.log('Success with endpoint:', endpoint);
                            break;
                        }
                    } catch (err) {
                        console.log('Failed endpoint:', endpoint, err);
                        continue;
                    }
                }

                if (!response || !response.ok) {
                    try {
                        console.log('Trying to fetch all products...');
                        const allProductsResponse = await fetch(`${API_URL}/api/products`);
                        if (allProductsResponse.ok) {
                            const allProducts = await allProductsResponse.json();
                            console.log('All products:', allProducts);
                            const foundProduct = allProducts.find(p =>
                                (p._id && p._id.toString() === id) ||
                                (p.id && p.id.toString() === id)
                            );

                            if (foundProduct) {
                                console.log('Found product:', foundProduct);
                                setProduct(foundProduct);

                                // Set initial size and price
                                if (foundProduct.priceVariations && foundProduct.priceVariations.length > 0) {
                                    setSelectedSize(foundProduct.priceVariations[0].size);
                                    setCurrentPrice(foundProduct.priceVariations[0].price);
                                } else {
                                    setCurrentPrice(foundProduct.price || 0);
                                }
                                return;
                            }
                        }
                    } catch (err) {
                        console.log('Failed to fetch all products:', err);
                    }

                    throw new Error(`Product not found`);
                }

                const data = await response.json();
                console.log('Product data:', data);
                setProduct(data);

                // Set initial size and price
                if (data.priceVariations && data.priceVariations.length > 0) {
                    setSelectedSize(data.priceVariations[0].size);
                    setCurrentPrice(data.priceVariations[0].price);
                } else {
                    setCurrentPrice(data.price || 0);
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(`Failed to load product: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        } else {
            setError('No product ID provided');
            setLoading(false);
        }
    }, [id]);

    const handleSizeChange = (e) => {
        const size = e.target.value;
        setSelectedSize(size);

        if (product && product.priceVariations) {
            const variation = product.priceVariations.find(v => v.size === size);
            if (variation) {
                setCurrentPrice(variation.price);
            }
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setQuantity(Math.max(1, value));
    };

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handleAddToCart = () => {
        if (!product) return;

        const productToAdd = {
            ...product,
            quantity,
            selectedSize: selectedSize,
            price: currentPrice
        };

        addToCart(productToAdd);
        alert(`${quantity} x ${product.title} ${selectedSize ? `(${selectedSize})` : ''} added to cart!`);
    };

    const handleRetry = () => {
        window.location.reload();
    };

    const handleGoBack = () => {
        navigate('/Product');
    };

    const getPriceRange = () => {
        if (!product) return '₹0.00';

        if (!product.priceVariations || product.priceVariations.length === 0) {
            return `₹${Number(product.price || 0).toFixed(2)}`;
        }

        const prices = product.priceVariations.map(v => Number(v.price));
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        if (min === max) {
            return `₹${min.toFixed(2)}`;
        }
        return `₹${min.toFixed(2)} - ₹${max.toFixed(2)}`;
    };

    if (loading) {
        return (
            <div className="product-detail-wrapper">
                <div className="detail-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-detail-wrapper">
                <div className="detail-error">
                    <h3>Error Loading Product</h3>
                    <p>{error}</p>
                    <div className="error-actions">
                        <button onClick={handleRetry} className="retry-btn">
                            Retry
                        </button>
                        <button onClick={handleGoBack} className="back-btn">
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-wrapper">
                <div className="detail-error">
                    <h3>Product Not Found</h3>
                    <p>The product you're looking for doesn't exist.</p>
                    <button onClick={handleGoBack} className="back-btn">
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="product-detail-wrapper">
                <div className="product-detail-container">
                    {/* Breadcrumb */}

                    {/* Main Product Section */}
                    <div className="product-main-section">
                        {/* Product Image */}
                        <div className="productDetail-image-container">
                            <img
                                src={product.image ? `${API_URL}/${product.image.replace(/\\/g, '/')}` : 'https://via.placeholder.com/500x500?text=No+Image'}
                                alt={product.title || 'Product'}
                                className="product-image"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/500x500?text=Image+Error';
                                }}
                            />
                        </div>

                        {/* Product Info */}
                        <div className="product-info-container">
                            <nav className="product-breadcrumb">
                                <span>{product.category || 'Category'}</span>
                                <span> / </span>
                                <span className="current">{product.title}</span>
                            </nav>
                            <h1 className="productDetail-title">{product.title || 'Product Title'}</h1>

                            <div className="product-description">
                                <p>{product.description || "This practice banner consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new!"}</p>
                            </div>

                            <div className="product-price-section">
                                <div className="product-price">
                                    ₹{Number(currentPrice).toFixed(2)}
                                </div>
                            </div>

                            {/* Size Selection - Only show if priceVariations exist */}
                            {product.priceVariations && product.priceVariations.length > 0 && (
                                <div className="bottle-pack-section">
                                    <label className="pack-label">
                                        SELECT SIZE
                                    </label>
                                    <select
                                        className="pack-select"
                                        value={selectedSize}
                                        onChange={handleSizeChange}
                                    >
                                        {product.priceVariations.map((variation) => (
                                            <option key={variation.size} value={variation.size}>
                                                {variation.size} - ₹{Number(variation.price).toFixed(2)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Quantity and Add to Cart */}
                            <div className="quantity-cart-section">
                                <div className="quantity-control">
                                    <button
                                        className="qty-btn minus"
                                        onClick={decrementQuantity}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        className="qty-input"
                                    />
                                    <button
                                        className="qty-btn plus"
                                        onClick={incrementQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                                <button className="add-to-cart-button" onClick={handleAddToCart}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                                        <circle cx="9" cy="21" r="1" />
                                        <circle cx="20" cy="21" r="1" />
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                    </svg>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="product-tabs-section">
                        <div className="tabs-header">
                            <button
                                className={`tab-button ${selectedTab === 'description' ? 'active' : ''}`}
                                onClick={() => setSelectedTab('description')}
                            >
                                Description
                            </button>
                            <button
                                className={`tab-button ${selectedTab === 'additional' ? 'active' : ''}`}
                                onClick={() => setSelectedTab('additional')}
                            >
                                Additional information
                            </button>
                            <button
                                className={`tab-button ${selectedTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setSelectedTab('reviews')}
                            >
                                Reviews (0)
                            </button>
                        </div>

                        <div className="tab-content-area">
                            {selectedTab === 'description' && (
                                <div className="tab-content">
                                    <h3>Product Description</h3>
                                    <p>{product.description || "A drink that needs no introduction. There are only a handful of experiences that tie generations together; cheering for your favourite cricket team or bonding over old 90's movies. This product has been part of those shared experiences for decades."}</p>

                                    {product.priceVariations && product.priceVariations.length > 0 && (
                                        <>
                                            <h4 style={{ marginTop: '24px' }}>Available Sizes & Pricing:</h4>
                                            <ul className="product-specs">
                                                {product.priceVariations.map((variation) => (
                                                    <li key={variation.size}>
                                                        <span>{variation.size}: </span> ₹{Number(variation.price).toFixed(2)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    <h4 style={{ marginTop: '24px' }}>Product Details:</h4>
                                    <ul className="product-specs">
                                        <li><span>Category: </span> {product.category || 'Beverage'}</li>
                                        <li><span>Product ID: </span> {product._id ? product._id.slice(-8).toUpperCase() : 'N/A'}</li>
                                        {product.priceVariations && product.priceVariations.length > 0 && (
                                            <li><span>Size Options: </span> {product.priceVariations.length} available</li>
                                        )}
                                    </ul>
                                </div>
                            )}

                            {selectedTab === 'additional' && (
                                <div className="tab-content">
                                    <h3>Additional Information</h3>
                                    <table className="additional-info-table">
                                        <tbody>
                                            <tr>
                                                <th>Category</th>
                                                <td>{product.category || 'Beverage'}</td>
                                            </tr>
                                            {product.priceVariations && product.priceVariations.length > 0 ? (
                                                <>
                                                    <tr>
                                                        <th>Price Range</th>
                                                        <td>{getPriceRange()}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Available Sizes</th>
                                                        <td>{product.priceVariations.map(v => v.size).join(', ')}</td>
                                                    </tr>
                                                </>
                                            ) : (
                                                <tr>
                                                    <th>Price</th>
                                                    <td>₹{Number(product.price || 0).toFixed(2)}</td>
                                                </tr>
                                            )}
                                            <tr>
                                                <th>SKU</th>
                                                <td>{product._id ? product._id.slice(-8).toUpperCase() : 'N/A'}</td>
                                            </tr>
                                            <tr>
                                                <th>Product ID</th>
                                                <td>{product._id || 'N/A'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {selectedTab === 'reviews' && (
                                <div className="tab-content">
                                    <div className="no-reviews">
                                        <h3>Reviews</h3>
                                        <p>There are no reviews yet.</p>
                                        <div className="review-form">
                                            <h4>Be the first to review "{product.title}"</h4>
                                            <p>Your email address will not be published. Required fields are marked *</p>
                                            <form onSubmit={(e) => e.preventDefault()}>
                                                <div className="rating-select">
                                                    <label>Your rating *</label>
                                                    <div className="stars">
                                                        <span>⭐</span>
                                                        <span>⭐</span>
                                                        <span>⭐</span>
                                                        <span>⭐</span>
                                                        <span>⭐</span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Your review *</label>
                                                    <textarea rows="5" placeholder="Write your review here..."></textarea>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Name *</label>
                                                        <input type="text" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Email *</label>
                                                        <input type="email" />
                                                    </div>
                                                </div>
                                                <div className="checkbox-group">
                                                    <input type="checkbox" id="save-info" />
                                                    <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
                                                </div>
                                                <button type="submit" className="submit-review-btn">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}