import React from 'react';
import { useLocation } from 'react-router-dom';
import MobileAppLayout from './MobileAppLayout';

// Page titles mapping
const pageTitles = {
  '/': 'Home',
  '/products': 'Products',
  '/cart': 'Shopping Cart',
  '/wishlist': 'My Wishlist',
  '/profile': 'My Profile',
  '/orders': 'My Orders',
  '/checkout': 'Checkout',
  '/login': 'Login',
  '/signup': 'Sign Up',
  '/starter-kit': 'Starter Kit Builder',
  '/ai-size': 'AI Size Recommender',
  '/sports-shoes': 'Sports Shoes',
  '/sports-jersey': 'Sports Jerseys',
  '/medical-kits': 'Medical Kits',
};

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Get title from path
  const getTitle = () => {
    if (location.pathname.startsWith('/sport/')) {
      const sport = location.pathname.split('/')[2];
      return sport.charAt(0).toUpperCase() + sport.slice(1);
    }
    if (location.pathname.startsWith('/products/')) {
      return 'Product Details';
    }
    if (location.pathname.startsWith('/orders/')) {
      return 'Order Details';
    }
    if (location.pathname.startsWith('/order-confirmation/')) {
      return 'Order Confirmation';
    }
    if (location.pathname.startsWith('/admin/')) {
      return 'Admin Panel';
    }
    
    return pageTitles[location.pathname] || 'SportsXpress';
  };

  // Check if page should show back button
  const shouldShowBack = () => {
    return (
      location.pathname.startsWith('/products/') ||
      location.pathname.startsWith('/orders/') ||
      location.pathname.startsWith('/order-confirmation/') ||
      location.pathname === '/checkout' ||
      location.pathname === '/cart'
    );
  };

  return (
    <MobileAppLayout 
      title={getTitle()} 
      showBack={shouldShowBack()}
    >
      {children}
    </MobileAppLayout>
  );
};

export default Layout;