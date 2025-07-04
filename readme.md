# **HRMS System**

## **Project Overview**

This project is a Human Resource Management System (HRMS) designed to manage employee data, roles, departments, leave requests, payroll, and performance appraisals. It features a robust SQL Server database backend and a Node.js Express.js API to expose core HR functionalities.

## **Project Structure**

The repository is organized into the following main directories:

* backend/: Contains the Node.js Express.js API application.  
* frontend/: (To be developed) Will contain the React user interface.  
* sql/: Contains SQL scripts necessary to recreate the database schema and seed initial data.

## **Technology Stack**

### **Backend**

* **Node.js**: JavaScript runtime environment.  
* **Express.js**: Web application framework for Node.js.  
* **mssql**: Node.js driver for Microsoft SQL Server.  
* **dotenv**: Module to load environment variables from a .env file.  
* **cors**: Node.js middleware for enabling Cross-Origin Resource Sharing.

### **Database**

* **Microsoft SQL Server**: Relational database management system.

### **Frontend (Future)**

* **React**: JavaScript library for building user interfaces.

## **Backend API Features**

The Node.js Express.js API provides the following core functionalities, interacting directly with a well-structured SQL Server database:

* **Employee Management**:  
  * Retrieve all current employee details.  
  * Add new employees.  
  * Initiate comprehensive employee offboarding (deactivation, asset returns, gratuity calculation).  
  * Update employee roles and salaries.  
* **Leave & Attendance Management**:  
  * View leave request statuses, summaries, and balances.  
  * Log daily attendance and time spent on projects.  
  * Apply for leave and accrue annual leave.  
* **Payroll & Compensation**:  
  * View salary compensation ratios and distribution.  
  * Insert, update, and delete payroll records.  
* **Performance Management**:  
  * Insert and update employee performance appraisals.  
  * View appraisal history.  
* **HR Administration**:  
  * Manage asset inventory and assignments.  
  * Track department employee counts and role history.  
  * Manage project details and teams.  
  * Track candidate status and employee onboarding progress.  
* **Reporting**: Access to various data views for reporting purposes (e.g., employee master data, salaries, leave statuses).  
* **Business Logic**: Executes stored procedures for consistent and validated data operations.  
* **Auditing**: Triggers in the database ensure an audit trail for important changes.

## **Prerequisites**

Before running this project, ensure you have the following installed on your machine:

