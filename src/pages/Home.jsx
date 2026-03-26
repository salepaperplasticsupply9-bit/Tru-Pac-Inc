import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import WhoWeSupply from "../components/WhoWeSupply";
import WhyTruPac from "../components/WhyTruPac";
import ProductsSection from "../components/ProductsSection";
import CustomPackagingSection from "../components/CustomPackagingSection";
import ContactSection from "../components/ContactSection";
import StatsSection from "../components/StatsSection";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [mouseTimeout, setMouseTimeout] = useState(null);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsAtTop(scrollTop < 100);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = () => {
      setIsMouseMoving(true);
      
      // Clear existing timeout
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }
      
      // Set new timeout to hide arrow after 2 seconds of no movement
      const timeout = setTimeout(() => {
        setIsMouseMoving(false);
      }, 2000);
      
      setMouseTimeout(timeout);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeout) clearTimeout(mouseTimeout);
    };
  }, [mouseTimeout]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Scroll down function
  const scrollToNextSection = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const nextScrollPosition = currentScroll + windowHeight;
    
    window.scrollTo({
      top: nextScrollPosition,
      behavior: "smooth"
    });
  };

  return (
    <MainLayout>
      {/* Hero with gradient background */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary-dark/80" />
        {/* CORRECTED SVG PATTERN */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <Hero />
      </section>

      {/* Who We Supply with subtle pattern */}
      <section id="who" className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-paper/30 to-white" />
        {/* CORRECTED RADIAL PATTERN */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `radial-gradient(#2A4C7D 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        <WhoWeSupply />
      </section>

      {/* Why TruPac with gradient */}
      <section id="why" className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-paper/50 to-accent/5" />
        <WhyTruPac />
      </section>

      {/* Products with animated gradient */}
      <section id="products" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-animated">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <ProductsSection />
      </section>

      {/* Custom Packaging with geometric pattern */}
      <section id="custom" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-gradient-to-l from-secondary/10 to-transparent rounded-full blur-3xl" />
        </div>
        <CustomPackagingSection />
      </section>

      {/* Stats Section - Enhanced */}
      <StatsSection />

      {/* Contact with gradient mesh */}
      <section id="contact" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary/5" />
        {/* CORRECTED GEOMETRIC PATTERN */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232A4C7D' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}
        />
        <ContactSection />
      </section>

      {/* Floating Arrow */}
      <AnimatePresence>
        {isVisible && isMouseMoving && !isAtTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-40 flex flex-col gap-3"
          >
            {/* Up Arrow */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-2xl hover:shadow-3xl flex items-center justify-center transition-all duration-300 group"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-7 h-7 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>

            {/* Down Arrow */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToNextSection}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark text-white shadow-2xl hover:shadow-3xl flex items-center justify-center transition-all duration-300 group"
              aria-label="Scroll to next section"
            >
              <ChevronDown className="w-7 h-7 group-hover:translate-y-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Home;