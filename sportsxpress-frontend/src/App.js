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
    mode: 'light',
    primary: {
      main: '#1E3A8A',      // Deep Navy Blue - strong contrast
      light: '#3B5BA5',
      dark: '#0F2B5C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#39b409',       // Rich Orange - high contrast against white/blue
      light: '#D97706',
      dark: '#92400E',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#B91C1C',       // Deep Red - high visibility
      light: '#DC2626',
      dark: '#991B1B',
    },
    warning: {
      main: '#D97706',       // Amber - visible but not harsh
      light: '#F59E0B',
      dark: '#B45309',
    },
    info: {
      main: '#2563EB',       // Bright Blue - for information
      light: '#3B82F6',
      dark: '#1D4ED8',
    },
    success: {
      main: '#059669',       // Deep Green - clear success indication
      light: '#10B981',
      dark: '#047857',
    },
    background: {
      default: '#F3F4F6',    // Light Gray - good base contrast
      paper: '#FFFFFF',       // Pure White - maximum contrast with text
      elevated: '#FAFAFA',
    },
    text: {
      primary: '#111827',     // Almost Black - highest contrast
      secondary: '#374151',   // Dark Gray - still high contrast
      disabled: '#9CA3AF',    // Medium Gray - clearly disabled
      hint: '#6B7280',
    },
    divider: '#D1D5DB',      // Medium Gray - visible but not distracting
    action: {
      active: '#1E3A8A',
      hover: '#EEF2FF',
      selected: '#DBEAFE',
      disabled: '#9CA3AF',
      disabledBackground: '#F3F4F6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#111827',
    },
    h2: {
      fontWeight: 700,
      color: '#111827',
    },
    h3: {
      fontWeight: 600,
      color: '#111827',
    },
    h4: {
      fontWeight: 600,
      color: '#111827',
    },
    h5: {
      fontWeight: 600,
      color: '#111827',
    },
    h6: {
      fontWeight: 600,
      color: '#111827',
    },
    subtitle1: {
      color: '#374151',
    },
    subtitle2: {
      color: '#374151',
    },
    body1: {
      color: '#111827',
    },
    body2: {
      color: '#374151',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.3px',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F3F4F6',
          color: '#111827',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E3A8A',
          color: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
          },
        },
        contained: {
          backgroundColor: '#1E3A8A',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#0F2B5C',
          },
        },
        containedSecondary: {
          backgroundColor: '#B45309',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#92400E',
          },
        },
        outlined: {
          borderColor: '#1E3A8A',
          color: '#1E3A8A',
          '&:hover': {
            backgroundColor: '#EEF2FF',
            borderColor: '#0F2B5C',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: '#1E3A8A',
          color: '#FFFFFF',
        },
        colorSecondary: {
          backgroundColor: '#B45309',
          color: '#FFFFFF',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#1E3A8A',
          '&:hover': {
            backgroundColor: '#EEF2FF',
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #D1D5DB',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#374151',
          '&.Mui-selected': {
            color: '#1E3A8A',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: '#D1D5DB',
          color: '#374151',
          '&.Mui-selected': {
            backgroundColor: '#B45309',
            color: '#FFFFFF',
            borderColor: '#B45309',
            '&:hover': {
              backgroundColor: '#92400E',
            },
          },
          '&:hover': {
            backgroundColor: '#EEF2FF',
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          border: '1px solid #D1D5DB',
          borderRadius: 8,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardSuccess: {
          backgroundColor: '#D1FAE5',
          color: '#047857',
        },
        standardInfo: {
          backgroundColor: '#DBEAFE',
          color: '#1D4ED8',
        },
        standardWarning: {
          backgroundColor: '#FEF3C7',
          color: '#B45309',
        },
        standardError: {
          backgroundColor: '#FEE2E2',
          color: '#B91C1C',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#E5E7EB',
          borderRadius: 8,
        },
        bar: {
          backgroundColor: '#1E3A8A',
          borderRadius: 8,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#1E3A8A',
        },
        track: {
          backgroundColor: '#1E3A8A',
        },
        rail: {
          backgroundColor: '#D1D5DB',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#374151',
          '&.Mui-checked': {
            color: '#1E3A8A',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#374151',
          '&.Mui-checked': {
            color: '#1E3A8A',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: '#374151',
          '&.Mui-checked': {
            color: '#1E3A8A',
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#3B5BA5',
          },
        },
        track: {
          backgroundColor: '#D1D5DB',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#D1D5DB',
            },
            '&:hover fieldset': {
              borderColor: '#1E3A8A',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1E3A8A',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#374151',
          '&.Mui-focused': {
            color: '#1E3A8A',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#EEF2FF',
          },
          '&.Mui-selected': {
            backgroundColor: '#DBEAFE',
            '&:hover': {
              backgroundColor: '#BFDBFE',
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#374151',
          '&.Mui-selected': {
            color: '#1E3A8A',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#1E3A8A',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: '#374151',
          '&.Mui-active': {
            color: '#1E3A8A',
            fontWeight: 600,
          },
          '&.Mui-completed': {
            color: '#059669',
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#D1D5DB',
          '&.Mui-active': {
            color: '#1E3A8A',
          },
          '&.Mui-completed': {
            color: '#059669',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E3A8A',
          color: '#FFFFFF',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#D1D5DB',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: '#374151',
            '&.Mui-selected': {
              backgroundColor: '#1E3A8A',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#0F2B5C',
              },
            },
          },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          color: '#374151',
        },
        separator: {
          color: '#D1D5DB',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#1E3A8A',
          '&:hover': {
            color: '#0F2B5C',
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#F59E0B',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#111827',
          color: '#FFFFFF',
          borderRadius: 6,
        },
      },
    },
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
      <Toaster position="top-right" toastOptions={{
        style: {
          borderRadius: '8px',
          background: '#111827',
          color: '#FFFFFF',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: '#059669',
            secondary: '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#B91C1C',
            secondary: '#FFFFFF',
          },
        },
        warning: {
          iconTheme: {
            primary: '#D97706',
            secondary: '#FFFFFF',
          },
        },
        info: {
          iconTheme: {
            primary: '#2563EB',
            secondary: '#FFFFFF',
          },
        },
      }} />
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