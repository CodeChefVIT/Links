const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        requireed: true
    },
    password : {
        type: String,
        requireed: true
    },
    link1 : {
        type: String,
        requireed: true
    },
    link2 : {
        type: String,
        requireed: true
    },
    link3 : {
        type: String,
        requireed: true
    },
    link4 : {
        type: String,
        requireed: true
    },
    link5 : {
        type: String,
        requireed: true
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;