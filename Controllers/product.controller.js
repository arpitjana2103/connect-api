const {ProductModel} = require('../Models/product.model.js');

function validateProductData(productData) {
    const errors = {};

    // Check if required fields are missing
    if (!productData.title) {
        errors.title = 'Title is required.';
    }
    if (!productData.brand) {
        errors.brand = 'Brand is required.';
    }
    if (
        !productData.img ||
        !Array.isArray(productData.img) ||
        productData.img.length === 0
    ) {
        errors.img = 'At least one image URL is required.';
    }
    if (!productData.category) {
        errors.category = 'Category is required.';
    }
    if (!productData.color) {
        errors.color = 'Color is required.';
    }
    if (!productData.price || typeof productData.price !== 'object') {
        errors.price = 'Price is required and should be an object.';
    } else {
        if (
            !productData.price.mainPrice ||
            typeof productData.price.mainPrice !== 'number'
        ) {
            errors.price = 'Main price is required and should be a number.';
        }
        if (
            !productData.price.discountedPrice ||
            typeof productData.price.discountedPrice !== 'number'
        ) {
            errors.price = 'Discount is required and should be a number.';
        }
    }
    if (!productData.description) {
        errors.description = 'Description is required.';
    }
    if (
        !productData.specifications ||
        typeof productData.specifications !== 'object'
    ) {
        errors.specifications =
            'Specifications are required and should be an object.';
    }

    // Return errors object. If it's empty, then there are no errors.
    return Object.keys(errors).length > 0 ? errors : null;
}

const addProduct = async function (req, res) {
    try {
        let invalidProduct = validateProductData(req.body);
        if (invalidProduct) {
            return res.status(400).json({
                status: 'fail',
                error: invalidProduct,
            });
        }

        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        return res.status(200).json({
            status: 'success',
            message: 'Product Added Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const updateProduct = async function (req, res) {
    try {
        const product = await ProductModel.findOne({_id: req.params.id});
        if (!product) throw new Error('Product not Found !');
        await ProductModel.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({
            status: 'success',
            message: 'Product Updated Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const deleteProduct = async function (req, res) {
    try {
        const product = await ProductModel.findOne({_id: req.params.id});
        if (!product) throw new Error('Product not Found !');
        await ProductModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: 'success',
            message: 'Product Deleted Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const getProductByID = async function (req, res) {
    try {
        const product = await ProductModel.findOne({_id: req.params.id});
        if (!product) throw new Error('Product not Found !');
        return res.status(200).json({
            status: 'success',
            product: product,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const getAllProducts = async function (req, res) {
    try {
        const {color, category, sort, name, minPrice, maxPrice} = req.query;

        const query = {};

        if (color) query.color = color;
        if (category) query.category = category;
        if (name) query.title = {$regex: name, $options: 'i'};

        if (minPrice && maxPrice) {
            query['price.mainPrice'] = {$gte: minPrice, $lte: maxPrice};
        } else if (minPrice) {
            query['price.mainPrice'] = {$gte: minPrice};
        } else if (maxPrice) {
            query['price.mainPrice'] = {$lte: maxPrice};
        }

        // Getting the Products
        const products = await ProductModel.find(query);

        // Sorting the Products
        if (sort === 'asc') {
            products = products.sort(function (a, b) {
                return a.price.mainPrice - b.price.mainPrice;
            });
        } else if (sort === 'desc') {
            products = products.sort(function (a, b) {
                return b.price.mainPrice - a.price.mainPrice;
            });
        }

        return res.status(200).json({
            status: 'success',
            products: products,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProductByID,
    getAllProducts,
};
