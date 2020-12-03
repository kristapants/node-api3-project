const express = require('express');
const User = require('./userDb');


const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({
        error: "There was an error saving new user"
      })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(() => {
    res.status(500).json({
      error: "The user information could not be retrieved."
    })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(() => {
    res.status(404).json({
      error: "Problem getting user posts"
  })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  User.getById(req.params.id)
  .then(user => {
    if (!user) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
    next()
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ 
      message: "missing user data" 
    });
  } else if (!req.body.name) {
    res.status(400).json({ 
      message: "missing required name field" 
    });
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ 
      message: "missing post data" 
    });
  } else if (!req.body.text) {
    res.status(400).json({ 
      message: "missing required text field" 
    });
  }
  next();
}

module.exports = router;


