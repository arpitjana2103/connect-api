const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userID: {type: String, required: true, unique: true, index: true},
        products: [
            {
                productID: {type: String, required: true},
                quantity: {type: Number, required: true},
            },
        ],
        empty: {type: Boolean, required: true},
        totalPrice: {type: Number, required: true},
        address: {type: String, required: true},
        status: {
            type: String,
            enum: ['pending', 'fulfill', 'cancel'],
            default: 'pending',
            required: true,
        },
        paymentMethod: {type: String, enum: ['cod', 'online'], required: true},
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const OrderModel = mongoose.model('order', OrderSchema);

module.exports = {OrderModel};
