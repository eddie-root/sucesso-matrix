import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types';
import ProductContext from './ProductContext';
import AuthContext from './AuthContext';
import GlobalContext from './GlobalContext';

const CartContext = createContext(null);

export const CartContextProvider = ({ children }) => {

    const { products } = useContext(ProductContext);
    const { currency, navigate } = useContext(GlobalContext);
    const { axios } = useContext(AuthContext);

    

    const contextValue = {
        products,
        currency,
        navigate
    }

  return (
    <CartContext.Provider value={contextValue}>
      { children }
    </CartContext.Provider>
  )
}

CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default CartContext;
