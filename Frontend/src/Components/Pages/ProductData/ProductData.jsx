import { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductData.css';

const API_BASE_URL = 'https://api.jcdrink.com';
const API_URL = `${API_BASE_URL}/api`;

const AVAILABLE_SIZES = [
    '100 ML',
    '160 ML',
    '200 ML - 24 Pack',
    '200 ML - 30 Pack',
    '250 ML',
    '300 ML',
    '500 ML',
    '600 ML',
    '600 ML - With Sugar',
    '750 ML'
];

export default function ProductData() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [currentProduct, setCurrentProduct] = useState({
        id: null,
        title: '',
        subtitle: '',
        description: '',
        category: '',
        priceVariations: [{ size: '100 ML', price: '' }],
        image: null
    });

    useEffect(() => {
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
            const response = await axios.post(`${API_URL}/auth/login`, loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                setIsAuthenticated(true);
                sessionStorage.setItem('isAuthenticated', 'true');
                setLoginError('');
            } else {
                setLoginError(response.data.message || 'Invalid email or password');
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response?.data?.message) {
                setLoginError(error.response.data.message);
            } else if (error.response?.status === 404) {
                setLoginError('Server endpoint not found. Check API URL');
            } else if (error.response?.status === 500) {
                setLoginError('Server error. Please try again later');
            } else {
                setLoginError('Invalid email or password');
            }
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAuthenticated');
        setLoginData({ email: '', password: '' });
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            console.log('📥 Fetched products:', response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        let cleanPath = imagePath.replace(/\\/g, '/').replace(/^\/+/, '');
        if (cleanPath.startsWith('http')) {
            return cleanPath;
        }
        return `${API_BASE_URL}/${cleanPath}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handlePriceVariationChange = (index, field, value) => {
        const updatedVariations = [...currentProduct.priceVariations];
        updatedVariations[index][field] = value;
        setCurrentProduct({ ...currentProduct, priceVariations: updatedVariations });
    };

    const addPriceVariation = () => {
        const usedSizes = currentProduct.priceVariations.map(v => v.size);
        const availableSize = AVAILABLE_SIZES.find(size => !usedSizes.includes(size)) || AVAILABLE_SIZES[0];

        setCurrentProduct({
            ...currentProduct,
            priceVariations: [...currentProduct.priceVariations, { size: availableSize, price: '' }]
        });
    };

    const removePriceVariation = (index) => {
        if (currentProduct.priceVariations.length > 1) {
            const updatedVariations = currentProduct.priceVariations.filter((_, i) => i !== index);
            setCurrentProduct({ ...currentProduct, priceVariations: updatedVariations });
        }
    };

    const handleFileChange = (e) => {
        setCurrentProduct({ ...currentProduct, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasEmptyPrices = currentProduct.priceVariations.some(v => !v.price || v.price <= 0);
        if (hasEmptyPrices) {
            alert('Please enter valid prices for all sizes!');
            return;
        }

        const sizes = currentProduct.priceVariations.map(v => v.size);
        const uniqueSizes = new Set(sizes);
        if (sizes.length !== uniqueSizes.size) {
            alert('Each size variation must be unique! Please select different sizes.');
            return;
        }

        const formData = new FormData();
        formData.append('title', currentProduct.title);
        formData.append('subtitle', currentProduct.subtitle || '');
        formData.append('description', currentProduct.description);
        formData.append('category', currentProduct.category);
        formData.append('priceVariations', JSON.stringify(currentProduct.priceVariations));

        if (currentProduct.image) {
            formData.append('image', currentProduct.image);
        }

        console.log('📤 Sending data:', {
            title: currentProduct.title,
            subtitle: currentProduct.subtitle,
            description: currentProduct.description,
            category: currentProduct.category,
            priceVariations: currentProduct.priceVariations,
            hasImage: !!currentProduct.image
        });

        try {
            if (isEditing) {
                const response = await axios.put(`${API_URL}/products/${currentProduct.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log('✅ Update response:', response.data);
            } else {
                const response = await axios.post(`${API_URL}/products`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                console.log('✅ Create response:', response.data);
            }
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error("❌ Error saving product:", error.response ? error.response.data : error.message);
            alert('Error saving product. Please try again.');
        }
    };

    const handleEdit = (product) => {
        console.log('✏️ Editing product:', product);
        setIsEditing(true);
        setShowForm(true);
        setCurrentProduct({
            id: product._id,
            title: product.title,
            subtitle: product.subtitle || '',
            description: product.description,
            category: product.category,
            priceVariations: product.priceVariations && product.priceVariations.length > 0
                ? product.priceVariations
                : [{ size: '100 ML', price: '' }],
            image: null
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${API_URL}/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setShowForm(false);
        setCurrentProduct({
            id: null,
            title: '',
            subtitle: '',
            description: '',
            category: '',
            priceVariations: [{ size: '100 ML', price: '' }],
            image: null
        });
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
        console.log('🔍 Selected product:', product);
        setSelectedProduct(product);
        setSelectedSize(product.priceVariations?.[0]?.size || '');
        setShowProductModal(true);
    };

    const closeProductModal = () => {
        setShowProductModal(false);
        setSelectedProduct(null);
        setSelectedSize('');
    };

    const getCurrentPrice = () => {
        if (!selectedProduct || !selectedSize) return 0;
        const variation = selectedProduct.priceVariations.find(v => v.size === selectedSize);
        return variation ? variation.price : 0;
    };

    const getPriceRange = (product) => {
        if (!product.priceVariations || product.priceVariations.length === 0) {
            return '₹0.00';
        }
        const prices = product.priceVariations.map(v => Number(v.price));
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        if (min === max) {
            return `₹${min.toFixed(2)}`;
        }
        return `₹${min.toFixed(2)} - ₹${max.toFixed(2)}`;
    };

    const getAvailableSizes = (currentIndex) => {
        const usedSizes = currentProduct.priceVariations
            .map((v, idx) => idx !== currentIndex ? v.size : null)
            .filter(Boolean);
        return AVAILABLE_SIZES.filter(size => !usedSizes.includes(size));
    };

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

    return (
        <>
            <div className="ProductData">
                <header className="ProductData-header">
                    <div className="">
                        <div className="header-content">
                            <div>
                                <h1>Cold Drink Products</h1>
                                <p>Manage your beverage inventory with custom pricing for each size</p>
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

                <div className="ProductData-continer">
                    <button onClick={openAddForm} className="add-product-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add New Product
                    </button>

                    <div className={`modal-overlay ${!showForm ? 'hidden' : ''}`}>
                        <div className="modal-content form-modal">
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
                                        placeholder="e.g., Coca Cola, Pepsi, Fanta"
                                        value={currentProduct.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 7h16M4 12h16M4 17h10" />
                                        </svg>
                                        Subtitle (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="subtitle"
                                        placeholder="e.g., Refreshing Cola Drink, Ice Cold Refreshment"
                                        value={currentProduct.subtitle}
                                        onChange={handleInputChange}
                                    />
                                    <small className="form-hint">Add a catchy subtitle to describe your product</small>
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
                                        placeholder="e.g., Cola, Juice, Energy Drink"
                                        value={currentProduct.category}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="12" y1="1" x2="12" y2="23" />
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                        Price for Each Size
                                    </label>
                                    <div className="pricing-info">
                                        <p>💡 Set different prices for each bottle size</p>
                                    </div>

                                    <div className="price-variations-container">
                                        {currentProduct.priceVariations.map((variation, index) => (
                                            <div key={index} className="price-variation-row">
                                                <div className="variation-number">{index + 1}</div>
                                                <select
                                                    value={variation.size}
                                                    onChange={(e) => handlePriceVariationChange(index, 'size', e.target.value)}
                                                    required
                                                    className="size-select"
                                                >
                                                    <option value="">Select Size</option>
                                                    {getAvailableSizes(index).map(size => (
                                                        <option key={size} value={size}>{size}</option>
                                                    ))}
                                                    {variation.size && !getAvailableSizes(index).includes(variation.size) && (
                                                        <option value={variation.size}>{variation.size}</option>
                                                    )}
                                                </select>

                                                <div className="price-input-wrapper">
                                                    <span className="rupee-symbol">₹ </span>
                                                    <input
                                                        type="number"
                                                        placeholder="Price"
                                                        value={variation.price}
                                                        onChange={(e) => handlePriceVariationChange(index, 'price', e.target.value)}
                                                        required
                                                        step="0.01"
                                                        min="0"
                                                        className="price-input"
                                                    />
                                                </div>

                                                {currentProduct.priceVariations.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removePriceVariation(index)}
                                                        className="btn-remove-variation"
                                                        title="Remove this size"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M18 6L6 18M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {currentProduct.priceVariations.length < AVAILABLE_SIZES.length && (
                                        <button
                                            type="button"
                                            onClick={addPriceVariation}
                                            className="btn-add-variation"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                            Add Another Size & Price
                                        </button>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        Product Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image-input"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        required={!isEditing}
                                    />
                                    <small className="form-hint">Upload a clear product image (JPEG, PNG, WebP)</small>
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
                                            src={getImageUrl(selectedProduct.image)}
                                            alt={selectedProduct.title}
                                            className="product-view-image"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                                            }}
                                        />
                                    </div>

                                    <div className="product-info">
                                        <h3 className="productData-title">{selectedProduct.title}</h3>
                                        {/* ✅ FIX: Display subtitle properly */}
                                        {selectedProduct.subtitle && selectedProduct.subtitle.trim() !== '' && (
                                            <p className="productData-subtitle">{selectedProduct.subtitle}</p>
                                        )}
                                        <p className="productData-description">{selectedProduct.description}</p>

                                        <div className="size-selector">
                                            <label className="form-label">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                </svg>
                                                Choose Size
                                            </label>
                                            <select
                                                value={selectedSize}
                                                onChange={(e) => setSelectedSize(e.target.value)}
                                                className="size-dropdown"
                                            >
                                                {selectedProduct.priceVariations?.map((variation) => (
                                                    <option key={variation.size} value={variation.size}>
                                                        {variation.size} - ₹{Number(variation.price).toFixed(2)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="product-price">₹ {getCurrentPrice().toFixed(2)}</div>
                                        <div className="available-sizes">
                                            <p className="sizes-label">Available Sizes:</p>
                                            <div className="size-chips">
                                                {selectedProduct.priceVariations?.map((variation) => (
                                                    <div
                                                        key={variation.size}
                                                        className={`size-chip ${selectedSize === variation.size ? 'active' : ''}`}
                                                        onClick={() => setSelectedSize(variation.size)}
                                                    >
                                                        <span className="chip-size">{variation.size}</span>
                                                        <span className="chip-price">₹{Number(variation.price).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
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
                                <div className="product-image-wrapper">
                                    <img
                                        src={getImageUrl(product.image)}
                                        alt={product.title}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/250x250?text=No+Image';
                                        }}
                                    />
                                </div>
                                <div className="card-content">
                                    <h3>{product.title}</h3>
                                    {/* ✅ FIX: Display subtitle in product cards */}
                                    {product.subtitle && product.subtitle.trim() !== '' && (
                                        <p className="card-subtitle">{product.subtitle}</p>
                                    )}
                                    <p className="card-description">{product.description}</p>
                                    <div className="price">{getPriceRange(product)}</div>
                                    <div className="sizes-available">
                                        {product.priceVariations?.length || 0} size{product.priceVariations?.length !== 1 ? 's' : ''} available
                                    </div>
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
                            <p>Start by adding your first cold drink with custom pricing for each size.</p>
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