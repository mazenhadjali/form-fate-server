const mongoose = require('mongoose');

const schemaModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    data: {
        type: Object,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Schema', schemaModel);
