const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    person: {
        type: String,
        required: true
    },
    date: {
        type: String
        // required: true
    },
    time: String,
    with: String
})

module.exports = mongoose.model('rdv', PostSchema)