import React from 'react';
import { Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import coldWater from '../assets/cold water.png';
import normalWater from '../assets/normal water.png';


// Theme untuk warna 
const theme = createTheme({
  palette: {
    primary: {
      main: '#306AFF',
    },
    success: {
      main: '#00B781',
    },
    grey: {
      main: '#d3d3d3',
    },
  },
});

export default function selectButton({ onClick, selectedWater }) {

    return (
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              id="1"
              onClick={() => onClick('1', 'Air dingin')}
              variant="contained"
              sx={{
                flex: '1',
                marginRight: '8px',
                width: '156px',
                height: '90px',
                borderRadius: '8px',
                backgroundColor: selectedWater === 'Air dingin' ? theme.palette.primary.main : theme.palette.grey.main,
                backgroundImage: `url(${coldWater})`,
                backgroundSize: '190px 55px', // Atur ukuran background image
                backgroundPosition: 'center bottom', // Posisi di paling bawah
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                fontWeight: 'bold',
                fontFamily: 'Raleway',
                padding: '8px',
                zIndex: 1,
                '&:hover': {
                  backgroundColor: selectedWater === 'Air dingin' ? theme.palette.primary.main : theme.palette.grey.main,
                },
              }}
            >
              Air dingin
            </Button>
            <Button
              id="2"
              onClick={() => onClick('2', 'Air normal')}
              variant="contained"
              sx={{
                flex: '1',
                marginLeft: '8px',
                width: '156px',
                height: '90px',
                borderRadius: '8px',
                backgroundColor: selectedWater === 'Air normal' ? theme.palette.success.main : theme.palette.grey.main,
                backgroundImage: `url(${normalWater})`,
                backgroundSize: '190px 55px', // Atur ukuran background image
                backgroundPosition: 'center bottom', // Posisi di paling bawah
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                fontWeight: 'bold',
                fontFamily: 'Raleway',
                padding: '8px',
                '&:hover': {
                  backgroundColor: selectedWater === 'Air normal' ? theme.palette.success.main : theme.palette.grey.main,
                },
              }}
            >
              Air normal
            </Button>
          </Box>
        </ThemeProvider>
    );
}
