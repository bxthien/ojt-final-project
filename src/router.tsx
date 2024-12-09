import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';
import HomePage from './pages/home-page';
import Register from './pages/register';
import Forgot from './pages/forgot';
import Success from './pages/success';
import Cart from './components/payments/Cart';
import Checkout from './components/payments/CheckoutPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SelectAddress from './components/SelectAdress/SelectAddress';
import ShipmentMethod from './components/SelectAdress/ShipmentMethod';
import PaymentPage from './components/SelectAdress/PaymentPage';
import Profile from './pages/profile';
import Shipping from './pages/shipping';
import Payment from './pages/payment';
import PaymentStatus from './pages/PaymentStatus';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
      {
        path: '/profile',
        element: <Profile />,
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
    ],
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
    path: '/shipping',
    element: <Shipping />,
  },
  {
    path: '/payment',
    element: <Payment />,
  },
  {
    path: '/paymentsuccess',
    element: <PaymentStatus status={'success'} />,
  },
  {
    path: '/paymentfailed',
    element: <PaymentStatus status={'failed'} />,
  },
]);

export default router;
