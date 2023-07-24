const express = require('express');
const {
    addCart,
    getCart,
    updateCart,
    deleteCart,
} = require('../Controllers/cart.controller.js');

const {verifyAdmin, verifyToken} = require('../Middlewares/auth.middleware.js');

const cartRouter = express.Router();

cartRouter.post('/', verifyToken, addCart);
cartRouter.get('/:email', verifyToken, getCart);
cartRouter.patch('/:email', verifyToken, updateCart);
cartRouter.delete('/:email', verifyToken, deleteCart);

module.exports = {cartRouter};
