import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/users', // ✅ Change if your backend runs on a different port or subdomain
  withCredentials: true, // 🧠 Sends/receives cookies like preAuthToken and token
});

//-----------GET ALL USERS (requires admin token cookie)
export const getAllUsers = async (userData) => {
  // userData: { name, email, password }
  return await api.get('/get-all-users', userData);
};


//  GET USER BY ID (requires admin token cookie)
export const getUserById = async (id) => {  
  return await api.get(`/get-user-by-id/${id}`);
}

// DELETE USER BY ID (requires admin token cookie)
export const deleteUser = async (id) => {
  return await api.delete(`/delete-user/${id}`);
}
export default api;