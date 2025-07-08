// frontend/src/components/AppraisalsDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AppraisalsDashboard({ token }) {
  const [appraisals, setAppraisals] = useState([]);
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

        const response = await axios.get('http://localhost:5000/api/appraisals/history', config);
        setAppraisals(response.data);

      } catch (err) {
        console.error('Error fetching appraisals data:', err);
        setError('Failed to load appraisals data. Please check backend connection and authentication.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 rounded-lg p-3 bg-white shadow-md">
        Performance Appraisals
      </h2>

      {loading && (
        <div className="text-center text-blue-600 text-lg">
          Loading appraisals...
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 text-lg p-4 bg-red-100 border border-red-400 rounded-lg shadow-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-xl p-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Appraisal History</h3>
          {appraisals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(appraisals[0]).map((key) => (
                      <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appraisals.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {Object.values(item).map((value, idx) => (
                        <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {value instanceof Date ? value.toLocaleDateString() : String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600">No appraisal history available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AppraisalsDashboard;