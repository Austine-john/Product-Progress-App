import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import "../styles/index.css";

const DashboardPage = () => {
  return (
    <section className="dashboard-page">
      <h2>Production Dashboard</h2>
      <Dashboard />
    </section>
  );
};

export default DashboardPage;