// backend/routes/hrAdminRoutes.js

const express = require('express');
const router = express.Router();
const hrAdminController = require('../controllers/hrAdminController'); // Import your controller

router.get('/assets/inventory', hrAdminController.getAssetInventory);
router.get('/assets/assigned', hrAdminController.getAssignedAssets);
router.get('/department/count', hrAdminController.getDepartmentEmployeeCount);
router.get('/roles/history', hrAdminController.getRoleOccupancyHistory);
router.get('/projects/overview', hrAdminController.getProjectOverview);
router.get('/projects/teams', hrAdminController.getProjectTeams);
router.get('/candidates/summary', hrAdminController.getCandidateStatusSummary);
router.get('/onboarding/status', hrAdminController.getEmployeeOnboardingStatus);
router.get('/journey', hrAdminController.getEmployeeJourney);
router.post('/assets/add', hrAdminController.addAsset);
router.post('/assets/assign', hrAdminController.assignAssetToEmployee);
router.put('/assets/return', hrAdminController.returnAsset); 
router.post('/onboarding/initiate', hrAdminController.initiateOnboardingProcess);
router.put('/onboarding/complete-step', hrAdminController.completeOnboardingStep);
router.post('/projects/create', hrAdminController.createProject);


module.exports = router;