import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) => (
  <div className="d-flex flex-wrap gap-3 mb-4">
    <div className="flex-grow-1 position-relative" style={{minWidth: '250px'}}>
      <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <input 
        type="text" 
        placeholder="Search products, requests, or customers..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="form-control ps-5"
      />
    </div>
    
    <select 
      value={statusFilter} 
      onChange={(e) => setStatusFilter(e.target.value)} 
      className="form-select"
      style={{width: 'auto'}}
    >
      <option value="all">All Status</option>
      <option value="design">Design</option>
      <option value="production">Production</option>
      <option value="qa">QA Testing</option>
      <option value="dispatch">Ready for Dispatch</option>
    </select>
    
    <button className="btn btn-primary d-flex align-items-center">
      <FontAwesomeIcon icon={faFilter} className="me-2" />
      Filter
    </button>
  </div>
);

export default SearchBar;