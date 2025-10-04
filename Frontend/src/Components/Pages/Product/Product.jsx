// src/components/Product/Product.jsx

import { useState, useEffect } from 'react';
import { useCart } from '../Cart/CartContext';
import { Link } from 'react-router-dom';
import "./Product.css";

const API_URL = 'http://localhost:5000';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());

    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Fetching products from:', `${API_URL}/api/products`);

            const response = await fetch(`${API_URL}/api/products`);

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Products data:', data);

            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(`Failed to load products: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleWishlist = (productId) => {
        const newWishlist = new Set(wishlist);
        if (newWishlist.has(productId)) {
            newWishlist.delete(productId);
        } else {
            newWishlist.add(productId);
        }
        setWishlist(newWishlist);
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        console.log('Added to cart:', product);
    };

    const handleWishlistClick = (e, productId) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
    }

    if (loading) {
        return (
            <div className="Product-container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="Product-container">
                <div className="error">
                    <h3>Error Loading Products</h3>
                    <p>{error}</p>
                    <p>Please make sure your backend server is running on {API_URL}</p>
                    <button onClick={fetchProducts} style={{
                        marginTop: '16px', padding: '10px 20px', background: '#3b82f6', color: 'white',
                        border: 'none', borderRadius: '8px', cursor: 'pointer'
                    }}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="Product-container">
                <div className="Product-container-content">
                    <div className="Product-container-content-title">Products</div>
                    <div className="Product-container-content-des">Browse our collection of amazing products.</div>
                </div>
                <div className="products-container">
                    {products.length === 0 ? (
                        <div className="error">
                            <p>No products found.</p>
                        </div>
                    ) : (
                        <div className='products-grid'>
                            {products.map((product) => (
                                <Link
                                    to={`/product/${product._id || product.id}`}
                                    key={product._id || product.id}
                                    className="product-item-link"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className="product-item">
                                        <div className="product-card">
                                            <button
                                                className={`wishlist-btn ${wishlist.has(product._id || product.id) ? 'active' : ''}`}
                                                onClick={(e) => handleWishlistClick(e, product._id || product.id)}
                                                aria-label="Add to wishlist"
                                            />
                                            <div className="product-image-container">
                                                <img
                                                    src={product.image ? `${API_URL}/${product.image.replace(/\\/g, '/')}` : 'https://via.placeholder.com/300x300?text=No+Image'}
                                                    alt={product.title || 'Product'}
                                                    className="product-image"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x300?text=Image+Error';
                                                    }}
                                                />
                                            </div>
                                            <div className="product-info">
                                                <div className="product-container-category">
                                                    {product.category || 'Uncategorized'}
                                                </div>
                                                <h3 className="product-container-title">
                                                    {product.title || 'Untitled Product'}
                                                </h3>
                                                <div className="product-bottom">
                                                    <span className="price">
                                                        ₹{Number(product.price || 0).toFixed(2)}
                                                    </span>
                                                    <button
                                                        className="add-to-cart"
                                                        onClick={(e) => handleAddToCart(e, product)}
                                                    >
                                                      <a href="">  Add to Cart</a>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}