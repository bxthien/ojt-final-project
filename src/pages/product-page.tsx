import { useState, useEffect } from 'react';
import ProductCard from '../components/product/product-card';
import ProductSidebar from '../components/product/product-side-bar';
import { useProducts } from '../constants/useProducts';
import { useLocation } from 'react-router-dom';
import { t } from 'i18next';

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
  url: string;
  category: string[];
}

const ProductPage = () => {
  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);

  // Improved category handling
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [searchTerm, setSearchTerm] = useState('');

  // Extract initial search and other parameters from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Update search term
    setSearchTerm(searchParams.get('search') || '');

    // Update price range
    const urlMinPrice = searchParams.get('minPrice');
    const urlMaxPrice = searchParams.get('maxPrice');
    if (urlMinPrice) setMinPrice(Number(urlMinPrice));
    if (urlMaxPrice) setMaxPrice(Number(urlMaxPrice));

    // Update selected categories
    // const categoriesFromUrl = searchParams.get('categories');
    // if (categoriesFromUrl) {
    //   setSelectedCategories(categoriesFromUrl.split(','));
    // }
  }, [location.search]); // This will trigger whenever the URL changes

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories);
    console.log('categories', categories);

    const searchParams = new URLSearchParams(location.search);

    if (categories.length > 0) {
      searchParams.set('categories', categories.join(','));
    } else {
      searchParams.delete('categories');
    }

    window.history.pushState({}, '', `${location.pathname}?${searchParams.toString()}`);
  };

  // Fetch products with dynamic filtering
  const { products, loading, error } = useProducts({
    categories: selectedCategories,
    minPrice,
    maxPrice,
    search: searchTerm,
    orderBy: sortOrder,
  });

  // Filter and sort products
  // ProductPage.tsx (Part of it)
  useEffect(() => {
    const filtered = products
      .filter((product) => product.price >= minPrice && product.price <= maxPrice)
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // .filter((product) => {});

    // Sort by price
    filtered.sort((a, b) => (sortOrder === 'ASC' ? a.price - b.price : b.price - a.price));

    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, sortOrder, searchTerm, selectedCategories, products]);

  // Handle price sort change
  const handlePriceSortChange = (order: 'ASC' | 'DESC') => {
    setSortOrder(order);
  };

  // Handle price range change
  const handlePriceChange = (newMinPrice: number, newMaxPrice: number) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);

    // Update URL with price range
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('minPrice', newMinPrice.toString());
    searchParams.set('maxPrice', newMaxPrice.toString());

    window.history.pushState({}, '', `${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="">
        <ProductSidebar
          onPriceSortChange={handlePriceSortChange}
          onPriceChange={handlePriceChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onCategorySelect={handleCategorySelect}
          selectedCategories={selectedCategories}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 pt-5 md:p-8">
        {/* Search Term Display */}
        {searchTerm && (
          <p className="text-lg text-gray-700 mb-6">
            {t('productPage.searchingFor')}: <span className="font-semibold">{searchTerm}</span>
          </p>
        )}

        {/* Category Filter Display */}

        {/* Error Handling */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center w-full">{t('productPage.noProducts')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
