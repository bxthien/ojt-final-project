import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';
import Register from './pages/register';
import Forgot from './pages/forgot';
import Success from './pages/success';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
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
]);

export default router;
