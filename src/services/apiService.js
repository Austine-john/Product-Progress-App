const API_BASE_URL = 'http://localhost:3001';

export const apiService = {
  // Fetch all data
  fetchData: () => {
    return Promise.all([
      fetch(`${API_BASE_URL}/products`),
      fetch(`${API_BASE_URL}/activities`),
      fetch(`${API_BASE_URL}/teams`)
    ])
    .then(([productsResponse, activitiesResponse, teamsResponse]) => {
      if (!productsResponse.ok || !activitiesResponse.ok || !teamsResponse.ok) {
        throw new Error('Failed to fetch data');
      }
      return Promise.all([
        productsResponse.json(),
        activitiesResponse.json(),
        teamsResponse.json()
      ]);
    })
    .then(([products, activities, teams]) => {
      return { products, activities, teams };
    })
    .catch(error => {
      console.error('API Error:', error);
      throw error;
    });
  },

  // Update a product
  updateProduct: (updatedProduct) => {
    return fetch(`${API_BASE_URL}/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      return response.json();
    })
    .catch(error => {
      console.error('API Error:', error);
      throw error;
    });
  },

  // Add a new product
  addProduct: (newProduct) => {
    return fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      return response.json();
    })
    .catch(error => {
      console.error('API Error:', error);
      throw error;
    });
  },

  // Add a new team
  addTeam: (newTeam) => {
    return fetch(`${API_BASE_URL}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTeam),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add team');
      }
      return response.json();
    })
    .catch(error => {
      console.error('API Error:', error);
      throw error;
    });
  },

  // Delete a product
  deleteProduct: (id) => {
    return fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      return true;
    })
    .catch(error => {
      console.error('API Error:', error);
      throw error;
    });
  },

  // Delete a team
  deleteTeam: (id) => {
    return fetch(`${API_BASE_URL}/teams/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete team');
      }
      return true;
    })
    .catch(error => {
      console.error('API Error:', error);
      throw error;
    });
  }
};