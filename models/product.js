const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    posted_by: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
    offer:  {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Product', productSchema);