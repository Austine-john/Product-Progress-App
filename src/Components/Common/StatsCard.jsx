import React from 'react';

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
    </div>
  );
};

export default StatsCard;