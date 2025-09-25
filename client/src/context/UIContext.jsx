import PropTypes from 'prop-types'
import React, { createContext, useState } from 'react'

const UIContext = createContext(null);

export const UIContextProvider = ({ children }) => {
    const [ showUserLogin, setShowUserLogin ] = useState(false);

    const value = {
        showUserLogin,
        setShowUserLogin,
    }

  return (
    <UIContext.Provider value={value} >
      { children }
    </UIContext.Provider>
  )
}

UIContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default UIContext;
