import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function SelectQuantity({ onQuantityChange, selectedQuantity }) {
    const [quantity, setQuantity] = useState(1);
    const minQuantity = 1;
    const maxQuantity = 10;

    useEffect(() => {
        // Update the quantity when selectedQuantity prop changes
        if (selectedQuantity) {
            setQuantity(parseFloat(selectedQuantity));
        }
    }, [selectedQuantity]);

    const handleIncrement = () => {
        if (quantity < maxQuantity) {
            const newQuantity = quantity + 0.5;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity); // Notify parent of the change
        }
    };

    const handleDecrement = () => {
        if (quantity > minQuantity) {
            const newQuantity = quantity - 0.5;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity); // Notify parent of the change
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '8px 0 8px 8px',
                width: '160px',
                height: '56px'
            }}>
            <TextField
                variant="outlined"
                value={`${quantity} L`}
                InputProps={{
                    readOnly: true,
                    style: { width: '50px', textAlign: 'center', border: 'none', padding: '0', margin: '0', pointerEvents: 'none',
                        fontFamily: 'Raleway', fontWeight: 'bold'  },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' },
                        padding: '0',
                    },
                }}
            />
            <Box>
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                    sx={{ backgroundColor: '#7878801F', height: '32px', borderRadius: '8px' }}
                >
                    <Button
                        variant="text"
                        onClick={handleDecrement}
                        disabled={quantity <= minQuantity}
                    >
                        <RemoveIcon sx={{ color:'black' }} />
                    </Button>
                    <Button
                        variant="text"
                        onClick={handleIncrement}
                        disabled={quantity >= maxQuantity}
                    >
                        <AddIcon sx={{ color:'black' }} />
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
}