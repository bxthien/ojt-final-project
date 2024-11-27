// import { useState, useEffect } from 'react';

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   brand: string;
//   memory: string;
//   photos: string[];
// }

// interface ProductFilters {
//   brand?: string;
//   memory?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   sortOrder?: 'asc' | 'desc';
// }

// export const useProducts = (
//   category: string = '',
//   filters: ProductFilters = {}
// ) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async (category: string) => {
//       try {
//         setLoading(true);
//         // Simulating API call - replace with your actual data fetching logic
//         const allProducts = await fetchProducts(category);

//         // Apply filters
//         let filteredProducts = allProducts.filter(product => {
//           // Brand filter
//           if (filters.brand && product.brand !== filters.brand) return false;

//           // Memory filter
//           if (filters.memory && product.memory !== filters.memory) return false;

//           // Price range filter
//           if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
//           if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;

//           return true;
//         });

//         // Sorting
//         if (filters.sortOrder) {
//           filteredProducts.sort((a, b) =>
//             filters.sortOrder === 'asc'
//               ? a.price - b.price
//               : b.price - a.price
//           );
//         }

//         setProducts(filteredProducts);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch products');
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [category, JSON.stringify(filters)]);

//   return { products, loading, error };
// };
