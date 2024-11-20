import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';
import HomePage from './pages/home-page';
import Register from './pages/register';
import ProductPage from './pages/product-page';

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
    path: '/product-page',
    element: <ProductPage />,
  },
]);

export default router;
