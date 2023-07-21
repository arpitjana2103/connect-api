const mongoose = require('mongoose');

const WishListSchema = new mongoose.Schema(
    {
        userID: {type: String, unique: true, index: true},
        products: [{productID: {type: String, required: true}}],
        empty: {type: Boolean, required: true},
    },
    {
        versionKey: false,
    }
);

const WishListModel = mongoose.model('wishlist', WishListSchema);

module.exports = {WishListModel};
