const express = require('express');
const router = express.Router();
const User = require('../models/User');  
const verify = require('./verifyToken');

// GET BACK ALL THE users
router.get('/',verify, async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/specific',verify, (req,res) => {
    res.send("Specific user");
});

// SUBMITS A USER
router.post('/', verify,(req,res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    user.save() 
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        res.json({message: err});
    })
})

// SPECIFIC User
router.get('/:userId', verify, async (req,res) => {
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch(err){
        res.json({message: err});
    }
    
});

// DELETE User
router.delete('/:userId', verify, async (req,res) => {
    try{
        const removedUser = await User.remove({_id: req.params.userId});
        res.json(removedUser);
    } catch(err){
        res.json({message: err});
    }
});

// UPDATE User
router.patch('/:userId', verify, async (req,res) => {
    try{
        const updatedUser = await User.updateOne(
            {_id: req.params.userId},
            {$set: {title: req.body.title}}
        );
        res.json(updatedUser);
    } catch(err){
        res.json({message: err});
    }
})

module.exports = router;