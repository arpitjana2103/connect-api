const {OrderModel} = require('../Models/order.model.js');
const {UserModel} = require('../Models/user.model.js');

function validateOrderData(orderData) {
    const errors = {};

    // Check if required fields are missing or incorrect
    if (!orderData.userID) {
        errors.userID = 'User ID is required.';
    }
    if (
        !orderData.products ||
        !Array.isArray(orderData.products) ||
        orderData.products.length === 0
    ) {
        errors.products = 'At least one product with quantity is required.';
    } else {
        for (const product of orderData.products) {
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
    if (orderData.empty === undefined || typeof orderData.empty !== 'boolean') {
        errors.empty = 'Empty field is required and should be a boolean.';
    }
    if (
        !orderData.totalPrice ||
        typeof orderData.totalPrice !== 'number' ||
        orderData.totalPrice <= 0
    ) {
        errors.totalPrice =
            'Total price is required and should be a positive number.';
    }
    if (!orderData.address) {
        errors.address = 'Address is required.';
    }
    if (
        !orderData.status ||
        !['pending', 'fulfill', 'cancel'].includes(orderData.status)
    ) {
        errors.status =
            'Status is required and should be one of: pending, fulfill, cancel.';
    }
    if (
        !orderData.paymentMethod ||
        !['cod', 'online'].includes(orderData.paymentMethod)
    ) {
        errors.paymentMethod =
            'Payment method is required and should be one of: cod, online.';
    }

    // Return errors object. If it's empty, then there are no errors.
    return Object.keys(errors).length > 0 ? errors : null;
}

const addOrder = async function (req, res) {
    try {
        let invalidOrder = validateOrderData(req.body);
        if (invalidOrder) {
            return res.status(400).json({
                status: 'fail',
                error: invalidOrder,
            });
        }

        const newOrder = new OrderModel(req.body);
        await newOrder.save();
        return res.status(200).json({
            status: 'success',
            message: 'Order Added Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const updateOrder = async function (req, res) {
    try {
        const order = await OrderModel.findOne({_id: req.params.id});
        if (!order) throw new Error('Order not Found !');
        await OrderModel.findByIdAndUpdate(req.body.id, req.body);
        return res.status(200).json({
            status: 'success',
            message: 'Order Updated Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const deleteOrder = async function (req, res) {
    try {
        const order = await OrderModel.findOne({_id: req.params.id});
        if (!order) throw new Error('Order not Found !');
        await OrderModel.findByIdAndDelete(req.body.id);
        return res.status(200).json({
            status: 'success',
            message: 'Order Deleted Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const getOrderByEmail = async function (req, res) {
    try {
        const email = req.params.email;
        const user = await UserModel.findOne({email: email});
        if (!user) throw new Error('User Not Found !');
        const order = await OrderModel.findOne({userID: user._id});
        return res.status(200).json({
            status: 'success',
            order: order,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const getAllOrders = async function (req, res) {
    try {
        const orders = await OrderModel.find();
        return res.status(200).json({
            status: 'success',
            orders: orders,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const getRevenue = async function (req, res) {
    try {
        const {fromDate} = req.params;

        const [day, month, year] = fromDate.trim().split(':').map(Number);
        const fromDateObj = new Date(year, month - 1, day);

        if (isNaN(fromDateObj))
            throw new Error(
                'Invalid Date Format. Please use DD:MM:YYYY format.'
            );

        const revenue = await OrderModel.aggregate([
            {
                $match: {
                    createdAt: {$gte: fromDateObj, $lte: new Date()},
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {$sum: '$totalPrice'},
                },
            },
            {
                $project: {
                    _id: 0,
                    revenue: '$totalRevenue',
                },
            },
        ]);

        // Check if there is any revenue data
        if (revenue.length === 0) {
            return res.status(200).json({
                status: 'success',
                revenue: 0,
            });
        }

        res.status(200).json({
            status: 'success',
            revenue: revenue[0].revenue,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderByEmail,
    getAllOrders,
    getRevenue,
};
