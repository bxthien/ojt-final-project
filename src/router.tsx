import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';
import Checkout from './components/payments/CheckoutPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SelectAddress from './components/SelectAdress/SelectAddress';
import ShipmentMethod from './components/SelectAdress/ShipmentMethod';
import Cart from './components/payments/Cart';
import PaymentPage from './components/SelectAdress/PaymentPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
    errorElement: <NotFound />,
    // children: [...publicRoutes, ...privateRoutes],
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
