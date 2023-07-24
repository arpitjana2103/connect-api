const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        userEmail: {type: String, required: true},
        products: {type: String, required: true},
    },
    {versionKey: false}
);

const CartModel = mongoose.model('cart', CartSchema);
module.exports = {CartModel};
