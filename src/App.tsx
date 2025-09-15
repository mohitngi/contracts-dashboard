import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContractDetail from './pages/ContractDetail';
import Insights from './pages/Insights';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/contract/:id" element={
              <ProtectedRoute>
                <Layout>
                  <ContractDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/insights" element={
              <ProtectedRoute>
                <Layout>
                  <Insights />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;