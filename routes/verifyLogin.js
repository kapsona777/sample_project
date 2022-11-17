const express = require('express');
const router = express.Router(); 
const verify = require('./verifyToken');

router.get('/', verify, async (req,res) => {
    res.send("Logged");
}); 

module.exports = router;