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
        type: String,
        required: true,
    }
}, { timestamps: true });

const Links = mongoose.model('Links', linkSchema);

module.exports = Links;