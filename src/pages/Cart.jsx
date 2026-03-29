import { useCart } from "../context/CartContext";
import MainLayout from "../layouts/MainLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Trash2, 
  Send, 
  Package, 
  CheckCircle,
  Truck,
  X,
  ArrowRight,
  Mail,
  Clock,
  Shield,
  User,
  Phone,
  MapPin,
  Building2
} from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);
  
  // State for contact information
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    deliveryAddress: "",
    city: "",
    state: "",
    zipCode: "",
    notes: ""
  });

  const updateContact = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

const sendCart = async () => {
  setLoading(true);

  if (!contactInfo.fullName || !contactInfo.email || !contactInfo.phone) {
    alert("Please fill in your name, email, and phone number");
    setLoading(false);
    return;
  }

  const orderData = {
    contact: contactInfo,
    items: cart,
    totalItems: cart.length,
    totalUnits: getTotalQuantity(),
    orderDate: new Date().toISOString(),
    orderId: "ORD-" + Date.now()
  };

  try {
    const response = await fetch("${import.meta.env.VITE_API_URL}/api/cart-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error("Failed to send order");
    }

    setSent(true);
    clearCart();

  } catch (error) {
    console.error("Order error:", error);
    alert("Failed to submit order. Please try again.");
  }

  setLoading(false);
};

  const handleRemove = (itemId) => {
    setRemovingItem(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItem(null);
    }, 300);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const isFormValid = () => {
    return contactInfo.fullName && contactInfo.email && contactInfo.phone;
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-100 shadow-sm"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-accent-dark">Quote Cart</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Cart
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ({cart.length} items)
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Review your items and provide contact information for your quote.
            </p>
          </div>
        </div>
      </section>

      {/* Main Cart Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-2xl p-12 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Quote Request Sent!</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                  Thank you for your interest. We'll contact you at <strong>{contactInfo.email}</strong> within 24 hours with pricing and availability.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = "/products"}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Browse More Products
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = "/"}
                    className="inline-flex items-center gap-3 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:border-primary/50 hover:text-primary transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    Back to Homepage
                  </motion.button>
                </div>
              </motion.div>
            ) : cart.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-2xl p-12 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-8">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                  Add products to your cart to request a bulk pricing quote.
                </p>
                <motion.a
                  href="/products"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Package className="w-5 h-5" />
                  Browse Products
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            ) : (
              <motion.div
                key="cart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-2xl overflow-hidden"
              >
                {/* Cart Header */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/10 to-primary/20 flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Quote Cart</h2>
                        <p className="text-gray-600">{cart.length} items • {getTotalQuantity().toLocaleString()} total units</p>
                      </div>
                    </div>
                    <button
                      onClick={clearCart}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-100">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: removingItem === item.id ? 0 : 1, 
                          x: 0,
                          scale: removingItem === item.id ? 0.9 : 1
                        }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="p-8 hover:bg-gray-50/50 transition-colors"
                      >
                        <div className="flex items-start gap-6">
                          {/* Item Icon */}
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                            <Package className="w-8 h-8 text-primary" />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                                {item.description && (
                                  <p className="text-gray-600 mb-3">{item.description}</p>
                                )}
                                <div className="flex items-center gap-4">
                                  <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                    <span className="text-sm font-medium text-gray-700">{item.quantity.toLocaleString()} units</span>
                                  </div>
                                  {item.category && (
                                    <span className="text-sm text-gray-500">{item.category}</span>
                                  )}
                                </div>
                              </div>

                              {/* Remove Button */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleRemove(item.id)}
                                className="w-10 h-10 rounded-full border border-red-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Contact Information Form */}
                <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={contactInfo.fullName}
                          onChange={(e) => updateContact('fullName', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => updateContact('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={contactInfo.phone}
                          onChange={(e) => updateContact('phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={contactInfo.businessName}
                          onChange={(e) => updateContact('businessName', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="Your Business Name"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={contactInfo.deliveryAddress}
                          onChange={(e) => updateContact('deliveryAddress', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          placeholder="Street Address"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={contactInfo.city}
                        onChange={(e) => updateContact('city', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={contactInfo.state}
                        onChange={(e) => updateContact('state', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="State"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={contactInfo.zipCode}
                        onChange={(e) => updateContact('zipCode', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="ZIP Code"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={contactInfo.notes}
                        onChange={(e) => updateContact('notes', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Any special requirements or questions about your order?"
                      />
                    </div>
                  </div>
                </div>

                {/* Cart Summary & Actions */}
                <div className="p-8 border-t border-gray-100">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Benefits */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Bulk Order Benefits</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">24-Hour Quote</p>
                            <p className="text-sm text-gray-600">Personalized pricing within one business day</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center">
                            <Truck className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Volume Discounts</p>
                            <p className="text-sm text-gray-600">Lower per-unit pricing for larger orders</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-secondary/10 to-secondary/5 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Priority Support</p>
                            <p className="text-sm text-gray-600">Dedicated account manager for bulk orders</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Section */}
                    <div>
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-600">Total Items</span>
                          <span className="font-semibold text-gray-900">{cart.length}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-600">Total Units</span>
                          <span className="font-semibold text-gray-900">{getTotalQuantity().toLocaleString()}</span>
                        </div>
                        <div className="h-px bg-gray-200 my-4" />
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Estimated Lead Time</span>
                          <span className="text-lg font-bold text-primary">3-5 business days</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={sendCart}
                          disabled={loading || !isFormValid()}
                          className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-semibold transition-all duration-300 ${
                            loading || !isFormValid()
                              ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-accent to-accent-dark text-white shadow-xl hover:shadow-2xl"
                          }`}
                        >
                          {loading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Send className="w-6 h-6" />
                              Submit Quote Request
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>

                        {!isFormValid() && (
                          <p className="text-sm text-red-500 text-center">
                            * Please fill in your name, email, and phone number
                          </p>
                        )}

                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">
                            Need custom packaging or have special requirements?
                          </p>
                          <a
                            href="/custom-packaging-quote"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
                          >
                            <Mail className="w-4 h-4" />
                            Request Custom Quote
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Next Steps Section (empty state) */}
      {cart.length === 0 && !sent && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Order?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our packaging solutions and add items to your cart for a bulk pricing quote.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "📦",
                  title: "Browse Products",
                  description: "Explore our full range of food-safe packaging",
                  action: "View Products",
                  href: "/products"
                },
                {
                  icon: "🎨",
                  title: "Custom Packaging",
                  description: "Get bespoke solutions with your branding",
                  action: "Get Quote",
                  href: "/custom-packaging-quote"
                },
                {
                  icon: "📞",
                  title: "Need Help?",
                  description: "Contact our packaging experts for guidance",
                  action: "Contact Us",
                  href: "/#contact"
                }
              ].map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl p-8 text-center transition-all duration-300"
                >
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold">
                    {item.action}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default Cart;