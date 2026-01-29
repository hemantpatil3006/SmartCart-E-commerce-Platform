import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id));
    toast.error(`${name} removed from cart`);
  };

  const handleQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="max-w-md mx-auto"
        >
          <div className="bg-white w-24 h-24 rounded-3xl shadow-xl shadow-gray-100 flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="text-gray-300" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            Start Shopping
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-10">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-indigo-600 font-bold">${item.price}</p>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                  <button 
                    onClick={() => handleQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button 
                  onClick={() => handleRemove(item.id, item.name)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                >
                  <Trash2 size={22} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="pt-6 flex justify-between items-center">
             <Link to="/" className="text-indigo-600 font-semibold hover:underline flex items-center gap-2">
                <ArrowRight size={20} className="rotate-180" />
                Continue Shopping
             </Link>
             <button 
                onClick={() => {
                    dispatch(clearCart());
                    toast.success("Cart cleared");
                }}
                className="text-gray-400 hover:text-red-500 transition-colors font-medium flex items-center gap-2"
             >
                <X size={18} />
                Clear Cart
             </button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl shadow-indigo-200 sticky top-32"
          >
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-400 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-800 pt-4 mt-4">
                <div className="flex justify-between items-end">
                  <span className="text-lg">Total</span>
                  <span className="text-3xl font-black">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link to="/checkout" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-indigo-900/50">
              Checkout Now
              <ArrowRight size={22} />
            </Link>
            <p className="text-center text-gray-500 text-xs mt-6">
                Secure SSL Encryption & 30-Day Money Back Guarantee
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
