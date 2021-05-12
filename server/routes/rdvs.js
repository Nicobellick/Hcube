const express = require('express')
const router = express.Router()
const Rdvs = require('../models/Rdvs')

router.get('/', async (req, res) => {
    try {      
        const rdv = await Rdvs.find()
        res.json(rdv)
    } catch (err) {
        res.json('Not work' + {message:err})
    }
})

router.post('/', (req, res) => {
    console.log(req.body)
    const post = new Rdvs({
        person: req.body.person,
        date: req.body.date,
        hour: req.body.hour
    })
    post.save()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.json({message: err})
    })
})

module.exports = router