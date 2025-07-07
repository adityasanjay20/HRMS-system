// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import Dashboard from './components/Dashboard';
import LeaveDashboard from './components/LeaveDashboard';
import AddEmployeeForm from './components/AddEmployeeForm';

function App() {
  // --- TEMPORARY BYPASS FOR DEVELOPMENT: Provide dummy user and token ---
  // IMPORTANT: REMOVE THESE LINES FOR PRODUCTION OR WHEN RE-ENABLING AUTHENTICATION
  const [user, setUser] = useState({ userId: 999, username: 'DevUser', roleId: 1, roleName: 'Admin' }); // Dummy user with Admin role
  const [token, setToken] = useState('dummy-token-for-dev-auth'); // Dummy token
  // --- END TEMPORARY BYPASS ---

  // Original state declarations (commented out or removed if using dummy values above)
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLoginSuccess = (response_data) => {
    const { user: loggedInUser, token: jwtToken } = response_data;
    setUser(loggedInUser);
    setToken(jwtToken);
    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    console.log('User logged in:', loggedInUser);
    console.log('JWT Token received:', jwtToken);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    console.log('User logged out.');
    setCurrentPage('dashboard');
  };

  const handleEmployeeAdded = () => {
    setCurrentPage('employees');
  };

  useEffect(() => {
    // When bypassing auth, this useEffect might interfere if it finds old data.
    // For a clean bypass, you might temporarily comment out the localStorage check in useEffect too,
    // or ensure localStorage is empty when you start.
    // For now, let's keep it, but ensure dummy values are set initially.

    const storedToken = localStorage.getItem('jwtToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
        console.log('Found existing session. User:', parsedUser.username);
        setCurrentPage('dashboard');
      } catch (e) {
        console.error('Failed to parse stored user data:', e);
        handleLogout();
      }
    }
    // else { // Removed this else block to ensure dummy values persist if localStorage is empty
    //   setUser(null);
    //   setToken(null);
    //   setCurrentPage('dashboard');
    // }
  }, []);

  // The if (!user) block is now commented out, so this return will always execute.
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-start">
        {currentPage === 'dashboard' && <Dashboard user={user} setCurrentPage={setCurrentPage} />}
        {currentPage === 'employees' && <EmployeeList token={token} />}
        {currentPage === 'addEmployee' && <AddEmployeeForm token={token} onEmployeeAdded={handleEmployeeAdded} />}
        {currentPage === 'leave' && <LeaveDashboard token={token} />}
        {/* Add more conditional rendering for other pages */}
      </main>
    </div>
  );
}

export default App;