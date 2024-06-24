const express = require('express');
const { getAllProducts, getProductById, deleteProduct, updateProduct } = require('../controllers/productController');

const router = express.Router();

router.get('/:quantity', getAllProducts);
router.get('/productsById/:id', getProductById);
router.delete('/:itemId', deleteProduct);
router.patch('/:id', updateProduct);

module.exports = router;
