const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../Models/user.model.js');
const {redis} = require('../redis.js');
const register = async function (req, res) {
    try {
        let {name, email, password, isAdmin} = req.body;
        if (!name) throw new Error('Name cannot be blank !');
        if (!email) throw new Error('Email cannot be blank !');
        if (!password) throw new Error('Password cannot be blank !');
        const user = UserModel.findOne({email});
        if (user) throw new Error('User Already Exist');
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                return res.status(400).json({
                    status: 'fail',
                    error: err.message,
                });
            }
            if (!isAdmin) isAdmin = false;
            const newUser = new UserModel({
                name,
                email,
                password: hash,
                isAdmin,
            });
            await newUser.save();
            newUser.password = password;
            return res.status(200).json({
                status: 'success',
                message: 'User Registration Successfull',
                user: newUser,
            });
        });
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            error: err.message,
        });
    }
};

const login = async function (req, res) {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if (!user) throw new Error('User Not Found !');
        bcrypt.compare(password, user.password, async function (err, result) {
            if (err) {
                return res.status(400).json({
                    status: 'fail',
                    error: err.message,
                });
            }
            if (!result) throw new Error('Wrong Password');
            else {
                const token = jwt.sign(
                    {
                        userID: user._id,
                        userName: user.name,
                        isAdmin: user.isAdmin,
                    },
                    'masai',
                    {expiresIn: '3d'}
                );

                res.status(200).json({
                    status: 'success',
                    message: 'Login Successfull',
                    token: token,
                });
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

const logout = async function (req, res) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('Token not found');

        await redis.set(token, 'true');

        return res.status(400).json({
            status: 'success',
            message: 'Logout Successfull',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error.message,
        });
    }
};

module.exports = {register, login, logout};
