const { sql, poolPromise } = require('../config/db');

exports.getPayrollOverview = async (req, res)  =>{ 
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM vw_PayrollOverview');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching payroll overview:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
}

exports.getSalaryCompaRatio = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.vw_SalaryCompaRatio');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching Salary Compa-Ratio:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

exports.getAllSalaryGrades = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT GradeID, GradeName, MinSalary, MidSalary, MaxSalary FROM SalaryGrades');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching all salary grades:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};


exports.getSalaryDistributionByGrade = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.vw_SalaryDistributionByGrade');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching Salary Distribution By Grade:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// --- Stored Procedure Controllers (NEW) ---

// Controller to insert a new payroll record
exports.insertPayroll = async (req, res) => {
    try {
        // Parameters for InsertPayroll SP:
        // @EmployeeID, @PayPeriodStart, @PayPeriodEnd, @BasicSalary, @HousingAllowance,
        // @TransportAllowance, @OtherAllowances, @Deductions
        const { EmployeeID, PayPeriodStart, PayPeriodEnd, BasicSalary, HousingAllowance, TransportAllowance, OtherAllowances, Deductions } = req.body;

        // Basic validation
        if (!EmployeeID || !PayPeriodStart || !PayPeriodEnd || BasicSalary === undefined || HousingAllowance === undefined || TransportAllowance === undefined || OtherAllowances === undefined || Deductions === undefined) {
            return res.status(400).json({ message: 'All payroll fields are required.' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .input('PayPeriodStart', sql.Date, PayPeriodStart)
            .input('PayPeriodEnd', sql.Date, PayPeriodEnd)
            .input('BasicSalary', sql.Money, BasicSalary)         // Matching money type
            .input('HousingAllowance', sql.Money, HousingAllowance)
            .input('TransportAllowance', sql.Money, TransportAllowance)
            .input('OtherAllowances', sql.Money, OtherAllowances)
            .input('Deductions', sql.Money, Deductions)
            .execute('InsertPayroll');

        // Assuming InsertPayroll SP might return the new PayrollID (e.g., via SELECT SCOPE_IDENTITY())
        let payrollId = 0;
        if (result.recordset && result.recordset.length > 0) {
            payrollId = Object.values(result.recordset[0])[0];
        }

        res.status(201).json({ message: 'Payroll record inserted successfully!', payrollId: payrollId });
    } catch (err) {
        console.error('Error inserting payroll record:', err.message);
        res.status(500).send({ message: 'Error inserting payroll record', error: err.message });
    }
};

// Controller to update an existing payroll record
exports.updatePayroll = async (req, res) => {
    try {
        // Parameters for UpdatePayroll SP:
        // @PayrollID, @BasicSalary, @Allowances, @Deductions
        const { PayrollID, BasicSalary, Allowances, Deductions } = req.body;

        // Basic validation
        if (!PayrollID || BasicSalary === undefined || Allowances === undefined || Deductions === undefined) {
            return res.status(400).json({ message: 'All update payroll fields (PayrollID, BasicSalary, Allowances, Deductions) are required.' });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('PayrollID', sql.Int, PayrollID)
            .input('BasicSalary', sql.Money, BasicSalary)
            .input('Allowances', sql.Money, Allowances) // Note: SP uses 'Allowances' as a single money type, not individual ones
            .input('Deductions', sql.Money, Deductions)
            .execute('UpdatePayroll');

        res.status(200).json({ message: 'Payroll record updated successfully!' });
    } catch (err) {
        console.error('Error updating payroll record:', err.message);
        res.status(500).send({ message: 'Error updating payroll record', error: err.message });
    }
};

// Controller to delete a payroll record
exports.deletePayroll = async (req, res) => {
    try {
        // Parameter for DeletePayroll SP: @PayrollID
        const { id } = req.params; // Assuming PayrollID comes from URL parameter

        if (!id) {
            return res.status(400).json({ message: 'PayrollID is required for deletion.' });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('PayrollID', sql.Int, id)
            .execute('DeletePayroll');

        res.status(200).json({ message: 'Payroll record deleted successfully!' });
    } catch (err) {
        console.error('Error deleting payroll record:', err.message);
        res.status(500).send({ message: 'Error deleting payroll record', error: err.message });
    }
};