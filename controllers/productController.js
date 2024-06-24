const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    const quantity = parseInt(req.params.quantity);
    try {
        let products;
        if (quantity > 0) {
            products = await Product.find().limit(quantity);
        } else {
            products = await Product.find();
        }
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.itemId;
    try {
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedProduct = await Product.updateMany(
            { category: id },
            { $set: { thumbnail: "https://i.ibb.co/3s7hJKD/laptop.png" } }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
