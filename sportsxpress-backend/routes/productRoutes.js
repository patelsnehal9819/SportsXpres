const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Public routes - REMOVE ANY LIMIT
router.get('/', getProducts);  // Should return ALL products
router.get('/:id', getProductById);

// Admin routes
router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;