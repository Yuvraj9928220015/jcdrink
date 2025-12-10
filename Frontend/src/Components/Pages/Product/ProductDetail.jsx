// src/components/ProductDetail/ProductDetail.jsx
import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import './ProductDetail.css';

const API_BASE_URL = 'https://api.jcdrink.com';
const API_URL = `${API_BASE_URL}/api`;

const createSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedTab, setSelectedTab] = useState('description');
    const [selectedSize, setSelectedSize] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);

    // Helper function to get correct image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return 'https://via.placeholder.com/300x300?text=No+Image';
        }

        if (imagePath.startsWith('http')) {
            return imagePath;
        }

        const cleanPath = imagePath.replace(/\\/g, '/').replace(/^\/+/, '');
        return `${API_BASE_URL}/${cleanPath}`;
    };

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
                    throw new Error('Invalid product identifier');
                }

                console.log('Fetching product with slug:', id);

                // Get all products
                const allProductsResponse = await fetch(`${API_URL}/products`);

                if (!allProductsResponse.ok) {
                    throw new Error(`Failed to fetch products: ${allProductsResponse.status}`);
                }

                const allProducts = await allProductsResponse.json();
                console.log('All products fetched:', allProducts.length);

                let foundProduct;

                if (location.state?.productId) {
                    foundProduct = allProducts.find(p =>
                        (p._id && p._id.toString() === location.state.productId) ||
                        (p.id && p.id.toString() === location.state.productId)
                    );
                } else {
                    foundProduct = allProducts.find(p => {
                        const productSlug = createSlug(p.title || '');
                        return productSlug === id;
                    });
                }

                if (!foundProduct) {
                    throw new Error('Product not found');
                }

                console.log('Found product:', foundProduct);
                setProduct(foundProduct);

                if (foundProduct.priceVariations && foundProduct.priceVariations.length > 0) {
                    setSelectedSize(foundProduct.priceVariations[0].size);
                    setCurrentPrice(foundProduct.priceVariations[0].price);
                } else {
                    setCurrentPrice(foundProduct.price || 0);
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
            setError('No product identifier provided');
            setLoading(false);
        }
    }, [id, location.state]);

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
            <Helmet>
                <title>{product?.title} – JC Drink</title>

                <meta
                    name="description"
                    content={
                        product?.shortDescription
                            ? product.shortDescription
                            : `Explore ${product?.title} by JC Drink with refreshing taste, pure ingredients, and complete nutritional details.`
                    }
                />

                <link rel="canonical" href={`https://jcdrink.com/product/${product?._id}`} />
            </Helmet>

            <div className="product-detail-wrapper">
                <div className="product-detail-container">
                    {/* Main Product Section */}
                    <div className="product-main-section">
                        {/* Product Image */}
                        <div className="productDetail-image-container">
                            <img
                                src={getImageUrl(product.image)}
                                alt={product.title || 'Product'}
                                className="product-image"
                                onError={(e) => {
                                    console.log('Image failed to load:', product.image);
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
                                    <h3 id='Product-Details'>Product Description</h3>
                                    <p>{product.description || "A drink that needs no introduction. There are only a handful of experiences that tie generations together; cheering for your favourite cricket team or bonding over old 90's movies. This product has been part of those shared experiences for decades."}</p>

                                    {product.priceVariations && product.priceVariations.length > 0 && (
                                        <>
                                            <h4 id='Product-Details' style={{ marginTop: '24px' }}>Available Sizes & Pricing:</h4>
                                            <ul className="product-specs">
                                                {product.priceVariations.map((variation) => (
                                                    <li key={variation.size}>
                                                        <span>{variation.size}: </span> ₹{Number(variation.price).toFixed(2)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    <h4 id='Product-Details' style={{ marginTop: '24px' }}>Product Details:</h4>
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
                                    <h3 id='Product-Details'>Additional Information</h3>
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