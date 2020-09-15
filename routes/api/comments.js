require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;
console.log(process.env);
const db = require('../../models');
let Comments = require('../../models/Comments')





router.get('/test', (req, res) => {
    console.log(req.body)
    res.json({ msg: 'User endpoint OK'});
  });
// find all comments
// router.get('/allcomment', (req, res)=>{
//     db.Comment.find()
//     .populate("user", "id")
//     .sort('-createAt')
//     .then(foundComment=>{
//         res.json({comment:foundComment})
//     })
//     .catch(err=> {
//         console.log('Error while posting comment', err)
//     })
// })
//create a new comment
router.post('/:postId/new', (req,res)=>{
    console.log(req.body)
    db.Post.findOne({
        _id: req.body.post._id
    })
    .then(post =>{
        console.log(post)
            post.comments.push({
            content: req.body.content,
            user: req.body.user.id
        })
        post.save()
        .then(post =>{
            res.json({post, user: req.body.user})
            console.log(post)
        })
    })
})
// edit comment
router.put('/:id', (req,res)=>{
    db.Comments.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    .populate("user", "_id")
    .exec((err, result)=>{
        if (err){
            return res.status(422).json({error:err})
        } else {
            res.json(result)
        }
    })
})
//delete comment
router.delete('/:_id', (req,res)=>{
    db.Comments.findByIdAndDelete(
        req.params.id,
    )
    .populate("user", "id")    
    .then(()=>{
        res.json('comment deleted')
    })
    .catch(err=>{
        res.status(400).json('error', err)
    })   
})
module.exports = router