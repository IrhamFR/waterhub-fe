import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left', fontWeight: 'bold', color: 'black', fontFamily: 'Raleway'  }}>
          {title}
        </Typography>
        <div style={{ width: 48 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
