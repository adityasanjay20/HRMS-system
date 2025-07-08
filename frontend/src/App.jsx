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
import PayrollDashboard from './components/PayrollDashboard'; // NEW: Import PayrollDashboard
import AppraisalsDashboard from './components/AppraisalsDashboard'; // NEW: Import AppraisalsDashboard
import HrAdminDashboard from './components/HrAdminDashboard'; // NEW: Import HrAdminDashboard

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [refreshEmployeeList, setRefreshEmployeeList] = useState(0);

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

  const handleEmployeeDataChange = () => {
    setRefreshEmployeeList(prev => prev + 1);
    setCurrentPage('employees');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
        console.log('Found existing session. User:', parsedUser.username, 'Role:', parsedUser.roleName);
        setCurrentPage('dashboard');
      } catch (e) {
        console.error('Failed to parse stored user data:', e);
        handleLogout();
      }
    } else {
      setUser(null);
      setToken(null);
      setCurrentPage('dashboard');
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        {showRegisterForm ? (
          <RegisterForm onRegisterSuccess={() => setShowRegisterForm(false)} onGoToLogin={() => setShowRegisterForm(false)} />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} onGoToRegister={() => setShowRegisterForm(true)} />
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-start">
        {currentPage === 'dashboard' && <Dashboard user={user} setCurrentPage={setCurrentPage} />}
        {currentPage === 'employees' && <EmployeeList token={token} refreshTrigger={refreshEmployeeList} />}
        {currentPage === 'addEmployee' && <AddEmployeeForm token={token} onEmployeeAdded={handleEmployeeDataChange} />}
        {currentPage === 'leave' && <LeaveDashboard token={token} />}
        {currentPage === 'payroll' && <PayrollDashboard token={token} />} {/* NEW: Payroll Dashboard */}
        {currentPage === 'appraisals' && <AppraisalsDashboard token={token} />} {/* NEW: Appraisals Dashboard */}
        {currentPage === 'hradmin' && <HrAdminDashboard token={token} />} {/* NEW: HR Admin Dashboard */}
      </main>
    </div>
  );
}

export default App;
