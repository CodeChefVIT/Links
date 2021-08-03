const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = Schema({
    name: {
        type: String,
    },
    redirectTo: {
        type: String,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    visiblity: {
        type: Boolean,
    },
    index:{
        type: Number,
    }
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;