import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Layout from './components/layout/Layout';
import SportsPage from './pages/SportsPage';

// Import product loader
import { loadAllProducts } from './data/sportProducts';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import SportCategory from './pages/SportCategory';
import SportsShoes from './pages/SportsShoes';
import SportsJersey from './pages/SportsJersey';
import MedicalKits from './pages/MedicalKits';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import OrderTracking from './pages/OrderTracking';
import StarterKit from './pages/StarterKit';
import AISizePage from './pages/AISizePage';
import AdminAddProduct from './pages/AdminAddProduct';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import OrderDetails from './pages/OrderDetails';
import OrderConfirmation from './pages/OrderConfirmation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#fb641b',
      light: '#ff8a4f',
      dark: '#c43e00',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    background: {
      default: '#f1f3f6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        },
        containedSecondary: {
          backgroundColor: '#fb641b',
          '&:hover': {
            backgroundColor: '#f4511e',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

function App() {
  // Load products into localStorage on first load
  useEffect(() => {
    const products = localStorage.getItem('sportsxpress_products');
    if (!products) {
      const count = loadAllProducts();
      console.log(`✅ ${count} products loaded successfully!`);
    } else {
      const productCount = JSON.parse(products).length;
      console.log(`📦 ${productCount} products available in localStorage`);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '4px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            style: { background: '#4caf50' },
            iconTheme: { primary: '#fff', secondary: '#4caf50' },
          },
          error: {
            style: { background: '#f44336' },
            iconTheme: { primary: '#fff', secondary: '#f44336' },
          },
          loading: {
            style: { background: '#1976d2' },
          },
        }}
      />
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <Layout>
                <Routes>
                  {/* Home */}
                  <Route path="/" element={<Home />} />
                  
                  {/* Products */}
                  <Route path="/products" element={<Products />} />
                  <Route path="/sport/:category" element={<SportCategory />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  
                  {/* Category Pages */}
                  <Route path="/sports-shoes" element={<SportsShoes />} />
                  <Route path="/sports-jersey" element={<SportsJersey />} />
                  <Route path="/medical-kits" element={<MedicalKits />} />
                  
                  {/* Cart & Checkout */}
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />                 {/* ← ADDED */}
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} /> {/* ← ADDED */}
                  
                  {/* Authentication */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  
                  {/* User Profile */}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<OrderTracking />} />
                  <Route path="/orders/:orderId" element={<OrderDetails />} />
                  
                  {/* Features */}
                  <Route path="/starter-kit" element={<StarterKit />} />
                  <Route path="/ai-size" element={<AISizePage />} />
                  
                  {/* Wishlist */}
                  <Route path="/wishlist" element={<Wishlist />} />
                  
                  {/* Admin */}
                  <Route path="/admin/add-product" element={<AdminAddProduct />} />
                  
                  {/* 404 - Not Found */}
                  <Route path="*" element={<NotFound />} />
                  <Route path="/sports-page" element={<SportsPage />} />
                </Routes>
              </Layout>
            </Router>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;