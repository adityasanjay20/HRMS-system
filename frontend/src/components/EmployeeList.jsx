// frontend/src/components/EmployeeList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TerminateEmployeeModal from './TerminateEmployeeModal';
import EditEmployeeForm from './EditEmployeeForm'; // NEW: Import EditEmployeeForm

function EmployeeList({ token, refreshTrigger }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false); // NEW: State for edit form visibility
  const [employeeToEditId, setEmployeeToEditId] = useState(null); // NEW: State for employee ID to edit

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      setActionMessage(null); // Clear previous action messages

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('http://localhost:5000/api/employees/master', config);
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
      if (err.response && err.response.status === 401) {
        setError('Session expired or unauthorized. Please log in again.');
      } else {
        setError('Failed to load employees. Please ensure the backend server is running and accessible, and your session is valid.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEmployees();
    } else {
      setLoading(false);
      setError("Authentication token missing. Please log in.");
    }
  }, [token, refreshTrigger]); // Added refreshTrigger to dependency array

  // Handler for clicking the "Terminate" button in a row
  const handleTerminateClick = (employee) => {
    setSelectedEmployee(employee);
    setShowTerminateModal(true);
  };

  // Handler for confirming termination from the modal
  const handleConfirmTermination = async (employeeId, terminationDate) => {
    try {
      setLoading(true);
      setError(null);
      setActionMessage(null);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(`http://localhost:5000/api/employees/${employeeId}/terminate`, {
        TerminationDate: terminationDate,
      }, config);

      setActionMessage(response.data.message || 'Employee terminated successfully!');
      console.log('Termination successful:', response.data);

      await fetchEmployees(); // Re-fetch employees to update the list

    } catch (err) {
      console.error('Error terminating employee:', err);
      if (err.response) {
        setError(err.response.data.message || 'Failed to terminate employee.');
      } else {
        setError('An unexpected error occurred during termination.');
      }
    } finally {
      setLoading(false);
      setShowTerminateModal(false);
      setSelectedEmployee(null);
    }
  };

  // NEW: Handler for clicking the "Edit" button
  const handleEditClick = (employeeId) => {
    setEmployeeToEditId(employeeId);
    setShowEditForm(true); // Show the edit form
  };

  // NEW: Callback for when employee is updated in EditEmployeeForm
  const handleEmployeeUpdated = () => {
    setShowEditForm(false); // Hide the edit form
    setEmployeeToEditId(null); // Clear selected employee
    fetchEmployees(); // Re-fetch employees to update the list
    setActionMessage('Employee updated successfully!');
  };

  // NEW: Callback to cancel editing
  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEmployeeToEditId(null);
    setError(null); // Clear any errors from the form
  };


  // Conditionally render EditEmployeeForm if showEditForm is true
  if (showEditForm && employeeToEditId) {
    return (
      <EditEmployeeForm
        token={token}
        employeeId={employeeToEditId}
        onEmployeeUpdated={handleEmployeeUpdated}
        onCancelEdit={handleCancelEdit}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 rounded-lg p-3 bg-white shadow-md">
        All Employees
      </h2>

      {actionMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm w-full max-w-4xl" role="alert">
          {actionMessage}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm w-full max-w-4xl" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center text-blue-600 text-lg">
          Loading employees...
        </div>
      )}

      {!loading && !error && (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
          {employees.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(employees[0]).map((key) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {Object.values(employee).map((value, idx) => (
                        <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {value instanceof Date ? value.toLocaleDateString() : value === null ? 'N/A' : String(value)}
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(employee.EmployeeID)} // NEW: Edit button
                          className="text-indigo-600 hover:text-indigo-900 font-semibold mr-4"
                        >
                          Edit
                        </button>
                        {employee.IsActive && ( // Only show Terminate if active
                          <button
                            onClick={() => handleTerminateClick(employee)}
                            className="text-red-600 hover:text-red-900 font-semibold"
                          >
                            Terminate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-6 text-center text-gray-600">No employees found in the database.</p>
          )}
        </div>
      )}

      {showTerminateModal && selectedEmployee && (
        <TerminateEmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowTerminateModal(false)}
          onConfirm={handleConfirmTermination}
        />
      )}
    </div>
  );
}

export default EmployeeList;
