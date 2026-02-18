import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from '@mui/material';  // Remove 'Button' from imports
import {
  ZoomIn,
  Close,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';

// ... rest of your ImageGallery.jsx code
const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openZoom, setOpenZoom] = useState(false);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <Box>
      {/* Main Image */}
      <Box 
        sx={{ 
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          cursor: 'zoom-in',
          mb: 2
        }}
        onClick={() => setOpenZoom(true)}
      >
        <img 
          src={images[selectedIndex]} 
          alt="Product" 
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'white' }}
          onClick={(e) => {
            e.stopPropagation();
            setOpenZoom(true);
          }}
        >
          <ZoomIn />
        </IconButton>
      </Box>

      {/* Thumbnails */}
      {images.length > 1 && (
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
          {images.map((img, index) => (
            <Box
              key={index}
              onClick={() => setSelectedIndex(index)}
              sx={{
                width: 80,
                height: 80,
                border: index === selectedIndex ? '2px solid #1976d2' : '1px solid #e0e0e0',
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                opacity: index === selectedIndex ? 1 : 0.7,
                '&:hover': { opacity: 1 },
              }}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Zoom Dialog */}
      <Dialog 
        open={openZoom} 
        onClose={() => setOpenZoom(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Product Image</Typography>
            <IconButton onClick={() => setOpenZoom(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'relative', textAlign: 'center' }}>
            <img 
              src={images[selectedIndex]} 
              alt="Product Zoom" 
              style={{ maxWidth: '100%', maxHeight: '70vh' }}
            />
            {images.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrev}
                  sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  onClick={handleNext}
                  sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
                >
                  <ChevronRight />
                </IconButton>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Typography variant="body2" sx={{ flex: 1, textAlign: 'center' }}>
            {selectedIndex + 1} / {images.length}
          </Typography>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageGallery;