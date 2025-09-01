import React, { useState } from 'react';
import { useProductContext } from '../../context/ProductContext';

const NewRequestModal = ({ onClose }) => {
  const { teams, handleAddRequest } = useProductContext();
  const [newRequest, setNewRequest] = useState({ 
    name: '', 
    customer: '', 
    status: 'design', 
    stage: 'Design', 
    assignedTeam: '', 
    dueDate: '', 
    priority: 'medium' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRequest(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddRequest(newRequest);
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-md modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Product Request</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={newRequest.name} 
                  onChange={handleChange} 
                  className="form-control" 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Customer</label>
                <input 
                  type="text" 
                  name="customer" 
                  value={newRequest.customer} 
                  onChange={handleChange} 
                  className="form-control" 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Assigned Team</label>
                <select 
                  name="assignedTeam" 
                  value={newRequest.assignedTeam} 
                  onChange={handleChange} 
                  className="form-select" 
                  required
                >
                  <option value="">Select a team</option>
                  {teams.map(team => (
                    <option key={team.name} value={team.name}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input 
                  type="date" 
                  name="dueDate" 
                  value={newRequest.dueDate} 
                  onChange={handleChange} 
                  className="form-control" 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select 
                  name="priority" 
                  value={newRequest.priority} 
                  onChange={handleChange} 
                  className="form-select" 
                  required
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary w-100">Add Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRequestModal;