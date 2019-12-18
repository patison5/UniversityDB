const teacherController  = require('../controllers/teacher')
const express = require('express');

const router = express.Router();

// router.get('/', 	teacherController.hello)
router.get('/', 	teacherController.getListOfGroups)

module.exports = router;