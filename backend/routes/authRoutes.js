// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import your new controller

// Route for user registration
// Accessible at: POST /api/auth/register
router.post('/register', authController.registerUser);

// Route for user login
// Accessible at: POST /api/auth/login
router.post('/login', authController.loginUser);

// Route to get user profile by ID
// Accessible at: GET /api/auth/profile/:userId
router.get('/profile/:userId', authController.getUserProfile);


module.exports = router;