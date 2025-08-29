import React from 'react';

const AnalyticsChart = ({ data, type = 'bar', height = 300, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-placeholder">
        <p>No data available for chart</p>
      </div>
    );
  }

  const maxValue = type === 'bar' 
    ? Math.max(...data.map(item => item.count || item.value || 0))
    : data.reduce((sum, item) => sum + (item.value || 0), 0);

  return (
    <div className="analytics-chart" style={{ height: `${height}px` }}>
      {title && <h4 className="chart-title">{title}</h4>}
      
      {type === 'bar' && (
        <div className="bar-chart">
          {data.map((item, index) => {
            const percentage = maxValue > 0 ? ((item.count / maxValue) * 100) : 0;
            return (
              <div key={index} className="bar-container">
                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{
                      height: `${percentage}%`,
                      backgroundColor: item.color || '#3b82f6'
                    }}
                    title={`${item.count} ${item.name}`}
                  />
                </div>
                <span className="bar-label">{item.name}</span>
                <span className="bar-value">{item.count}</span>
              </div>
            );
          })}
        </div>
      )}
      
      {type === 'pie' && (
        <div className="pie-chart-container">
          <div className="pie-chart">
            {data.map((item, index) => {
              const percentage = maxValue > 0 ? ((item.value / maxValue) * 100) : 0;
              return (
                <div
                  key={index}
                  className="pie-slice"
                  style={{
                    backgroundColor: item.color || '#3b82f6',
                    width: `${percentage}%`
                  }}
                  title={`${item.value} ${item.name}`}
                />
              );
            })}
          </div>
          <div className="pie-legend">
            {data.map((item, index) => (
              <div key={index} className="legend-item">
                <span 
                  className="legend-color" 
                  style={{ backgroundColor: item.color || '#3b82f6' }}
                />
                <span className="legend-label">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;