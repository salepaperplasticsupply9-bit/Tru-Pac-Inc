import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Package, 
  Printer, 
  Truck, 
  CheckCircle,
  FileText,
  Factory,
  Upload,
  Mail,
  ArrowRight
} from "lucide-react";

const OPTIONS = [
  {
    id: "bags",
    title: "Bags & Takeout Packaging",
    description: "Paper bags, takeout boxes, and food containers",
    capabilities: [
      "Custom logo printing",
      "Food-safe inks",
      "Grease-resistant materials",
      "Bulk production pricing",
    ],
    industries: ["Restaurants", "Food Trucks", "Catering"],
    icon: Package,
    color: "from-primary to-primary-light",
  },
  {
    id: "cups",
    title: "Cups & Beverage Packaging",
    description: "Hot & cold cups with custom branding",
    capabilities: [
      "Single & double wall cups",
      "High-quality logo prints",
      "Durable lids",
      "Large volume manufacturing",
    ],
    industries: ["Coffee Shops", "QSR", "Convenience Stores"],
    icon: Printer,
    color: "from-secondary to-secondary-light",
  },
  {
    id: "full",
    title: "Full Brand Packaging",
    description: "Complete packaging system for your business",
    capabilities: [
      "Multiple product types",
      "Consistent branding",
      "Scalable supply",
      "Dedicated account handling",
    ],
    industries: ["Franchises", "Restaurant Groups", "Distributors"],
    icon: Factory,
    color: "from-accent to-accent-light",
  },
  {
    id: "unsure",
    title: "Not Sure Yet?",
    description: "We help you choose the right solution",
    capabilities: [
      "Consultation-based guidance",
      "Material recommendations",
      "Cost optimization",
      "Production planning",
    ],
    industries: ["New Businesses", "Growing Brands"],
    icon: FileText,
    color: "from-primary-dark to-secondary-dark",
  },
];

const HOW_IT_WORKS = [
  {
    title: "Share your logo or idea",
    short: "Send us your logo or concept",
    long: "You provide your logo, design, or concept. Our team reviews it and prepares a print-ready layout suited for your chosen packaging material.",
    handles: ["Design review", "Print layout preparation", "Material checks"],
    icon: Upload,
    step: 1,
  },
  {
    title: "Approve the sample",
    short: "Review before production",
    long: "We generate a proof so you can verify colors, size, and branding before full-scale production.",
    handles: ["Proof generation", "Color matching", "Size validation"],
    icon: CheckCircle,
    step: 2,
  },
  {
    title: "Bulk production",
    short: "We manufacture at scale",
    long: "Once approved, your packaging is produced in bulk using food-safe materials.",
    handles: ["High-volume manufacturing", "Quality control"],
    icon: Factory,
    step: 3,
  },
  {
    title: "Delivery to your location",
    short: "We ship directly to you",
    long: "Finished packaging is securely packed and delivered to your business location.",
    handles: ["Logistics coordination", "On-time delivery"],
    icon: Truck,
    step: 4,
  },
];

const CustomPackagingSection = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(OPTIONS[0]);
  const [activeStep, setActiveStep] = useState(HOW_IT_WORKS[0]);

  return (
    <section id="custom" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <motion.div 
          className="absolute top-20 left-20 w-80 h-80 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-100 shadow-sm">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-accent-dark">Custom Solutions</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Custom Packaging
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Made Simple
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Transform your brand with bespoke packaging solutions designed specifically for your business needs.
          </p>
        </motion.div>

        {/* Package Type Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-2xl p-8 lg:p-12">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                What type of packaging do you need?
              </h3>
              <p className="text-gray-600">
                Select an option below to explore custom capabilities.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Selection buttons */}
              <div className="space-y-4">
                {OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.id}
                    onClick={() => setActive(opt)}
                    whileHover={{ x: 10 }}
                    className={`w-full text-left rounded-2xl border-2 p-6 transition-all duration-300 ${
                      active.id === opt.id
                        ? "border-primary bg-gradient-to-r from-primary/5 to-primary/10 shadow-lg"
                        : "border-gray-200 bg-white hover:border-primary/30 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${opt.color} flex items-center justify-center`}>
                        <opt.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{opt.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{opt.description}</p>
                      </div>
                      {active.id === opt.id && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Details panel */}
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 shadow-lg p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${active.color} flex items-center justify-center`}>
                    <active.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{active.title}</h3>
                    <p className="text-gray-600">{active.description}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Capabilities</h4>
                    <ul className="space-y-2">
                      {active.capabilities.map((cap) => (
                        <li key={cap} className="flex items-center gap-3 text-gray-700">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Commonly used by</h4>
                    <div className="flex flex-wrap gap-2">
                      {active.industries.map((ind) => (
                        <span
                          key={ind}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-3xl border border-gray-100 shadow-2xl p-8 lg:p-12">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h3>
              <p className="text-gray-600">
                A seamless process from concept to delivery.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Steps selection */}
              <div className="space-y-4">
                {HOW_IT_WORKS.map((step, index) => (
                  <motion.button
                    key={step.title}
                    onClick={() => setActiveStep(step)}
                    whileHover={{ x: 10 }}
                    className={`w-full text-left rounded-2xl border-2 p-6 transition-all duration-300 ${
                      activeStep.title === step.title
                        ? "border-accent bg-gradient-to-r from-accent/5 to-accent/10 shadow-lg"
                        : "border-gray-200 bg-white hover:border-accent/30 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-700">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{step.short}</p>
                      </div>
                      {activeStep.title === step.title && (
                        <div className="w-2 h-2 bg-accent rounded-full" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Step details */}
              <motion.div
                key={activeStep.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                    <activeStep.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{activeStep.title}</h3>
                    <p className="text-gray-600">{activeStep.short}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">{activeStep.long}</p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What we handle</h4>
                    <ul className="space-y-2">
                      {activeStep.handles.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-700">
                          <div className="w-2 h-2 bg-accent rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Main CTA */}
                  <div className="pt-8 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-gray-600 mb-6">
                        Ready to start your custom packaging journey?
                      </p>
                      <motion.button
                        onClick={() => navigate("/custom-packaging-quote")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        <Mail className="w-5 h-5" />
                        <span>Request a Custom Quote</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                      <p className="text-sm text-gray-500 mt-4">
                        No commitment required. Get a free quote in 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span className="text-gray-700 font-medium">No minimum order</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span className="text-gray-700 font-medium">Free design review</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span className="text-gray-700 font-medium">Fast turnaround</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomPackagingSection;