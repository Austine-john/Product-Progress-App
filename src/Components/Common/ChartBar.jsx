import React from 'react';
import "../../styles/charts.css";

const ChartBar = ({ label, value, max }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  
  return (
    <div className="chart-bar">
      <div className="chart-label">{label}</div>
      <div className="chart-bar-container">
        <div 
          className="chart-bar-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="chart-value">{value}</div>
    </div>
  );
};

export default ChartBar;