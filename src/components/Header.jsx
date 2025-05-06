import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Box,
} from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '../context/ThemeContext';

const Header = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>

        <Box>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
