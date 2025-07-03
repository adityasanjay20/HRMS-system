// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import the database poolPromise and sql object from db.js
const { sql, poolPromise } = require('./config/db'); // Ensure this path is correct

// Import your employee routes
const employeeRoutes = require('./routes/employees');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies from incoming requests

// API Routes
// This mounts the employeeRoutes router under the base path '/api/employees'.
// E.g., router.get('/master') becomes GET http://localhost:5000/api/employees/master
app.use('/api/employees', employeeRoutes);

// A simple root route to confirm the server is running
app.get('/', (req, res) => {
  res.send('HRMS API is running...');
});

// Function to start the server after database connection is established
async function startServer() {
  try {
    await poolPromise; // Wait for the database connection pool to be established
    console.log('Database connection established.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server due to database connection error:', err.message);
    process.exit(1); // Exit the process if DB connection fails
  }
}

// Call the async function to start the server
startServer();

// Add graceful shutdown for the database pool
process.on('SIGINT', async () => {
    console.log('Closing SQL connection pool...');
    await sql.close(); // Use the 'sql' object imported from db.js
    console.log('SQL connection pool closed. Server shutting down.');
    process.exit(0);
});