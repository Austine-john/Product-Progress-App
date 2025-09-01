import React, { useState } from 'react';
import { useProductContext } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductsPage = ({ setShowNewRequestModal }) => {
  const { products } = useProductContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="h3 fw-bold text-dark mb-0">Product Requests</h2>
        <button 
          onClick={() => setShowNewRequestModal(true)} 
          className="btn btn-primary d-flex align-items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          New Request
        </button>
      </div>
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
      />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;