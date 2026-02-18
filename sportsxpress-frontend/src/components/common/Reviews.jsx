import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  Button,
  Avatar,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Snackbar,
  Grid,
} from '@mui/material';
import {
  ThumbUp,
  ThumbUpOutlined,
  Verified,
  MoreVert,
  Flag,
  Edit,
  Delete,
  Image as ImageIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

// ... rest of the Reviews.jsx code
const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'Rahul Sharma',
      avatar: 'RS',
      rating: 5,
      date: '2026-02-10',
      title: 'Excellent product!',
      comment: 'Perfect fit and great quality. Highly recommended for all cricket enthusiasts.',
      likes: 24,
      verified: true,
      images: [
        'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=Photo+1',
        'https://via.placeholder.com/80x80/2196F3/FFFFFF?text=Photo+2',
      ],
    },
    {
      id: 2,
      user: 'Priya Patel',
      avatar: 'PP',
      rating: 4,
      date: '2026-02-08',
      title: 'Good product, but sizing runs small',
      comment: 'Quality is good but suggest ordering one size up. Otherwise happy with purchase.',
      likes: 12,
      verified: true,
    },
    {
      id: 3,
      user: 'Amit Kumar',
      avatar: 'AK',
      rating: 5,
      date: '2026-02-05',
      title: 'Best in class',
      comment: 'Using this for 2 weeks now. Absolutely love it! Delivery was quick too.',
      likes: 8,
      verified: false,
    },
  ]);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('recent');
  const [openDialog, setOpenDialog] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const averageRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(rev => rev.rating === rating).length
  );

  const handleSort = (sort) => {
    setSortBy(sort);
    setAnchorEl(null);
  };

  const handleSubmitReview = () => {
    if (newReview.rating === 0) {
      alert('Please add a rating');
      return;
    }
    if (!newReview.comment) {
      alert('Please write a review');
      return;
    }

    const review = {
      id: reviews.length + 1,
      user: 'You',
      avatar: 'U',
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      title: newReview.title,
      comment: newReview.comment,
      likes: 0,
      verified: true,
    };

    setReviews([review, ...reviews]);
    setOpenDialog(false);
    setNewReview({ rating: 0, title: '', comment: '' });
    setOpenSnackbar(true);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'helpful') return b.likes - a.likes;
    return 0;
  });

  const paginatedReviews = sortedReviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  return (
    <Box>
      {/* Overall Rating Summary */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Typography variant="h2" color="primary.main" fontWeight="bold">
            {averageRating.toFixed(1)}
          </Typography>
          <Rating value={averageRating} precision={0.1} readOnly size="large" />
          <Typography variant="body2" color="text.secondary">
            Based on {reviews.length} reviews
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <Box key={rating} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 40 }}>
                {rating} ★
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(ratingCounts[index] / reviews.length) * 100}
                sx={{ flex: 1, mx: 2, height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" sx={{ minWidth: 40 }}>
                {ratingCounts[index]}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>

      {/* Write Review Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Customer Reviews</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          sx={{ bgcolor: '#fb641b', '&:hover': { bgcolor: '#f4511e' } }}
        >
          Write a Review
        </Button>
      </Box>

      {/* Sort Options */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label="Most Recent"
            onClick={() => handleSort('recent')}
            color={sortBy === 'recent' ? 'primary' : 'default'}
          />
          <Chip
            label="Highest Rated"
            onClick={() => handleSort('rating')}
            color={sortBy === 'rating' ? 'primary' : 'default'}
          />
          <Chip
            label="Most Helpful"
            onClick={() => handleSort('helpful')}
            color={sortBy === 'helpful' ? 'primary' : 'default'}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {reviews.length} reviews
        </Typography>
      </Box>

      {/* Reviews List */}
      {paginatedReviews.map((review, index) => (
        <Box key={review.id}>
          <Box sx={{ py: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {review.avatar}
                </Avatar>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography fontWeight="bold">{review.user}</Typography>
                    {review.verified && (
                      <Chip
                        icon={<Verified />}
                        label="Verified Purchase"
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {format(new Date(review.date), 'dd MMM yyyy')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <IconButton
                size="small"
                onClick={(e) => {
                  setSelectedReview(review);
                  setAnchorEl(e.currentTarget);
                }}
              >
                <MoreVert />
              </IconButton>
            </Box>

            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
              {review.title}
            </Typography>
            <Typography variant="body2" paragraph>
              {review.comment}
            </Typography>

            {/* Review Images */}
            {review.images && (
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {review.images.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    alt={`Review ${i + 1}`}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            )}

            {/* Helpful Button */}
            <Button
              startIcon={<ThumbUpOutlined />}
              size="small"
              variant="text"
            >
              Helpful ({review.likes})
            </Button>
          </Box>
          {index < paginatedReviews.length - 1 && <Divider />}
        </Box>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      {/* Write Review Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Write a Review</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Overall Rating
            </Typography>
            <Rating
              value={newReview.rating}
              onChange={(e, value) => setNewReview({ ...newReview, rating: value })}
              size="large"
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Review Title"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Your Review"
              multiline
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="What did you like or dislike? What about the fit, quality, and performance?"
              sx={{ mb: 2 }}
            />

            <Button
              variant="outlined"
              startIcon={<ImageIcon />}
              fullWidth
            >
              Add Photos
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            sx={{ bgcolor: '#fb641b', '&:hover': { bgcolor: '#f4511e' } }}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>

      {/* Review Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ThumbUp sx={{ mr: 1, fontSize: 18 }} /> Helpful
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Flag sx={{ mr: 1, fontSize: 18 }} /> Report
        </MenuItem>
        {selectedReview?.user === 'You' && (
          <>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Edit sx={{ mr: 1, fontSize: 18 }} /> Edit
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Delete sx={{ mr: 1, fontSize: 18 }} /> Delete
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Review submitted successfully!"
      />
    </Box>
  );
};

export default Reviews;