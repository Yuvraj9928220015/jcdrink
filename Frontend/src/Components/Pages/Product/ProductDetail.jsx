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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!id || id.trim() === '') {
                    throw new Error('Invalid product ID');
                }

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
                        response = await fetch(endpoint);
                        if (response.ok) {
                            successfulEndpoint = endpoint;
                            break;
                        }
                    } catch (err) {
                        continue;
                    }
                }

                if (!response || !response.ok) {
                    try {
                        const allProductsResponse = await fetch(`${API_URL}/api/products`);
                        if (allProductsResponse.ok) {
                            const allProducts = await allProductsResponse.json();
                            const foundProduct = allProducts.find(p =>
                                (p._id && p._id.toString() === id) ||
                                (p.id && p.id.toString() === id)
                            );

                            if (foundProduct) {
                                setProduct(foundProduct);
                                return;
                            }
                        }
                    } catch (err) {
                        console.log('Failed to fetch all products:', err);
                    }

                    throw new Error(`Product not found`);
                }

                const data = await response.json();
                setProduct(data);
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
        addToCart({ ...product, quantity });
        alert(`${quantity} x ${product.title} added to cart!`);
    };

    const handleRetry = () => {
        window.location.reload();
    };

    const handleGoBack = () => {
        navigate('/Product');
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
        <div className="product-detail-wrapper">
            <div className="product-detail-container">

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
                        <nav className="product-breadcrumb-mobile">
                            <Link to="/">Home</Link>
                            <span>/</span>
                            <Link to="/Product">{product.category || 'Energy Drink'}</Link>
                            <span>/</span>
                            <span>{product.title}</span>
                        </nav>

                        <h1 className="productDetail-title">{product.title || 'Energy Drink'}</h1>

                        <div className="product-description">
                            <p>{product.description || "This practice banner consists of short paragraphs about interesting subjects. Find fun keyboard typing practice—and learn something new! Our paragraph practice is great typing practice for essays, research, emails, and more for school and work."}</p>
                        </div>

                        <div className="product-price">
                            ₹{Number(product.price || 0).toFixed(2)}
                        </div>

                        {/* Bottle Pack Selection */}
                        <div className="bottle-pack-section">
                            <label className="pack-label">BOTTLE PACK</label>
                            <select className="pack-select">
                                <option value="">Choose an option</option>
                                <option value="1">Single Bottle</option>
                                <option value="6">6 Pack</option>
                                <option value="12">12 Pack</option>
                                <option value="24">24 Pack</option>
                            </select>
                        </div>

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
                                Add to cart
                            </button>
                        </div>

                        {/* Wholesale Query Button */}
                        <button className="wholesale-btn">Whole Sale Query</button>
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
                                <p>{product.description || "A drink that needs no introduction. There are only a handful of experiences that tie generations together; cheering for your favourite cricket team or bonding over old 90’s movies. Coca-Cola has been part of those shared experiences for decades. In over 136 years of its existence, Coca-Cola has narrated a tale that transcends geographies and unites cultures, becoming a symbol of refreshment worldwide."}</p>
                                <ul className="product-specs">
                                    <li><span>Brand: </span> {product.brand || 'Coca Cola'}</li>
                                    <li><span>Pack Size: </span> 330 ml x 24 cans</li>
                                    <li><span>MRP: </span> 79 Rs/can</li>
                                    <li><span>Gst: </span> 12%</li>
                                    <li><span>Packaging: </span> Can</li>
                                    <li><span>Manufacturer Details: </span> HINDUSTAN COCA COLA BEVERAGES PVT. LTD. SURVEY NO. 48/2, POST KUDUS, TALUKA WADA, DISTRICT PALGHAR- 421 312, MAHARASHTRA</li>
                                </ul>
                            </div>
                        )}

                        {selectedTab === 'additional' && (
                            <div className="tab-content">
                                <table className="additional-info-table">
                                    <tbody>
                                        <tr>
                                            <th>Category</th>
                                            <td>{product.category || 'Energy Drink'}</td>
                                        </tr>
                                        <tr>
                                            <th>Brand</th>
                                            <td>{product.brand || 'Generic'}</td>
                                        </tr>
                                        <tr>
                                            <th>Price</th>
                                            <td>₹{Number(product.price || 0).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <th>SKU</th>
                                            <td>{product._id ? product._id.slice(-6).toUpperCase() : 'N/A'}</td>
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
                                        <form>
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
    );
}