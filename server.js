const express = require('express');
const app = express();
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

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    users.push({username, password});
    res.json('User added.');
})

app.listen(port,() => {
    console.log('server is listning to the port '+port);
})