import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-500">Items you've saved for later.</p>
        </div>
        <Link 
          to="/" 
          className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all"
        >
          Continue Shopping <ArrowRight size={20} />
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {wishlistItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[3rem] p-12 md:p-24 text-center border-2 border-dashed border-gray-100"
          >
            <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-8">
              <Heart size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
              Found something you love? Tap the heart icon to save it here for later.
            </p>
            <Link to="/" className="btn-primary px-10 py-4 inline-flex items-center gap-3 text-lg font-bold">
              <ShoppingBag size={22} />
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishlist;
