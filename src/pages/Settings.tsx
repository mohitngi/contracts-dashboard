import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Profile Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                defaultValue="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                defaultValue="john@abccorp.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-600" />
            Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-3" />
              <span className="text-sm text-gray-700">Contract expiry reminders</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-3" />
              <span className="text-sm text-gray-700">Risk alerts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-sm text-gray-700">Weekly reports</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Security
          </h2>
          <div className="space-y-4">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Two-Factor Authentication
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Active Sessions
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Database className="h-5 w-5 mr-2 text-blue-600" />
            Data & Privacy
          </h2>
          <div className="space-y-4">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Export Data
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Privacy Settings
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;