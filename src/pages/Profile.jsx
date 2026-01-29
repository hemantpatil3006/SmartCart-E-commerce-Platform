import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Camera, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    toast.success('Profile updated successfully!', {
        icon: '👤',
        style: {
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
        },
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Profile Header */}
        <div className="h-32 bg-indigo-600 relative">
            <div className="absolute -bottom-12 left-10">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                        <User size={48} className="text-indigo-200" />
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-indigo-500 text-white rounded-xl shadow-lg hover:bg-indigo-600 scale-0 group-hover:scale-100 transition-transform">
                        <Camera size={16} />
                    </button>
                </div>
            </div>
        </div>

        <div className="pt-16 px-10 pb-10">
            <div className="mb-10">
                <h2 className="text-3xl font-black text-gray-900">Personal Account</h2>
                <p className="text-gray-500">Manage your profile and shipping information.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                        <div className="relative group">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                type="email"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Shipping Address</label>
                    <div className="relative group">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all font-medium"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-lg font-bold"
                    >
                        <Save size={22} />
                        Save Changes
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                        We values your privacy. Your data is encrypted and secure.
                    </p>
                </div>
            </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
