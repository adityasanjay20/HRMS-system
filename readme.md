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
* **bcryptjs**: Library for password hashing.  
* **jsonwebtoken**: Library for JSON Web Token (JWT) generation and verification.

### **Database**

* **Microsoft SQL Server**: Relational database management system.

### **Frontend**

* **React**: JavaScript library for building user interfaces.  
* **Vite**: Fast development build tool for React.  
* **Axios**: Promise-based HTTP client for API calls.  
* **Tailwind CSS**: Utility-first CSS framework for styling.

## **Backend API Features**

The Node.js Express.js API provides the following core functionalities, interacting directly with a well-structured SQL Server database:

* **User Authentication & Authorization**:  
  * User registration (hashing passwords).  
  * User login (JWT generation).  
  * User profile retrieval.  
* **Employee Management**:  
  * Retrieve all current employee details (master list).  
  * Add new employees (including initial role, department, and salary history).  
  * Update core employee details (name, DOB, join date, active status).  
  * Update employee roles and salaries (separate endpoints).  
  * Initiate comprehensive employee offboarding (deactivation, asset returns, gratuity calculation).  
* **Leave & Attendance Management**:  
  * View leave request statuses, summaries, and balances.  
  * Log daily attendance (check-in/check-out) and time spent on projects.  
  * Apply for leave and accrue annual leave.  
* **Payroll & Compensation**:  
  * View salary compensation ratios and distribution by grade.  
  * View historical payroll overview.  
  * Insert, update, and delete payroll records.  
  * Retrieve all salary grades (for dropdowns).  
* **Performance Management**:  
  * Insert and update employee performance appraisals.  
  * View appraisal history.  
* **HR Administration**:  
  * View asset inventory and assigned assets.  
  * View department employee counts and role occupancy history.  
  * View project overviews and project teams.  
  * View candidate status summary and employee onboarding progress/journey.  
  * Add new assets, assign assets to employees, and return assets.  
  * Initiate onboarding process and complete individual onboarding steps.  
  * Create new projects.  
* **Reporting**: Access to various data views for comprehensive reporting.  
* **Business Logic**: Executes stored procedures for consistent and validated data operations.  
* **Auditing**: Triggers in the database ensure an audit trail for important changes.

## **Frontend Application Features**

The React frontend provides a single-page application experience with the following features:

* **User Authentication**:  
  * Dedicated Login and Registration forms.  
  * Persistent user sessions using JWTs stored in localStorage.  
  * Logout functionality.  
* **Global Navigation**:  
  * A responsive top navigation bar to switch between main HRMS sections (Dashboard, Employees, Leave, Payroll, Appraisals, HR Admin).  
  * Role-based visibility for navigation links (e.g., HR Admin link for Admins/HR Managers only).  
* **Dashboard**:  
  * A welcoming landing page after login with quick links to major sections.  
* **Employee Management Section**:  
  * **Employee Master List**: Displays a table of all active and inactive employees with key details.  
  * **Add Employee Form**: Allows authorized users to add new employees with dynamic dropdowns for Departments, Roles, and Salary Grades.  
  * **Edit Employee Form**: Allows authorized users to edit existing employee details (name, DOB, department, role, join date, active status) and update salary components.  
  * **Terminate Employee**: Button in employee list to initiate offboarding via a confirmation modal with a termination date.  
* **Payroll & Compensation Section**:  
  * Displays Payroll Overview and Salary Compa-Ratio data in tables.  
* **Performance Appraisals Section**:  
  * Displays Employee Appraisal History in a table.  
* **General UI/UX**:  
  * Consistent styling with Tailwind CSS.  
  * Loading indicators, success messages, and error messages for API interactions.

## **Prerequisites**

Before running this project, ensure you have the following installed on your machine:

