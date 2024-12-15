const express = require("express");
const { createUser, loginUser, getUser } = require("../../controller/users/userController");
const isAuth = require("../../middleware/Auth");
const router = express.Router();

router.post('/sign-up',createUser)
router.post('/sign-in',loginUser)
router.get('/getUser', isAuth, getUser)

module.exports = router;
