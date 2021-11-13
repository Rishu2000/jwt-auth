const express = require('express');
const app = express();
require('dotenv').config();
const jwt = require('jsonwebtoken');

const posts = [
    {
        username:'Rishav',
        post:'Post 1'
    },{
        username:'Kumar',
        post:'Post 2'
    }
]

app.use((req,res,next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if(!token)
        return res.status(403).json("authorization as a headers has not been passed.");
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if(err){
            console.log(err);
            return res.status(403).json('Invalid token');
        }
        console.log("Access Granted"); 
        req.user = user;
        next();
    })
})

app.get('/', (req, res) => {
    const post = posts.find(item => item.username === req.user.username);
    if(post) return res.json(post);
    res.status(403).json("No post avalible for this user.");
})

module.exports = app;