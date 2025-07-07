// frontend/src/components/Dashboard.jsx

import React from 'react';

function Dashboard({ user, setCurrentPage }) {
  return (
    <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to your HRMS Dashboard, {user.username}!
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Your role: <span className="font-semibold">{user.roleName}</span>
      </p>
      <p className="text-md text-gray-700 mb-8">
        Select a section from the navigation bar above to get started.
      </p>

      {/* Quick Links/Cards (Example) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="bg-blue-100 p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-200 transition duration-200"
          onClick={() => setCurrentPage('employees')}
        >
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Employee List</h3>
          <p className="text-blue-700">View all active employees.</p>
        </div>

        <div
          className="bg-green-100 p-6 rounded-lg shadow-md cursor-pointer hover:bg-green-200 transition duration-200"
          onClick={() => setCurrentPage('leave')}
        >
          <h3 className="text-xl font-semibold text-green-800 mb-2">Leave Management</h3>
          <p className="text-green-700">Manage leave requests and balances.</p>
        </div>

        {/* Example of Role-Based Quick Link */}
        {(user.roleName === 'Admin' || user.roleName === 'HR Manager') && (
          <div
            className="bg-purple-100 p-6 rounded-lg shadow-md cursor-pointer hover:bg-purple-200 transition duration-200"
            onClick={() => setCurrentPage('payroll')}
          >
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Payroll & Compensation</h3>
            <p className="text-purple-700">Access payroll reports and data.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;