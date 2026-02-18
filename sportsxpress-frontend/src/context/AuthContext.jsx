import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userData) => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll accept any valid input
      
      const user = {
        name: userData.name,
        email: email,
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
      };
      
      // Save to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update state
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // In a real app, this would be an API call
      const user = {
        name: userData.name,
        email: userData.email,
        isAuthenticated: true,
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Update home page to show welcome message
  const getWelcomeMessage = () => {
    if (user) {
      return `Welcome back, ${user.name}!`;
    }
    return 'Welcome to SportsXpress';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      loading,
      getWelcomeMessage,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};