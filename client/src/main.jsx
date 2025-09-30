// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalContextProvider } from './context/GlobalContext.jsx'
import { UIContextProvider } from './context/UIContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ProductContextProvider } from './context/ProductContext.jsx'
import { CartContextProvider } from './context/CartContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <AuthContextProvider>
        <UIContextProvider>
          <ProductContextProvider>
            <CartContextProvider>
            <App />
            </CartContextProvider>
          </ProductContextProvider>
        </UIContextProvider>  
      </AuthContextProvider>
    </GlobalContextProvider>
  </BrowserRouter>,
)
