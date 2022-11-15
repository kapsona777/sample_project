const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
require('.env').config();

// //Middleware
// app.use(auth);


//ROUTERS
app.get("/", (req, res) => {
    res.send("Hello World!");
}); 

//Connect To DB
mongoose.connect(   process.env.DB_CONNECTION,
                    {useNewUrlParser:true}, () =>{
                    console.log("Connected to DB!");
});

app.listen(3001);
