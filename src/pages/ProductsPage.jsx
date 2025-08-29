import React from 'react';
import ProductList from '../components/Products/ProductList';
import "../styles/Products.css";

const ProductsPage = () => {
  return (
    <section className="products-page">
      <div className="page-header">
        <h2>Product Tracking</h2>
        <p>Manage and track all products through their production journey</p>
      </div>
      <ProductList />
    </section>
  );
};

export default ProductsPage;