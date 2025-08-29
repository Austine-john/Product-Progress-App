import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Navbar from './Components/NavBar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import ProductList from './components/Products/ProductList';
import './styles/index.css';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/teams" element={<div>Teams Page</div>} />
              <Route path="/reports" element={<div>Reports Page</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;