# HRMS System

## Project Overview

This project is a Human Resource Management System (HRMS) designed to manage employee data, roles, departments, leave requests, payroll, and performance appraisals. It features a robust SQL Server database backend and a Node.js Express.js API to expose core HR functionalities.

## Project Structure

The repository is organized into the following main directories:

- **backend/**: Contains the Node.js Express.js API application.
- **frontend/**: (To be developed) Will contain the React user interface.
- **sql/**: Contains SQL scripts necessary to recreate the database schema and seed initial data.

## Technology Stack

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **mssql**: Node.js driver for Microsoft SQL Server.
- **dotenv**: Module to load environment variables from a .env file.
- **cors**: Node.js middleware for enabling Cross-Origin Resource Sharing.

### Database

- **Microsoft SQL Server**: Relational database management system.

### Frontend (Future)

- **React**: JavaScript library for building user interfaces.

## Backend API Features

The Node.js Express.js API provides the following core functionalities, interacting directly with a well-structured SQL Server database:

- **Employee Management**:
  - Retrieve all current employee details.
  - Add new employees.
  - Initiate comprehensive employee offboarding (deactivation, asset returns, gratuity calculation).
- **Reporting**: Access to various data views for reporting purposes (e.g., employee master data, salaries, leave statuses).
- **Business Logic**: Executes stored procedures for consistent and validated data operations.
- **Auditing**: Triggers in the database ensure an audit trail for important changes.

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

- **Node.js & npm**: Download from https://nodejs.org/.
- **Microsoft SQL Server**: (e.g., SQL Server Express Edition).
- **SQL Server Management Studio (SSMS) or Azure Data Studio (ADS)**: Recommended for managing your SQL Server instance and executing SQL scripts.
- **Git**: Download from https://git-scm.com/.
- **Insomnia/Postman**: (Recommended) For testing API endpoints.

## Setup Instructions

### 1. Clone the Repository

First, clone this repository to your local machine.

```bash
git clone https://github.com/adityasanjay20/HRMS-system.git
```

Then navigate into the project directory:

```bash
cd HRMS-system
```

### 2. Database Setup

You need to set up the SQL Server database using the provided scripts.

#### Create a New Database:

- Open SSMS or Azure Data Studio.
- Connect to your SQL Server instance (e.g., DESKTOP-LPSI2AM\SQLEXPRESS).
- Right-click on Databases and select **New Database…**.
- Name the database `HRMS_db` (this must match the DB_DATABASE in your .env file). Click OK.

#### Execute Schema Script:

- In SSMS/ADS, open the `sql/HRMS_db_schema.sql` file from your cloned repository.
- Ensure the script is set to execute against the `HRMS_db` database (select HRMS_db from the dropdown menu in the query editor).
- Execute the script. This will create all your tables, views, stored procedures, and triggers.

#### Execute Seed Data Script (Optional):

- If you have a `sql/HRMS_db_seed_data.sql` file (for small lookup tables like Departments, Roles, etc.), open it.
- Ensure it’s executing against `HRMS_db`.
- Execute the script to populate initial data.

#### Create SQL Server Login for the Application:

- In SSMS/ADS Object Explorer, expand **Security** → **Logins**.
- Right-click **Logins** and select **New Login…**.
- Select **SQL Server authentication**.
- **Login name**: Choose a username (e.g., `hrmsUser`).
- **Password**: Set a strong password.
- (Optional for dev: Uncheck “Enforce password policy” for easier testing).
- Go to the **User Mapping** page.
- Check the box next to `HRMS_db`.
- In the “Database role membership for: HRMS_db” section, check `db_owner` (for full control in dev) or more specific roles like `db_datareader`, `db_datawriter`, and EXECUTE permissions on stored procedures.
- Click OK.

> **Important**: Ensure your SQL Server instance is configured for “SQL Server and Windows Authentication mode” (Server Properties → Security). If you change this, you must restart your SQL Server service.

### 3. Backend API Setup

#### Navigate to the Backend Directory:

```bash
cd backend
```

#### Install Dependencies:

```bash
npm install
```

#### Configure Environment Variables:

Create a `.env` file in the `backend/` directory and add your database connection details:

```env
PORT=5000
DB_SERVER=DESKTOP-LPSI2AM  # Or 'localhost', or '127.0.0.1'
DB_DATABASE=HRMS_db
DB_USER=hrmsUser
DB_PASSWORD=MyStrongP@ssw0rd!
```

> **Important**: Replace `DESKTOP-LPSI2AM` and `MyStrongP@ssw0rd!` with your actual server name and user password.

#### Start the Backend Server:

```bash
node server.js
```

You should see console messages indicating the database connection is established and the server is running on port 5000.

### 4. Frontend Setup (Future)

- Navigate to the `frontend/` directory.
- Run `npm install`.
- Run `npm start` (once frontend is developed).

## API Endpoints

The backend API is accessible at `http://localhost:5000/api/employees` (or other base paths for different modules).

|Method|Path            |Description                                                                      |Request Body (JSON) Example for POST/PUT                                                                |
|------|----------------|---------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
|GET   |`/master`       |Get all current employee details from vw_EmployeeMaster.                         |N/A                                                                                                     |
|POST  |`/`             |Add a new employee using AddEmployee stored procedure.                           |`json { "Name": "Jane Doe", "DOB": "1990-01-01", "DeptID": 1, "RoleID": 10, "JoinDate": "2024-01-01" } `|
|PUT   |`/:id/terminate`|Offboard an employee using ExecuteOffboarding stored procedure. id is EmployeeID.|`json { "TerminationDate": "2025-07-03" } `                                                             |

## Future Enhancements

- Implement CRUD operations for other HR entities (Leave Requests, Departments, Roles, Appraisals).
- Add user authentication and authorization.
- Develop the React frontend to consume these APIs.
- Implement robust input validation on the backend.
- Add logging and monitoring capabilities.
- Containerize the application using Docker.
