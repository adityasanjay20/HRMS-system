// frontend/src/components/PayrollDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PayrollDashboard({ token }) {
  const [payrollOverview, setPayrollOverview] = useState([]);
  const [salaryCompaRatio, setSalaryCompaRatio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // Fetch Payroll Overview and Salary Compa-Ratio concurrently
        const [overviewResponse, compaRatioResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/payrolls/payroll', config), // Ensure plural 'payrolls'
          axios.get('http://localhost:5000/api/payrolls/comparatio', config), // Ensure plural 'payrolls'
        ]);

        setPayrollOverview(overviewResponse.data);
        setSalaryCompaRatio(compaRatioResponse.data);

      } catch (err) {
        console.error('Error fetching payroll data:', err);
        setError('Failed to load payroll data. Please check backend connection and authentication.');
      } finally {
        setLoading(false);
      }
    };

    if (token) { // Only fetch if token exists
      fetchData();
    }
  }, [token]); // Re-run effect if token changes

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 rounded-lg p-3 bg-white shadow-md">
        Payroll & Compensation
      </h2>

      {loading && (
        <div className="text-center text-blue-600 text-lg">
          Loading payroll data...
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 text-lg p-4 bg-red-100 border border-red-400 rounded-lg shadow-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Payroll Overview Table */}
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Payroll Overview</h3>
            {payrollOverview.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {/* Render table headers dynamically */}
                      {Object.keys(payrollOverview[0]).map((key) => (
                        <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Map through payroll overview items to render rows */}
                    {payrollOverview.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {/* FIX: Use Object.entries to get both key (column name) and value */}
                        {Object.entries(item).map(([key, value], idx) => (
                          <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {/* Conditional formatting for dates and currency fields */}
                            {value instanceof Date ? value.toLocaleDateString() :
                             (typeof value === 'number' && (
                               key === 'BasicSalary' || key === 'HousingAllowance' ||
                               key === 'TransportAllowance' || key === 'OtherAllowances' ||
                               key === 'Deductions' || key === 'NetPay'
                             )) ? `$${value.toFixed(2)}` : String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="p-6 text-center text-gray-600">No payroll overview data available.</p>
            )}
          </div>

          {/* Salary Compa-Ratio Table */}
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Salary Compa-Ratio</h3>
            {salaryCompaRatio.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {/* Render table headers dynamically */}
                      {Object.keys(salaryCompaRatio[0]).map((key) => (
                        <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Map through compa-ratio items to render rows */}
                    {salaryCompaRatio.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {/* FIX: Use Object.entries to get both key (column name) and value */}
                        {Object.entries(item).map(([key, value], idx) => (
                          <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {/* Conditional formatting for numbers (CompaRatio, salaries) */}
                            {value instanceof Date ? value.toLocaleDateString() :
                             (typeof value === 'number' && (
                               key === 'CompaRatio' || key === 'ActualSalary' ||
                               key === 'MidpointSalary' || key === 'MinSalary' || key === 'MaxSalary'
                             )) ? `$${value.toFixed(2)}` : String(value)} {/* Format money with $ and 2 decimals */}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="p-6 text-center text-gray-600">No salary compa-ratio data available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PayrollDashboard;