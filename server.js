const express = require('express');
const server = express();

const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');


server.use((req, res, next) => {
  next()
})
// server.use(logger())
server.use(express.json());
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);


server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.url, 'a timestamp');
  next();
}

module.exports = server;
