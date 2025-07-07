// frontend/src/components/EmployeeList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeList({ token }) { // Receives token as prop
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError(null);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from props
          },
        };

        const response = await axios.get('http://localhost:5000/api/employees/master', config);
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        // More specific error handling for 401 Unauthorized
        if (err.response && err.response.status === 401) {
          setError('Session expired or unauthorized. Please log in again.');
          // In a real app, you might want to trigger a logout from here
          // if the token becomes invalid while on this page.
        } else {
          setError('Failed to load employees. Please ensure the backend server is running and accessible.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) { // Only fetch if token exists
      fetchEmployees();
    } else {
      setLoading(false); // Not loading if no token
      setError("Authentication token missing. Please log in."); // Should not happen if App.jsx handles it
    }
  }, [token]); // Re-run effect if token changes

  return (
    <div className="w-full flex flex-col items-center"> {/* Use flex-col and items-center to center content */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 rounded-lg p-3 bg-white shadow-md">
        All Employees
      </h2>

      {loading && (
        <div className="text-center text-blue-600 text-lg">
          Loading employees...
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 text-lg p-4 bg-red-100 border border-red-400 rounded-lg shadow-sm">
          {error}
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
    </div>
  );
}

export default EmployeeList;