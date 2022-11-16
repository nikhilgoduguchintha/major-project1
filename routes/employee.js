const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee_controller');

router.get('/',employeeController.employeeDetails);
router.get('/emp1',employeeController.employee1);

module.exports = router;