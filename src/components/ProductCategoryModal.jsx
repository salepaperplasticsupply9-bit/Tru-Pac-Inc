import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingCart, 
  CheckCircle,
  Package,
  Truck,
  Shield,
  Users,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OTHER_SUPPLIES = [
  "Cutlery",
  "Napkins",
  "Gloves",
  "Wraps & Films",
];

const ProductCategoryModal = ({ category, onClose }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1000);
  const [added, setAdded] = useState(false);
  const [selectedOthers, setSelectedOthers] = useState([]);

  // Reset states when category changes
  useEffect(() => {
    if (category) {
      setQty(1000);
      setAdded(false);
      setSelectedOthers([]);
    }
  }, [category]);

  if (!category) return null;

  const isOtherSupplies = category.name.toLowerCase().includes("other");

  const isInCart = isOtherSupplies
    ? selectedOthers.every(item =>
        cart.some(c => c.id === `${category.id}-${item}`)
      )
    : cart.some(c => c.id === category.id);

  const toggleOther = (item) => {
    setSelectedOthers((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleAdd = () => {
    if (isOtherSupplies) {
      selectedOthers.forEach((item) => {
        addToCart(
          { 
            id: `${category.id}-${item}`, 
            name: item,
            category: category.name,
            price: 0 // You might want to add actual prices
          },
          qty
        );
      });
    } else {
      addToCart(
        { 
          id: category.id, 
          name: category.name,
          description: category.description,
          image: category.image,
          price: 0 // Add your actual pricing logic here
        },
        qty
      );
    }

    setAdded(true);
    // Auto-hide added state after 1.5 seconds
    setTimeout(() => setAdded(false), 1500);
  };

  const handleRemove = () => {
    if (isOtherSupplies) {
      selectedOthers.forEach((item) =>
        removeFromCart(`${category.id}-${item}`)
      );
    } else {
      removeFromCart(category.id);
    }
    setAdded(false);
  };

  const incrementQty = () => setQty(prev => prev + 100);
  const decrementQty = () => setQty(prev => Math.max(100, prev - 100));

  const handleGoToCart = () => {
    navigate("/cart");
    onClose(); // Close the modal when navigating to cart
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 300
          }}
          className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary/30 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column - Image & Features */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white">
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl mb-8 shadow-xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Premium Quality</h3>
                      <p className="text-white/80 text-sm">Food-safe materials</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Key Features
                </h4>
                <ul className="space-y-3">
                  {[
                    "Food-safe certified materials",
                    "Durable construction for high-volume use",
                    "Custom branding available",
                    "Bulk pricing for businesses",
                    "Fast nationwide shipping"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Industries */}
              {!isOtherSupplies && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Popular with
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.industries.map((industry) => (
                      <span
                        key={industry}
                        className="px-4 py-2 rounded-full text-sm bg-gradient-to-r from-primary/10 to-primary/5 text-primary-dark border border-primary/20"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Info & Actions */}
            <div className="p-8 lg:p-12">
              {/* Category badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full px-4 py-2 mb-6 border border-primary/20">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary-dark">{category.category || "Packaging"}</span>
              </div>

              {/* Title & Description */}
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {category.name}
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-8">
                {category.description}
              </p>

              {/* Other Supplies Selection */}
              {isOtherSupplies && (
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    Select Items Needed
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {OTHER_SUPPLIES.map((item) => (
                      <motion.button
                        key={item}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleOther(item)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                          selectedOthers.includes(item)
                            ? "border-accent bg-gradient-to-r from-accent/5 to-accent/10 shadow-md"
                            : "border-gray-200 bg-white hover:border-primary/30 hover:shadow-sm"
                        }`}
                      >
                        <span className="font-medium text-gray-900">{item}</span>
                        {selectedOthers.includes(item) ? (
                          <CheckCircle className="w-5 h-5 text-accent" />
                        ) : (
                          <Plus className="w-5 h-5 text-gray-400" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">Quantity (Bulk Order)</h4>
                  <span className="text-sm text-gray-500">Min: 100 units</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={decrementQty}
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors"
                    disabled={qty <= 100}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1">
                    <input
                      type="number"
                      min="100"
                      step="100"
                      value={qty}
                      onChange={(e) => setQty(Math.max(100, Number(e.target.value)))}
                      className="w-full px-6 py-4 text-center text-2xl font-bold bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <button
                    onClick={incrementQty}
                    className="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-sm text-gray-600">{qty.toLocaleString()} units</span>
                  <span className="text-sm text-primary font-medium">
                    ${(qty * 0.05).toFixed(2)} estimated
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {isInCart ? (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/20 rounded-2xl p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-accent" />
                        <div>
                          <p className="font-semibold text-gray-900">Added to Cart</p>
                          <p className="text-sm text-gray-600">Ready for checkout</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleRemove}
                      className="w-14 h-14 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                ) : (
                  <motion.button
                    onClick={handleAdd}
                    disabled={isOtherSupplies && selectedOthers.length === 0}
                    className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden ${
                      isOtherSupplies && selectedOthers.length === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-primary to-primary-dark text-white shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                    }`}
                  >
                    {/* Added success animation */}
                    <AnimatePresence>
                      {added && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute inset-0 bg-accent flex items-center justify-center"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-6 h-6" />
                            <span className="font-semibold">Added!</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                )}

                {/* Secondary Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={onClose}
                    className="py-4 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-primary/30 hover:text-primary transition-all duration-300 font-medium"
                  >
                    Continue Shopping
                  </button>
                  
                  {/* Dynamic button - changes based on cart state */}
                  {isInCart ? (
                    <button
                      onClick={handleGoToCart}
                      className="py-4 rounded-xl border-2 border-accent bg-gradient-to-r from-accent/10 to-accent/5 text-accent hover:from-accent/20 hover:to-accent/10 transition-all duration-300 font-medium flex items-center justify-center gap-2 group"
                    >
                      <span>Go to Cart</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/custom-packaging-quote")}
                      className="py-4 rounded-xl border-2 border-primary/30 text-primary hover:bg-primary/5 transition-all duration-300 font-medium flex items-center justify-center gap-2 group"
                    >
                      <span>Custom Order</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>

              {/* Assurance Note */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Bulk Order Benefits</p>
                    <p className="text-sm text-gray-600">
                      Bulk orders receive discounted pricing, priority processing, and dedicated account support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductCategoryModal;