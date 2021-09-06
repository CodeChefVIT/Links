const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;