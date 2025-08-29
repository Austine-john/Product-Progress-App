import React from 'react';
import { useProducts } from '../../hooks/UseProducts';
import ProductCard from './ProductCard';
import "../../styles/Products.css";

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <div className="product-list-header">
        <span>Total Products: {products.length}</span>
      </div>
      
      {products.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Start by adding a new product to track its progress</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;