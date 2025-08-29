import React from 'react';
import { useProducts } from '../../hooks/UseProducts'
import StatsCard from '../Common/StatsCard';
import AnalyticsChart from '../../Components/Common/AnalyticsChart';

const Dashboard = () => {
  const { products, departments, users, loading, error } = useProducts();

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  // Calculate statistics
  const totalProducts = products.length;
  const completedProducts = products.filter(p => p.progress === 100).length;
  const inProgressProducts = products.filter(p => p.progress > 0 && p.progress < 100).length;
  const pendingProducts = products.filter(p => p.progress === 0).length;
  
  const completionRate = totalProducts > 0 ? Math.round((completedProducts / totalProducts) * 100) : 0;
  
  // Team statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.isActive).length;
  const availableUsers = users.filter(user => !user.currentProductId).length;

  // Products by department
  const productsByDepartment = departments.map(dept => ({
    name: dept.name,
    count: products.filter(p => p.stage === dept.id).length,
    color: dept.color || '#3b82f6'
  }));

  // Budget analysis
  const totalBudget = products.reduce((sum, product) => sum + (product.budget || 0), 0);
  const averageBudget = totalProducts > 0 ? Math.round(totalBudget / totalProducts) : 0;

  // Recent activities
  const recentActivities = products
    .flatMap(product => 
      product.logs?.map(log => ({
        ...log,
        productName: product.name,
        department: departments.find(d => d.id === log.stage)?.name || 'Unknown'
      })) || []
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 6);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your products.</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          icon="📦"
          trend={{ value: "+12%", positive: true }}
          color="#3b82f6"
        />
        <StatsCard
          title="Completed"
          value={completedProducts}
          icon="✅"
          trend={{ value: `${completionRate}%`, positive: completionRate > 50 }}
          color="#10b981"
        />
        <StatsCard
          title="In Progress"
          value={inProgressProducts}
          icon="🔄"
          trend={{ value: `${Math.round((inProgressProducts / totalProducts) * 100)}%`, positive: true }}
          color="#f59e0b"
        />
        <StatsCard
          title="Team Members"
          value={totalUsers}
          icon="👥"
          trend={{ value: `${activeUsers} active`, positive: true }}
          color="#8b5cf6"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Products by Department</h3>
          <AnalyticsChart
            data={productsByDepartment.filter(dept => dept.count > 0)}
            type="bar"
            height={300}
          />
        </div>
        
        <div className="chart-card">
          <h3>Progress Distribution</h3>
          <AnalyticsChart
            data={[
              { name: 'Completed', value: completedProducts, color: '#10b981' },
              { name: 'In Progress', value: inProgressProducts, color: '#f59e0b' },
              { name: 'Not Started', value: pendingProducts, color: '#64748b' }
            ]}
            type="pie"
            height={300}
          />
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Total Budget</h4>
          <p className="metric-value">${totalBudget.toLocaleString()}</p>
          <p className="metric-label">Across all projects</p>
        </div>
        <div className="metric-card">
          <h4>Average Budget</h4>
          <p className="metric-value">${averageBudget.toLocaleString()}</p>
          <p className="metric-label">Per project</p>
        </div>
        <div className="metric-card">
          <h4>Available Team</h4>
          <p className="metric-value">{availableUsers}</p>
          <p className="metric-label">Members ready for new projects</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {recentActivities.length > 0 ? (
            recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">📝</div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.actor}</strong> moved 
                    <strong> {activity.productName}</strong> to 
                    <strong> {activity.department}</strong>
                    {activity.notes && `: ${activity.notes}`}
                  </p>
                  <small className="activity-time">
                    {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </small>
                </div>
              </div>
            ))
          ) : (
            <p className="no-activities">No recent activities</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;