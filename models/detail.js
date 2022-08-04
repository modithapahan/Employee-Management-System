const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    nic:{
        type: String,
        required: true
    },
    salary:{
        type: Number
    }
})

module.exports = mongoose.model('employee', detailsSchema);
