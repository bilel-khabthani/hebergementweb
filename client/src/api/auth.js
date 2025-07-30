import axios from 'axios';

// Create a reusable Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Change if your backend runs on a different port or subdomain
  withCredentials: true, // 🧠 Sends/receives cookies like preAuthToken and token
});

//-------------------------------
//  singup
export const signupUser = async (userData) => {
  // userData: { name, email, password }
  return await api.post('/signup', userData);
};

//-------------------------------
//  VERIFY ACCOUNT WITH OTP (using preAuthToken in cookie)
export const verifyAccountUser = async (otp) => {
  return await api.post('/verify-account', { otp });
};

//-------------------------------
// LOGIN
export const loginUser = async (formdata) => {
  return await api.post('/login', formdata);
};

//-------------------------------
// 🟢 CHECK IF AUTHENTICATED (requires token cookie)

export const checkAuthUser = async () => {
  return await api.post('/isAuth');
};

//-------------------------------
// 🚪 LOGOUT
export const logoutUser = async () => {
  return await api.get('/logout');

  
//-------------------------------
// 🔁 RESEND VERIFY OTP (requires preAuthToken or token)
export const resendVerifyOtpUser = async () => {
  return await api.post('/send-verify-otp');
};

//-------------------------------
// 🔁 RESET PASSWORD FLOW
export const sendResetOtpUser = async (email) => {
  return await api.post('/send-reset-otp', { email });
};

export const resetPasswordUser = async (formdata) => {
  return await api.post('/reset-password',  formdata );
};

export default api;
