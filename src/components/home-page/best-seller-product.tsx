import ProductCard from '../product/product-card';
import { products, Product } from '../../constants/data';

const BestSellerProductList = () => {
  return (
    <div className="bg-white min-h-screen p-8 px-4 sm:px-8 md:px-16 lg:px-36">
      <h1 className="text-4xl font-bold mb-6 text-center">New Arrival</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellerProductList;
