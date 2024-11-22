import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './locales';

import NotFound from './pages/not-found';
import HomePage from './pages/home-page';
import SignIn from './pages/sign-in';
import Register from './pages/register';
import Forgot from './pages/forgot';
import Success from './pages/success';
import Cart from './components/payments/Cart';
import Checkout from './components/payments/CheckoutPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SelectAddress from './components/SelectAdress/SelectAddress';
import ShipmentMethod from './components/SelectAdress/ShipmentMethod';
import PaymentPage from './components/SelectAdress/PaymentPage';
import ProductPage from './pages/product-page';
import LayOut from './layout';
import ProductDetailPage from './components/product-details/product-detail-page';
import PhonesPage from './components/categories/phones';
import ComputersPage from './components/categories/computers';
import CameraPage from './components/categories/cameras';
import SmartWatchPage from './components/categories/smart-watch';
import HeadphonesPage from './components/categories/headphones';
import GamingPage from './components/categories/gaming';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    element: <LayOut />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/forgot',
        element: <Forgot />,
      },
      {
        path: '/success',
        element: <Success />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/shoppingcart',
        element: <ShoppingCart />,
      },
      {
        path: '/selectaddress',
        element: <SelectAddress />,
      },
      {
        path: '/shipment-method',
        element: <ShipmentMethod />,
      },
      {
        path: '/payment',
        element: <PaymentPage />,
      },
      {
        path: '/product-page',
        element: <ProductPage />,
      },
      {
        path: '/product-detail-page',
        element: <ProductDetailPage />,
      },
      {
        path: '/phones',
        element: <PhonesPage />,
      },
      {
        path: '/computers',
        element: <ComputersPage />,
      },
      {
        path: '/cameras',
        element: <CameraPage />,
      },
      {
        path: '/smart-watches',
        element: <SmartWatchPage />,
      },
      {
        path: '/headphones',
        element: <HeadphonesPage />,
      },
      {
        path: '/gaming',
        element: <GamingPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
