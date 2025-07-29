import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/products', // ✅ Change if your backend runs on a different port or subdomain
  withCredentials: true, // 🧠 Sends/receives cookies like preAuthToken and token
});

//-----------GET ALL Products (requires admin token cookie)
export const getAllProducts = async (productData) => {
  return await api.get('/get-all-products', productData);
};


//  GET product BY ID (requires admin token cookie)
export const getProductById = async (id) => {  
  return await api.get(`/get-product-by-id/${id}`);
}

// DELETE product BY ID (requires admin token cookie)
export const deleteProduct = async (id) => {
  return await api.delete(`/delete-product/${id}`);
}

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/products',
      productData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur création produit:", error.response?.data || error.message);
    throw error;
  }
};


export const updateProduct = (id, data) => {
  return axios.put(`http://localhost:8080/api/products/${id}`, data);
};
export default api;