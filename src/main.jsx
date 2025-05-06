import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeContextProvider from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeContextProvider>
  </React.StrictMode>
);
