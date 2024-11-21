import Hero from '../components/home-page/hero';
import ProductGrid from '../components/home-page/product-grid';
import ProductList from '../components/home-page/product-list';
import Banner from '../components/home-page/banner-product';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div>
        <Hero />
        <ProductGrid />
        <ProductList />
        <Banner />
      </div>
    </div>
  );
};

export default HomePage;
