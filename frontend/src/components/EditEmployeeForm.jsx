// frontend/src/components/EditEmployeeForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// EditEmployeeForm component receives 'token', 'employeeId' to edit, and 'onEmployeeUpdated' callback
function EditEmployeeForm({ token, employeeId, onEmployeeUpdated, onCancelEdit }) {
  // Form state
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [deptId, setDeptId] = useState('');
  const [roleId, setRoleId] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [housingAllowance, setHousingAllowance] = useState('');
  const [transportAllowance, setTransportAllowance] = useState('');
  const [otherAllowances, setOtherAllowances] = useState('');
  const [gradeId, setGradeId] = useState('');
  const [isActive, setIsActive] = useState(true); // Assuming IsActive can be edited, though usually handled by terminate

  // UI state
  const [loading, setLoading] = useState(false); // For form submission
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [salaryGrades, setSalaryGrades] = useState([]);
  const [loadingForm, setLoadingForm] = useState(true); // Loading for initial employee data and dropdowns

  // Fetch employee data and dropdowns when component mounts or employeeId/token changes
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        setLoadingForm(true);
        setError(null);

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // Fetch employee details AND dropdown data concurrently
        const [employeeResponse, deptResponse, roleResponse, gradeResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/employees/${employeeId}`, config), // Assuming you'll add GET /api/employees/:id
          axios.get('http://localhost:5000/api/hradmin/departments', config),
          axios.get('http://localhost:5000/api/hradmin/roles', config),
          axios.get('http://localhost:5000/api/payroll/grades', config),
        ]);

        const employeeData = employeeResponse.data[0]; // Assuming API returns an array, take the first item
        if (!employeeData) {
            setError("Employee not found.");
            setLoadingForm(false);
            return;
        }

        // Set form fields with fetched employee data
        setName(employeeData.Name || '');
        setDob(employeeData.DOB ? new Date(employeeData.DOB).toISOString().split('T')[0] : ''); // Format date
        setDeptId(employeeData.DeptID || '');
        setRoleId(employeeData.RoleID || '');
        setJoinDate(employeeData.JoinDate ? new Date(employeeData.JoinDate).toISOString().split('T')[0] : ''); // Format date
        setIsActive(employeeData.IsActive); // Set isActive state

        // Fetch current salary details (assuming vw_CurrentEmployeeSalaries has them or a new endpoint)
        // For simplicity, we'll use CurrentSalary from vw_EmployeeMaster for BasicSalary for now,
        // but ideally, you'd fetch full salary history or have a dedicated endpoint.
        setBasicSalary(employeeData.CurrentSalary || '');
        // For other allowances, if not in vw_EmployeeMaster, you might need another call or set defaults
        setHousingAllowance(employeeData.HousingAllowance || ''); // Assuming these are in vw_EmployeeMaster or fetched separately
        setTransportAllowance(employeeData.TransportAllowance || '');
        setOtherAllowances(employeeData.OtherAllowances || '');
        setGradeId(employeeData.GradeID || ''); // Assuming GradeID is available in master view or current salary view

        setDepartments(deptResponse.data);
        setRoles(roleResponse.data);
        setSalaryGrades(gradeResponse.data);

      } catch (err) {
        console.error('Error fetching employee data or dropdowns:', err);
        setError('Failed to load employee data or form options. Please check backend.');
      } finally {
        setLoadingForm(false);
      }
    };

    if (token && employeeId) {
      fetchFormData();
    }
  }, [token, employeeId]); // Re-fetch if token or employeeId changes

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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedJoinDate = new Date(joinDate);

    if (selectedJoinDate > today) {
        setError('Join Date cannot be in the future.');
        setLoading(false);
        return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // Send PUT request to update employee details
      // This will call a new backend endpoint (e.g., /api/employees/:id/updateDetails)
      // or you might have separate endpoints for role/salary updates.
      // For simplicity, this single PUT will send all core employee data.
      // You may need to create a new SP like 'UpdateEmployeeDetails' in SQL.
      const response = await axios.put(`http://localhost:5000/api/employees/${employeeId}/updateDetails`, { // NEW Endpoint
        Name: name,
        DOB: dob,
        DeptID: parseInt(deptId),
        RoleID: parseInt(roleId),
        JoinDate: joinDate,
        IsActive: isActive, // Send isActive status
        // Salary updates are handled by a separate SP/endpoint (UpdateSalary)
        // For now, we'll just update core details.
      }, config);

      // If salary fields were changed, trigger a separate salary update API call
      // This requires a separate PUT /api/employees/salary endpoint and its controller/SP
      // For now, we'll just update core employee details.
      const salaryUpdateResponse = await axios.put('http://localhost:5000/api/employees/salary', {
        EmployeeID: employeeId,
        EffectiveDate: new Date().toISOString().split('T')[0], // Use today's date or a specific effective date
        BasicSalary: parseFloat(basicSalary),
        HousingAllowance: parseFloat(housingAllowance),
        TransportAllowance: parseFloat(transportAllowance),
        OtherAllowances: parseFloat(otherAllowances),
        NewGradeID: parseInt(gradeId),
        Reason: 'Employee details update' // Default reason
      }, config);

      setSuccessMessage(response.data.message || 'Employee updated successfully!');
      console.log('Employee updated:', response.data);
      console.log('Salary update response:', salaryUpdateResponse.data);


      // Notify parent component that employee was updated
      if (onEmployeeUpdated) {
        onEmployeeUpdated();
      }

    } catch (err) {
      console.error('Error updating employee:', err);
      if (err.response) {
        setError(err.response.data.message || 'Failed to update employee.');
      } else if (err.request) {
        setError('No response from server. Please check your backend connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingForm) {
      return (
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl border border-gray-200 mx-auto text-center text-blue-600 text-lg">
          Loading employee data for editing...
        </div>
      );
  }

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl border border-gray-200 mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Employee (ID: {employeeId})
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
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="edit-name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            id="edit-name"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* DOB Input */}
        <div className="mb-4">
          <label htmlFor="edit-dob" className="block text-gray-700 text-sm font-medium mb-2">Date of Birth</label>
          <input
            type="date"
            id="edit-dob"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Department Dropdown */}
        <div className="mb-4">
          <label htmlFor="edit-deptId" className="block text-gray-700 text-sm font-medium mb-2">Department</label>
          <select
            id="edit-deptId"
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
          <label htmlFor="edit-roleId" className="block text-gray-700 text-sm font-medium mb-2">Role</label>
          <select
            id="edit-roleId"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.RoleID} value={role.RoleID}>
                {role.RoleTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Join Date Input */}
        <div className="mb-6">
          <label htmlFor="edit-joinDate" className="block text-gray-700 text-sm font-medium mb-2">Join Date</label>
          <input
            type="date"
            id="edit-joinDate"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={joinDate}
            onChange={(e) => setJoinDate(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* --- Salary Details --- */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Current Salary Details</h3>

        {/* Basic Salary Input */}
        <div className="mb-4">
          <label htmlFor="edit-basicSalary" className="block text-gray-700 text-sm font-medium mb-2">Basic Salary</label>
          <input
            type="number"
            id="edit-basicSalary"
            step="0.01"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Housing Allowance Input */}
        <div className="mb-4">
          <label htmlFor="edit-housingAllowance" className="block text-gray-700 text-sm font-medium mb-2">Housing Allowance</label>
          <input
            type="number"
            id="edit-housingAllowance"
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
          <label htmlFor="edit-transportAllowance" className="block text-gray-700 text-sm font-medium mb-2">Transport Allowance</label>
          <input
            type="number"
            id="edit-transportAllowance"
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
          <label htmlFor="edit-otherAllowances" className="block text-gray-700 text-sm font-medium mb-2">Other Allowances</label>
          <input
            type="number"
            id="edit-otherAllowances"
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
          <label htmlFor="edit-gradeId" className="block text-gray-700 text-sm font-medium mb-2">Salary Grade</label>
          <select
            id="edit-gradeId"
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

        {/* IsActive Checkbox (Optional, if you want to allow changing active status here) */}
        <div className="mb-6">
          <label htmlFor="edit-isActive" className="flex items-center text-gray-700 text-sm font-medium mb-2">
            <input
              type="checkbox"
              id="edit-isActive"
              className="form-checkbox h-5 w-5 text-blue-600 rounded-md mr-2"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              disabled={loading}
            />
            Employee is Active
          </label>
        </div>


        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
            <button
                type="button"
                onClick={onCancelEdit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                disabled={loading}
            >
                Cancel
            </button>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {loading ? 'Updating Employee...' : 'Save Changes'}
            </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployeeForm;