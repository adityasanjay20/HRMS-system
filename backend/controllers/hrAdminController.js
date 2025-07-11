// backend/controllers/hrAdminController.js

const { sql, poolPromise } = require('../config/db'); // Adjust path if db.js is in 'db' directly

// Controller for Asset Inventory
exports.getAssetInventory = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.vw_AssetInventory');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching asset inventory:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller for Assigned Assets
exports.getAssignedAssets = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.vw_AssignedAssets');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching assigned assets:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller for Department Employee Count
exports.getDepartmentEmployeeCount = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.vw_DepartmentEmployeeCount');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching department employee count:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller for Role Occupancy History
exports.getRoleOccupancyHistory = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.vw_RoleOccupancyHistory');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching role occupancy history:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller for Project Overview
exports.getProjectOverview = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.vw_ProjectOverview');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching project overview:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller for Project Teams
exports.getProjectTeams = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.vw_ProjectTeams');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching project teams:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller for Candidate Status Summary
exports.getCandidateStatusSummary = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.vw_CandidateStatusSummary');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching candidate status summary:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller for Employee Onboarding Status
exports.getEmployeeOnboardingStatus = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.vw_EmployeeOnboardingStatus');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching employee onboarding status:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller for Employee Journey
exports.getEmployeeJourney = async (req, res) => {
  try {
    const pool = await poolPromise; // Corrected: single await
    const result = await pool.request().query('SELECT * FROM dbo.vw_EmployeeJourney');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching employee journey:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// --- Stored Procedure Controllers ---

// Controller to get all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Departments'); // or the actual view/table
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching departments:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};

// Controller to get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM dbo.Roles'); // or the actual view/table
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching roles:', err.message);
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
};


// Controller to add a new asset
exports.addAsset = async (req, res) => {
  try {
    const { CategoryName, AssetName, SerialNumber, PurchaseDate } = req.body;

    if (!CategoryName || !AssetName || !SerialNumber || !PurchaseDate) {
      return res.status(400).json({ message: 'All asset fields are required.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('CategoryName', sql.VarChar(100), CategoryName)
      .input('AssetName', sql.VarChar(100), AssetName)
      .input('SerialNumber', sql.VarChar(100), SerialNumber)
      .input('PurchaseDate', sql.Date, PurchaseDate)
      .execute('AddAsset');

    res.status(201).json({ message: 'Asset added successfully!' });
  } catch (err) {
    console.error('Error adding asset:', err.message);
    res.status(500).send({ message: 'Error adding asset', error: err.message });
  }
};

// Controller to assign an asset to an employee
exports.assignAssetToEmployee = async (req, res) => {
  try {
    const { AssetID, EmployeeID, AssignedDate } = req.body;

    if (!AssetID || !EmployeeID || !AssignedDate) {
      return res.status(400).json({ message: 'AssetID, EmployeeID, and AssignedDate are required.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('AssetID', sql.Int, AssetID)
      .input('EmployeeID', sql.Int, EmployeeID)
      .input('AssignedDate', sql.Date, AssignedDate)
      .execute('AssignAssetToEmployee');

    res.status(200).json({ message: 'Asset assigned successfully!' });
  } catch (err) {
    console.error('Error assigning asset:', err.message);
    res.status(500).send({ message: 'Error assigning asset', error: err.message });
  }
};

// Controller to return an asset
exports.returnAsset = async (req, res) => {
  try {
    const { AssetID, ReturnDate } = req.body;

    if (!AssetID || !ReturnDate) {
      return res.status(400).json({ message: 'AssetID and ReturnDate are required.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('AssetID', sql.Int, AssetID)
      .input('ReturnDate', sql.Date, ReturnDate)
      .execute('ReturnAsset');

    res.status(200).json({ message: 'Asset returned successfully!' });
  } catch (err) {
    console.error('Error returning asset:', err.message);
    res.status(500).send({ message: 'Error returning asset', error: err.message });
  }
};

// Controller to initiate onboarding process
exports.initiateOnboardingProcess = async (req, res) => {
  try {
    const { EmployeeID } = req.body;

    if (!EmployeeID) {
      return res.status(400).json({ message: 'EmployeeID is required to initiate onboarding.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('EmployeeID', sql.Int, EmployeeID)
      .execute('InitiateOnboardingProcess');

    res.status(200).json({ message: 'Onboarding process initiated successfully.' });
  } catch (err) {
    console.error('Error initiating onboarding process:', err.message);
    res.status(500).send({ message: 'Error initiating onboarding process', error: err.message });
  }
};

// Controller to complete an onboarding step
exports.completeOnboardingStep = async (req, res) => {
  try {
    const { EmployeeID, StepName, Notes } = req.body;

    if (!EmployeeID || !StepName) {
      return res.status(400).json({ message: 'EmployeeID and StepName are required.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('EmployeeID', sql.Int, EmployeeID)
      .input('StepName', sql.VarChar(255), StepName)
      .input('Notes', sql.NVarChar(500), Notes)
      .execute('CompleteOnboardingStep');

    res.status(200).json({ message: 'Onboarding step completed successfully.' });
  } catch (err) {
    console.error('Error completing onboarding step:', err.message);
    res.status(500).send({ message: 'Error completing onboarding step', error: err.message });
  }
};

// Controller to create a new project
exports.createProject = async (req, res) => {
  try {
    const { ProjectName, ClientID, StartDate } = req.body;

    if (!ProjectName || !StartDate) {
      return res.status(400).json({ message: 'ProjectName and StartDate are required.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('ProjectName', sql.VarChar(150), ProjectName)
      .input('ClientID', sql.Int, ClientID || null)
      .input('StartDate', sql.Date, StartDate)
      .execute('CreateProject');

    res.status(201).json({ message: 'Project created successfully!' });
  } catch (err) {
    console.error('Error creating project:', err.message);
    res.status(500).send({ message: 'Error creating project', error: err.message });
  }
};

// --- NEW DEBUG LOGS ---
console.log('hrAdminController.js: Module loaded.');
console.log('hrAdminController.js: exports.getAssetInventory is:', exports.getAssetInventory);
console.log('hrAdminController.js: exports.getAssignedAssets is:', exports.getAssignedAssets);
console.log('hrAdminController.js: exports.getDepartmentEmployeeCount is:', exports.getDepartmentEmployeeCount);
console.log('hrAdminController.js: exports.getRoleOccupancyHistory is:', exports.getRoleOccupancyHistory);
console.log('hrAdminController.js: exports.getProjectOverview is:', exports.getProjectOverview);
console.log('hrAdminController.js: exports.getProjectTeams is:', exports.getProjectTeams);
console.log('hrAdminController.js: exports.getCandidateStatusSummary is:', exports.getCandidateStatusSummary);
console.log('hrAdminController.js: exports.getEmployeeOnboardingStatus is:', exports.getEmployeeOnboardingStatus);
console.log('hrAdminController.js: exports.getEmployeeJourney is:', exports.getEmployeeJourney);
console.log('hrAdminController.js: exports.addAsset is:', exports.addAsset);
console.log('hrAdminController.js: exports.assignAssetToEmployee is:', exports.assignAssetToEmployee);
console.log('hrAdminController.js: exports.returnAsset is:', exports.returnAsset);
console.log('hrAdminController.js: exports.initiateOnboardingProcess is:', exports.initiateOnboardingProcess);
console.log('hrAdminController.js: exports.completeOnboardingStep is:', exports.completeOnboardingStep);
console.log('hrAdminController.js: exports.createProject is:', exports.createProject);
// --- END NEW DEBUG LOGS ---