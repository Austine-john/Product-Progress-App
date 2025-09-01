import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useProductContext } from './context/ProductContext';
import Navbar from '../components/common/Navbar';
import DashboardPage from '../components/dashboard/DashboardPage';
import ProductsPage from '../components/products/ProductsPage';
import TeamsPage from '../components/teams/TeamsPage';
import ReportsPage from '../components/reports/ReportsPage';
import NewRequestModal from '../components/products/NewRequestModal';
import AddTeamModal from '../components/teams/AddTeamModal';

function App() {
  const { isLoading } = useProductContext();
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);

  const location = useLocation();
  const currentPage = location.pathname.substring(1) || 'dashboard';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} />
      
      {/* Main content container with proper Bootstrap spacing for fixed navbar */}
      <main className="container-fluid" style={{ paddingTop: '90px' }}>
        <div className="px-4">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: 'calc(100vh - 150px)' }}>
              <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="fs-5 text-muted">Loading data...</p>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route 
                path="/products" 
                element={<ProductsPage setShowNewRequestModal={setShowNewRequestModal} />} 
              />
              <Route 
                path="/teams" 
                element={<TeamsPage setShowAddTeamModal={setShowAddTeamModal} />} 
              />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="*" element={<DashboardPage />} />
            </Routes>
          )}
        </div>
      </main>

      {/* Modals */}
      {showNewRequestModal && (
        <NewRequestModal onClose={() => setShowNewRequestModal(false)} />
      )}
      {showAddTeamModal && (
        <AddTeamModal onClose={() => setShowAddTeamModal(false)} />
      )}
    </div>
  );
}

export default App;