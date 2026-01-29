import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserContext } from "../context/UserContext";
import { Menu, X, ShoppingCart, User, Home as HomeIcon, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <HomeIcon size={20} /> },
    { name: "Wishlist", path: "/wishlist", icon: <Heart size={20} />, badge: wishlistCount },
    { name: "Cart", path: "/cart", icon: <ShoppingCart size={20} />, badge: totalItems },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tight text-indigo-600 flex items-center gap-2"
        >
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
            <ShoppingCart size={24} />
          </div>
          <span className={scrolled ? "text-white" : "text-gray-900"}>SmartCart</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative flex items-center gap-2 font-medium transition-colors duration-200 ${
                  isActive 
                    ? "text-indigo-500" 
                    : scrolled ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-indigo-600"
                }`
              }
            >
              {link.icon}
              {link.name}
              {link.badge > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-4 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900"
                >
                  {link.badge}
                </motion.span>
              )}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                />
              )}
            </NavLink>
          ))}
          <div className={`flex items-center gap-3 pl-4 border-l ${scrolled ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"}`}>
            <span className="text-sm">Hi, <span className="font-semibold text-indigo-600">{user.name}</span></span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg ${scrolled ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-3 rounded-xl transition-colors ${
                      isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </div>
                  {link.badge > 0 && (
                    <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 px-3">
                <span className="text-sm text-gray-500">Logged in as</span>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
