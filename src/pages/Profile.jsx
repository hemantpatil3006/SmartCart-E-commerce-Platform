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
        className="max-w-2xl mx-auto bg-white rounded-[2rem] sm:rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="bg-indigo-600 p-8 sm:p-12 text-center text-white relative">
          <div className="relative inline-block group mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center text-4xl sm:text-5xl font-black">
              {user.name.charAt(0)}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white text-indigo-600 p-2 sm:p-3 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={20} />
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-indigo-100">{user.email}</p>
        </div>

        <div className="p-6 sm:p-12">
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
