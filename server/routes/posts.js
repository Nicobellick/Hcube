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

// Update hours availables on day
// router.put('/update/:date', (req, res) => {
//     let date = req.params.date
//     Post.findOne({date: date}, (err, foundObject) => {
//         if(err){
//             console.log(err);
//             res.status(500).send()
//         }else {
//             if(!foundObject){
//                 res.status(404).send();
//             }else {
//                 if(req.body.date) {
//                     foundObject.date = req.body.date
//                 }
//                 if(req.body.hour){
//                     foundObject.hour = req.body.hour
//                 }
//                 foundObject.save((err, updatedObject) => {
//                     if(err){
//                         console.log(err);
//                         res.status(500).send();
//                     }else {
//                         res.send(updatedObject);
//                         console.log(foundObject.hour)
//                     }
//                 })
//             }
//         }
//     })
// })

/// TESTTTTT

router.put('/update/:date', (req, res) => {
    let date = req.params.date
    let hour = req.body
    console.log(req.body)
    
    Post.findOneAndUpdate({date: date}, {$set:{hour : hour}}, {new: true}, (err, doc) => {
        if(err){
            console.log(err)
            res.status(500).send()
        }
        console.log('Succes ! :' + doc)
    })
    
    
})

// Create New Day : 

router.post('/', (req, res) => {
    // Check if day already exist 
     Post.find({date: req.body.date}, (err, result) => {
        if(result[0]){
            console.log('Already exist')
        }else // Create if doesnt
        {console.log(req.body.date)
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
        })}

    })
    

})
    

module.exports = router