const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
require('dotenv/config');

//Import Routes 
const postsRoute = require('./routes/posts');

// //Middleware 
app.use(bodyParser.json());
app.use('/posts', postsRoute);

//Connect To DB
mongoose.connect(   process.env.DB_CONNECTION,
                    {useNewUrlParser:true}, () =>{
                    console.log("Connected to DB!");
});

app.listen(3001);
