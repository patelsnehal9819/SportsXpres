import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsPage.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            // Use your GitHub Codespace URL or localhost
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const response = await axios.get(`${API_URL}/api/products`);
            setProducts(response.data.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Format price with commas
    const formatPrice = (price) => {
        return `£${price.toLocaleString()}`;
    };

    if (loading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="products-page">
            <h1>Cricket Equipment</h1>
            
            {products.length === 0 ? (
                <p className="no-products">No products found. Add some products first!</p>
            ) : (
                <div className="products-grid">
                    {products.map(product => (
                        <div key={product._id} className="product-card">
                            {/* Product Image Container - Using your CSS class */}
                            <div 
                                className="product-image-container"
                                style={{
                                    backgroundImage: `url(${product.imageUrl})`,
                                }}
                                title={product.name}
                            />
                            
                            <div className="product-details">
                                <span className="product-brand">{product.brand}</span>
                                <h3 className="product-name">{product.name}</h3>
                                
                                <div className="price-section">
                                    <span className="original-price">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                    <span className="discounted-price">
                                        {formatPrice(product.discountedPrice)}
                                    </span>
                                    <span className="discount-badge">
                                        {product.discountPercentage}% OFF
                                    </span>
                                </div>

                                {/* Offers Section */}
                                <div className="offers-section">
                                    {product.offers && product.offers.map((offer, index) => (
                                        <p key={index} className="offer-text">{offer}</p>
                                    ))}
                                </div>

                                {/* Stock Status */}
                                <div className="stock-status">
                                    {product.inStock ? (
                                        <span className="in-stock">✓ In Stock</span>
                                    ) : (
                                        <span className="out-of-stock">✗ Out of Stock</span>
                                    )}
                                </div>

                                {/* Add to Cart Button */}
                                <button 
                                    className="add-to-cart-btn"
                                    disabled={!product.inStock}
                                    onClick={() => console.log('Add to cart:', product._id)}
                                >
                                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;