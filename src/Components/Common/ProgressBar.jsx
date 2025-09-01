import React from 'react';
<<<<<<< HEAD
import "../../styles/charts.css";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%` }}
=======

const ProgressBar = ({ progress, status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'design':
        return 'bg-warning';    // yellow
      case 'production':
        return 'bg-primary';    // blue
      case 'qa':
        return 'bg-purple';     // Bootstrap doesn't have purple by default; will use inline style
      case 'dispatch':
        return 'bg-success';    // green
      default:
        return 'bg-secondary';  // gray
    }
  };

  const getCustomStyle = () => {
    if (status === 'qa') {
      return { backgroundColor: '#6f42c1' }; // Bootstrap purple
    }
    return {};
  };

  return (
    <div className="progress" style={{ height: '8px', borderRadius: '4px' }}>
      <div
        className={`progress-bar ${getStatusClass()}`}
        role="progressbar"
        style={{ width: `${progress}%`, ...getCustomStyle() }}
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
>>>>>>> 44136ca (refactored codebase and made common re-useable components)
      ></div>
    </div>
  );
};

<<<<<<< HEAD
export default ProgressBar;
=======
export default ProgressBar;
>>>>>>> 44136ca (refactored codebase and made common re-useable components)
