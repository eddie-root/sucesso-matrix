import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ isAdmin, setIsAdmin ] = useState(false);

    // Fetch Admin
    const fetchAdmin = async ()=> {
        try {
            const { data } = await axios.get('/api/admin/is-auth')
            setIsAdmin(data.success);

        } catch (error) {
            console.log(error)
            setIsAdmin(false)
        }
    }

    // Fetch User from backend
    const fetchUser = async ()=> {
        try {
            const { data } = await axios.get('/api/user/is-auth')
            setIsAdmin(data.success);

        } catch (error) {
            console.log(error)
            setIsAdmin(false)
        }
    }

    useEffect(()=> {
        fetchUser();
        fetchAdmin();
    }, []);

    const value = {
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        axios,
    }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthContext;
