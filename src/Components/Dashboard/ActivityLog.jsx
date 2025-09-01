import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileAlt, 
  faCheckCircle, 
  faUserTie, 
  faClipboardCheck, 
  faBoxOpen 
} from '@fortawesome/free-solid-svg-icons';

const ActivityLog = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'request':
        return faFileAlt;
      case 'approval':
        return faCheckCircle;
      case 'assignment':
        return faUserTie;
      case 'milestone':
        return faClipboardCheck;
      case 'completion':
        return faCheckCircle;
      case 'status_update':
        return faBoxOpen;
      default:
        return faFileAlt;
    }
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title fw-semibold mb-4">Recent Activity</h5>
        <div className="d-flex flex-column gap-3">
          {activities.map(activity => (
            <div key={activity.id} className="d-flex align-items-start gap-3">
              <div className="flex-shrink-0 rounded-circle bg-light p-2 d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                <FontAwesomeIcon icon={getActivityIcon(activity.type)} className="text-primary" />
              </div>
              <div className="flex-grow-1">
                <p className="mb-1 text-dark">{activity.message}</p>
                <small className="text-muted">{activity.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;