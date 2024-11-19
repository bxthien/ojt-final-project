import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header/header';
import Hero from '../components/home-page/hero';
import ProductGrid from '../components/home-page/product-grid';
import ProductList from '../components/home-page/new-product-list';
import Banner from '../components/home-page/banner-product';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <Outlet />
        <Hero />
        <ProductGrid />
        <ProductList />
        <Banner />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
