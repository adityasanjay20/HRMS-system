// backend/routes/employees.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeesController'); // Import your controller functions

// Route to get all employees from the master view
// Accessible at: GET http://localhost:5000/api/employees/master
router.get('/master', controller.getAllEmployeesMaster);

// Route to add a new employee
// Accessible at: POST http://localhost:5000/api/employees
router.post('/', controller.addEmployee);

// Route to remove an employee
// Accessible at: PUT http://localhost:5000/api/employees/:id/terminate
// ':id' is a URL parameter (e.g., /employees/5/terminate)
router.put('/:id/terminate', controller.removeEmployee);

module.exports = router;