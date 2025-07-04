const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeesController');

router.get('/master', controller.getAllEmployeesMaster);
router.get('/salaries', controller.getCurrentEmployeeSalries);
router.get('/currentdet', controller.getCurrentEmployeeDetails);
router.get('/fullprofile', controller.getEmployeeFullProfile);
router.post('/', controller.addEmployee);
router.put('/role', controller.changeEmployeeRole); 
router.put('/salary', controller.updateSalary);
router.put('/:id/terminate', controller.removeEmployee);

module.exports = router;