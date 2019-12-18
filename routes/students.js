const studentController  = require('../controllers/student')
const express = require('express');

const router = express.Router();

router.get('/', 	studentController.hello)

module.exports = router;