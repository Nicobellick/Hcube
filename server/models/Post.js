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
})

module.exports = mongoose.model('rdv', PostSchema)