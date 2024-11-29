import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './locales';
import { CheckoutProvider } from './components/CheckoutContext';
import { Provider } from 'react-redux';
import NotFound from './pages/not-found';
import HomePage from './pages/home-page';
import SignIn from './pages/sign-in';
import Register from './pages/register';
import Forgot from './pages/forgot';
import Success from './pages/success';
import Profile from './pages/profile';
import Cart from './components/payments/Cart';
import Checkout from './components/payments/CheckoutPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SelectAddress from './components/SelectAdress/SelectAddress';
import ShipmentMethod from './components/SelectAdress/ShipmentMethod';
import PaymentPage from './components/SelectAdress/PaymentPage';
import LayOut from './layout';
import ProductDetailPage from './components/product-details/product-detail-page';
import Shipping from './pages/shipping';
import Payment from './pages/payment';
import PaymentStatus from './pages/PaymentStatus';
import ProductPage from './pages/product-page';
import store from './redux/store';

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
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/product-detail/:id',
        element: <ProductDetailPage />,
      },
      {
        path: '/shipping',
        element: <Shipping />,
      },
      {
        path: '/payments',
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CheckoutProvider>
        <RouterProvider router={router} />
      </CheckoutProvider>
    </Provider>
  </StrictMode>
);
