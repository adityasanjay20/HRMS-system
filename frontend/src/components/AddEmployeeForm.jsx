// frontend/src/components/AddEmployeeForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// AddEmployeeForm component receives 'token' for auth and 'onEmployeeAdded' callback
function AddEmployeeForm({ token, onEmployeeAdded }) {
  // Form state
  const [name, setName] = useState('');
  const [dob, setDob] = useState(''); // Date of Birth
  const [deptId, setDeptId] = useState(''); // Department ID
  const [roleId, setRoleId] = useState(''); // Role ID
  const [joinDate, setJoinDate] = useState(''); // Join Date

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Hardcoded options for DeptID and RoleID dropdowns for now
  // In a real app, you'd fetch these from backend API endpoints (e.g., /api/departments, /api/roles)
  const departments = [
    { id: 1, name: 'Human Resources' },
    { id: 2, name: 'Engineering' },
    { id: 3, name: 'Sales' },
    // ... add more as per your DB
  ];

  const roles = [
    { id: 1, name: 'Software Developer' },
    { id: 2, name: 'HR Executive' },
    { id: 3, name: 'Team Lead' },
    { id: 4, name: 'HR Manager' },
    // ... add more as per your DB
  ];

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Basic client-side validation
    if (!name || !dob || !deptId || !roleId || !joinDate) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token for authentication
        },
      };

      const response = await axios.post('http://localhost:5000/api/employees', {
        Name: name,
        DOB: dob,
        DeptID: parseInt(deptId), // Ensure DeptID is an integer
        RoleID: parseInt(roleId), // Ensure RoleID is an integer
        JoinDate: joinDate,
      }, config); // Pass config with headers

      setSuccessMessage(response.data.message || 'Employee added successfully!');
      console.log('Employee added:', response.data);

      // Clear form fields after successful submission
      setName('');
      setDob('');
      setDeptId('');
      setRoleId('');
      setJoinDate('');

      // Notify parent component that an employee was added (e.g., to refresh list)
      if (onEmployeeAdded) {
        onEmployeeAdded();
      }

    } catch (err) {
      console.error('Error adding employee:', err);
      if (err.response) {
        setError(err.response.data.message || 'Failed to add employee. Please check input.');
      } else if (err.request) {
        setError('No response from server. Please check your backend connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl border border-gray-200 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Employee
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* DOB */}
        <div className="mb-4">
          <label htmlFor="dob" className="block text-gray-700 text-sm font-medium mb-2">Date of Birth</label>
          <input
            type="date"
            id="dob"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label htmlFor="deptId" className="block text-gray-700 text-sm font-medium mb-2">Department</label>
          <select
            id="deptId"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white"
            value={deptId}
            onChange={(e) => setDeptId(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label htmlFor="roleId" className="block text-gray-700 text-sm font-medium mb-2">Role</label>
          <select
            id="roleId"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Join Date */}
        <div className="mb-6">
          <label htmlFor="joinDate" className="block text-gray-700 text-sm font-medium mb-2">Join Date</label>
          <input
            type="date"
            id="joinDate"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={joinDate}
            onChange={(e) => setJoinDate(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Adding Employee...' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;