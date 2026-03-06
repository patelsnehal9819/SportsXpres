import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  // Helper function to get current user
  const getCurrentUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user:', error);
      return null;
    }
  };

  // Load cart when component mounts and when user changes
  useEffect(() => {
    const user = getCurrentUser();
    if (user?._id) {
      console.log('👤 User found:', user.email);
      loadCart(user._id);
    } else {
      console.log('👤 No user logged in');
      setCartItems([]);
    }

    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      const updatedUser = getCurrentUser();
      if (updatedUser?._id) {
        loadCart(updatedUser._id);
      } else {
        setCartItems([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadCart = async (userId) => {
    try {
      console.log('🛒 Loading cart for user:', userId);
      const res = await fetch(`${BASE_URL}/api/cart/${userId}`);
      const data = await res.json();
      
      if (data.success) {
        const items = data.cart.items.map(item => ({
          id: item.productId,
          _id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          brand: item.brand,
          category: item.category
        }));
        setCartItems(items);
        console.log('✅ Cart loaded with', items.length, 'items');
      } else {
        console.log('❌ Failed to load cart:', data.message);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  // ========== FIXED: addToCart with better error handling ==========
  const addToCart = async (product, quantity = 1) => {
    const user = getCurrentUser();
    
    if (!user?._id) {
      console.log('❌ No user found');
      toast.error('Please login first');
      return false;
    }

    console.log('🛍️ Adding to cart - User:', user._id);
    console.log('📦 Product:', product);

    // Ensure product has all required fields
    const cartItem = {
      userId: user._id,
      productId: product._id || product.id,
      name: product.name || 'Product',
      price: product.price || 0,
      quantity: quantity || 1,
      image: product.image || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      brand: product.brand || 'SportsXpress',
      category: product.category || 'kit'
    };

    console.log('📤 Sending to backend:', cartItem);

    try {
      const response = await fetch(`${BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem)
      });
      
      const data = await response.json();
      console.log('📥 Backend response:', data);
      
      if (data.success) {
        await loadCart(user._id);
        toast.success('Added to cart');
        return true;
      } else {
        console.error('❌ Backend error:', data.message);
        toast.error(data.message || 'Failed to add to cart');
        return false;
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      toast.error('Network error - please try again');
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    const user = getCurrentUser();
    if (!user?._id) {
      toast.error('Please login first');
      return;
    }

    try {
      console.log('🗑️ Removing from cart:', productId);
      const response = await fetch(`${BASE_URL}/api/cart/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, productId })
      });
      
      const data = await response.json();
      if (data.success) {
        await loadCart(user._id);
        toast.success('Removed from cart');
      } else {
        toast.error(data.message || 'Failed to remove');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Error removing item');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const user = getCurrentUser();
    if (!user?._id) return;

    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    try {
      console.log('🔄 Updating quantity:', { productId, quantity });
      const response = await fetch(`${BASE_URL}/api/cart/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, productId, quantity })
      });
      
      const data = await response.json();
      if (data.success) {
        await loadCart(user._id);
      } else {
        toast.error(data.message || 'Failed to update');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    const user = getCurrentUser();
    if (!user?._id) return;

    try {
      console.log('🗑️ Clearing cart for user:', user._id);
      const response = await fetch(`${BASE_URL}/api/cart/clear/${user._id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      if (data.success) {
        setCartItems([]);
        toast.success('Cart cleared');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};