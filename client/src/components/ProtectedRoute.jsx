import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAdmin } = useContext(AuthContext);

    useEffect(()=> {
        if (!isAdmin) {
            toast.error('Acesso negado. Você precisa ser um administrador.');
        }
    }, [isAdmin]);

    if (!isAdmin) {
        return <Navigate to='/'/>;
    }
    
  return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoute;
