const userController  = require('../controllers/user')
const express = require('express');
const {db} = require('../db');

const router = express.Router();

router.get('/', 		userController.login)
router.get('/logout',	userController.logout)

router.post('/login', 	 userController.userLogin)
router.post('/register', userController.registerUser);

module.exports = router;