import { StrictMode } from 'react';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './locales';
import * as ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
