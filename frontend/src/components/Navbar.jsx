// frontend/src/components/Navbar.jsx

import React from 'react';

function Navbar({ user, onLogout, setCurrentPage }) {
  return (
    <nav className="bg-blue-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/App Name */}
        <div className="text-white text-2xl font-bold cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
          HRMS
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <button
            className="text-gray-200 hover:text-white transition duration-200 font-medium"
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button
            className="text-gray-200 hover:text-white transition duration-200 font-medium"
            onClick={() => setCurrentPage('employees')}
          >
            Employees
          </button>
          {/* Add Employee Link (Role-Based) */}
          {/* This button will only be visible if the logged-in user's roleName is 'Admin' or 'HR Manager' */}
          {(user.roleName === 'Admin' || user.roleName === 'HR Manager') && (
            <button
              className="text-gray-200 hover:text-white transition duration-200 font-medium"
              onClick={() => setCurrentPage('addEmployee')}
            >
              Add Employee
            </button>
          )}
          <button
            className="text-gray-200 hover:text-white transition duration-200 font-medium"
            onClick={() => setCurrentPage('leave')}
          >
            Leave
          </button>
          <button
            className="text-gray-200 hover:text-white transition duration-200 font-medium"
            onClick={() => setCurrentPage('payroll')}
          >
            Payroll
          </button>
          <button
            className="text-gray-200 hover:text-white transition duration-200 font-medium"
            onClick={() => setCurrentPage('appraisals')}
          >
            Appraisals
          </button>
          {/* HR Admin Link (Role-Based) */}
          {(user.roleName === 'Admin' || user.roleName === 'HR Manager') && (
            <button
              className="text-gray-200 hover:text-white transition duration-200 font-medium"
              onClick={() => setCurrentPage('hradmin')}
            >
              HR Admin
            </button>
          )}
        </div>

        {/* User Info and Logout */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-200 text-lg">
            Welcome, <span className="font-semibold">{user.username}</span>!
          </span>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
