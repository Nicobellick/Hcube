const express = require('express')
const router = express.Router()
const Rdvs = require('../models/Rdvs')

router.get('/', async (req, res) => {
    try {      
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.json('Not work' + {message:err})
    }
})

router.post('/', (req, res) => {
    console.log(req.body)
    const post = new Rdvs({
        person: req.body.persone
        date: req.body.date,
        hour: req.body.time,
    })
    post.save()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.json({message: err})
    })
})