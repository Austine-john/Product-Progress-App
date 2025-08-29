import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // JSON server URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Team/Users API functions
export const teamApi = {
  // Get all team members
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', {
        ...userData,
        isActive: true,
        currentProductId: null,
        createdAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await api.patch(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  },

  // Get users by department
  getUsersByDepartment: async (department) => {
    try {
      const response = await api.get('/users');
      const users = response.data;
      return users.filter(user => user.department === department);
    } catch (error) {
      console.error(`Error fetching users by department ${department}:`, error);
      throw error;
    }
  },

  // Get active users
  getActiveUsers: async () => {
    try {
      const response = await api.get('/users');
      const users = response.data;
      return users.filter(user => user.isActive);
    } catch (error) {
      console.error('Error fetching active users:', error);
      throw error;
    }
  },

  // Get available users (not assigned to any product)
  getAvailableUsers: async () => {
    try {
      const response = await api.get('/users');
      const users = response.data;
      return users.filter(user => user.isActive && !user.currentProductId);
    } catch (error) {
      console.error('Error fetching available users:', error);
      throw error;
    }
  },

  // Get users assigned to a specific product
  getUsersByProduct: async (productId) => {
    try {
      const response = await api.get('/users');
      const users = response.data;
      return users.filter(user => user.currentProductId === productId);
    } catch (error) {
      console.error(`Error fetching users for product ${productId}:`, error);
      throw error;
    }
  },

  // Assign user to product
  assignUserToProduct: async (userId, productId) => {
    try {
      const response = await api.patch(`/users/${userId}`, {
        currentProductId: productId
      });
      return response.data;
    } catch (error) {
      console.error(`Error assigning user ${userId} to product ${productId}:`, error);
      throw error;
    }
  },

  // Remove user from product
  removeUserFromProduct: async (userId) => {
    try {
      const response = await api.patch(`/users/${userId}`, {
        currentProductId: null
      });
      return response.data;
    } catch (error) {
      console.error(`Error removing user ${userId} from product:`, error);
      throw error;
    }
  },

  // Toggle user active status
  toggleUserStatus: async (userId, isActive) => {
    try {
      const response = await api.patch(`/users/${userId}`, {
        isActive: isActive
      });
      return response.data;
    } catch (error) {
      console.error(`Error toggling user ${userId} status:`, error);
      throw error;
    }
  },

  // Get team statistics (UPDATED - now uses products data)
  getTeamStats: async () => {
    try {
      const [usersResponse, productsResponse] = await Promise.all([
        api.get('/users'),
        api.get('/products')
      ]);

      const users = usersResponse.data;
      const products = productsResponse.data;

      const activeUsers = users.filter(user => user.isActive);
      const availableUsers = users.filter(user => user.isActive && !user.currentProductId);
      
      // Count users by department
      const usersByDepartment = users.reduce((acc, user) => {
        acc[user.department] = (acc[user.department] || 0) + 1;
        return acc;
      }, {});

      // Count users by role
      const usersByRole = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {});

      // Calculate product-related stats (using the products data)
      const totalProducts = products.length;
      const activeProducts = products.filter(product => product.progress > 0 && product.progress < 100).length;
      const completedProducts = products.filter(product => product.progress === 100).length;
      const notStartedProducts = products.filter(product => product.progress === 0).length;

      // Calculate average progress across all products
      const averageProgress = totalProducts > 0 
        ? Math.round(products.reduce((sum, product) => sum + (product.progress || 0), 0) / totalProducts)
        : 0;

      // Calculate total budget
      const totalBudget = products.reduce((sum, product) => sum + (product.budget || 0), 0);
      const averageBudget = totalProducts > 0 ? Math.round(totalBudget / totalProducts) : 0;

      return {
        // User statistics
        totalUsers: users.length,
        activeUsers: activeUsers.length,
        availableUsers: availableUsers.length,
        utilizationRate: activeUsers.length > 0 
          ? Math.round(((activeUsers.length - availableUsers.length) / activeUsers.length) * 100)
          : 0,
        usersByDepartment,
        usersByRole,
        departments: Object.keys(usersByDepartment),
        roles: Object.keys(usersByRole),
        
        // Product statistics (using the products data)
        totalProducts,
        activeProducts,
        completedProducts,
        notStartedProducts,
        completionRate: totalProducts > 0 ? Math.round((completedProducts / totalProducts) * 100) : 0,
        averageProgress,
        totalBudget,
        averageBudget,
        
        // Combined metrics
        usersPerProduct: totalProducts > 0 ? (activeUsers.length / totalProducts).toFixed(1) : 0,
        budgetPerUser: activeUsers.length > 0 ? Math.round(totalBudget / activeUsers.length) : 0
      };
    } catch (error) {
      console.error('Error fetching team stats:', error);
      throw error;
    }
  },

  // Search users by name, email, or skills
  searchUsers: async (query) => {
    try {
      const response = await api.get('/users');
      const users = response.data;
      
      const searchTerm = query.toLowerCase();
      return users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        (user.skills && user.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm)
        )) ||
        user.role.toLowerCase().includes(searchTerm) ||
        user.department.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      console.error(`Error searching users with query ${query}:`, error);
      throw error;
    }
  },

  // Get users with their assigned products
  getUsersWithProducts: async () => {
    try {
      const [usersResponse, productsResponse] = await Promise.all([
        api.get('/users'),
        api.get('/products')
      ]);

      const users = usersResponse.data;
      const products = productsResponse.data;

      return users.map(user => ({
        ...user,
        assignedProduct: user.currentProductId 
          ? products.find(p => p.id == user.currentProductId) // Use == for type coercion
          : null
      }));
    } catch (error) {
      console.error('Error fetching users with products:', error);
      throw error;
    }
  },

  // Bulk update users
  bulkUpdateUsers: async (userUpdates) => {
    try {
      const updatePromises = userUpdates.map(update =>
        api.patch(`/users/${update.id}`, update.data)
      );
      
      const results = await Promise.allSettled(updatePromises);
      return results.map((result, index) => ({
        userId: userUpdates[index].id,
        status: result.status,
        data: result.status === 'fulfilled' ? result.value : result.reason
      }));
    } catch (error) {
      console.error('Error in bulk user update:', error);
      throw error;
    }
  }
};

export default teamApi;