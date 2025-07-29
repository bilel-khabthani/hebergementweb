import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkAuthUser, loginUser, logoutUser, signupUser, sendResetOtpUser, verifyAccountUser, resetPasswordUser } from '../api/auth';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await checkAuthUser();
        if (res.data.success) {
          const u = res.data.user;
          setUser({
            _id: u._id,
            email: u.email,
            role: u.role || 'user',
            name: u.name,
          });
          setIsAuthenticated(true);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const signup = async (formData) => {
    try {
      const res = await signupUser(formData);
      return res.data;
    } catch (err) {
      throw err;
    }
  };
const configureTawkTo = (user) => {
  if (!window.Tawk_API || !user?._id) return;

  const hash = crypto.createHash('md5')
    .update(user._id + process.env.TAWKTO_SECRET_HASH)
    .digest('hex');

  window.Tawk_API.onLoad = function() {
    window.Tawk_API.setVisitorData({
      name: user.name || user.email.split('@')[0],
      email: user.email,
      hash: hash
    });
    
    window.Tawk_API.addTags([`auth:${user.role || 'user'}`]);
    window.Tawk_API.restartSession();
  };
};
  const login = async (formData) => {
  try {
    const res = await loginUser(formData);
    if (res.data.success) {
      const u = res.data.user;
      setUser({
        _id: u._id,
        email: u.email,
        role: u.role || 'user',
        name: u.name,
      });
      setIsAuthenticated(true);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

      configureTawkTo(res.data.user);
    }
    return res.data;
  } catch (err) {
    throw err;
  }
};
  const loginWithGoogle = async (googleData) => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/google', googleData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (res.data?.success) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

         // 🔐 Configuration Tawk.to sans IP Tracking
     configureTawkTo(res.data.user);
  
        return {
          success: true,
          user: res.data.user,
          token: res.data.token,
        };
      }

      throw new Error(res.data?.message || 'Google authentication failed');
    } catch (err) {
      console.error('Google login error:', err);
      throw err;
    }
  };

  const verifyAccount = async (otp) => {
    try {
      const res = await verifyAccountUser(otp);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const sendResetOtp = async (email) => {
    try {
      const res = await sendResetOtpUser(email);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const resetPassword = async (formData) => {
    try {
      const res = await resetPasswordUser(formData);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        loginWithGoogle,
        logout,
        signup,
        sendResetOtp,
        resetPassword,
        verifyAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
