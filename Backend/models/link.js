const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    redirectTo: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
        required: true,
    }
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;