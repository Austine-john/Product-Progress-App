import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faUsers, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const TeamCard = ({ team }) => (
  <div className="card shadow-sm h-100">
    <div className="card-body">
      <h6 className="card-title fw-semibold mb-2">{team.name}</h6>
      <p className="card-text text-muted small mb-3">
        <FontAwesomeIcon icon={faUserTie} className="me-2" />
        Lead: {team.lead}
      </p>
      <div className="d-flex justify-content-between align-items-center text-muted small">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faUsers} className="me-2" />
          {team.members} members
        </div>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
          {team.projects} projects
        </div>
      </div>
    </div>
  </div>
);

export default TeamCard;