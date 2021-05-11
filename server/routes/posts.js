const express = require('express')
const router = express.Router()
const Post = require('../models/Post')


// All posts
router.get('/', async (req, res) => {
    try {      
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.json('Not work' + {message:err})
    }
})

// 
// router.get('/', (req, res) => {
//      Post.find().then(post => res.send(post)).catch(err => console.log(err))
// })


// Update hours availables on day
router.put('/update/:date', (req, res) => {
    let date = req.params.date
    Post.findOne({date: date}, (err, foundObject) => {
        if(err){
            console.log(err);
            res.status(500).send()
        }else {
            if(!foundObject){
                res.status(404).send();
            }else {
                if(req.body.date) {
                    foundObject.date = req.body.date
                }
                if(req.body.hour){
                    foundObject.hour = req.body.hour
                }
                foundObject.save((err, updatedObject) => {
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }else {
                        res.send(updatedObject);
                    }
                })
            }
        }
    })
})

// Post New Day : 

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