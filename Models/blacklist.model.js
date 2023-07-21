const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema(
    {
        token: {type: String, required: true, index: true, unique: true},
    },
    {
        versionKey: false,
    }
);

const BlackListModel = mongoose.model('blacklist', blackListSchema);
module.exports = {BlackListModel};
