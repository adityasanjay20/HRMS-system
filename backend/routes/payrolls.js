const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController'); 

router.get('/payroll', payrollController.getPayrollOverview)
router.get('/comparatio', payrollController.getSalaryCompaRatio)
router.get('/distributionbygrade',payrollController.getSalaryDistributionByGrade)
router.post('/', payrollController.insertPayroll);
router.put('/:id', payrollController.updatePayroll);
router.delete('/:id', payrollController.deletePayroll);
module.exports = router;