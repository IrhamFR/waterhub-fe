import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CssBaseline, Box, Typography, Container, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import SelectButton from '../components/selectButton';
import SelectQuantity from '../components/selectQuantity';
import SubmitButton from '../components/submitButton';
import EarthImage from '../assets/love earth.png';

const defaultTheme = createTheme();

export default function Homepage() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedWater, setSelectedWater] = useState('');
    const [selectedWaterId, setSelectedWaterId] = useState('');
    const [quantity, setQuantity] = useState(1); // Tambahkan state untuk quantity
    const [price, setPrice] = useState(0); // Tambahkan state untuk price
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        const storedPhoneNumber = localStorage.getItem('phoneNumber');
        if (storedPhoneNumber) {
            setPhoneNumber(storedPhoneNumber);
        }

        const storedWaterId = localStorage.getItem('selectedWaterId');
        if (storedWaterId) {
            setSelectedWaterId(storedWaterId);
        }

        const storedSelectedWater = localStorage.getItem('selectedWater');
        if (storedSelectedWater) {
            setSelectedWater(storedSelectedWater);
        }

    }, []);

    useEffect(() => {
        // Update price based on quantity
        const basePrice = 1500; // Harga dasar per liter
        setPrice(basePrice * quantity);
        localStorage.setItem('quantity', quantity);
        localStorage.setItem('price', basePrice * quantity);
    }, [quantity]);


    useEffect(() => {
        // Enable the button if selectedWaterId and quantity have been selected
        setIsButtonEnabled(selectedWaterId !== '' && quantity > 0);
    }, [selectedWaterId, selectedWater, quantity]);

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const handleButtonClick = (id, waterType) => {
        setSelectedWater(waterType);
        setSelectedWaterId(id);
        localStorage.setItem('selectedWater', waterType);
        localStorage.setItem('selectedWaterId', id);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            phone: phoneNumber,
            water_id: selectedWaterId,
            water: selectedWater,
            quantity: quantity,
            price: price,
        });
        navigate('/pay');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Helmet>
                <title>WaterHub - Homepage</title>
            </Helmet>

            <Navbar title="Homepage" />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        // marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between',  mt: 2, mb: 2  }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Raleway', fontWeight: 'bold' }}>
                            👋 Halo!
                        </Typography>
                        <Typography sx={{ fontFamily: 'Raleway', fontWeight: 'bold' }}>
                            {phoneNumber}
                        </Typography>
                    </Box>
                    <Card sx={{ width: 'auto', height: '100px', borderRadius: '8px', boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.1)' }}>
                        <CardMedia>
                            <Typography variant="body1" pl={1}
                                        sx={{
                                            fontSize: '12px',
                                            fontFamily: 'Raleway',
                                            color: 'white',
                                            backgroundColor: '#E9218E',
                                            height: '23px',
                                            alignContent: 'center'
                                        }}>
                                Cek impact kamu di sini!
                            </Typography>
                        </CardMedia>
                        <CardContent>
                            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={3}>
                                    <Box gridColumn="span 2" component="img"
                                         src={EarthImage}
                                         alt="Image"
                                         sx={{
                                             width: '58px',
                                             height: 'auto',
                                         }}>
                                    </Box>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body1" sx={{ fontSize: '13px', fontFamily: 'Raleway' }}>
                                        Kamu sudah berkontribusi mengurangi <b>50</b> sampah plastik dan <b>0.25</b> kg emisi karbon!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Typography variant="body1" sx={{ mt: 2, mb: 2, fontFamily: 'Raleway', fontWeight: 'bold' }}>
                        Pilih jenis air
                    </Typography>
                    <SelectButton onClick={handleButtonClick} selectedWater={selectedWater} />
                    <Typography variant="body1" sx={{ mt: 2, mb: 2, fontFamily: 'Raleway', fontWeight: 'bold' }}>
                        Jumlah air
                    </Typography>
                    <SelectQuantity quantity={quantity} onQuantityChange={setQuantity} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography sx={{ fontFamily: 'Raleway', fontWeight: 'bold' }}>
                            Total Harga
                        </Typography>
                        <Typography sx={{ fontFamily: 'Raleway', fontWeight: 'bold' }}>
                            {formatRupiah(price)}
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} noValidate
                         sx={{
                            //  mt: 1,
                             width: '100%',
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center',
                         }}
                    >
                        <SubmitButton text="Lanjut Bayar" isDisabled={!isButtonEnabled} />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}