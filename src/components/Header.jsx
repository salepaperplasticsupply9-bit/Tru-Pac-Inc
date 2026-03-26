import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  ShoppingCart, 
  Package, 
  Mail, 
  Menu, 
  X,
  ChevronDown,
  Phone
} from "lucide-react";

// Import your logo
import logo from "../assets/logo/truPacLogo.jpg";

const Header = () => {
  const { cart } = useCart();
  const cartCount = cart.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", href: "/", icon: "🏠" },
    { label: "Products", href: "/products", icon: "📦" },
    { 
      label: "Custom Packaging", 
      href: "#custom",
      submenu: [
        { label: "Overview", href: "#custom", isSection: true },
        { label: "Get Quote", href: "/custom-packaging-quote", isSection: false },
      ]
    },
    { label: "Contact", href: "#contact", icon: "📞" },
  ];

  // Function to handle section links
  const handleSectionLink = (sectionId) => {
    if (window.location.pathname === '/') {
      // Already on homepage, scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage with hash
      navigate('/');
      // Scroll after navigation (use setTimeout to ensure DOM is ready)
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  // Function to handle regular links
  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      handleSectionLink(href.substring(1)); // Remove the # symbol
    } else {
      navigate(href);
      setIsDropdownOpen(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" />
            <span>Free consultation: (555) 123-4567</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Fast shipping nationwide
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              No minimum order
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with your image */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              {/* Your logo image */}
              <div className="relative w-12 h-12">
                <img
                  src={logo}
                  alt="TRU PAC Logo"
                  className="relative w-full h-full object-contain p-0"
                />
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  TRU PAC INC
                </h1>
                <p className="text-xs text-gray-500 tracking-wider">PACKAGING SOLUTIONS</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative">
                {item.submenu ? (
                  <div
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className="relative"
                  >
                    <button className="flex items-center gap-2 text-gray-700 hover:text-primary font-medium transition-colors group">
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden"
                        >
                          <div className="p-2">
                            {item.submenu.map((subItem) => (
                              <button
                                key={subItem.label}
                                onClick={() => handleLinkClick(subItem.href)}
                                className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-primary transition-colors"
                              >
                                <Package className="w-4 h-4" />
                                {subItem.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => handleLinkClick(item.href)}
                    className="text-gray-700 hover:text-primary font-medium transition-colors relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-6">
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center"
              >
                <ShoppingCart className="w-6 h-6 text-secondary" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
              
              {/* Cart tooltip */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <p className="text-sm font-medium text-gray-900 mb-2">Your Cart</p>
                {cartCount > 0 ? (
                  <p className="text-sm text-gray-600">{cartCount} item{cartCount > 1 ? 's' : ''} in cart</p>
                ) : (
                  <p className="text-sm text-gray-600">Your cart is empty</p>
                )}
                <Link
                  to="/cart"
                  className="mt-3 w-full bg-gradient-to-r from-primary to-primary-dark text-white py-2 rounded-lg text-sm font-medium text-center block hover:shadow-lg transition-shadow"
                >
                  View Cart
                </Link>
              </div>
            </Link>

            {/* CTA Button */}
            <Link
              to="/custom-packaging-quote"
              className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Get Quote
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 border-t border-gray-100">
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.label}>
                      {item.submenu ? (
                        <div className="space-y-2">
                          <div className="font-medium text-gray-900 px-4 py-2">{item.label}</div>
                          {item.submenu.map((subItem) => (
                            <button
                              key={subItem.label}
                              onClick={() => handleLinkClick(subItem.href)}
                              className="w-full text-left block px-8 py-2 text-gray-600 hover:text-primary transition-colors"
                            >
                              {subItem.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleLinkClick(item.href)}
                          className="w-full text-left block px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-primary font-medium transition-colors"
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {/* Mobile CTA */}
                  <div className="px-4 pt-6 border-t border-gray-100">
                    <Link
                      to="/custom-packaging-quote"
                      className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-4 rounded-2xl font-semibold shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Mail className="w-5 h-5" />
                      Request Custom Quote
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress indicator on scroll */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 hover:opacity-100 transition-opacity" />
    </header>
  );
};

export default Header;