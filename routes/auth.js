const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');

//Register
router.post('/register', async (req,res) =>{
    const{error} = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }else{
        //Check if user is already in the database
        const emailExists = await User.findOne({
            email: req.body.email
        });
        if(emailExists) {
            return res.status(400).send('Email already exists');
        }
        else{
            //Check if username is already in the database
            const userNameExists = await User.findOne({
                username: req.body.username
            });
            if(userNameExists) {
                return res.status(400).send('Username already exists');
            }
            else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);

                const user = new User({
                    email: req.body.email,
                    password: hashedPassword,
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                });
                try{
                    const savedUser = await user.save();
                    res.send({user: user._id});
                } catch(err){
                    res.status(400).send(err);
                }
            } 
        } 
    } 
});

//Login
router.post('/login', async (req,res) =>{
    const {error} = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    };
    //Check if username exists
    const user = await User.findOne({
        username: req.body.username
    });
    if(!user) {
        return res.status(400).send('Username not exists');
    }
    else{
        //Check if password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) {
            return res.status(400).send('password is incorrect');
        }
        else{ 
            //Create and assign a token
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send(token); 

        }
    }

});

module.exports = router;