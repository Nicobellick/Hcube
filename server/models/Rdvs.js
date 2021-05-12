const mongoose = require('mongoose')

const RdvSchema = mongoose.Schema({

    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required : true
    },
    person: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('rdv', RdvSchema)