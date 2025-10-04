// src/App.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductData.css';

const API_URL = 'http://localhost:5000';

export default function ProductData() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({
        id: null,
        title: '',
        description: '',
        price: '',
        category: '',
        image: null
    });

    useEffect(() => {
        // Check if user is already logged in (session storage)
        const authStatus = sessionStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
            fetchProducts();
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated]);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        setLoginError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, loginData);
            
            if (response.data.success) {
                setIsAuthenticated(true);
                sessionStorage.setItem('isAuthenticated', 'true');
                setLoginError('');
            } else {
                setLoginError('Invalid email or password');
            }
        } catch (error) {
            setLoginError('Invalid email or password');
            console.error("Login error:", error);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAuthenticated');
        setLoginData({ email: '', password: '' });
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        setCurrentProduct({ ...currentProduct, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', currentProduct.title);
        formData.append('description', currentProduct.description);
        formData.append('price', currentProduct.price);
        formData.append('category', currentProduct.category);
        if (currentProduct.image) {
            formData.append('image', currentProduct.image);
        }

        try {
            if (isEditing) {
                await axios.put(`${API_URL}/api/products/${currentProduct.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await axios.post(`${API_URL}/api/products`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error.response ? error.response.data : error.message);
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setShowForm(true);
        setCurrentProduct({
            id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            image: null
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${API_URL}/api/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setShowForm(false);
        setCurrentProduct({ id: null, title: '', description: '', price: '', category: '', image: null });
        const imageInput = document.getElementById('image-input');
        if (imageInput) {
            imageInput.value = null;
        }
    };

    const openAddForm = () => {
        setShowForm(true);
        setIsEditing(false);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };

    const closeProductModal = () => {
        setShowProductModal(false);
        setSelectedProduct(null);
    };

    // Login Form Component
    if (!isAuthenticated) {
        return (
            <div className="login-container">
                <div className="login-box">
                    <div className="login-header">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <h2>Login to Continue</h2>
                        <p>Enter your credentials to access the dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        {loginError && (
                            <div className="login-error">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {loginError}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button type="submit" className="btn-login">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                <polyline points="10 17 15 12 10 7" />
                                <line x1="15" y1="12" x2="3" y2="12" />
                            </svg>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Main Product Dashboard (same as before)
    return (
        <>
            <div className="ProductData">
                {/* Header */}
                <header className="ProductData-header">
                    <div className="container">
                        <div className="header-content">
                            <div>
                                <h1>Cold Drink Products</h1>
                                <p>Manage your beverage inventory with style</p>
                            </div>
                            <button onClick={handleLogout} className="btn-logout">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <div className="container">
                    {/* Add Product Button */}
                    <button onClick={openAddForm} className="add-product-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add New Product
                    </button>

                    {/* Modal for Add/Edit Form */}
                    <div className={`modal-overlay ${!showForm ? 'hidden' : ''}`}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                                <button onClick={resetForm} className="close-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="productData-form">
                                <div className="form-group">
                                    <label className="form-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14,2 14,8 20,8" />
                                        </svg>
                                        Product Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Enter product title"
                                        value={currentProduct.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14,2 14,8 20,8" />
                                        </svg>
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        placeholder="Enter product description"
                                        value={currentProduct.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="12" y1="1" x2="12" y2="23" />
                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                            </svg>
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="0.00"
                                            value={currentProduct.price}
                                            onChange={handleInputChange}
                                            required
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                                <line x1="7" y1="7" x2="7.01" y2="7" />
                                            </svg>
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            name="category"
                                            placeholder="e.g., Cola, Juice"
                                            value={currentProduct.category}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Product Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image-input"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn-primary">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20,6 9,17 4,12" />
                                        </svg>
                                        {isEditing ? 'Update Product' : 'Add Product'}
                                    </button>
                                    <button type="button" onClick={resetForm} className="btn-secondary">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Product View Modal */}
                    <div className={`modal-overlay ${!showProductModal ? 'hidden' : ''}`}>
                        <div className="modal-content product-view-modal">
                            <div className="modal-header">
                                <h2>Product Details</h2>
                                <button onClick={closeProductModal} className="close-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {selectedProduct && (
                                <div className="product-view-content">
                                    <div className="product-image-container">
                                        <img
                                            src={`${API_URL}/${selectedProduct.image.replace(/\\/g, '/')}`}
                                            alt={selectedProduct.title}
                                            className="product-view-image"
                                        />
                                        <div className="product-category-badge">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                                <line x1="7" y1="7" x2="7.01" y2="7" />
                                            </svg>
                                            {selectedProduct.category}
                                        </div>
                                    </div>

                                    <div className="product-info">
                                        <h3 className="productData-title">{selectedProduct.title}</h3>
                                        <p className="productData-description">{selectedProduct.description}</p>
                                        <div className="product-price">${Number(selectedProduct.price).toFixed(2)}</div>
                                    </div>

                                    <div className="product-actions">
                                        <button
                                            onClick={() => {
                                                closeProductModal();
                                                handleEdit(selectedProduct);
                                            }}
                                            className="btn-edit"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                            Edit Product
                                        </button>
                                        <button
                                            onClick={() => {
                                                closeProductModal();
                                                handleDelete(selectedProduct._id);
                                            }}
                                            className="btn-delete"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3,6 5,6 21,6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                            Delete Product
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="productData-list">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="productData-card"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="card-category">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                        <line x1="7" y1="7" x2="7.01" y2="7" />
                                    </svg>
                                    {product.category}
                                </div>
                                <img
                                    src={`${API_URL}/${product.image.replace(/\\/g, '/')}`}
                                    alt={product.title}
                                />
                                <div className="card-content">
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                    <div className="price">${Number(product.price).toFixed(2)}</div>
                                    <div className="card-actions">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(product);
                                            }}
                                            className="btn-edit"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(product._id);
                                            }}
                                            className="btn-delete"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3,6 5,6 21,6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                <line x1="14" y1="11" x2="14" y2="17" />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {products.length === 0 && (
                        <div className="empty-state">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                            <h3>No products yet</h3>
                            <p>Get started by adding your first cold drink product.</p>
                            <button onClick={openAddForm} className="add-product-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                                Add Your First Product
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}