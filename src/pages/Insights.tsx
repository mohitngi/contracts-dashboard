import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Insights: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contract Insights</h1>
        <p className="text-gray-600 mt-2">AI-powered analysis and recommendations for your contracts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Risk Distribution
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">High Risk</span>
              <span className="text-sm text-red-600">40%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Analysis</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Liability Gap Detected</p>
                <p className="text-xs text-gray-500">MSA 2025 - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Renewal Due Soon</p>
                <p className="text-xs text-gray-500">Network Services - 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;