import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';
import Checkout from './components/payments/CheckoutPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SelectAddress from './components/SelectAdress/SelectAddress';
import ShipmentMethod from './components/SelectAdress/ShipmentMethod';
import Cart from './components/payments/Cart';
import PaymentPage from './components/SelectAdress/PaymentPage';
import HomePage from './pages/home-page';
import Register from './pages/register';
import Forgot from './pages/forgot';
import Success from './pages/success';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
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
    ],
  },
  {
    path: '/cart',
    element: <Cart />,
    errorElement: <NotFound />,
    // children: [...publicRoutes, ...privateRoutes],
  },
  {
    path: '/checkout',
    element: <Checkout />,
    errorElement: <NotFound />,
    // children: [...publicRoutes, ...privateRoutes],
  },
  {
    path: '/shoppingcart',
    element: <ShoppingCart />,
    errorElement: <NotFound />,
    // children: [...publicRoutes, ...privateRoutes],
  },
  {
    path: '/selectaddress',
    element: <SelectAddress />,
    errorElement: <NotFound />,
    // children: [...publicRoutes, ...privateRoutes],
  },
  {
    path: '/shipment-method',
    element: <ShipmentMethod />,
    errorElement: <NotFound />,
    // children: [...publicRoutes, ...privateRoutes],
  },
  {
    path: '/payment',
    element: <PaymentPage />,
    errorElement: <NotFound />,
    // children: [...publicRoutes, ...privateRoutes],
  },
]);

export default router;
