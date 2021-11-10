const express = require('express');
const app = express();
const port = 3003;

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

app.listen(port,() => {
    console.log('server is listning to the port '+port);
})