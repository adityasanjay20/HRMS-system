const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController'); // Import your new controller

router.get('/status', leaveController.getLeaveReqStatus);
router.get('/summary', leaveController.getEmployeeLeaveSummary);
router.get('/onleave', leaveController.getEmployeesCurrentlyOnLeave);
router.get('/bal', leaveController.getLeaveBalances);
router.get('/att', leaveController.getAttendance);
router.get('/tim', leaveController.getTimesheets);

// Route to apply for leave
// Accessible at: POST /api/leave/apply
router.post('/apply', leaveController.applyLeave);

// Route to trigger annual leave accrual
// Accessible at: POST /api/leave/accrueannual
router.post('/accrueannual', leaveController.accrueAnnualLeave);

// Route to log employee attendance (CheckIn/CheckOut)
// Accessible at: POST /api/leave/attendance
router.post('/attendance', leaveController.logAttendance);

// Route to log time worked on a project
// Accessible at: POST /api/leave/logtime
router.post('/logtime', leaveController.logTimeToProject);

module.exports = router;