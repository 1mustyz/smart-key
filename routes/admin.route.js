const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const comparePassword = require('../middleware/comparePassword.middleware');
const checkUser = require('../middleware/checkuser.middleware');
const hash = require('../middleware/hashPassword');

router.post('/register/create', checkUser, comparePassword, hash, adminController.create);
router.post('/login', adminController.login);
router.get('/login', adminController.renderView);
router.get('/register', adminController.renderRegister);

module.exports = router;