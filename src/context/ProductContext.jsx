import React, { useState, useEffect } from 'react';
import { ProductContext } from './ProductContextInstance';
import { 
  getProducts, 
  getUsers, 
  getDepartments, 
  updateProduct,
  createProduct,
  deleteProduct
} from '../api/ProductsApi';

// Provider Component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, usersData, departmentsData] = await Promise.all([
          getProducts(),
          getUsers(),
          getDepartments()
        ]);
        
        setProducts(productsData);
        setUsers(usersData);
        setDepartments(departmentsData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addProduct = async (productData) => {
    try {
      const newProduct = await createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError('Failed to create product: ' + err.message);
      throw err;
    }
  };

  const removeProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      setError('Failed to delete product: ' + err.message);
      throw err;
    }
  };

  const updateProductStage = async (productId, newStage, notes, actor) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) throw new Error('Product not found');
      
      const updatedProduct = await updateProduct(productId, {
        stage: newStage,
        progress: Math.min(100, Math.floor((newStage / departments.length) * 100)),
        logs: [
          ...product.logs,
          {
            id: Date.now(),
            productId,
            stage: newStage,
            notes,
            actor,
            timestamp: new Date().toISOString()
          }
        ]
      });
      
      setProducts(prev => prev.map(p => 
        p.id === productId ? updatedProduct : p
      ));
      
      return updatedProduct;
    } catch (err) {
      setError('Failed to update product: ' + err.message);
      throw err;
    }
  };

  const addMemberToProduct = async (productId, userId) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) throw new Error('Product not found');
      
      // Check if user is already assigned
      if (product.assignedMembers.includes(userId)) {
        throw new Error('User is already assigned to this product');
      }
      
      const updatedAssignedMembers = [...product.assignedMembers, userId];
      const updatedProduct = await updateProduct(productId, { 
        assignedMembers: updatedAssignedMembers 
      });
      
      setProducts(prev => prev.map(p => 
        p.id === productId ? updatedProduct : p
      ));
      
      return updatedProduct;
    } catch (err) {
      setError('Failed to assign member: ' + err.message);
      throw err;
    }
  };

  const removeMemberFromProduct = async (productId, userId) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) throw new Error('Product not found');
      
      const updatedAssignedMembers = product.assignedMembers.filter(id => id !== userId);
      const updatedProduct = await updateProduct(productId, { 
        assignedMembers: updatedAssignedMembers 
      });
      
      setProducts(prev => prev.map(p => 
        p.id === productId ? updatedProduct : p
      ));
      
      return updatedProduct;
    } catch (err) {
      setError('Failed to remove member: ' + err.message);
      throw err;
    }
  };

  const addLogEntry = async (productId, logData) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) throw new Error('Product not found');
      
      const newLog = {
        id: Date.now(),
        productId,
        ...logData,
        timestamp: new Date().toISOString()
      };
      
      const updatedLogs = [...product.logs, newLog];
      const updatedProduct = await updateProduct(productId, { logs: updatedLogs });
      
      setProducts(prev => prev.map(p => 
        p.id === productId ? updatedProduct : p
      ));
      
      return updatedProduct;
    } catch (err) {
      setError('Failed to add log entry: ' + err.message);
      throw err;
    }
  };

  const getProductsByDepartment = (departmentId) => {
    return products.filter(product => product.stage === departmentId);
  };

  const getDepartmentById = (departmentId) => {
    return departments.find(dept => dept.id === departmentId);
  };

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const value = {
    products,
    users,
    departments,
    loading,
    error,
    addProduct,
    removeProduct,
    updateProductStage,
    addMemberToProduct,
    removeMemberFromProduct,
    addLogEntry,
    getProductsByDepartment,
    getDepartmentById,
    getUserById
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};