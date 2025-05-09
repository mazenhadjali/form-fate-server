const mongoose = require('mongoose');

const schemaModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
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
