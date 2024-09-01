import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';
import SignIn from './pages/SignIn';
import Homepage from './pages/Homepage';
import Pay from './pages/Pay';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Raleway',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="webapp/homepage" element={<Homepage/>} />
          <Route path="webapp/pay" element={<Pay />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;