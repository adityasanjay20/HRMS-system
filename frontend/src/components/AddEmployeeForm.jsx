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
  const [basicSalary, setBasicSalary] = useState(''); // Initial Basic Salary
  const [housingAllowance, setHousingAllowance] = useState(''); // Initial Housing Allowance
  const [transportAllowance, setTransportAllowance] = useState(''); // Initial Transport Allowance
  const [otherAllowances, setOtherAllowances] = useState(''); // Initial Other Allowances
  const [gradeId, setGradeId] = useState(''); // Salary Grade ID

  // UI state
  const [loading, setLoading] = useState(false); // For form submission
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [departments, setDepartments] = useState([]); // State for dynamic departments
  const [roles, setRoles] = useState([]);         // State for dynamic roles
  const [salaryGrades, setSalaryGrades] = useState([]); // State for dynamic salary grades
  const [loadingDropdowns, setLoadingDropdowns] = useState(true); // Loading for dropdown data

  // useEffect hook to fetch dropdown data (departments, roles, salary grades) when component mounts
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setLoadingDropdowns(true);
        setError(null); // Clear any previous errors

        const config = {
          headers: { Authorization: `Bearer ${token}` }, // Include JWT token
        };

        // Fetch all dropdown data concurrently
        const [deptResponse, roleResponse, gradeResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/hradmin/departments', config),
          axios.get('http://localhost:5000/api/hradmin/roles', config),
          axios.get('http://localhost:5000/api/payroll/grades', config),
        ]);

        setDepartments(deptResponse.data);
        setRoles(roleResponse.data);
        setSalaryGrades(gradeResponse.data);

      } catch (err) {
        console.error('Error fetching dropdown data:', err);
        setError('Failed to load form options. Please check backend connection and authentication.');
      } finally {
        setLoadingDropdowns(false);
      }
    };

    if (token) { // Only fetch if token exists
      fetchDropdownData();
    }
  }, [token]); // Re-fetch if token changes

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError(null);
  setSuccessMessage(null);

    // Basic client-side validation
    if (!name || !dob || !deptId || !roleId || !joinDate ||
        basicSalary === '' || housingAllowance === '' ||
        transportAllowance === '' || otherAllowances === '' || gradeId === '') {
      setError('All fields, including initial salary and grade, are required.');
      setLoading(false);
      return;
    }

    // NEW: Client-side validation for JoinDate (must not be in the future)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for comparison
    const selectedJoinDate = new Date(joinDate);

    if (selectedJoinDate > today) {
      setError('Join Date cannot be in the future.');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token for authentication
        },
      };

      // Make a POST request to your backend to add the employee
      const response = await axios.post('http://localhost:5000/api/employees', {
        Name: name,
        DOB: dob,
        DeptID: parseInt(deptId), // Convert to integer
        RoleID: parseInt(roleId), // Convert to integer
        JoinDate: joinDate,
        BasicSalary: parseFloat(basicSalary), // Convert to float
        HousingAllowance: parseFloat(housingAllowance), // Convert to float
        TransportAllowance: parseFloat(transportAllowance), // Convert to float
        OtherAllowances: parseFloat(otherAllowances), // Convert to float
        GradeID: parseInt(gradeId), // Convert to integer
      }, config); // Pass the config object with headers

      setSuccessMessage(response.data.message || 'Employee added successfully!');
      console.log('Employee added:', response.data);

      // Clear form fields after successful submission
      setName('');
      setDob('');
      setDeptId('');
      setRoleId('');
      setJoinDate('');
      setBasicSalary('');
      setHousingAllowance('');
      setTransportAllowance('');
      setOtherAllowances('');
      setGradeId('');

      // Notify parent component (App.jsx) that an employee was added
      // This will trigger a refresh of the employee list
      if (onEmployeeAdded) {
        onEmployeeAdded();
      }

    } catch (err) {
      console.error('Error adding employee:', err);
      if (err.response) {
        // Server responded with an error status (e.g., 400, 500)
        setError(err.response.data.message || 'Failed to add employee. Please check input.');
      } else if (err.request) {
        // Request was made but no response received (e.g., backend down)
        setError('No response from server. Please check your backend connection.');
      } else {
        // Something else happened (e.g., network error)
        setError('An unexpected error occurred during employee addition.');
      }
    } finally {
      setLoading(false); // Always set loading to false after attempt
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl border border-gray-200 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Employee
      </h2>

      {/* Error message display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
          {error}
        </div>
      )}
      {/* Success message display */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
          {successMessage}
        </div>
      )}

      {/* Conditional rendering based on dropdown data loading */}
      {loadingDropdowns ? (
        <div className="text-center text-blue-600 text-lg mb-4">Loading form data...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
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

          {/* Date of Birth Input */}
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

          {/* Department Dropdown */}
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
                <option key={dept.DeptID} value={dept.DeptID}>
                  {dept.DeptName}
                </option>
              ))}
            </select>
          </div>

          {/* Role Dropdown */}
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
                <option key={role.RoleID} value={role.RoleID}>
                  {role.RoleTitle} {/* Use RoleTitle for display */}
                </option>
              ))}
            </select>
          </div>

          {/* Join Date Input */}
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

          {/* --- Initial Salary Details (NEW) --- */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Initial Salary Details</h3>

          {/* Basic Salary Input */}
          <div className="mb-4">
            <label htmlFor="basicSalary" className="block text-gray-700 text-sm font-medium mb-2">Basic Salary</label>
            <input
              type="number"
              id="basicSalary"
              step="0.01" // Allows decimal values
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Housing Allowance Input */}
          <div className="mb-4">
            <label htmlFor="housingAllowance" className="block text-gray-700 text-sm font-medium mb-2">Housing Allowance</label>
            <input
              type="number"
              id="housingAllowance"
              step="0.01"
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={housingAllowance}
              onChange={(e) => setHousingAllowance(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Transport Allowance Input */}
          <div className="mb-4">
            <label htmlFor="transportAllowance" className="block text-gray-700 text-sm font-medium mb-2">Transport Allowance</label>
            <input
              type="number"
              id="transportAllowance"
              step="0.01"
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={transportAllowance}
              onChange={(e) => setTransportAllowance(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Other Allowances Input */}
          <div className="mb-4">
            <label htmlFor="otherAllowances" className="block text-gray-700 text-sm font-medium mb-2">Other Allowances</label>
            <input
              type="number"
              id="otherAllowances"
              step="0.01"
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={otherAllowances}
              onChange={(e) => setOtherAllowances(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Salary Grade Dropdown */}
          <div className="mb-6">
            <label htmlFor="gradeId" className="block text-gray-700 text-sm font-medium mb-2">Salary Grade</label>
            <select
              id="gradeId"
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white"
              value={gradeId}
              onChange={(e) => setGradeId(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">Select Salary Grade</option>
              {salaryGrades.map((grade) => (
                <option key={grade.GradeID} value={grade.GradeID}>
                  {grade.GradeName} (Min: {grade.MinSalary}, Max: {grade.MaxSalary})
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Adding Employee...' : 'Add Employee'}
          </button>
        </form>
      )}
    </div>
  );
}

export default AddEmployeeForm;