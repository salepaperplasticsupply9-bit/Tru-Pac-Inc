// components/Hero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import materialSamples from "../assets/images/material-samples.png"; // Adjust path as needed

const Hero = () => {
  const scrollToProducts = () => {
    // If we're on the homepage, just scroll to the section
    if (window.location.pathname === '/') {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to homepage first, then scroll
      window.location.href = '/#products';
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Material samples background image */}
      <div className="absolute inset-0">
        <img
          src={materialSamples}
          alt="Packaging Material Samples"
          className="w-full h-full object-cover"
        />
        {/* Reduced opacity dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/50 to-primary-dark/70" />
        
        {/* Animated background elements on top */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float animation-delay-4000" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-white/90 font-medium">Trusted by 42+ Food Businesses</span>
            </motion.div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Packaging Built for
              <span className="block bg-gradient-to-r from-white via-secondary-light to-white bg-clip-text text-transparent">
                High-Volume Food Service
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
              Bulk packaging solutions designed for restaurants, food trucks, and catering businesses that need reliability at scale.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={scrollToProducts}
                className="group relative inline-flex items-center justify-center bg-white text-primary font-bold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>Explore Products</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <Link
                to="/custom-packaging-quote"
                className="group relative inline-flex items-center justify-center bg-transparent border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <span>Get Custom Quote</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex flex-col items-center text-white/60">
                <span className="text-sm mb-2">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1 h-3 bg-white rounded-full mt-2"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating packaging icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/4 left-5 md:left-20 z-10"
      >
        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
          <span className="text-white text-2xl">🥡</span>
        </div>
      </motion.div>
      
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-1/4 right-5 md:right-20 z-10"
      >
        <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
          <span className="text-white text-3xl">☕</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;