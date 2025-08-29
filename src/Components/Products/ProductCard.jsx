import React, { useState } from 'react';
import { useProducts } from '../../hooks/UseProducts';
import ProgressBar from '../common/ProgressBar';
import "../../styles/Products.css";

const ProductCard = ({ product }) => {
  const { departments, users, updateProductStage } = useProducts();
  const [showLogs, setShowLogs] = useState(false);
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const currentDepartment = departments.find(d => d.id === product.stage);
  const assignedMembers = users.filter(u => product.assignedMembers.includes(u.id));

  const handleStageUpdate = async (newStage) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      const actor = "Current User"; 
      await updateProductStage(
        product.id, 
        newStage, 
        notes || `Moved to ${departments.find(d => d.id === newStage)?.name}`, 
        actor
      );
      setNotes('');
    } catch (err) {
      console.error('Failed to update product stage:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-header">
        <h3>{product.name}</h3>
        <span className="client-badge">{product.client}</span>
      </div>
      
      <div className="product-progress">
        <ProgressBar progress={product.progress} />
        <span className="progress-text">{product.progress}% complete</span>
      </div>
      
      <div className="product-details">
        <div className="detail-row">
          <label>Current Stage:</label>
          <span className="current-stage">{currentDepartment?.name || 'Unknown'}</span>
        </div>
        
        <div className="detail-row">
          <label>Assigned Team:</label>
          <div className="assigned-members">
            {assignedMembers.map(member => (
              <span key={member.id} className="member-tag">{member.name}</span>
            ))}
          </div>
        </div>
        
        <div className="detail-row">
          <label>Next Stage:</label>
          <div className="stage-actions">
            {product.stage < departments.length && (
              <>
                <textarea
                  placeholder="Add notes for the transition..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={isUpdating}
                />
                <button 
                  onClick={() => handleStageUpdate(product.stage + 1)}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Moving...' : `Move to ${departments.find(d => d.id === product.stage + 1)?.name}`}
                </button>
              </>
            )}
            {product.stage === departments.length && (
              <span className="completed-badge">Completed</span>
            )}
          </div>
        </div>
      </div>
      
      <button 
        className="toggle-logs-btn"
        onClick={() => setShowLogs(!showLogs)}
      >
        {showLogs ? 'Hide Logs' : 'Show Logs'} ({product.logs.length})
      </button>
      
      {showLogs && (
        <div className="product-logs">
          <h4>Activity Log</h4>
          <ul>
            {product.logs
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map(log => (
                <li key={log.id}>
                  <span className="log-timestamp">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                  <span className="log-actor">{log.actor}:</span>
                  <span className="log-notes">{log.notes}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductCard;