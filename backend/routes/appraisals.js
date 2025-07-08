const express = require('express');
const router = express.Router(); // FIX: Correctly initialize router

const appraisalController = require('../controllers/appraisalController'); 

router.post('/', appraisalController.insertAppraisal);
router.put('/', appraisalController.updateAppraisal);
router.get('/history', appraisalController.getEmployeeAppraisals)

module.exports = router;