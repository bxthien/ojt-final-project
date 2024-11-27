import { useEffect, useState } from 'react';
import ProductCard from '../components/product/product-card';
import ProductSidebar from '../components/product/product-side-bar';
import { fetchProducts } from '../constants/fetchProducts';

interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Default sort order
  const [minPrice, setMinPrice] = useState<number>(0); // State for min price
  const [maxPrice, setMaxPrice] = useState<number>(10000); // State for max price (adjust based on your products)

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setSortedProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  // Filter products based on price range
  useEffect(() => {
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setSortedProducts(filtered);
  }, [minPrice, maxPrice, products]);

  // Handle sorting when sortOrder changes
  useEffect(() => {
    const sorted = [...sortedProducts].sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
  }, [sortOrder, sortedProducts]);

  // Callback to update sort order
  const handlePriceSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  // Callback for price range change
  const handlePriceRangeChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 pl-5">
        {/* Sidebar */}
        <ProductSidebar
          onBrandSelect={() => {}}
          onMemorySelect={() => {}}
          selectedBrand=""
          selectedMemory=""
          onPriceSortChange={handlePriceSortChange}
          onPriceChange={handlePriceRangeChange}
        />
      </div>

      {/* Product Grid */}
      <div className="flex-1 justify-center items-center p-10 md:p-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
