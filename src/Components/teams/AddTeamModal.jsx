import React, { useState } from 'react';
import { useProductContext } from '../../context/ProductContext';

const AddTeamModal = ({ onClose }) => {
  const { handleAddTeam } = useProductContext();
  const [newTeam, setNewTeam] = useState({ name: '', members: 0, projects: 0, lead: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeam(prevState => ({
      ...prevState,
      [name]: name === 'members' || name === 'projects' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTeam(newTeam);
    onClose();
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-md modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Team</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Team Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={newTeam.name} 
                  onChange={handleChange} 
                  required 
                  className="form-control" 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Team Lead</label>
                <input 
                  type="text" 
                  name="lead" 
                  value={newTeam.lead} 
                  onChange={handleChange} 
                  required 
                  className="form-control" 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Number of Members</label>
                <input 
                  type="number" 
                  name="members" 
                  value={newTeam.members} 
                  onChange={handleChange} 
                  required 
                  className="form-control" 
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Add Team
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamModal;
