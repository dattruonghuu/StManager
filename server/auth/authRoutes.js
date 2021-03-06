const router = require('express').Router();
const verifyUser = require('./auth').verifyUser;
const controller = require('./authController');

//before sending back a token
//check the password and username match what is in the DB
router.post('/signin', verifyUser(), controller.signin);

module.exports = router;

