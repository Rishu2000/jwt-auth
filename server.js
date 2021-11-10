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

app.get('/login', (req, res) => {
    res.json(users);
})

app.post('/login', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = {username:req.body.username, password:hashedPassword};
        users.push(user);
        res.json("Created");
    }
    catch {
        res.status(500).json("Error");
    }
})

app.listen(port,() => {
    console.log('server is listning to the port '+port);
})