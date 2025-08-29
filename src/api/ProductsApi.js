const API_BASE = 'http://localhost:3001';

// Products API
export const getProducts = async () => {
  const response = await fetch(`${API_BASE}/products`);
  return response.json();
};

export const getProduct = async (id) => {
  const response = await fetch(`${API_BASE}/products/${id}`);
  return response.json();
};

export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...productData,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString(),
      logs: productData.logs || []
    })
  });
  return response.json();
};

export const updateProduct = async (id, updates) => {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};

// Users API
export const getUsers = async () => {
  const response = await fetch(`${API_BASE}/users`);
  return response.json();
};

// Departments API
export const getDepartments = async () => {
  const response = await fetch(`${API_BASE}/departments`);
  return response.json();
};