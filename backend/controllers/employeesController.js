// backend/controllers/employeesController.js

const { sql, poolPromise } = require('../config/db'); // Adjust path if db.js is in 'config' subfolder

// Controller to get all employees using your master view
exports.getAllEmployeesMaster = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_EmployeeMaster');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching all employees:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller to add a new employee using your AddEmployee stored procedure
exports.addEmployee = async (req, res) => {
  try {
    // Parameters for AddEmployee SP: @Name, @DOB, @DeptID, @RoleID, @JoinDate
    const { Name, DOB, DeptID, RoleID, JoinDate } = req.body;

    // Basic validation
    if (!Name || !DOB || !DeptID || !RoleID || !JoinDate) {
      return res.status(400).json({ message: 'All fields (Name, DOB, DeptID, RoleID, JoinDate) are required.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('Name', sql.NVarChar(50), Name)
      .input('DOB', sql.Date, DOB)
      .input('DeptID', sql.Int, DeptID)
      .input('RoleID', sql.Int, RoleID)
      .input('JoinDate', sql.Date, JoinDate)
      .execute('AddEmployee'); // Execute your AddEmployee stored procedure

    res.status(201).json({ message: 'Employee added successfully!' });
  } catch (err) {
    console.error('Error adding employee:', err.message);
    res.status(500).send({ message: 'Error adding employee', error: err.message });
  }
};

// Controller to offboard an employee using your ExecuteOffboarding master stored procedure
exports.removeEmployee = async (req, res) => {
    try {
        // EmployeeID from URL parameters (e.g., /employees/5/terminate)
        const { id } = req.params;
        // TerminationDate from request body
        // Parameters for ExecuteOffboarding SP: @EmployeeID, @TerminationDate
        const { TerminationDate } = req.body; // Changed from EffectiveTerminationDate to TerminationDate to match SP

        if (!TerminationDate) {
            return res.status(400).json({ message: 'TerminationDate is required in the request body.' });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('EmployeeID', sql.Int, id) // Matching type INT from SQL
            .input('TerminationDate', sql.Date, TerminationDate) // Matching type DATE from SQL
            .execute('ExecuteOffboarding'); // Execute your ExecuteOffboarding master stored procedure

        res.status(200).json({ message: 'Employee offboarding process initiated successfully.' });

    } catch (err) {
        console.error('Error offboarding employee:', err.message);
        res.status(500).send({ message: 'Error during employee offboarding', error: err.message });
    }
};