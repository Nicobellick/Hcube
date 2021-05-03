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

// Post RDV : 

router.post('/', (req, res) => {
        console.log(req.body)
        const post = new Post({
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
    

module.exports = router