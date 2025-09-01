import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExclamationTriangle, 
  faHourglassHalf, 
  faCheck 
} from '@fortawesome/free-solid-svg-icons';

const StatusBadge = ({ status, priority }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'design':
        return 'bg-warning text-dark';
      case 'production':
        return 'bg-primary text-white';
      case 'qa':
        return 'text-white';
      case 'dispatch':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  const getStatusStyle = () => {
    if (status === 'qa') return { backgroundColor: '#6f42c1' };
    return {};
  };

  const getPriorityIcon = () => {
    switch (priority) {
      case 'high':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-danger" />;
      case 'medium':
        return <FontAwesomeIcon icon={faHourglassHalf} className="text-warning" />;
      case 'low':
        return <FontAwesomeIcon icon={faCheck} className="text-success" />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex align-items-center gap-2">
      <span
        className={`badge px-2 py-1 ${getStatusClass()}`}
        style={getStatusStyle()}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
      <div>{getPriorityIcon()}</div>
    </div>
  );
};

export default StatusBadge;