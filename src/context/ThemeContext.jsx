import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
      },
    }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
