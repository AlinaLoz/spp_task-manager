const mongoose = require('../../lib/mongoose');

const user = new mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true
    },
    refreshToken: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('User', user);