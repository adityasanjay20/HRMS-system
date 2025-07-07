// frontend/src/components/LeaveDashboard.jsx

import React from 'react';

function LeaveDashboard({ token }) {
  // In a real app, you'd fetch leave-related data here
  // e.g., LeaveRequestStatus, ApplyLeaveForm, LeaveBalances, etc.

  return (
    <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Leave Management
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        This section will contain all leave and attendance related features.
      </p>
      <p className="text-md text-gray-700">
        (e.g., Apply for Leave, View Leave Status, Accrue Leave, Log Attendance, Timesheets)
      </p>
      {/* You'll add more components here later, like: */}
      {/* <LeaveRequestStatusList token={token} /> */}
      {/* <ApplyLeaveForm token={token} /> */}
    </div>
  );
}

export default LeaveDashboard;