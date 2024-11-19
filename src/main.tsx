import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './locales';
import { CheckoutProvider } from './component/CheckoutContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CheckoutProvider>
      <RouterProvider router={router} />
    </CheckoutProvider>
  </StrictMode>
);
