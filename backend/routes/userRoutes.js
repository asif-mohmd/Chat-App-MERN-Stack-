const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers.js');

const router = express.Router();


router.route('/').post(registerUser);
router.post('/login', authUser)


module.exports = router;