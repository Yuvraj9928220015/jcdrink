import { useState, useEffect } from 'react';
import { useCart } from '../Pages/Cart/CartContext';
import "./Navbar.css"

const API_URL = 'http://localhost:5000';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCheckoutFormOpen, setIsCheckoutFormOpen] = useState(false);

  const {
    cartItems,
    getTotalItems,
    getTotalPrice,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveMobileDropdown(null);
  };

  const handleMobileDropdownToggle = (dropdown) => {
    setActiveMobileDropdown(activeMobileDropdown === dropdown ? null : dropdown);
  };

  const handleCartModalToggle = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const handleCheckoutFormToggle = () => {
    setIsCheckoutFormOpen(!isCheckoutFormOpen);
  };

  const handleQuantityIncrease = (productId) => {
    const item = cartItems.find(item => item._id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const handleQuantityDecrease = (productId) => {
    const item = cartItems.find(item => item._id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      removeFromCart(productId);
    }
  };

  // Fixed checkout handler
  const handleCheckout = () => {
    console.log("Checkout clicked - closing cart modal and opening checkout form");
    setIsCartModalOpen(false);
    setTimeout(() => {
      setIsCheckoutFormOpen(true);
    }, 100);
  };

  const handleCloseCheckoutForm = () => {
    console.log("Closing checkout form");
    setIsCheckoutFormOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown') && !event.target.closest('.mobile-menu-btn')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMobileMenuOpen(false);
        setActiveMobileDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("Checkout form state changed:", isCheckoutFormOpen);
  }, [isCheckoutFormOpen]);

  const pagesItems = [
    // { text: 'Our Team', path: '/Team' }
  ];

  const archiveItems = [
    { text: 'Blog Posts', path: '/BlogPost' }
  ];

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <>
      <div className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-fluid">
          <div className='navbar-content'>
            <div className="navbar-section">
              <div className="navbar-logo-section">
                <div className="navbar-logo">
                  <a href="/">
                    <img src="./jcDrink-logo.png" alt="Logo" />
                  </a>
                </div>
              </div>
              <div className="navbar-menu-section">
                <div className='navbar-list'>
                  <ul>
                    <li className="active"><a href="/">Home</a></li>
                    <li><a href="/About">About</a></li>
                    <li><a href="/Product">Product</a></li>
                    <li><a href="/Team">Team</a></li>
                    <li><a href="/BlogPost">Blog</a></li>
                    <li><a href="/Contact">Contact Us</a></li>
                  </ul>
                </div>
              </div>
              <div className="navbar-right-section">
                <div className='navbar-right-side'>
                  <div className="icon-btn" onClick={handleCartModalToggle}>
                    🛒
                    {totalItems > 0 && <div className="cart-icon">{totalItems}</div>}
                  </div>
                  <button className="contact-btn">
                    <div className="phone-icon">
                      <span>📞</span>
                    </div>
                    <span>+91-8432221711</span>
                  </button>
                  <div
                    className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={handleMobileMenuToggle}
                  >
                    <span>☰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'show' : ''}`}>
              <ul>
                <li className="active"><a href="/">Home</a></li>
                <li><a href="/About">About</a></li>
                <li><a href="/Product">Product</a></li>
                <li onClick={() => handleMobileDropdownToggle('pages')}>
                  Pages
                  <span className="dropdown-arrow">▼</span>
                  <div className={`mobile-dropdown-menu ${activeMobileDropdown === 'pages' ? 'show' : ''}`}>
                    {pagesItems.map((item, index) => (
                      <a key={index} href={item.path} className="mobile-dropdown-item">
                        {item.text}
                      </a>
                    ))}
                  </div>
                </li>
                <li onClick={() => handleMobileDropdownToggle('archive')}>
                  Blog
                  <span className="dropdown-arrow">▼</span>
                  <div className={`mobile-dropdown-menu ${activeMobileDropdown === 'archive' ? 'show' : ''}`}>
                    {archiveItems.map((item, index) => (
                      <a key={index} href={item.path} className="mobile-dropdown-item">
                        {item.text}
                      </a>
                    ))}
                  </div>
                </li>
                <li><a href="/Contact">Contact Us</a></li>
                <li>
                  <div className="icon-btn" onClick={handleCartModalToggle}>
                    🛒
                    {totalItems > 0 && <div className="cart-icon">{totalItems}</div>}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {isCartModalOpen && (
        <div className="cart-modal-overlay" onClick={handleCartModalToggle}>
          <div className={`cart-modal ${isCartModalOpen ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="cart-modal-header">
              <h2>Shopping Cart ({totalItems} items)</h2>
              <button className="close-btn" onClick={handleCartModalToggle}>×</button>
            </div>

            <div className="cart-modal-content">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div key={item._id} className="cart-item">
                        <img
                          src={`${API_URL}/${item.image?.replace(/\\/g, '/')}`}
                          alt={item.title}
                          className="cart-item-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60x60?text=Product';
                          }}
                        />
                        <div className="cart-item-details">
                          <h4>{item.title}</h4>
                          <p className="cart-item-category">{item.category}</p>
                          <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn"
                              onClick={() => handleQuantityDecrease(item._id)}
                            >
                              -
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button
                              className="quantity-btn"
                              onClick={() => handleQuantityIncrease(item._id)}
                            >
                              +
                            </button>
                          </div>
                          <p className="item-total">
                            Total: ${(Number(item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item._id)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax:</span>
                      <span>${(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>${(totalPrice + (totalPrice * 0.1)).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="cart-actions">
                    <button className="checkout-btn" onClick={handleCheckout}>
                      <a href="/CheckoutForm"> Proceed to Checkout (${(totalPrice + (totalPrice * 0.1)).toFixed(2)})</a>

                    </button>
                    <button className="continue-shopping-btn" onClick={handleCartModalToggle}>
                      Continue Shopping
                    </button>
                    <button className="clear-cart-btn" onClick={clearCart}>
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Form */}
    </>
  );
};

export default Navbar;