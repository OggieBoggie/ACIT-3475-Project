const mongoose = require('mongoose');

// Create schema model here
const imageSchema = new mongoose.Schema( {
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Image', imageSchema)