* **Node.js & npm:** Download from [nodejs.org](https://nodejs.org/).  
* **Microsoft SQL Server:** (e.g., SQL Server Express Edition).  
* **SQL Server Management Studio (SSMS) or Azure Data Studio (ADS)**: Recommended for managing your SQL Server instance and executing SQL scripts.  
* **Git:** Download from [git-scm.com](https://git-scm.com/).  
* **Insomnia/Postman:** (Recommended) For testing API endpoints.

## **Setup Instructions**

### **1\. Clone the Repository**

First, clone this repository to your local machine:

git clone https://github.com/adityasanjay20/HRMS-system.git

Then navigate into the project directory:

cd HRMS-system

### **2\. Database Setup**

You need to set up the SQL Server database using the provided scripts.

#### **Create a New Database:**

* Open SSMS or Azure Data Studio.  
* Connect to your SQL Server instance (e.g., DESKTOP-LPSI2AM\\SQLEXPRESS).  
* Right-click on Databases and select **New Database…**.  
* Name the database HRMS\_db (this must match the DB\_DATABASE in your .env file). Click OK.

#### **Execute Schema Script:**

* In SSMS/ADS, open the sql/HRMS\_db\_schema.sql file from your cloned repository.  
* Ensure the script is set to execute against the HRMS\_db database (select HRMS\_db from the dropdown menu in the query editor).  
* Execute the script. This will create all your tables, views, stored procedures, and triggers.

#### **Execute Seed Data Script (Optional):**

* If you have a sql/HRMS\_db\_seed\_data.sql file (for small lookup tables like Departments, Roles, etc.), open it.  
* Ensure it’s executing against HRMS\_db.  
* Execute the script to populate initial data.

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
JWT\_SECRET=YOUR\_SUPER\_STRONG\_RANDOM\_SECRET\_KEY\_HERE\_LIKE\_A\_UUID\_OR\_LONGER

**Important**: Replace DESKTOP-LPSI2AM, hrmsUser, MyStrongP@ssw0rd\!, and YOUR\_SUPER\_STRONG\_RANDOM\_SECRET\_KEY\_HERE\_LIKE\_A\_UUID\_OR\_LONGER with your actual server name, user credentials, and a strong, random JWT secret.

#### **Start the Backend Server:**

node server.js

You should see console messages indicating the database connection is established and the server is running on port 5000\.

### **4\. Frontend Setup**

#### **Navigate to the Frontend Directory:**

cd frontend

#### **Install Dependencies:**

npm install

#### **Configure Tailwind CSS:**

1. **Initialize Tailwind CSS:**  
   npx tailwindcss init \-p

   (If this command fails, manually create tailwind.config.js and postcss.config.js in frontend/ directory).  
2. Configure tailwind.config.js:  
   Open frontend/tailwind.config.js and update the content array:  
   // tailwind.config.js  
   /\*\* @type {import('tailwindcss').Config} \*/  
   export default {  
     content: \[  
       "./index.html",  
       "./src/\*\*/\*.{js,ts,jsx,tsx}",  
     \],  
     theme: {  
       extend: {},  
     },  
     plugins: \[\],  
   }

3. Configure postcss.config.js:  
   Open frontend/postcss.config.js and ensure it uses @tailwindcss/postcss:  
   // postcss.config.js  
   export default {  
     plugins: {  
       '@tailwindcss/postcss': {},  
       autoprefixer: {},  
     },  
   }

4. Add Tailwind directives to src/index.css:  
   Open frontend/src/index.css and add these lines at the very top:  
   /\* frontend/src/index.css \*/  
   @tailwind base;  
   @tailwind components;  
   @tailwind utilities;

   body {  
     font-family: 'Inter', sans-serif;  
   }

5. Modify frontend/index.html:  
   Add class="w-full" to the div\#root tag:  
   \<div id="root" class="w-full"\>\</div\>

#### **Start the Frontend Development Server:**

npm run dev

Open your browser to http://localhost:5173/.

## **Future Enhancements**

* Implement remaining CRUD operations for Payroll, Appraisals, and HR Admin entities.  
* Implement server-side JWT verification middleware for all protected API routes.  
* Add comprehensive client-side form validation and user feedback (e.g., toast notifications).  
* Improve table features: sorting, filtering, pagination.  
* Implement more advanced role-based access control on the backend.  
* Enhance UI/UX with better styling, animations, and responsiveness.  
* Develop dedicated dashboards for each major HR module.  
* Containerize the application using Docker.