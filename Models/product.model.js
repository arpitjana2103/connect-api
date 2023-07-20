const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, index: true},
    brand: {type: String, required: true},
    img: {type: [String], required: true},
    category: {type: String, required: true},
    color: {type: String, required: true},
    price: {
        main: {type: Number, required: true},
        discount: {type: Number, required: true},
    },
    discription: {type: String, required: true},
    specification: {type: Object, required: true},
});

const ProductModel = mongoose.model('product', ProductSchema);
module.exports = {ProductModel};
