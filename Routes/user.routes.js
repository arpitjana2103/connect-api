const express = require('express');
const {
    updateUser,
    deleteUser,
    getUserbyEmail,
    searchUser,
    getAllUsers,
} = require('../Controllers/user.controller.js');
const {verifyAdmin, verifyToken} = require('../Middlewares/auth.middleware.js');
const userRouter = express.Router();

userRouter.patch('/:email', verifyToken, updateUser);
userRouter.delete('/:email', verifyToken, deleteUser);
userRouter.get('/:email', verifyToken, getUserbyEmail);
userRouter.get('/search/:email', verifyAdmin, searchUser);
userRouter.get('/', verifyAdmin, getAllUsers);

module.exports = {userRouter};
