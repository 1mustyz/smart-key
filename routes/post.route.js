const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller')

router.post('/addpost', postController.addPost);
router.get('/getallpost', postController.getAllPost);
router.delete('/delete', postController.remove);
router.put('/update', postController.update);

module.exports = router;