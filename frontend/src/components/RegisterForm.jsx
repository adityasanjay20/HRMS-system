// frontend/src/components/RegisterForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

// RegisterForm component receives 'onRegisterSuccess' and 'onGoToLogin' callbacks
function RegisterForm({ onRegisterSuccess, onGoToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState(''); // State for selected RoleID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Hardcoded roles for the dropdown (match your DB's Roles table)
  const roles = [
    { id: 1, name: 'Software Developer' },
    { id: 2, name: 'HR Executive' },
    { id: 3, name: 'Team Lead' },
    { id: 4, name: 'HR Manager' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear previous success message

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        Username: username,
        Password: password,
        RoleID: parseInt(roleId), // Convert roleId to integer
      });

      console.log('Registration successful:', response.data);
      setSuccessMessage(response.data.message || 'Registration successful!');
      
      // Optionally, clear form fields after successful registration
      setUsername('');
      setPassword('');
      setRoleId('');

      // After a short delay, go back to login form
      setTimeout(() => {
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }
      }, 2000); // Go back to login after 2 seconds

    } catch (err) {
      console.error('Registration error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Registration failed.');
      } else if (err.request) {
        setError('No response from server. Please check your backend connection.');
      } else {
        setError('An unexpected error occurred during registration.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          HRMS Register
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

        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="reg-username" className="block text-gray-700 text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="reg-username"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="reg-password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="reg-password"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Role ID Dropdown */}
        <div className="mb-6">
          <label htmlFor="reg-role" className="block text-gray-700 text-sm font-medium mb-2">
            Role
          </label>
          <select
            id="reg-role"
            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {/* Link back to Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onGoToLogin}
              className="text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;