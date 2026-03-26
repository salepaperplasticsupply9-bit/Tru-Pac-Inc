import { useState } from "react";
import { motion } from "framer-motion";
import { productCategories } from "../data/productCategories";
import ProductCard from "./ProductCard";
import ProductCategoryModal from "./ProductCategoryModal";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const { cartCount } = useCart();

  return (
    <section
      id="products"
      className="relative py-32 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        {/* Floating blobs */}
        <motion.div 
          className="absolute top-0 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -right-20 w-[600px] h-[600px] bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -30, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-100 shadow-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary">Our Product Range</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Premium Packaging
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Explore our full range of food-safe packaging solutions designed for speed, durability, and scale.
          </p>
        </motion.div>

        {/* Cart CTA */}
        {cartCount > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <Link
              to="/cart"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <span>View Cart ({cartCount})</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        )}

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
              
              {/* Main card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Card top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
                
                <ProductCard
                  category={category}
                  onView={setActiveCategory}
                />
                
                {/* Card hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              {/* Floating label on hover */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-lg z-10 pointer-events-none"
              >
                <span className="text-sm font-semibold text-primary">View Products</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for?
          </p>
          <Link
            to="/custom-packaging-quote"
            className="inline-flex items-center gap-3 border-2 border-primary text-primary px-8 py-4 rounded-2xl font-semibold hover:bg-primary/5 transition-all duration-300 group"
          >
            <span>Request Custom Packaging</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Modal */}
      <ProductCategoryModal
        category={activeCategory}
        onClose={() => setActiveCategory(null)}
      />
    </section>
  );
};

export default ProductsSection;