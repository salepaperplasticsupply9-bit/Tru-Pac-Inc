import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import { productCategories } from "../data/productCategories";
import ProductCard from "../components/ProductCard";
import ProductCategoryModal from "../components/ProductCategoryModal";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { 
  Package, 
  ShoppingCart, 
  Filter,
  Search,
  TrendingUp,
  Shield,
  Truck,
  ArrowRight,
  ChevronRight
} from "lucide-react";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter categories based on search and filter
  const filteredCategories = productCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "popular") return category.popular;
    if (selectedFilter === "new") return category.new;
    
    return matchesSearch;
  });

  const filters = [
    { id: "all", label: "All Products", count: productCategories.length },
    { id: "popular", label: "Most Popular", count: productCategories.filter(c => c.popular).length },
    { id: "new", label: "New Arrivals", count: productCategories.filter(c => c.new).length },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          {/* Before — two motion.divs with infinite animation, replace with plain divs */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[700px] h-[700px] bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-100 shadow-sm"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-accent-dark">Premium Packaging</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Explore Our
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Product Catalog
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Discover our comprehensive range of food-safe packaging solutions designed for high-volume restaurants, food trucks, and catering businesses.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </motion.div>

            {/* Cart CTA */}
            {cartCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block"
              >
                <Link
                  to="/cart"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  <ShoppingCart className="w-6 h-6" />
                  View Cart ({cartCount})
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gradient-to-b from-white to-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {filteredCategories.length} Products Available
              </h2>
              <p className="text-gray-600">Filter by category or search for specific items</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-primary/30 hover:shadow-md"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {filter.label}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    selectedFilter === filter.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {filter.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedFilter}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
          {filteredCategories.length === 0 ? (
              <div className="text-center py-20">

              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-8">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-xl font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                    {/* Card top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
                    
                    <ProductCard
                      category={category}
                      onView={setActiveCategory}
                    />
                    
                    {/* Card hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  </div>
              ))}
            </div>
          )}
          </motion.div>
        </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TRU PAC Products?</h2>
            <p className="text-gray-600">Premium quality, reliable supply, and expert support</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Food-Safe Certified</h3>
              <p className="text-gray-600">All materials meet FDA and food safety standards for worry-free service.</p>
            </div>
            
            <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary/10 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Bulk Pricing</h3>
              <p className="text-gray-600">Competitive wholesale pricing for high-volume businesses with no minimum order.</p>
            </div>
            
            <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent/10 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Nationwide shipping with reliable logistics for consistent supply.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-primary-dark/90 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Need Custom Packaging?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Don't see exactly what you need? We specialize in custom packaging solutions with your branding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/custom-packaging-quote"
                className="inline-flex items-center gap-3 bg-white text-primary-dark px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Request Custom Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProductCategoryModal
        category={activeCategory}
        onClose={() => setActiveCategory(null)}
      />
    </MainLayout>
  );
};

export default Products;