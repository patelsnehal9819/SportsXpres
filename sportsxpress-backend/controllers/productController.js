const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');
const { optimizeImage } = require('../middleware/upload');

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        console.log('📝 Creating new product...');
        
        // Check if image was uploaded
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please upload an image' 
            });
        }

        console.log('📸 Image received:', req.file.originalname);

        // Optimize the uploaded image
        const parsedPath = path.parse(req.file.path);
        const optimizedPath = path.join(parsedPath.dir, parsedPath.name + '-optimized.jpg');
        await optimizeImage(req.file.path, optimizedPath);

        // Create image URL (accessible from frontend)
        const imageUrl = `/uploads/${path.basename(optimizedPath)}`;

        // Parse offers
        let offers = req.body.offers;
        if (offers) {
            try {
                offers = JSON.parse(offers);
            } catch {
                offers = [offers];
            }
        } else {
            // Default offer format from your screenshot
            offers = req.body.specialOffer 
                ? [`WOW! £${req.body.specialOffer} with 3 offers`]
                : ['Special offer available'];
        }

        // Calculate discount percentage
        const originalPrice = parseFloat(req.body.originalPrice);
        const discountedPrice = parseFloat(req.body.discountedPrice);
        const discountPercentage = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

        // Create product
        const productData = {
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            originalPrice: originalPrice,
            discountedPrice: discountedPrice,
            discountPercentage: discountPercentage,
            offers: offers,
            imageUrl: imageUrl,
            inStock: req.body.inStock === 'true' || req.body.inStock === true,
            stockQuantity: parseInt(req.body.stockQuantity) || 0,
            description: req.body.description || '',
            featured: req.body.featured === 'true' || req.body.featured === true
        };

        const product = await Product.create(productData);

        console.log('✅ Product created successfully!');
        console.log('📦 Product details:');
        console.log(`   Name: ${product.name}`);
        console.log(`   Brand: ${product.brand}`);
        console.log(`   Price: £${product.originalPrice} → £${product.discountedPrice} (${product.discountPercentage}% off)`);
        console.log(`   Image: ${product.imageUrl}`);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });

    } catch (error) {
        console.error('❌ Error creating product:', error);
        
        // Delete uploaded file if product creation fails
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const { category, featured, search, limit = 50 } = req.query;
        let query = {};

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by featured
        if (featured) {
            query.featured = featured === 'true';
        }

        // Search by text
        if (search) {
            query.$text = { $search: search };
        }

        const products = await Product.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        console.log(`📦 Found ${products.length} products`);

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        console.error('❌ Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        console.error('❌ Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Handle image update
        if (req.file) {
            // Delete old image
            if (product.imageUrl) {
                const oldImagePath = path.join(__dirname, '..', product.imageUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log('🗑️ Deleted old image:', product.imageUrl);
                }
            }
            
            // Optimize new image
            const parsedPath = path.parse(req.file.path);
            const optimizedPath = path.join(parsedPath.dir, parsedPath.name + '-optimized.jpg');
            await optimizeImage(req.file.path, optimizedPath);
            req.body.imageUrl = `/uploads/${path.basename(optimizedPath)}`;
        }

        // Update product
        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        console.log('✅ Product updated:', product.name);

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });

    } catch (error) {
        console.error('❌ Error updating product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete image file
        if (product.imageUrl) {
            const imagePath = path.join(__dirname, '..', product.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log('🗑️ Deleted image:', product.imageUrl);
            }
        }

        await product.deleteOne();

        console.log('✅ Product deleted:', product.name);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error) {
        console.error('❌ Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};