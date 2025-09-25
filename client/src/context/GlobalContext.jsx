import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


const GlobalContext = createContext(null);

export const GlobalContextProvider = ({children}) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();

    const value = {
        navigate,
        currency,
        
    }

   return (
    <GlobalContext.Provider value={value}>
        {children}
    </GlobalContext.Provider>
   )
};

GlobalContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default GlobalContext;