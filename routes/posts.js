const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); 
const verify = require('./verifyToken');



// GET BACK ALL THE POSTS
router.get('/', verify, async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/specific',verify, (req,res) => {
    res.send("Specific post");
});

// SUBMITS A POST
router.post('/', verify,(req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    post.save() 
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        res.json({message: err});
    })
})

// SPECIFIC POST
router.get('/:postId',verify, async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err){
        res.json({message: err});
    }
    
});

// DELETE POST
router.delete('/:postId', verify, async (req,res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    } catch(err){
        res.json({message: err});
    }
});

// UPDATE POST
router.patch('/:postId', verify, async (req,res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {title: req.body.title}}
        );
        res.json(updatedPost);
    } catch(err){
        res.json({message: err});
    }
})

module.exports = router;