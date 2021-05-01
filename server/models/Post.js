const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    person: {
        type: String,
        required: true
    },
    date: {
        type: Date
        // required: true
    },
    time: String,
    with: String
})

module.exports = mongoose.model('Posts', PostSchema)