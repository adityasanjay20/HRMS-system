const { sql, poolPromise } = require('../config/db');

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

// Controller to get current employees salaries
exports.getCurrentEmployeeSalries = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_CurrentEmployeeSalaries');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching all employees salaries:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller to get employees' full profiles
exports.getEmployeeFullProfile = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_EmployeeFullProfile');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching employee full profile:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller to get current employees details
exports.getCurrentEmployeeDetails = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_CurrentEmployeeDetails');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching employee details:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    // NEW: Add initial salary and grade parameters to the request body
    const { Name, DOB, DeptID, RoleID, JoinDate, BasicSalary, HousingAllowance, TransportAllowance, OtherAllowances, GradeID } = req.body;

    // Basic validation (adjust as needed for new salary fields)
    if (!Name || !DOB || !DeptID || !RoleID || !JoinDate || BasicSalary === undefined || HousingAllowance === undefined || TransportAllowance === undefined || OtherAllowances === undefined || GradeID === undefined) {
      return res.status(400).json({ message: 'All employee fields, including initial salary and grade, are required.' });
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input('Name', sql.NVarChar(50), Name)
      .input('DOB', sql.Date, DOB)
      .input('DeptID', sql.Int, DeptID)
      .input('RoleID', sql.Int, RoleID)
      .input('JoinDate', sql.Date, JoinDate)
      // NEW: Input for initial salary and grade
      .input('BasicSalary', sql.Money, BasicSalary)
      .input('HousingAllowance', sql.Money, HousingAllowance)
      .input('TransportAllowance', sql.Money, TransportAllowance)
      .input('OtherAllowances', sql.Money, OtherAllowances)
      .input('GradeID', sql.Int, GradeID) // Pass GradeID to the SP
      .execute('AddEmployee'); // Execute your AddEmployee stored procedure

    // Assuming AddEmployee SP now returns the new EmployeeID via SELECT @EmployeeID AS EmployeeID;
    let newEmployeeId = null;
    if (result.recordset && result.recordset.length > 0) {
        newEmployeeId = Object.values(result.recordset[0])[0];
    }

    res.status(201).json({ message: 'Employee added successfully!', employeeId: newEmployeeId });
  } catch (err) {
    console.error('Error adding employee:', err.message);
    res.status(500).send({ message: 'Error adding employee', error: err.message });
  }
};

exports.updateEmployeeDetails = async (req, res) => {
    try {
        // Parameters: @EmployeeID, @Name, @DOB, @DeptID, @RoleID, @JoinDate, @IsActive
        const { id } = req.params; // EmployeeID from URL
        const { Name, DOB, DeptID, RoleID, JoinDate, IsActive } = req.body;

        if (!id || !Name || !DOB || !DeptID || !RoleID || !JoinDate || IsActive === undefined) {
            return res.status(400).json({ message: 'All core employee fields are required for update.' });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('EmployeeID', sql.Int, id)
            .input('Name', sql.NVarChar(50), Name)
            .input('DOB', sql.Date, DOB)
            .input('DeptID', sql.Int, DeptID)
            .input('RoleID', sql.Int, RoleID)
            .input('JoinDate', sql.Date, JoinDate)
            .input('IsActive', sql.Bit, IsActive)
            .execute('UpdateEmployeeDetails'); // Call the new SP

        res.status(200).json({ message: 'Employee core details updated successfully!' });
    } catch (err) {
        console.error('Error updating employee core details:', err.message);
        res.status(500).send({ message: 'Error updating employee core details', error: err.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params; // EmployeeID from URL

        if (!id) {
            return res.status(400).json({ message: 'EmployeeID is required.' });
        }

        // NEW: Explicitly parse id to an integer
        const employeeIdInt = parseInt(id, 10); // Parse the string ID to an integer

        // Basic validation for parsed ID
        if (isNaN(employeeIdInt)) {
            return res.status(400).json({ message: 'Invalid EmployeeID format.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('EmployeeID', sql.Int, employeeIdInt) // Use the parsed integer
            .query('SELECT * FROM vw_EmployeeMaster WHERE EmployeeID = @EmployeeID');

        if (!result.recordset || result.recordset.length === 0) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching employee by ID:', err.message);
        res.status(500).send({ message: 'Internal Server Error', error: err.message });
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
// --- Stored Procedure Controllers---

// Controller to change an employee's role
exports.changeEmployeeRole = async (req, res) => {
  try {
    // Parameters: @EmployeeID, @NewRoleID, @EffectiveDate
    const { EmployeeID, NewRoleID, EffectiveDate } = req.body;

    if (!EmployeeID || !NewRoleID || !EffectiveDate) {
      return res.status(400).json({ message: 'EmployeeID, NewRoleID, and EffectiveDate are required.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('EmployeeID', sql.Int, EmployeeID)
      .input('NewRoleID', sql.Int, NewRoleID)
      .input('EffectiveDate', sql.Date, EffectiveDate)
      .execute('ChangeEmployeeRole');

    res.status(200).json({ message: 'Employee role changed successfully!' });
  } catch (err) {
    console.error('Error changing employee role:', err.message);
    res.status(500).send({ message: 'Error changing employee role', error: err.message });
  }
};

// Controller to update employee salary
exports.updateSalary = async (req, res) => {
  try {
    // Parameters: @EmployeeID, @EffectiveDate, @BasicSalary, @HousingAllowance,
    // @TransportAllowance, @OtherAllowances, @NewGradeID, @Reason
    const { EmployeeID, EffectiveDate, BasicSalary, HousingAllowance, TransportAllowance, OtherAllowances, NewGradeID, Reason } = req.body;

    if (!EmployeeID || !EffectiveDate || BasicSalary === undefined || HousingAllowance === undefined || TransportAllowance === undefined || OtherAllowances === undefined || NewGradeID === undefined || !Reason) {
      return res.status(400).json({ message: 'All salary update fields are required.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('EmployeeID', sql.Int, EmployeeID)
      .input('EffectiveDate', sql.Date, EffectiveDate)
      .input('BasicSalary', sql.Money, BasicSalary)
      .input('HousingAllowance', sql.Money, HousingAllowance)
      .input('TransportAllowance', sql.Money, TransportAllowance)
      .input('OtherAllowances', sql.Money, OtherAllowances)
      .input('NewGradeID', sql.Int, NewGradeID)
      .input('Reason', sql.VarChar(255), Reason)
      .execute('UpdateSalary');

    res.status(200).json({ message: 'Employee salary updated successfully!' });
  } catch (err) {
    console.error('Error updating salary:', err.message);
    res.status(500).send({ message: 'Error updating salary', error: err.message });
  }
};