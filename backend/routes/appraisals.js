const express = require('express');
const router = express.Router();
const appraisalController = require('../controllers/appraisalController'); 

router.post('/', appraisalController.insertAppraisal);
router.put('/', appraisalController.updateAppraisal);
router.get('/appraisals', appraisalController.getEmployeeAppraisals)

module.exports = router;