import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer';

const LayOut = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayOut;
