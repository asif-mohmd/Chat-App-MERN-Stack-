const express = require('express');
const { registerUser, authUser,allUsers } = require('../controllers/userControllers.js');


const router = express.Router();


router.route("/").post(registerUser).get(allUsers);
router.post('/login', authUser)


module.exports = router;