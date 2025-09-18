
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContexts'; 
import { ProductProvider } from './contexts/ProductContext';
import Rotas from './Router/path';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <Rotas />
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>,
);