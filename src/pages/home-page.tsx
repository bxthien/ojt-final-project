import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header/header';
import Hero from '../components/home-page/hero';
import ProductGrid from '../components/home-page/product-grid';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <Outlet />
        <Hero />
        <ProductGrid />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
