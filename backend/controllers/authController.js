// backend/controllers/authController.js

const { sql, poolPromise } = require('../config/db'); // Adjust path if db.js is in 'db' directly
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for JWT operations

// Ensure JWT_SECRET is loaded from .env
const jwtSecret = process.env.JWT_SECRET;

// Basic check for JWT_SECRET - IMPORTANT for production environments!
// If JWT_SECRET is not defined, the application should not start.
if (!jwtSecret) {
    console.error('FATAL ERROR: JWT_SECRET is not defined in environment variables!');
    console.error('Please add JWT_SECRET=your_strong_secret_key to your .env file.');
    process.exit(1); // Exit the process if the secret is missing
}

exports.loginUser = async (req, res) => {
    try {
        const { Username, Password } = req.body;

        if (!Username || !Password) {
            return res.status(400).json({ message: 'Username and Password are required.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('Username', sql.NVarChar(50), Username)
            .execute('AuthenticateUser');

        const user = result.recordset[0];
        if (!user || !user.IsActive) {
            return res.status(401).json({ message: 'Invalid credentials or user is inactive.' });
        }

        console.log('Backend: Raw user object from DB query:', user);

        const isMatch = await bcrypt.compare(Password, user.PasswordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const payload = {
            userId: user.UserID,
            username: user.Username,
            roleId: user.RoleID,
            roleName: user.RoleName
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful!',
            token,
            user: payload
        });

    } catch (err) {
        console.error('Error during user login:', err.message);
        res.status(500).send({ message: 'Internal Server Error', error: err.message });
    }
};



// Controller for user registration
exports.registerUser = async (req, res) => {
    try {
        const { Username, Password, RoleID } = req.body;

        // Basic validation for required fields
        if (!Username || !Password || !RoleID) {
            return res.status(400).json({ message: 'Username, Password, and RoleID are required.' });
        }

        // Hash the password before storing it in the database
        // genSalt generates a salt (random string) to add to the password before hashing,
        // making it harder to crack even if two users have the same password.
        const salt = await bcrypt.genSalt(10); // 10 is the number of salt rounds (computational cost)
        const hashedPassword = await bcrypt.hash(Password, salt); // Hash the password with the generated salt

        const pool = await poolPromise; // Get a connection from the pool
        const result = await pool.request()
            .input('Username', sql.NVarChar(50), Username) // Input Username parameter
            .input('PasswordHash', sql.NVarChar(255), hashedPassword) // Input hashed password parameter
            .input('RoleID', sql.Int, RoleID) // Input RoleID parameter
            .execute('RegisterUser'); // Execute the RegisterUser stored procedure

        // Check for custom return codes from the stored procedure
        // RegisterUser SP returns -1 if username exists, -2 if RoleID is invalid
        if (result.returnValue === -1) {
            return res.status(409).json({ message: 'Username already exists.' }); // 409 Conflict status
        }
        if (result.returnValue === -2) {
            return res.status(400).json({ message: 'Invalid RoleID supplied.' }); // 400 Bad Request status
        }

        // Assuming RegisterUser SP returns the new UserID via SELECT SCOPE_IDENTITY()
        // We extract the UserID from the recordset
        let newUserId = null;
        if (result.recordset && result.recordset.length > 0) {
            newUserId = Object.values(result.recordset[0])[0]; // Get the value of the first column in the first row
        }

        // Send a success response with the new user's ID
        res.status(201).json({ message: 'User registered successfully!', userId: newUserId }); // 201 Created status
    } catch (err) {
        // Log the detailed error on the server side
        console.error('Error during user registration:', err.message);
        // Send a generic internal server error response to the client
        res.status(500).send({ message: 'Internal Server Error', error: err.message });
    }
};

// Controller to get user profile by UserID
// This endpoint would typically be protected by authentication middleware in a real app.
exports.getUserProfile = async (req, res) => {
    try {
        // Assuming UserID will come from a URL parameter (e.g., /auth/profile/1)
        // In a real app, this might come from the authenticated user's JWT payload.
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'UserID is required.' });
        }

        const pool = await poolPromise; // Get a connection from the pool
        const result = await pool.request()
            .input('UserID', sql.Int, userId) // Input UserID parameter
            .execute('GetUserProfile'); // Execute GetUserProfile stored procedure

        // Check if user profile was found
        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({ message: 'User profile not found.' }); // 404 Not Found
        }

        // Send the user profile data
        res.status(200).json({
            message: 'User profile retrieved successfully.',
            profile: result.recordset[0] // Send the first (and only) row of the profile
        });

    } catch (err) {
        console.error('Error retrieving user profile:', err.message);
        res.status(500).send({ message: 'Internal Server Error', error: err.message });
    }
};