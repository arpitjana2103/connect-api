const bcrypt = require('bcrypt');
const {UserModel} = require('../Models/user.model.js');

const updateUser = async function (req, res) {
    try {
        if (req.body.decoded.userEmail !== req.params.email)
            throw new Error('Invalid EmailID !');

        if (req.body.password) {
            bcrypt.hash(req.body.password, 5, function (err, hash) {
                if (err) {
                    return res.status(400).json({
                        status: 'fail',
                        error: err.message,
                    });
                } else {
                    req.body.password = hash;
                }
            });
        }

        await UserModel.findByIdAndUpdate(req.body.decoded.userID, req.body);

        res.status(200).json({
            status: 'success',
            message: 'User Updated Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const deleteUser = async function (req, res) {
    try {
        if (req.body.decoded.userEmail !== req.params.email)
            throw new Error('Invalid EmailID !');

        await UserModel.findByIdAndDelete(req.body.decoded.userID);

        res.status(200).json({
            status: 'success',
            message: 'User Deleted Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const getUserbyEmail = async function (req, res) {
    try {
        if (req.body.decoded.userEmail !== req.params.email)
            throw new Error('Invalid EmailID !');

        const user = await UserModel.findOne({email: req.params.email});

        res.status(200).json({
            status: 'success',
            user: user,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const searchUser = async function (req, res) {
    try {
        const user = await UserModel.findOne({email: req.params.email});
        if (!user) throw new Error('User not found !');

        res.status(200).json({
            status: 'success',
            user: user,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const getAllUsers = async function (req, res) {
    try {
        const users = await UserModel.find();

        res.status(200).json({
            status: 'success',
            users: users,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {
    updateUser,
    deleteUser,
    getUserbyEmail,
    searchUser,
    getAllUsers,
};
