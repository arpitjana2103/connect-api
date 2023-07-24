const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userEmail: {type: String, required: true, index: true},
    products: [
        {
            productID: {type: String, required: true},
            quantity: {type: Number, required: true},
        },
    ],
    empty: {type: Boolean, required: true},
    totalPrice: {type: Number, required: true},
});

const CartModel = mongoose.model('cart', CartSchema);
module.exports = {CartModel};
