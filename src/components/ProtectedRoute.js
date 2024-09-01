import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Komponen untuk melindungi rute
const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isRegistered = localStorage.getItem('phoneNumber');

    if (!isRegistered) {
        return <Navigate to="webapp/register" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;