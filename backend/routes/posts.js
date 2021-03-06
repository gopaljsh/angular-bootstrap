const express = require('express');

const postController = require('../controllers/posts');

const checkAuth = require('../middleware/check-auth');
const multerFile = require('../middleware/multer');

const router = express.Router();


router.post('' , checkAuth, multerFile, postController.createPost);

router.get('' , postController.getPosts);

router.get('/:id', postController.getSinglePost);

router.put('/:id', checkAuth, multerFile, postController.editPost);

router.delete('/:id', checkAuth, postController.deletePost);

module.exports = router;
