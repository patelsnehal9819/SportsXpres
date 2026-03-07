import React, { useState } from 'react';
import axios from 'axios';
import './AdminProductUpload.css';

const AdminProductUpload = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: 'helmets',
        originalPrice: '',
        discountedPrice: '',
        specialOffer: '',
        inStock: true,
        stockQuantity: '',
        description: ''
    });
    
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const data = new FormData();
            
            // Append all form fields
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });
            
            // Append image
            if (image) {
                data.append('image', image);
            }

            // Get the backend URL from environment or use default
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

            const response = await axios.post(`${API_URL}/api/products`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage({
                type: 'success',
                text: '✅ Product uploaded successfully!'
            });

            // Reset form
            setFormData({
                name: '',
                brand: '',
                category: 'helmets',
                originalPrice: '',
                discountedPrice: '',
                specialOffer: '',
                inStock: true,
                stockQuantity: '',
                description: ''
            });
            setImage(null);
            setPreview(null);

            console.log('Product created:', response.data);

        } catch (error) {
            console.error('Upload error:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || '❌ Failed to upload product'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-upload-container">
            <h2>Add New Cricket Equipment</h2>
            
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Product Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., SG Abdomen Guard"
                        />
                    </div>

                    <div className="form-group">
                        <label>Brand *</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., SG, Masuri"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="helmets">Helmets</option>
                            <option value="abdomen-guard">Abdomen Guard</option>
                            <option value="batting-pads">Batting Pads</option>
                            <option value="gloves">Gloves</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Stock Status</label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleInputChange}
                            />
                            In Stock
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Original Price (£) *</label>
                        <input
                            type="number"
                            name="originalPrice"
                            value={formData.originalPrice}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="867"
                        />
                    </div>

                    <div className="form-group">
                        <label>Discounted Price (£) *</label>
                        <input
                            type="number"
                            name="discountedPrice"
                            value={formData.discountedPrice}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="699"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Special Offer Price (£)</label>
                    <input
                        type="number"
                        name="specialOffer"
                        value={formData.specialOffer}
                        onChange={handleInputChange}
                        placeholder="e.g., 279"
                    />
                    <small>This will show as: "WOW! £279 with 3 offers"</small>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Product description..."
                    />
                </div>

                <div className="form-group">
                    <label>Product Image *</label>
                    <div className="image-upload-area">
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            required={!preview}
                            className="file-input"
                        />
                        <label htmlFor="imageInput" className="file-label">
                            {image ? image.name : 'Choose an image'}
                        </label>
                    </div>
                </div>

                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="Preview" />
                        <button 
                            type="button" 
                            className="remove-image"
                            onClick={() => {
                                setImage(null);
                                setPreview(null);
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AdminProductUpload;