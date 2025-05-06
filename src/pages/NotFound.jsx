import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h2" gutterBottom>404</Typography>
      <Typography variant="h5" gutterBottom>Page Not Found</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
