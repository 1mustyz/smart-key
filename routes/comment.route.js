const express = require('express');
const router  = express.Router();
const commentController = require('../controllers/comment.controller');

router.post('/create/:postId',commentController.create);
router.get('/', commentController.getComment);
router.delete('/remove',commentController.remove);

module.exports = router;