import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Package, Truck, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear cart on successful checkout reaching this page
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="max-w-xl mx-auto bg-white rounded-[3rem] p-12 shadow-2xl shadow-indigo-100 border border-gray-100"
      >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8"
        >
            <CheckCircle2 className="text-green-500" size={48} />
        </motion.div>

        <h1 className="text-4xl font-black text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            Thank you for your purchase. We've sent a confirmation email to your registered address. Your premium items are being prepared for shipment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Package className="text-indigo-600 mx-auto mb-2" size={24} />
                <p className="text-xs font-bold text-gray-700 uppercase tracking-tighter">Preparing</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-50">
                <Truck className="text-gray-400 mx-auto mb-2" size={24} />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">In Transit</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-50">
                <Star className="text-gray-400 mx-auto mb-2" size={24} />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Delivered</p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link to="/" className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2">
                Continue Shopping
                <ArrowRight size={20} />
            </Link>
            <button 
                onClick={() => toast.success("Tracking information sent to your email!", { icon: '📦' })}
                className="btn-secondary w-full sm:w-auto"
            >
                Track My Order
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;
