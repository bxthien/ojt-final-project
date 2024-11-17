import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header/header';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="content p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
