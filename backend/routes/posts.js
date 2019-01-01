const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = this.MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = this.MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});


router.post('' , multer(storage).single("image"), (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(createdPost => {
    res.status(200).json({
      message: 'Post fetched successfully!',
      postId: createdPost._id
    });
  });
});

router.get('' , (req, res, next) => {
  Post.find()
    .then((document) => {
      res.status(200).json({
        message: 'Post fetched successfully!',
        posts: document
      });
    });

});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404);
    }
  });
})

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.connect
  });
 Post.updateOne({ _id: req.params.id }, post)
  .then((result) => {
    res.status(200).json({
      message: "Post updated successfull"
    })
  })
})

router.delete('/:id' ,(req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id})
    .then((result) => {
      res.status(200).json({
        message: 'Post deleted!'
      })
    })
});

module.exports = router;
