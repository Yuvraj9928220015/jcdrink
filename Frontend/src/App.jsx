import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartProvider } from './Components/Pages/Cart/CartContext';
import Home from "./Components/Home/Home"
import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import About from "./Components/About/About"
import Team from "./Components/Team/Team"
import Contact from "./Components/Contact/Contact";
import BlogPost from "./Components/Blog/BlogPost"
import Product from "./Components/Pages/Product/Product";
import ProductData from "./Components/Pages/ProductData/ProductData";
import CheckoutForm from "./Components/Pages/Cart/CheckoutForm";
import Privacy from "./Components/Privacy/Privacy";
import ProductDetail from "./Components/Pages/Product/ProductDetail";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 2500,
      once: true
    });
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/BlogPost" element={<BlogPost />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/ProductData" element={<ProductData />} />
          <Route path="/CheckoutForm" element={<CheckoutForm />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App