import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Radio, RadioGroup, FormControlLabel, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import SubmitButton from "../components/submitButton";
import Ovo from '../assets/ovo.png';
import Gopay from '../assets/gopay.png';
import Linkaja from '../assets/linkaja.png';
import Shopeepay from '../assets/shopee.png';
import Dana from '../assets/dana.png';
import Va from '../assets/va.png';
import {postWithAuthToken, registerUser} from '../config/api'

const theme = createTheme();

const options = [
    { icon: Ovo, label: 'OVO', value: '1', is_active: '1' },
    { icon: Gopay, label: 'Gopay', value: '2', is_active: '1' },
    { icon: Linkaja, label: 'Link Aja!', value: '3', is_active: '0' },
    { icon: Shopeepay, label: 'Shopee pay', value: '4', is_active: '1' },
    { icon: Dana, label: 'DANA', value: '5', is_active: '0' },
    { icon: Va, label: 'Virtual account', value: '6', is_active: '1' }
];

export default function Pay() {
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedWater, setSelectedWater] = useState('');
    const [selectedWaterId, setSelectedWaterId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
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

        const storedSelectedQuantity = localStorage.getItem('quantity');
        if (storedSelectedQuantity) {
            setQuantity(parseFloat(storedSelectedQuantity));
        }

        const storedSelectedPrice = localStorage.getItem('price');
        if (storedSelectedPrice) {
            setPrice(parseFloat(storedSelectedPrice));
        }
    }, []);

    useEffect(() => {
        // Enable the button if a radio button is selected
        setIsButtonEnabled(selectedValue !== '');
    }, [selectedValue]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log({
    //         phone_number: phoneNumber,
    //         water_id: selectedWaterId,
    //         water: selectedWater,
    //         volume: quantity,
    //         amount: price,
    //         payment_method_id: selectedValue
    //     });
    //     navigate('/');
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const storedUser = localStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser) : null;

            if (!user || user.phone_number !== phoneNumber) {
                const response = await registerUser(phoneNumber);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
            }

            await postWithAuthToken('webapp/checkout', {
                phone_number: phoneNumber,
                save_phone_number: phoneNumber,
                volume: quantity,
                amount: price,
                currency: price,
                payment_method_id: selectedValue
            });

            navigate('/');
        } catch (error) {
            console.error('Error during handleSubmit:', error.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>WaterHub - Cara Bayar</title>
            </Helmet>

            <Navbar title="Cara Bayar" />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <RadioGroup
                        value={selectedValue}
                        onChange={handleChange}
                        sx={{ width: '100%', maxWidth: '600px' }}
                    >
                        {options.map((option) => (
                            <Box
                                key={option.value}
                                sx={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    height: '56px',
                                    backgroundColor: option.is_active === '0' ? '#F2F4F5' : 'white',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Radio 
                                            disabled={option.is_active === '0'}
                                        />
                                    }
                                    label={
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                            }}
                                        >
                                            <img
                                                src={option.icon}
                                                alt={option.label}
                                                style={{ width: '40px', height: '40px' }}
                                            />
                                            <Box>
                                                <Typography sx={{ fontFamily: 'Raleway', fontWeight: 'bold' }}>{option.label}</Typography>
                                                {option.is_active === '0' && (
                                                    <Typography sx={{ fontFamily: 'Raleway', fontSize: '12px', color: 'gray' }}>
                                                        Dalam pengembangan
                                                    </Typography>
                                                )}                                            
                                            </Box>
                                        </Box>
                                    }
                                    value={option.value}
                                />
                            </Box>
                        ))}
                    </RadioGroup>
                    <Box component="form" onSubmit={handleSubmit} noValidate
                         sx={{
                             // mt: 1,
                             width: '100%',
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center',
                             mt: -1.5
                         }}
                    >
                        <SubmitButton text="Lanjut Bayar" isDisabled={!isButtonEnabled} />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}