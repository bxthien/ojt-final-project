import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';
import Register from './pages/register';

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
]);

export default router;
