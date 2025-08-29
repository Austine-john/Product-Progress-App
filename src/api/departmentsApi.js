import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Departments API functions
export const departmentsApi = {
  // Get all departments
  getAllDepartments: async () => {
    try {
      const response = await api.get('/departments');
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  },

  // Get department by ID
  getDepartmentById: async (id) => {
    try {
      const response = await api.get(`/departments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching department ${id}:`, error);
      throw error;
    }
  },

  // Create new department
  createDepartment: async (departmentData) => {
    try {
      const response = await api.post('/departments', departmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating department:', error);
      throw error;
    }
  },

  // Update department
  updateDepartment: async (id, departmentData) => {
    try {
      const response = await api.put(`/departments/${id}`, departmentData);
      return response.data;
    } catch (error) {
      console.error(`Error updating department ${id}:`, error);
      throw error;
    }
  },

  // Delete department
  deleteDepartment: async (id) => {
    try {
      const response = await api.delete(`/departments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting department ${id}:`, error);
      throw error;
    }
  },

  // Get departments with product counts
  getDepartmentsWithStats: async () => {
    try {
      const [departmentsResponse, productsResponse] = await Promise.all([
        api.get('/departments'),
        api.get('/products')
      ]);

      const departments = departmentsResponse.data;
      const products = productsResponse.data;

      return departments.map(dept => ({
        ...dept,
        productCount: products.filter(product => product.stage === dept.id).length,
        totalProgress: products
          .filter(product => product.stage === dept.id)
          .reduce((sum, product) => sum + (product.progress || 0), 0)
      }));
    } catch (error) {
      console.error('Error fetching departments with stats:', error);
      throw error;
    }
  }
};

export default departmentsApi;