import React from 'react';
<<<<<<< HEAD

const StatsCard = ({ title, value, icon, trend, color }) => {
  return (
    <div className="stats-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="stats-content">
        <div className="stats-icon" style={{ backgroundColor: color + '20' }}>
          {icon}
        </div>
        <div className="stats-info">
          <h3>{value}</h3>
          <p>{title}</p>
        </div>
      </div>
      <div className={`stats-trend ${trend.positive ? 'positive' : 'negative'}`}>
        {trend.value}
      </div>
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatsCard = ({ title, value, change, icon, color }) => {
  return (
    <div className="card border-light shadow-sm rounded-xl">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <p className="text-muted mb-1 small">{title}</p>
          <h5 className="fw-bold mb-1">{value}</h5>
          {change !== null && (
            <p className={`small mb-0 ${change > 0 ? 'text-success' : 'text-danger'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div
          className="d-flex align-items-center justify-content-center rounded"
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: color, // Use the color prop directly as background color
          }}
        >
          <FontAwesomeIcon icon={icon} className="text-white fs-5" />
        </div>
      </div>
>>>>>>> 44136ca (refactored codebase and made common re-useable components)
    </div>
  );
};

export default StatsCard;