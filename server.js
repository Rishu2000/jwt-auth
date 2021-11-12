const express = require('express');
const app = express();
const posts = require('./route/posts');
const user = require('./route/user');
const port = 3003;

app.use(express.json());

app.use('/posts',posts);
app.use('/user',user);

app.listen(port,() => {
    console.log('server is listning to the port '+port);
})