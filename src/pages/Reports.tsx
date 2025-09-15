import React from 'react';
import { FileBarChart, Download } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-2">Generate and download comprehensive contract reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FileBarChart className="h-5 w-5 mr-2 text-blue-600" />
            Available Reports
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Risk Analysis Report</h3>
                <p className="text-sm text-gray-600">Comprehensive risk assessment across all contracts</p>
              </div>
              <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Expiry Calendar</h3>
                <p className="text-sm text-gray-600">Upcoming contract renewals and expirations</p>
              </div>
              <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Custom Report</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Risk Analysis</option>
                <option>Contract Summary</option>
                <option>Compliance Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reports;