// entry point to all the routes

const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/emp',require('./employee'));

module.exports = router;