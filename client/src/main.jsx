// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalContextProvider } from './context/GlobalContext.jsx'
import { UIContextProvider } from './context/UIContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <UIContextProvider>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
      </UIContextProvider>  
    </GlobalContextProvider>
  </BrowserRouter>,
)
