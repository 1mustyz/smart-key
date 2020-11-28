const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const comparePassword = require('../middleware/comparePassword.middleware');
const checkUser = require('../middleware/checkuser.middleware');
const hash = require('../middleware/hashPassword');

router.post('/create', checkUser, comparePassword, hash, adminController.create);
router.post('/login', adminController.login);

module.exports = router;