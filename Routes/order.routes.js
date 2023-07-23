const express = require('express');
const {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderByEmail,
    getAllOrders,
    getRevenue,
} = require('../Controllers/orders.controller.js');

const {verifyAdmin, verifyToken} = require('../Middlewares/auth.middleware.js');

const orderRouter = express.Router();

orderRouter.post('/', verifyToken, addOrder);
orderRouter.patch('/:id', verifyToken, updateOrder);
orderRouter.delete('/:id', deleteOrder);
orderRouter.get('/:email', verifyToken, getOrderByEmail);
orderRouter.get('/', verifyAdmin, getAllOrders);
orderRouter.get('/revenue/:fromDate', verifyAdmin, getRevenue);

module.exports = {orderRouter};
