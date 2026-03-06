import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
  IconButton,
} from '@mui/material';
import {
  NotificationsActive,
  ShoppingCart,
  Favorite,
  CheckCircle,
  Info,
  Warning,
  Delete,
  Close,
} from '@mui/icons-material';
import { useNotifications } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const { notifications, clearNotifications, removeNotification } = useNotifications();
  const navigate = useNavigate();

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'info': return <Info sx={{ color: '#1976d2' }} />;
      case 'warning': return <Warning sx={{ color: '#ff9800' }} />;
      case 'cart': return <ShoppingCart sx={{ color: '#fb641b' }} />;
      case 'wishlist': return <Favorite sx={{ color: '#f44336' }} />;
      default: return <NotificationsActive sx={{ color: '#757575' }} />;
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Notifications
        </Typography>
        {notifications.length > 0 && (
          <Button 
            variant="outlined" 
            startIcon={<Delete />} 
            onClick={clearNotifications}
            size="small"
          >
            Clear All
          </Button>
        )}
      </Box>

      {notifications.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
          <NotificationsActive sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No notifications yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We'll notify you when something happens
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 3, bgcolor: '#fb641b' }}
            onClick={() => navigate('/products')}
          >
            Browse Products
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <List sx={{ p: 0 }}>
            {notifications.map((notif, index) => (
              <React.Fragment key={notif.id}>
                <ListItem 
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton edge="end" onClick={() => removeNotification(notif.id)}>
                      <Close fontSize="small" />
                    </IconButton>
                  }
                  sx={{ 
                    bgcolor: index === 0 ? '#f5f5f5' : 'white',
                    '&:hover': { bgcolor: '#fafafa' }
                  }}
                >
                  <ListItemIcon sx={{ mt: 1 }}>
                    {getIcon(notif.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight="600">
                        {notif.message}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {notif.timestamp}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Notifications;