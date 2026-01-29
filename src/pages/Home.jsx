import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div 
        className="text-center mb-16"
      >
        <span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm mb-4 block">New Collection 2026</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
          Shop Smarter, <br/><span className="text-indigo-600">Not Harder.</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg">
          Discover our curated selection of premium electronics and accessories designed to enhance your lifestyle.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 items-center relative">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all text-base sm:text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative w-full md:w-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl shadow-sm transition-all font-medium w-full md:w-auto border ${
              isFilterOpen ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
            }`}
          >
            <SlidersHorizontal size={20} />
            <span>{selectedCategory === 'All' ? 'Filters' : selectedCategory}</span>
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 p-2"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                      selectedCategory === cat ? "bg-indigo-50 text-indigo-600 font-bold" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-indigo-500" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
