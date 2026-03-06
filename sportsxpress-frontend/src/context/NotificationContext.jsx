import React, { createContext, useState, useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';

const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });
  const [open, setOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  const addNotification = (message, type = 'success') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleString()
    };
    
    const updated = [newNotification, ...notifications].slice(0, 20);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
    
    setCurrentNotification(newNotification);
    setOpen(true);
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  const removeNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      clearNotifications,
      removeNotification 
    }}>
      {children}
      
      {/* Snackbar for real-time notifications */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setOpen(false)} 
          severity={currentNotification?.type || 'info'}
          sx={{ width: '100%', fontWeight: 'medium' }}
        >
          {currentNotification?.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};