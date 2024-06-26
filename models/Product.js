// Import Mongoose module
const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    rating: { 
      type: Number, 
      required: true,
      min: 0,
      max: 100
    },
    price: { 
      type: Number, 
      required: true 
    },
    discount: { 
      type: Number, 
      required: true 
    },
    instock: { 
      type: Boolean, 
      required: true 
    },
    brand: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    model: { 
      type: String, 
      required: true 
    },
    thumbnail: { 
      type: String, 
      required: true 
    },
    morePhoto: [
      { 
        type: String,
        required: true
      }
    ],
    description: { 
      type: String, 
      required: true 
    }
  });

// Export Product model
module.exports = mongoose.model('products', productSchema);
