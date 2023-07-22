const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, index: true},
    brand: {type: String, required: true},
    img: {type: [String], required: true},
    category: {type: String, required: true},
    color: {type: String, required: true},
    price: {
        mainPrice: {type: Number, required: true},
        discountedPrice: {type: Number, required: true},
    },
    description: {type: String, required: true},
    specifications: {type: Object, required: true},
});

const ProductModel = mongoose.model('product', ProductSchema);
module.exports = {ProductModel};
