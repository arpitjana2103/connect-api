const express = require('express');
const {
    addProduct,
    updateProduct,
    deleteProduct,
    getProductByID,
    getAllProducts,
} = require('../Controllers/product.controller.js');
const {verifyAdmin} = require('../Middlewares/auth.middleware.js');
const productRouter = express.Router();

productRouter.post('/', verifyAdmin, addProduct);
productRouter.patch('/:id', verifyAdmin, updateProduct);
productRouter.delete('/:id', verifyAdmin, deleteProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductByID);

module.exports = {productRouter};
