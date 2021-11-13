const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = [];
let refToken = "";

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = {username:req.body.username, password:hashedPassword};
        users.push(user);
        res.json("Created");
    }
    catch(err) {
        res.status(500).json(err);
    }
})

app.post('/login', async (req, res) => {
    const user = users.find(item => item.username === req.body.username);
    if(user == null){
        res.status(400).json("Incorrect username and password.");
    }else{
        try {
            if(await bcrypt.compare(req.body.password, user.password)){
                const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'});
                const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
                refToken = refreshToken;
                res.json({accessToken, refToken});
            }else{
                res.status.json("Password is incorrect.");
            }
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
})

app.post('/token',(req,res) => {
    const refreshToken = req.body.refreshToken;
    if(!refreshToken) return res.status(403).json("No Refresh token passed");
    if(!(refreshToken === refToken)) return res.status(403).json("Invalid Refresh token passed");
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, item) => {
        if(err) return res.status(401).json(err);
        delete item.iat;
        const accessToken = jwt.sign(item,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'20s'});
        res.json(accessToken);
    })
})

app.get('/logout',(req,res) => {
    refToken = "";
    res.json("Loged out Successfully.");
})

module.exports = app;