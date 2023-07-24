const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        userEmail: {type: String, required: true, index: true},
        products: {type: String, required: true, index: true},
    },
    {versionKey: false}
);

const CartModel = mongoose.model('cart', CartSchema);
module.exports = {CartModel};
