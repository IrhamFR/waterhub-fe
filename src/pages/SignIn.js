import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CssBaseline, Box, TextField, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import SubmitButton from '../components/submitButton';
import cupImage from '../assets/cup.png';


const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const handleChange = (event) => {
        const value = event.target.value;
        const numericValue = value.replace(/\D/g, '');
        setPhone(numericValue);
        setIsDisabled(numericValue.length < 10);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //     phone: data.get('phone'),
    //     });
    //     navigate('/homepage');
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const phone = data.get('phone');
        console.log({ phone });
        
        // Simpan nomor telepon ke localStorage
        localStorage.setItem('phoneNumber', phone);
    
        navigate('/homepage');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Helmet>
                <title>WaterHub - Login</title>
            </Helmet>

            <Navbar title="Masuk atau daftar" />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        // alignItems: 'center',
                    }}
                >
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                        <Box gridColumn="span 2" component="img"
                            src={cupImage}
                            alt="Image"
                            sx={{
                                width: '100px',
                                height: 'auto',
                                mb: 2,
                            }}
                        />
                    </Box>
                    <Typography variant="body1" sx={{ fontSize: '14px', fontFamily: 'Raleway' }}>
                        Nikmati kesegaran air minum tanpa limbah plastik.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate 
                        sx={{ 
                            // mt: 1,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label=""
                            name="phone"
                            autoComplete="phone"
                            type="text"
                            placeholder="No. handphone"
                            autoFocus
                            value={phone}
                            onChange={handleChange}
                            inputProps={{ maxLength: 13 }}
                        />
                        <SubmitButton text="Lanjut" isDisabled={isDisabled} />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
