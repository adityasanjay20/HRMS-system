// frontend/src/components/TerminateEmployeeModal.jsx

import React, { useState } from 'react';

function TerminateEmployeeModal({ employee, onClose, onConfirm }) {
  const [terminationDate, setTerminationDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null);    // Clear previous errors
    setLoading(true);  // Set loading state

    if (!terminationDate) {
      setError('Termination Date is required.');
      setLoading(false);
      return;
    }

    // Call the onConfirm prop with the employee ID and termination date
    await onConfirm(employee.EmployeeID, terminationDate);
    setLoading(false);
    onClose(); // Close modal after action (success or failure handled by parent)
  };

  // Basic modal styling
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Terminate Employee
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Are you sure you want to terminate <span className="font-semibold">{employee.Name}</span> (ID: {employee.EmployeeID})?
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="terminationDate" className="block text-gray-700 text-sm font-medium mb-2">
              Effective Termination Date
            </label>
            <input
              type="date"
              id="terminationDate"
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              value={terminationDate}
              onChange={(e) => setTerminationDate(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Terminating...' : 'Confirm Termination'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TerminateEmployeeModal;