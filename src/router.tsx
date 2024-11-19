import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';
import Shipping from './pages/shipping';
import Payment from './pages/payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
    errorElement: <NotFound />,
    // children: [...publicRoutes, ...privateRoutes],
  },
  {
    path: '/shipping',
    element: <Shipping />,
  },
  {
    path: '/payment',
    element: <Payment />,
  },
]);

export default router;
