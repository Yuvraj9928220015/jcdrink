// app/product/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./product.module.css";

const API_BASE_URL = "https://api.jcdrink.com";
const API_URL = `${API_BASE_URL}/api`;

const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());

  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(`Failed to load products: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlist);
    newWishlist.has(productId) ? newWishlist.delete(productId) : newWishlist.add(productId);
    setWishlist(newWishlist);
  };

  const getPriceRange = (product) => {
    if (!product.priceVariations || product.priceVariations.length === 0)
      return `₹${Number(product.price || 0).toFixed(2)}`;
    const prices = product.priceVariations.map((v) => Number(v.price));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹${min.toFixed(2)}` : `₹${min.toFixed(2)} – ₹${max.toFixed(2)}`;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300x300?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_BASE_URL}/${imagePath.replace(/\\/g, "/").replace(/^\/+/, "")}`;
  };

  const handleProductClick = (product) => {
    router.push(`/product/${createSlug(product.title)}`);
  };

  const handleWishlistClick = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  if (loading) {
    return (
      <div className={styles.productContainer}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productContainer}>
        <div className={styles.error}>
          <h3>Error Loading Products</h3>
          <p>{error}</p>
          <button onClick={fetchProducts} className={styles.retryBtn}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.productContainerContent}>
        <h1 className={styles.aboutHeading}>Our Products</h1>
        <div className={styles.productContainerContentDes}>
          Browse our collection of amazing products.
        </div>
      </div>

      <div className={styles.productsContainer}>
        {products.length === 0 ? (
          <div className={styles.noProducts}><p>No products found.</p></div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => {
              const productId = product._id || product.id;
              return (
                <div
                  key={productId}
                  className={styles.productItem}
                  onClick={() => handleProductClick(product)}
                >
                  <div className={styles.productCard}>
                    <button
                      className={`${styles.wishlistBtn} ${wishlist.has(productId) ? styles.active : ""}`}
                      onClick={(e) => handleWishlistClick(e, productId)}
                      aria-label="Add to wishlist"
                    />
                    <div className={styles.productImageWrapper}>
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.title || "Product"}
                        className={styles.productImage}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/300x300?text=No+Image"; }}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <div className={styles.productCategory}>
                        {product.category || "Uncategorized"}
                      </div>
                      <h3 className={styles.productTitle}>
                        {product.title || "Untitled Product"}
                      </h3>
                      <div className={styles.productBottom}>
                        <span className={styles.price}>{getPriceRange(product)}</span>
                        {product.priceVariations && product.priceVariations.length > 0 && (
                          <span className={styles.sizesAvailable}>
                            {product.priceVariations.length} size{product.priceVariations.length !== 1 ? "s" : ""} available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}