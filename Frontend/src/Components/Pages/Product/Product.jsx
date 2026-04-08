// src/components/Product/Product.jsx
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from 'react';
import { useCart } from '../Cart/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import "./Product.css";

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

export default function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());

    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            // Use the correct endpoint with /api
            console.log('Fetching products from:', `${API_URL}/products`);

            const response = await fetch(`${API_URL}/products`);

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

    const getPriceRange = (product) => {
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

    const handleProductClick = (product) => {
        const slug = createSlug(product.title);
        navigate(`/product/${slug}`, { state: { productId: product._id || product.id } });
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        if (product.priceVariations && product.priceVariations.length > 0) {
            const slug = createSlug(product.title);
            navigate(`/product/${slug}`, { state: { productId: product._id || product.id } });
            return;
        }

        addToCart(product);
        console.log('Added to cart:', product);
        alert(`${product.title} added to cart!`);
    };

    const handleWishlistClick = (e, productId) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
    };

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
            <Helmet>
                <title>JC Drink Energy Drink | Fuel Your Energy</title>
                <meta
                    name="description"
                    content="Explore JC Drink’s premium range of cold drinks, fruit beverages, and refreshing natural flavors made with pure ingredients. Enjoy delicious taste and true refreshment."
                />
                <link rel="canonical" href="https://jcdrink.com/product" />
            </Helmet>

            <div className="Product-container">
                <div className="Product-container-content">
                    <h1 className="about-heading">Our Products</h1>
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
                                <div
                                    key={product._id || product.id}
                                    className="product-item"
                                    onClick={() => handleProductClick(product)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="product-card">
                                        <button
                                            className={`wishlist-btn ${wishlist.has(product._id || product.id) ? 'active' : ''}`}
                                            onClick={(e) => handleWishlistClick(e, product._id || product.id)}
                                            aria-label="Add to wishlist"
                                        />
                                        <div className="product-image-container">
                                            <img
                                                src={getImageUrl(product.image)}
                                                alt={product.title || 'Product'}
                                                className="product-image"
                                                onError={(e) => {
                                                    console.log('Image failed to load:', product.image);
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
                                                    {getPriceRange(product)}
                                                </span>
                                                {product.priceVariations && product.priceVariations.length > 0 && (
                                                    <div className="sizes-available">
                                                        {product.priceVariations.length} size{product.priceVariations.length !== 1 ? 's' : ''} available
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                className="add-to-cart"
                                                onClick={(e) => handleAddToCart(e, product)}
                                            >
                                                {product.priceVariations && product.priceVariations.length > 0
                                                    ? 'View Details'
                                                    : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}