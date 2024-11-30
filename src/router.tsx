import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';
import HomePage from './pages/home-page';
import Register from './pages/register';
import Forgot from './pages/forgot';
import Success from './pages/success';
import Cart from './components/carts/Cart';
import Checkout from './components/carts/CheckoutPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SelectAddress from './components/SelectAdress/SelectAddress';
import ShipmentMethod from './components/SelectAdress/ShipmentMethod';
import PaymentPage from './components/SelectAdress/PaymentPage';

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
]);

export default router;
