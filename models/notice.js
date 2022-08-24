const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    category: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    title: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    description: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Notice', noticeSchema);
