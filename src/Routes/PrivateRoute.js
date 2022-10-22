import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
    
    const location = useLocation()
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <Spinner animation='border' variant='primary'></Spinner>
    }
    
    if (user && user?.uid) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;

};

export default PrivateRoute;