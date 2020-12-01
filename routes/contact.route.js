const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller')

router.get('/',(req,res)=>res.render('contact'));
router.post('/send',contactController.send);

module.exports = router;