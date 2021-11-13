const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const users = [];

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
                res.json(accessToken);
            }else{
                res.status.json("Password is incorrect.");
            }
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
})

module.exports = app;