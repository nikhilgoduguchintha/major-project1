const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');
router.get('/profile',userController.profile);

router.get('/sign-in',userController.signin);
router.get('/sign-up',userController.signout);
router.get('/sign-out',userController.signout);

router.post('/create',userController.create);
// router.post('/create-session',userController.createSession);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), userController.createSession)
module.exports = router;