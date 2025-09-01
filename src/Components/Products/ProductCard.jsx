import React from 'react';
import { useProductContext } from '../../context/ProductContext';
import StatusBadge from '../common/StatusBadge';
import ProgressBar from '../common/ProgressBar';

const ProductCard = ({ product }) => {
  const { handleUpdateStatus } = useProductContext();

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title">{product.name}</h5>
            <p className="card-subtitle text-muted">{product.customer}</p>
            <p className="text-muted small mt-1">ID: {product.id}</p>
          </div>
          <div className="d-flex flex-column align-items-end">
            <StatusBadge status={product.status} priority={product.priority} />
            <div className="mt-2 w-100">
              <select
                value={product.status}
                onChange={(e) => handleUpdateStatus(product.id, e.target.value)}
                className="form-select form-select-sm"
              >
                <option value="design">Design</option>
                <option value="production">Production</option>
                <option value="qa">QA Testing</option>
                <option value="dispatch">Dispatch</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-muted small">{product.stage}</span>
            <span className="fw-medium">{product.progress}%</span>
          </div>
          <ProgressBar progress={product.progress} status={product.status} />
        </div>

        <div className="d-flex justify-content-between text-muted small">
          <div className="d-flex align-items-center">
            <span className="me-1">👥</span>
            {product.assignedTeam}
          </div>
          <div className="d-flex align-items-center">
            <span className="me-1">📅</span>
            {product.dueDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
