// src/components/SubmitButton.js
import React from 'react';
import { Button } from '@mui/material';

export default function SubmitButton({ text, isDisabled }) {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isDisabled}
            sx={{
                mt: 2,
                mb: 2,
                textTransform: 'capitalize',
                fontSize: '16px',
                fontFamily: 'Raleway',
                backgroundColor: '#E9218E',
                fontWeight: 'bold',
                '&:hover': {
                    backgroundColor: '#d71c77',
                },
                ...(isDisabled && {
                    backgroundColor: '#d3d3d3',
                }),
            }}
        >
            {text}
        </Button>
    );
}
