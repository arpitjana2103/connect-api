const {CartModel} = require('../Models/cart.model.js');
const {UserModel} = require('../Models/user.model.js');

function validateCartData(cartData) {
    const errors = {};

    // Check if required fields are missing or incorrect
    if (!cartData.userEmail) {
        errors.userEmail = 'User Email required';
    }
    if (
        !cartData.products ||
        !Array.isArray(cartData.products) ||
        cartData.products.length === 0
    ) {
        errors.products = 'At least one product with quantity is required.';
    } else {
        for (const product of cartData.products) {
            if (!product.productID) {
                errors.products = 'Product ID is required for each product.';
                break;
            }
            if (
                !product.quantity ||
                typeof product.quantity !== 'number' ||
                product.quantity <= 0
            ) {
                errors.products =
                    'Quantity should be a positive number for each product.';
                break;
            }
        }
    }
    if (cartData.empty === undefined || typeof cartData.empty !== 'boolean') {
        errors.empty = 'Empty field is required and should be a boolean.';
    }
    if (
        !cartData.totalPrice ||
        typeof cartData.totalPrice !== 'number' ||
        cartData.totalPrice <= 0
    ) {
        errors.totalPrice =
            'Total price is required and should be a positive number.';
    }

    // Return errors object. If it's empty, then there are no errors.
    return Object.keys(errors).length > 0 ? errors : null;
}

const addCart = async function (req, res) {
    try {
        const userEmail = req.body.userEmail;
        const user = await UserModel.findOne({email: userEmail});
        if (!user) throw new Error('User not Found !');

        let invalidCart = validateCartData(req.body);
        if (invalidCart) {
            return res.status(400).json({
                status: 'fail',
                error: invalidCart,
            });
        }

        const newCart = new CartModel(req.body);
        await newCart.save();
        return res.status(200).json({
            status: 'success',
            message: 'Cart Added Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const updateCart = async function (req, res) {
    try {
        const userEmail = req.params.email;
        const user = await UserModel.findOne({email: userEmail});
        if (!user) throw new Error('User not Found !');

        const cart = await CartModel.findOne({userID: user._id});
        if (!cart) throw new Error('Cart not Found !');

        await CartModel.findByIdAndUpdate(cart._id, req.body);
        return res.status(200).json({
            status: 'success',
            message: 'Cart Updated Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const getCart = async function (req, res) {
    try {
        const userEmail = req.params.email;
        const user = await UserModel.find({email: userEmail});
        if (!user) throw new Error('User not Found !');

        const cart = await CartModel.find({userEmail: user.email});
        if (!cart) throw new Error('Cart not Found !');

        return res.status(200).json({
            status: 'success',
            cart: cart,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const deleteCart = async function (req, res) {
    try {
        const userEmail = req.params.email;
        const user = await UserModel.findOne({email: userEmail});
        if (!user) throw new Error('User not Found !');

        const cart = await CartModel.findOne({userID: user._id});
        if (!cart) throw new Error('Cart not Found !');

        await CartModel.findByIdAndDelete(cart._id);
        return res.status(200).json({
            status: 'success',
            message: 'Cart Deleted Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {
    addCart,
    getCart,
    updateCart,
    deleteCart,
};
