import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { useThemeContext } from './context/ThemeContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  const { toggleColorMode, mode } = useThemeContext();

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4">Loan Calculator</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={toggleColorMode}
              color="default"
            />
          }
          label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
        />
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
};

export default App;
