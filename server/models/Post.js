const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({

    date: {
        type: String,
        // required: true
    },
    hour: {
        type: Array,
        // required : true
    }
})

module.exports = mongoose.model('available', PostSchema)


