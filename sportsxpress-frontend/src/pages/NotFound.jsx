import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Search as SearchIcon } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f1f3f6'
      }}
    >
      <Box>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '80px', md: '120px' }, 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          404
        </Typography>
        
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            fontSize: { xs: '24px', md: '32px' }
          }}
        >
          Page Not Found
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paragraph 
          sx={{ 
            mb: 4,
            fontSize: { xs: '14px', md: '16px' },
            maxWidth: '500px',
            mx: 'auto'
          }}
        >
          The page you are looking for doesn't exist or has been moved. 
          Please check the URL or go back to homepage.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/"
            startIcon={<HomeIcon />}
            size="large"
            sx={{ 
              bgcolor: '#fb641b',
              '&:hover': { bgcolor: '#f4511e' },
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            Go to Homepage
          </Button>
          
          <Button 
            variant="outlined" 
            component={Link} 
            to="/products"
            startIcon={<SearchIcon />}
            size="large"
            sx={{ 
              borderColor: '#1976d2',
              color: '#1976d2',
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#1565c0',
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            Browse Products
          </Button>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            Looking for something specific? Try our{' '}
            <Link 
              to="/ai-size" 
              style={{ 
                color: '#1976d2', 
                textDecoration: 'none',
                fontWeight: 600 
              }}
            >
              AI Size Recommender
            </Link>
            {' '}or{' '}
            <Link 
              to="/starter-kit" 
              style={{ 
                color: '#1976d2', 
                textDecoration: 'none',
                fontWeight: 600 
              }}
            >
              Starter Kit Builder
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;