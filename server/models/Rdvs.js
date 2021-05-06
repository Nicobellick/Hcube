const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({

    date: {
        type: String,
        required: true
    },
    hour: {
        type: Array,
        required : true
    }
    person: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('rdv', PostSchema)