import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';  // ← ADD THIS!

const WishlistContext = createContext({});

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (!prev.find(item => item.id === product.id)) {
        toast.success('Added to wishlist!');
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem('wishlist');
    toast.success('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      wishlistCount: wishlistItems.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
};