import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './globalStyles'
import {AuthProvider} from './hooks/Auth';
import Routes from './routes/routes.app';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
         <Routes/>
        <GlobalStyle />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
