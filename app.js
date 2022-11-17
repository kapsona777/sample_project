const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Import Routes 
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

// //Middleware 
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);

//Connect To DB
mongoose.connect(   process.env.DB_CONNECTION,
                    {useNewUrlParser:true}, () =>{
                    console.log("Connected to DB!");
});

app.listen(3001);
