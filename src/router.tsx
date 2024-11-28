import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';
import HomePage from './pages/home-page';
import Register from './pages/register';
import Forgot from './pages/forgot';
import Success from './pages/success';
import Shipping from './pages/shipping';
import Payment from './pages/payment';
import PaymentStatus from './pages/PaymentStatus';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />,
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
    path: '/ship',
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
