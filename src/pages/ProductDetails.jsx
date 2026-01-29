import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../data/products';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = productsData.find((p) => p.id === parseInt(id));
  const cartItems = useSelector((state) => state.cart.items);
  const inCart = cartItems.find((item) => item.id === product?.id);

  if (!product) {
    return (
        <div className="container mx-auto px-6 py-24 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
            <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 font-semibold hover:underline">
                Return to Home
            </button>
        </div>
    );
  }

  const handleCartAction = () => {
    if (inCart) {
        dispatch(removeFromCart(product.id));
        toast.error("Removed from cart");
    } else {
        dispatch(addToCart(product));
        toast.success("Added to cart!");
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-10 font-medium group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Results
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Product Image */}
        <div 
            className="bg-white rounded-3xl lg:rounded-[3rem] p-6 sm:p-12 shadow-sm border border-gray-100 aspect-square flex items-center justify-center relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain relative z-10" 
            />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
            <div>
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">{product.category}</span>
                <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">{product.name}</h1>
                
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-indigo-600">${product.price}</span>
                    <span className="text-xl text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">20% OFF</span>
                </div>

                <p className="text-gray-500 text-lg leading-relaxed mb-10">
                    {product.description || "Experience the pinnacle of innovation with this premium device. Engineered for high performance and styled for modern elegance, it's the perfect companion for your digital lifestyle."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <button
                        onClick={handleCartAction}
                        className={`flex-grow flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-xl ${
                            inCart 
                            ? "bg-red-50 text-red-600 border-2 border-red-100 hover:bg-red-100 shadow-red-100" 
                            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
                        }`}
                    >
                        {inCart ? "Remove from Cart" : (
                            <>
                                <ShoppingCart size={22} />
                                Add to Cart
                            </>
                        )}
                    </button>
                    <button className="px-8 py-5 rounded-2xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-colors">
                        Add to Wishlist
                    </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Truck size={20} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <ShieldCheck size={20} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">1 Year Warranty</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <RotateCcw size={20} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">30 Day Returns</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
