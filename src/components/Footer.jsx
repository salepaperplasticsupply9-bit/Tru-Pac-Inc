import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Package,
  Truck,
  Shield,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-primary-dark to-primary overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Link to="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                    TRU PAC
                  </h2>
                  <p className="text-sm text-white/70 tracking-wider">PREMIUM PACKAGING</p>
                </div>
              </Link>
              
              <p className="text-white/80 leading-relaxed mb-8">
                Premium food packaging solutions built for high-volume restaurants, food trucks, and catering businesses across the United States.
              </p>
              
              {/* Trust badges */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-white/80">Nationwide Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-white/80">Food-Safe Certified</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm text-white/80">Fast Turnaround</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-white/10">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Products", href: "#products" },
                { label: "Custom Packaging", href: "#custom" },
                { label: "Why Choose Us", href: "#why" },
                { label: "Get a Quote", href: "/custom-packaging-quote" },
                { label: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-2 text-white/70 hover:text-accent transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-white/10">
              Products
            </h3>
            <ul className="space-y-4">
              {[
                "Takeout Containers",
                "Paper Bags",
                "Cups & Lids",
                "Plastic Packaging",
                "Aluminum Foil",
                "Custom Printing",
                "Bulk Orders",
                "Eco-Friendly Options"
              ].map((product) => (
                <li key={product}>
                  <a
                    href="#products"
                    className="text-white/70 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold text-white mb-6 pb-3 border-b border-white/10">
              Contact Info
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Email</p>
                  <a 
                    href="mailto:salepaperplasticsupply9@gmail.com" 
                    className="text-white/70 hover:text-accent transition-colors"
                  >
                    salepaperplasticsupply9@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Phone</p>
                  <a 
                    href="tel:+1XXXXXXXXXX" 
                    className="text-white/70 hover:text-accent transition-colors"
                  >
                    +1 (XXX) XXX-XXXX
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Service Area</p>
                  <p className="text-white/70">Nationwide USA</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white font-medium mb-4">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, label: "Facebook", color: "hover:text-blue-500" },
                  { icon: Instagram, label: "Instagram", color: "hover:text-pink-500" },
                  { icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
                  { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-700" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white ${social.color} transition-colors hover:bg-white/20`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} TRU PAC INC. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-white/60 hover:text-accent text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/60 hover:text-accent text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-white/60 hover:text-accent text-sm transition-colors">
              Shipping Policy
            </Link>
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Back to top"
          >
            <ArrowUpRight className="w-6 h-6 text-white rotate-[-45deg]" />
          </motion.button>
        </div>

        {/* Trust Seals */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-2">42+</div>
              <div className="text-sm text-white/70">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-2">3.4K+</div>
              <div className="text-sm text-white/70">Orders Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-2">USA</div>
              <div className="text-sm text-white/70">Nationwide</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-white/70">Support</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;