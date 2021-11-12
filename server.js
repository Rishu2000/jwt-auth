const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const port = 3003;

app.use(express.json());

const users = [];
const posts = [
    {
        username:'Rishav',
        post:'Post 1'
    },{
        username:'Kumar',
        post:'Post 2'
    }
]

app.get('/posts', (req, res) => {
    res.json(posts);
})

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/user', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = {username:req.body.username, password:hashedPassword};
        users.push(user);
        res.json("Created");
    }
    catch {
        res.status(500).json("Error");
    }
})

app.post('/user/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if(user == null){
        res.status(400).json("Incorrect username and password.");
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            res.json("Successfully loged in.");
        }else{
            res.status.json("Password is incorrect.");
        }
    }
    catch {
        res.status(500).json("Error");
    }
})

app.listen(port,() => {
    console.log('server is listning to the port '+port);
})