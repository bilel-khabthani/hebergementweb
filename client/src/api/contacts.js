import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/contact', // ✅ Change if your backend runs on a different port or subdomain
  withCredentials: true, // 🧠 Sends/receives cookies like preAuthToken and token
});

//-----------GET ALL USERS (requires admin token cookie)
export const getAllContacts = async () => {
  // userData: { name, email, password }
  return await api.get('/get-all');
};


//  GET USER BY ID (requires admin token cookie)
export const getContactById = async (id) => {  
  return await api.get(`/get-contact-by-id/${id}`);
}

// DELETE USER BY ID (requires admin token cookie)
export const deleteContact = async (id) => {
  return await api.delete(`/delete/${id}`);
}

//Update contact (status changes)
export const updateContact = async (id, contactData) => {
  return await api.put(`/update/${id}`, contactData);
}
export default api;