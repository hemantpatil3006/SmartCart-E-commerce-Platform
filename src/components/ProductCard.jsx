import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const inWishlist = wishlistItems.find((item) => item.id === product.id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    if (inWishlist) {
      toast.error(`${product.name} removed from wishlist`);
    } else {
      toast.success(`${product.name} added to wishlist!`, { icon: '❤️' });
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-3xl p-5 shadow-sm border border-gray-100 product-card-hover cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center p-6">
        <button 
          onClick={handleWishlistToggle}
          className={`absolute top-2 left-2 p-2 rounded-xl border shadow-sm transition-all z-20 ${
            inWishlist 
            ? "bg-pink-50 border-pink-100 text-pink-600" 
            : "bg-white border-gray-100 text-gray-400 hover:text-pink-500"
          }`}
        >
          <Heart size={18} className={inWishlist ? "fill-current" : ""} />
        </button>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" 
        />
        <div className="absolute top-2 right-2">
            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm border border-indigo-50">
                {product.category}
            </span>
        </div>
      </div>
      
      <div className="flex-grow">
        <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h2>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
            Premium quality and exceptional performance for modern enthusiasts.
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-medium line-through">${(product.price * 1.2).toFixed(2)}</span>
            <span className="text-2xl font-black text-gray-900">${product.price}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors"
        >
          <motion.div
            initial={false}
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 15 }}
          >
            <ShoppingCart size={22} />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
