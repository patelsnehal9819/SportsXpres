import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/layout/Layout';
import SportsPage from './pages/SportsPage';
import FeedbackPage from './pages/FeedbackPage';
import OrdersPage from './pages/OrdersPage';
import Notifications from './pages/Notifications';

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
    primary: { main: '#1976d2' },
    secondary: { main: '#fb641b' },
    background: { default: '#f1f3f6' },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    button: { textTransform: 'none' },
  },
});

function App() {
  useEffect(() => {
    const products = localStorage.getItem('sportsxpress_products');
    if (!products) {
      const count = loadAllProducts();
      console.log(`✅ ${count} products loaded`);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />
      <AuthProvider>
        <NotificationProvider>
          <WishlistProvider>
            <CartProvider>
              <Router>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/sport/:category" element={<SportCategory />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/sports-shoes" element={<SportsShoes />} />
                    <Route path="/sports-jersey" element={<SportsJersey />} />
                    <Route path="/medical-kits" element={<MedicalKits />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<OrderTracking />} />
                    <Route path="/orders/:orderId" element={<OrderDetails />} />
                    <Route path="/starter-kit" element={<StarterKit />} />
                    <Route path="/ai-size" element={<AISizePage />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/admin/add-product" element={<AdminAddProduct />} />
                    <Route path="/sports-page" element={<SportsPage />} />
                    <Route path="/feedback/:orderId" element={<FeedbackPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </Router>
            </CartProvider>
          </WishlistProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;