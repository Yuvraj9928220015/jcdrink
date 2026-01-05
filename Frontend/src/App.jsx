import { HelmetProvider } from "react-helmet-async";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartProvider } from './Components/Pages/Cart/CartContext';
import Home from "./Components/Home/Home"
import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import About from "./Components/About/About"
import Team from "./Components/Team/Team"
import Contact from "./Components/Contact/Contact";
import Product from "./Components/Pages/Product/Product";
import ProductData from "./Components/Pages/ProductData/ProductData";
import CheckoutForm from "./Components/Pages/Cart/CheckoutForm";
import Privacy from "./Components/Privacy/Privacy";
import ProductDetail from "./Components/Pages/Product/ProductDetail";
import QRPage from "./Components/Pages/QRPage/QRPage";

function Layout() {
  const location = useLocation();

  // Safari के लिए improved URL parameter checking
  const isScanned = React.useMemo(() => {
    try {
      const params = new URLSearchParams(location.search);
      return params.get('scanned') === 'true';
    } catch (error) {
      console.error('Error parsing URL params:', error);
      return false;
    }
  }, [location.search]);

  // QR page check
  const isQRPage = location.pathname === '/QRPage' || location.pathname === '/QRPage/';

  const shouldHideNavFooter = isScanned && isQRPage;

  return (
    <>
      {!shouldHideNavFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productData" element={<ProductData />} />
        <Route path="/checkoutForm" element={<CheckoutForm />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/QRPage" element={<QRPage />} />
      </Routes>
      
      {!shouldHideNavFooter && <Footer />}
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2500,
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
      disable: false
    });

    // Safari-specific fixes
    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
      // Force AOS refresh for Safari
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }, []);

  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;