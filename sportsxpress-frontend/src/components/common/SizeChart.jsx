import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tab,
  Tabs,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Close,
  Straighten,
  CheckCircle,
  ExpandMore,
} from '@mui/icons-material';

const SizeChart = ({ open, onClose, category }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const sizeCharts = {
    shoes: {
      title: 'Shoe Size Chart (UK)',
      measurements: 'Foot Length (cm)',
      sizes: [
        { size: 'UK 5', length: '22.5', us: '5.5', eu: '38' },
        { size: 'UK 6', length: '23.5', us: '6.5', eu: '39' },
        { size: 'UK 7', length: '24.5', us: '7.5', eu: '40.5' },
        { size: 'UK 8', length: '25.5', us: '8.5', eu: '42' },
        { size: 'UK 9', length: '26.5', us: '9.5', eu: '43' },
        { size: 'UK 10', length: '27.5', us: '10.5', eu: '44' },
        { size: 'UK 11', length: '28.5', us: '11.5', eu: '45' },
        { size: 'UK 12', length: '29.5', us: '12.5', eu: '46' },
      ],
    },
    clothing: {
      title: 'Clothing Size Chart',
      measurements: 'Chest (cm) | Waist (cm)',
      sizes: [
        { size: 'XS', chest: '81-86', waist: '71-76', height: '160-165' },
        { size: 'S', chest: '86-91', waist: '76-81', height: '165-170' },
        { size: 'M', chest: '91-96', waist: '81-86', height: '170-175' },
        { size: 'L', chest: '96-101', waist: '86-91', height: '175-180' },
        { size: 'XL', chest: '101-106', waist: '91-96', height: '180-185' },
        { size: 'XXL', chest: '106-111', waist: '96-101', height: '185-190' },
      ],
    },
    gloves: {
      title: 'Glove Size Chart',
      measurements: 'Hand Circumference (cm)',
      sizes: [
        { size: 'S', circumference: '17-19', length: '16-17' },
        { size: 'M', circumference: '19-21', length: '17-18' },
        { size: 'L', circumference: '21-23', length: '18-19' },
        { size: 'XL', circumference: '23-25', length: '19-20' },
      ],
    },
    bats: {
      title: 'Cricket Bat Size Chart',
      measurements: 'Height (cm) | Age',
      sizes: [
        { size: 'Size 3', height: '122-135', age: '8-9', weight: '1.8-2.0' },
        { size: 'Size 4', height: '135-147', age: '10-11', weight: '2.0-2.2' },
        { size: 'Size 5', height: '147-155', age: '12-13', weight: '2.2-2.4' },
        { size: 'Size 6', height: '155-165', age: '14-15', weight: '2.4-2.6' },
        { size: 'SH', height: '165-175', age: '16+', weight: '2.6-2.8' },
        { size: 'LH', height: '175+', age: 'Adult', weight: '2.8-3.0' },
      ],
    },
  };

  const getSizeGuide = () => {
    if (category === 'shoes') return sizeCharts.shoes;
    if (category === 'jersey' || category === 'clothing') return sizeCharts.clothing;
    if (category === 'gloves') return sizeCharts.gloves;
    if (category === 'bat') return sizeCharts.bats;
    return sizeCharts.clothing;
  };

  const sizeGuide = getSizeGuide();

  const howToMeasure = [
    {
      title: 'Chest',
      description: 'Measure around the fullest part of your chest, keeping the tape horizontal',
      image: 'https://via.placeholder.com/100x100/2196F3/FFFFFF?text=Chest',
    },
    {
      title: 'Waist',
      description: 'Measure around your natural waistline, keeping the tape comfortably loose',
      image: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=Waist',
    },
    {
      title: 'Foot Length',
      description: 'Stand on a piece of paper, mark the longest point, and measure the distance',
      image: 'https://via.placeholder.com/100x100/FF9800/FFFFFF?text=Foot',
    },
  ];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Straighten sx={{ color: 'primary.main' }} />
            <Typography variant="h6">{sizeGuide.title}</Typography>
          </Box>
          <Button onClick={onClose} sx={{ minWidth: 'auto' }}>
            <Close />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
          <Tab label="Size Chart" />
          <Tab label="How to Measure" />
          <Tab label="Fit Guide" />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              All measurements are in centimeters. Find your perfect size below.
            </Typography>
            
            <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    <TableCell><strong>Size</strong></TableCell>
                    {category === 'shoes' && (
                      <>
                        <TableCell><strong>Foot Length (cm)</strong></TableCell>
                        <TableCell><strong>US Size</strong></TableCell>
                        <TableCell><strong>EU Size</strong></TableCell>
                      </>
                    )}
                    {category === 'jersey' && (
                      <>
                        <TableCell><strong>Chest (cm)</strong></TableCell>
                        <TableCell><strong>Waist (cm)</strong></TableCell>
                        <TableCell><strong>Height (cm)</strong></TableCell>
                      </>
                    )}
                    {category === 'gloves' && (
                      <>
                        <TableCell><strong>Circumference (cm)</strong></TableCell>
                        <TableCell><strong>Length (cm)</strong></TableCell>
                      </>
                    )}
                    {category === 'bat' && (
                      <>
                        <TableCell><strong>Height (cm)</strong></TableCell>
                        <TableCell><strong>Age</strong></TableCell>
                        <TableCell><strong>Weight (kg)</strong></TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sizeGuide.sizes.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell><strong>{row.size}</strong></TableCell>
                      {category === 'shoes' && (
                        <>
                          <TableCell>{row.length}</TableCell>
                          <TableCell>{row.us}</TableCell>
                          <TableCell>{row.eu}</TableCell>
                        </>
                      )}
                      {category === 'jersey' && (
                        <>
                          <TableCell>{row.chest}</TableCell>
                          <TableCell>{row.waist}</TableCell>
                          <TableCell>{row.height}</TableCell>
                        </>
                      )}
                      {category === 'gloves' && (
                        <>
                          <TableCell>{row.circumference}</TableCell>
                          <TableCell>{row.length}</TableCell>
                        </>
                      )}
                      {category === 'bat' && (
                        <>
                          <TableCell>{row.height}</TableCell>
                          <TableCell>{row.age}</TableCell>
                          <TableCell>{row.weight}</TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                <CheckCircle sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                Pro Tip
              </Typography>
              <Typography variant="body2">
                If you're between sizes, we recommend sizing up for a more comfortable fit.
                Use our AI Size Recommender for personalized suggestions.
              </Typography>
            </Box>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              How to Measure
            </Typography>
            <Grid container spacing={3}>
              {howToMeasure.map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{ width: 80, height: 80, borderRadius: '50%', mb: 2 }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" color="text.secondary">
              <strong>Note:</strong> Use a flexible measuring tape and keep it level.
              Don't pull too tight - leave room for comfort.
            </Typography>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Fit Guide
            </Typography>
            
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight="bold">Regular Fit</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Our standard fit that follows your body shape without being too tight.
                  Perfect for everyday wear and most activities.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight="bold">Slim Fit</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  A closer fit that contours to your body. Recommended for performance wear
                  and athletic activities.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight="bold">Relaxed Fit</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  A looser fit with extra room for comfort. Ideal for casual wear and
                  layering.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ mt: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Need Help?
              </Typography>
              <Typography variant="body2">
                Use our AI Size Recommender for personalized sizing based on your
                height, weight, and preferred fit.
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  onClose();
                  window.location.href = '/ai-size';
                }}
                sx={{ mt: 2 }}
              >
                Try AI Size
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button 
          onClick={onClose} 
          variant="contained"
          sx={{ bgcolor: '#fb641b', '&:hover': { bgcolor: '#f4511e' } }}
        >
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SizeChart;