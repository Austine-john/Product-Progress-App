import React from 'react';
import StatusBadge from './common/StatusBadge';
import ProgressBar from './common/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const ProductSummaryCard = ({ product }) => (
  <div className="card shadow-sm h-100">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h6 className="card-title fw-semibold mb-1">{product.name}</h6>
          <p className="card-text text-muted small mb-1">{product.customer}</p>
          <small className="text-muted">ID: {product.id}</small>
        </div>
        <StatusBadge status={product.status} priority={product.priority} />
      </div>
      
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted small">{product.stage}</span>
          <span className="fw-semibold small">{product.progress}%</span>
        </div>
        <ProgressBar progress={product.progress} status={product.status} />
      </div>
      
      <div className="d-flex justify-content-between align-items-center text-muted small">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faPeopleGroup} className="me-2 small" />
          {product.assignedTeam}
        </div>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faCalendarDays} className="me-2 small" />
          {product.dueDate}
        </div>
      </div>
    </div>
  </div>
);

export default ProductSummaryCard;