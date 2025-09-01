import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    setError(null);
    
    apiService.fetchData()
      .then(data => {
        setProducts(data.products);
        setActivities(data.activities);
        setTeams(data.teams);
      })
      .catch(err => {
        setError('Failed to load data. Please check if JSON Server is running.');
        console.error('Failed to fetch data:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateStatus = (id, newStatus) => {
    const productToUpdate = products.find(p => p.id === id);
    if (!productToUpdate) return;
    
    const updatedProduct = { 
      ...productToUpdate, 
      status: newStatus, 
      stage: newStatus.charAt(0).toUpperCase() + newStatus.slice(1), 
      progress: newStatus === 'design' ? 25 : newStatus === 'production' ? 50 : newStatus === 'qa' ? 75 : 100 
    };
    
    apiService.updateProduct(updatedProduct)
      .then(savedProduct => {
        setProducts(prevProducts => prevProducts.map(p => p.id === id ? savedProduct : p));
        
        // Add activity log
        const newActivity = {
          type: 'status_update',
          message: `${productToUpdate.name} status changed to '${updatedProduct.stage}'`,
          time: 'just now',
          icon: 'box-open'
        };
        
        setActivities(prevActivities => [newActivity, ...prevActivities]);
      })
      .catch(error => {
        console.error("Failed to update product:", error);
        setError('Failed to update product');
      });
  };

  const handleAddRequest = (newRequest) => {
    const newProduct = { 
      ...newRequest, 
      id: `REQ-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`, 
      progress: 25 
    };
    
    apiService.addProduct(newProduct)
      .then(savedProduct => {
        setProducts(prevProducts => [...prevProducts, savedProduct]);
        
        // Add activity log
        const newActivity = {
          type: 'request',
          message: `New request added: ${newProduct.name}`,
          time: 'just now',
          icon: 'plus'
        };
        
        setActivities(prevActivities => [newActivity, ...prevActivities]);
      })
      .catch(error => {
        console.error("Failed to add new request:", error);
        setError('Failed to add new request');
      });
  };

  const handleAddTeam = (newTeam) => {
    const teamWithId = { ...newTeam, id: Date.now() };
    
    apiService.addTeam(teamWithId)
      .then(savedTeam => {
        setTeams(prevTeams => [...prevTeams, savedTeam]);
      })
      .catch(error => {
        console.error("Failed to add new team:", error);
        setError('Failed to add new team');
      });
  };

  const handleDeleteProduct = (id) => {
    apiService.deleteProduct(id)
      .then(() => {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
      })
      .catch(error => {
        console.error("Failed to delete product:", error);
        setError('Failed to delete product');
      });
  };

  const handleDeleteTeam = (id) => {
    apiService.deleteTeam(id)
      .then(() => {
        setTeams(prevTeams => prevTeams.filter(t => t.id !== id));
      })
      .catch(error => {
        console.error("Failed to delete team:", error);
        setError('Failed to delete team');
      });
  };

  const value = { 
    products, 
    activities, 
    teams, 
    isLoading, 
    error,
    handleUpdateStatus, 
    handleAddRequest, 
    handleAddTeam,
    handleDeleteProduct,
    handleDeleteTeam,
    refetchData: fetchData
  };
  
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);