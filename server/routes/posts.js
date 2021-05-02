const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// All posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.json({message:err})
    }
})

// Disponibility 
router.get('/disponibility', (req, res) => {})

// Post with models/Post
router.post('/', async (req, res) => {
    console.log(req.body)
    const post = new Post({
        person: req.body.person,
        date: req.body.date,
        time: req.body.time,
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