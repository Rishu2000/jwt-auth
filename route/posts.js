const express = require('express');
const app = express();

const posts = [
    {
        username:'Rishav',
        post:'Post 1'
    },{
        username:'Kumar',
        post:'Post 2'
    }
]

app.get('/', (req, res) => {
    res.json(posts);
})

module.exports = app;