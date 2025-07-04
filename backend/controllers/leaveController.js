const { sql, poolPromise } = require('../config/db');

exports.getLeaveReqStatus = async (req, res)  =>{ // <-- CORRECTED PARAMETER ORDER
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_LeaveReqStatus');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching leave request status:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
}

exports.getEmployeeLeaveSummary = async (req, res)  =>{ // <-- CORRECTED PARAMETER ORDER
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_LeaveSummaryByEmployee');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching leave summary:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
}

exports.getLeaveBalances = async (req, res)  =>{ // <-- CORRECTED PARAMETER ORDER
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_EmployeeLeaveBalances');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching leave balances:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
}

exports.getEmployeesCurrentlyOnLeave = async (req, res)  =>{ // <-- CORRECTED PARAMETER ORDER
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_EmployeesCurrentlyOnLeave');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching employees currently on leave:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
}
    
exports.getAttendance = async (req, res)  =>{ // <-- CORRECTED PARAMETER ORDER
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_EmployeeAttendance'); // Assuming vw_EmployeesAttendance is a typo and it's vw_EmployeeAttendance
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching employee attendance', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
}

exports.getTimesheets = async (req, res)  =>{ // <-- CORRECTED PARAMETER ORDER
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_EmployeeTimesheets');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching employee timesheets:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
}

// --- Stored Procedure Controllers (NEW) ---

// Controller to apply for leave using ApplyLeave stored procedure
exports.applyLeave = async (req, res) => {
    try {
        // Parameters for ApplyLeave SP: @EmployeeID, @LeaveTypeID, @StartDate, @EndDate
        // Note: Change LeaveType to LeaveTypeID here to match the SP
        const { EmployeeID, LeaveTypeID, StartDate, EndDate } = req.body; //

        if (!EmployeeID || !LeaveTypeID || !StartDate || !EndDate) {
            return res.status(400).json({ message: 'All fields (EmployeeID, LeaveTypeID, StartDate, EndDate) are required.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('LeaveTypeID', sql.Int, LeaveTypeID) // CHANGED: Now sending LeaveTypeID as an INT
            .input('StartDate', sql.Date, StartDate)
            .input('EndDate', sql.Date, EndDate)
            .execute('ApplyLeave');

        // ApplyLeave SP returns SCOPE_IDENTITY() as LeaveID
        res.status(201).json({ message: 'Leave applied successfully!', leaveId: result.returnValue });
    } catch (err) {
        console.error('Error applying leave:', err.message);
        res.status(500).send({ message: 'Error applying leave', error: err.message });
    }
};


// Controller to accrue annual leave using AccrueAnnualLeave stored procedure
exports.accrueAnnualLeave = async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.request().execute('AccrueAnnualLeave'); // No parameters needed for this SP
        res.status(200).json({ message: 'Annual leave accrued successfully for all active employees.' });
    } catch (err) {
        console.error('Error accruing annual leave:', err.message);
        res.status(500).send({ message: 'Error accruing annual leave', error: err.message });
    }
};

// Controller to log attendance (CheckIn/CheckOut) using LogAttendance stored procedure
exports.logAttendance = async (req, res) => {
    try {
        // Parameters for LogAttendance SP: @EmployeeID, @ActionType
        const { EmployeeID, ActionType } = req.body;

        if (!EmployeeID || !ActionType) {
            return res.status(400).json({ message: 'EmployeeID and ActionType (CheckIn/CheckOut) are required.' });
        }
        if (ActionType !== 'CheckIn' && ActionType !== 'CheckOut') {
            return res.status(400).json({ message: 'Invalid ActionType. Must be "CheckIn" or "CheckOut".' });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('ActionType', sql.VarChar(10), ActionType) // Assuming VARCHAR(10) for ActionType
            .execute('LogAttendance');

        res.status(200).json({ message: `Employee ${EmployeeID} ${ActionType} successful.` });
    } catch (err) {
        console.error('Error logging attendance:', err.message);
        res.status(500).send({ message: 'Error logging attendance', error: err.message });
    }
};

// Controller to log time to project using LogTimeToProject stored procedure
exports.logTimeToProject = async (req, res) => {
    try {
        // Parameters for LogTimeToProject SP: @EmployeeID, @ProjectID, @EntryDate, @HoursWorked, @Description
        const { EmployeeID, ProjectID, EntryDate, HoursWorked, Description } = req.body;

        if (!EmployeeID || !ProjectID || !EntryDate || !HoursWorked) {
            return res.status(400).json({ message: 'EmployeeID, ProjectID, EntryDate, and HoursWorked are required.' });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('ProjectID', sql.Int, ProjectID)
            .input('EntryDate', sql.Date, EntryDate)
            .input('HoursWorked', sql.Decimal(4, 2), HoursWorked) // Matching DECIMAL(4,2)
            .input('Description', sql.NVarChar(500), Description) // Matching NVARCHAR(500)
            .execute('LogTimeToProject');

        res.status(201).json({ message: 'Time logged to project successfully!' });
    } catch (err) {
        console.error('Error logging time to project:', err.message);
        res.status(500).send({ message: 'Error logging time to project', error: err.message });
    }
};