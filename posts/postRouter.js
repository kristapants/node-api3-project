const express = require('express');
const Post = require('./postDb');


const router = express.Router();

router.get('/', (req, res) => {
  Post.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  Post.getById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Post.getById(req.params.id)
    .then(post => {
      if (!post) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
      next()
    })
}

module.exports = router;