* **Node.js & npm**: Download from [https://nodejs.org/](https://nodejs.org/).  
* **Microsoft SQL Server**: (e.g., SQL Server Express Edition).  
* **SQL Server Management Studio (SSMS) or Azure Data Studio (ADS)**: Recommended for managing your SQL Server instance and executing SQL scripts.  
* **Git**: Download from [https://git-scm.com/](https://git-scm.com/).  
* **Insomnia/Postman**: (Recommended) For testing API endpoints.

## **Setup Instructions**

### **1\. Clone the Repository**

First, clone this repository to your local machine:

git clone https://github.com/adityasanjay20/HRMS-system.git

Then navigate into the project directory:

cd HRMS-system

### **2\. Database Setup**

#### **Create a New Database:**

* Open SSMS or Azure Data Studio.  
* Connect to your SQL Server instance (e.g., DESKTOP-LPSI2AM\\SQLEXPRESS).  
* Right-click on Databases and select **New Database…**.  
* Name the database HRMS\_db (this must match the DB\_DATABASE in your .env file). Click OK.

#### **Execute Schema Script:**

* In SSMS/ADS, open the sql/HRMS\_db\_schema.sql file from your cloned repository.  
* Ensure the script is set to execute against the HRMS\_db database (select HRMS\_db from the dropdown menu in the query editor).  
* Execute the script. This will create all your tables, views, stored procedures, and triggers.

#### **Create SQL Server Login for the Application:**

* In SSMS/ADS Object Explorer, expand **Security** → **Logins**.  
* Right-click **Logins** and select **New Login…**.  
* Select **SQL Server authentication**.  
* **Login name**: Choose a username (e.g., hrmsUser).  
* **Password**: Set a strong password.  
* (Optional for dev: Uncheck “Enforce password policy” for easier testing).  
* Go to the **User Mapping** page.  
* Check the box next to HRMS\_db.  
* In the “Database role membership for: HRMS\_db” section, check db\_owner (for full control in dev) or more specific roles like db\_datareader, db\_datawriter, and EXECUTE permissions on stored procedures.  
* Click OK.

**Important**: Ensure your SQL Server instance is configured for “SQL Server and Windows Authentication mode” (Server Properties → Security). If you change this, you must restart your SQL Server service.

### **3\. Backend API Setup**

#### **Navigate to the Backend Directory:**

cd backend

#### **Install Dependencies:**

npm install

#### **Configure Environment Variables:**

Create a .env file in the backend/ directory and add your database connection details:

PORT=5000  
DB\_SERVER=DESKTOP-LPSI2AM \# Or 'localhost', or '127.0.0.1'  
DB\_DATABASE=HRMS\_db  
DB\_USER=hrmsUser  
DB\_PASSWORD=MyStrongP@ssw0rd\!

**Important**: Replace DESKTOP-LPSI2AM and MyStrongP@ssw0rd\! with your actual server name and user password.

#### **Start the Backend Server:**

node server.js

You should see console messages indicating the database connection is established and the server is running on port 5000\.

### **4\. Frontend Setup (Future)**

* Navigate to the frontend/ directory.  
* Run npm install.  
* Run npm start (once frontend is developed).

## **API Endpoints**

The backend API is organized by logical groups. All endpoints are prefixed with http://localhost:5000/api/.

### **Employee Endpoints (/api/employees)**

| Method | Path | Description | Request Body (JSON) Example for POST/PUT |
| :---- | :---- | :---- | :---- |
| GET | /master | Get all current employee details from vw\_EmployeeMaster. | N/A |
| POST | / | Add a new employee using AddEmployee stored procedure. | json { "Name": "Jane Doe", "DOB": "1990-01-01", "DeptID": 1, "RoleID": 10, "JoinDate": "2024-01-01" } |
| PUT | /:id/terminate | Offboard an employee using ExecuteOffboarding stored procedure. id is EmployeeID. | json { "TerminationDate": "2025-07-03" } |
| PUT | /role | Change an employee's role using ChangeEmployeeRole stored procedure. | json { "EmployeeID": 1, "NewRoleID": 2, "EffectiveDate": "2025-01-01" } |
| PUT | /salary | Update an employee's salary using UpdateSalary stored procedure. | json { "EmployeeID": 1, "EffectiveDate": "2025-01-01", "BasicSalary": 6000.00, "HousingAllowance": 1200.00, "TransportAllowance": 600.00, "OtherAllowances": 250.00, "NewGradeID": 3, "Reason": "Annual Review" } |

### **Leave & Attendance Endpoints (/api/leave)**

| Method | Path | Description | Request Body (JSON) Example for POST/PUT |
| :---- | :---- | :---- | :---- |
| GET | /status | Get all leave request statuses from vw\_LeaveReqStatus. | N/A |
| GET | /summary | Get leave summary by employee from vw\_LeaveSummaryByEmployee. | N/A |
| GET | /onleave | Get employees currently on leave from vw\_EmployeesCurrentlyOnLeave. | N/A |
| GET | /bal | Get employee leave balances from vw\_EmployeeLeaveBalances. | N/A |
| GET | /curleave | Get current leaves from vw\_EmployeesCurrentlyOnLeave. | N/A |
| GET | /att | Get employee attendance from vw\_EmployeeAttendance. | N/A |
| GET | /tim | Get employee timesheets from vw\_EmployeeTimesheets. | N/A |
| POST | /apply | Apply for leave using ApplyLeave stored procedure. | json { "EmployeeID": 1, "LeaveTypeID": 1, "StartDate": "2025-08-01", "EndDate": "2025-08-05" } |
| POST | /accrueannual | Accrue annual leave for all active employees using AccrueAnnualLeave stored procedure. | N/A |
| POST | /attendance | Log employee check-in/check-out using LogAttendance stored procedure. | json { "EmployeeID": 1, "ActionType": "CheckIn" } |
| POST | /logtime | Log time worked on a project using LogTimeToProject stored procedure. | json { "EmployeeID": 1, "ProjectID": 101, "EntryDate": "2025-07-03", "HoursWorked": 8.5, "Description": "Worked on HRMS backend development" } |

### **Payroll & Compensation Endpoints (/api/payroll)**

| Method | Path | Description | Request Body (JSON) Example for POST/PUT |
| :---- | :---- | :---- | :---- |
| GET | /comparatio | Get salary Compa-Ratio data from vw\_SalaryCompaRatio. | N/A |
| GET | /distributionbygrade | Get salary distribution by grade from vw\_SalaryDistributionByGrade. | N/A |
| POST | / | Insert a new payroll record using InsertPayroll stored procedure. | json { "EmployeeID": 1, "PayPeriodStart": "2025-06-01", "PayPeriodEnd": "2025-06-30", "BasicSalary": 5000.00, "HousingAllowance": 1000.00, "TransportAllowance": 500.00, "OtherAllowances": 200.00, "Deductions": 300.00 } |
| PUT | /:id | Update an existing payroll record using UpdatePayroll stored procedure. id is PayrollID. | json { "PayrollID": 1, "BasicSalary": 5200.00, "Allowances": 1750.00, "Deductions": 320.00 } |
| DELETE | /:id | Delete a payroll record using DeletePayroll stored procedure. id is PayrollID. | N/A |

### **Performance Appraisals Endpoints (/api/appraisals)**

| Method | Path | Description | Request Body (JSON) Example for POST/PUT |
| :---- | :---- | :---- | :---- |
| POST | / | Insert a new performance appraisal using InsertAppraisal stored procedure. | json { "EmployeeID": 1, "ReviewerID": 2, "ReviewCycle": "Q2 2025", "ReviewDate": "2025-06-30", "Score": 4.50, "Feedback": "Excellent performance.", "PromotionRecommended": true } |
| PUT | / | Update an existing performance appraisal using UpdateAppraisal stored procedure. | json { "AppraisalID": 123, "Score": 4.80, "Feedback": "Outstanding quarter.", "PromotionRecommended": true } |
| GET | /history | Get all employee appraisals history from vw\_EmployeeAppraisals. | N/A |

### **HR Administration Endpoints (/api/hradmin)**

| Method | Path | Description | Request Body (JSON) Example for POST/PUT |
| :---- | :---- | :---- | :---- |
| GET | /assets/inventory | Get asset inventory from vw\_AssetInventory. | N/A |
| GET | /assets/assigned | Get assigned assets from vw\_AssignedAssets. | N/A |
| GET | /department/count | Get department employee count from vw\_DepartmentEmployeeCount. | N/A |
| GET | /roles/history | Get role occupancy history from vw\_RoleOccupancyHistory. | N/A |
| GET | /projects/overview | Get project overview from vw\_ProjectOverview. | N/A |
| GET | /projects/teams | Get project teams from vw\_ProjectTeams. | N/A |
| GET | /candidates/summary | Get candidate status summary from vw\_CandidateStatusSummary. | N/A |
| GET | /onboarding/status | Get employee onboarding status from vw\_EmployeeOnboardingStatus. | N/A |
| GET | /journey | Get employee journey from vw\_EmployeeJourney. | N/A |
| POST | /assets/add | Add a new asset using AddAsset stored procedure. | json { "CategoryName": "Laptop", "AssetName": "Dell XPS 15", "SerialNumber": "SN123456", "PurchaseDate": "2024-01-01" } |
| POST | /assets/assign | Assign an asset to an employee using AssignAssetToEmployee stored procedure. | json { "AssetID": 1, "EmployeeID": 1, "AssignedDate": "2025-07-01" } |
| PUT | /assets/return | Return an asset using ReturnAsset stored procedure. | json { "AssetID": 1, "ReturnDate": "2025-07-05" } |
| POST | /onboarding/initiate | Initiate onboarding process using InitiateOnboardingProcess stored procedure. | json { "EmployeeID": 1 } |
| PUT | /onboarding/complete-step | Complete an onboarding step using CompleteOnboardingStep stored procedure. | json { "EmployeeID": 1, "StepName": "Sign Employment Contract", "Notes": "Contract signed and filed." } |
| POST | /projects/create | Create a new project using CreateProject stored procedure. | json { "ProjectName": "HRMS Phase 2", "ClientID": 10, "StartDate": "2025-09-01" } |

## **Future Enhancements**

* Implement CRUD operations for other HR entities (Leave Requests, Departments, Roles, Appraisals).  
* Add user authentication and authorization.  
* Develop the React frontend to consume these APIs.  
* Implement robust input validation on the backend.  
* Add logging and monitoring capabilities.  
* Containerize the application using Docker.