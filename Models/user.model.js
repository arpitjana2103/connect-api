const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true, index: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false},
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const UserModel = mongoose.model('user', UserSchema);
module.exports = {UserModel};
