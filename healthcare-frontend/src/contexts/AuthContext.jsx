import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post('/auth/token/', { username, password });
      const { access, refresh } = response.data;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Fetch user data
      const userResponse = await axiosInstance.get('/auth/user/');
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      setUser(userResponse.data);
      
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to login');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Format data to match Django backend expectations
      const formattedData = {
        username: userData.email, // Using email as username
        email: userData.email,
        password: userData.password,
        password2: userData.confirmPassword, // Django often uses password2 for confirmation
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role,
        ...(userData.role === 'DOCTOR' && {
          specialization: userData.specialization,
          license_number: userData.licenseNumber
        })
      };
      
      const response = await axiosInstance.post('/auth/register/', formattedData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to register');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    toast.success('Successfully logged out!');
  };

  const updateProfile = async (data) => {
    try {
      const response = await axiosInstance.patch('/auth/profile/', data);
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      return updatedUser;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update profile');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
} 