import React from 'react';
import { useProductContext } from '../../context/ProductContext';
import TeamCard from './TeamCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TeamsPage = ({ setShowAddTeamModal }) => {
  const { teams } = useProductContext();
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 fw-bold text-dark mb-0">Team Management</h2>
        <button 
          onClick={() => setShowAddTeamModal(true)} 
          className="btn btn-primary d-flex align-items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Team
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {teams.map(team => (
          <div key={team.name} className="col">
            <TeamCard team={team} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;