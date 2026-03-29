import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Truck, 
  Users, 
  Coffee,
  Store,
  Target,
  Shield,
  Clock,
  TrendingUp,
  ArrowRight
} from "lucide-react";

const industries = [
  {
    name: "Restaurants",
    description: "Packaging built for daily service, takeout, and high-volume operations.",
    needs: ["Consistency", "Heat retention", "Speed"],
    icon: Building2,
    color: "from-primary to-primary-light",
    stats: "200+ restaurants served"
  },
  {
    name: "Food Trucks",
    description: "Compact, durable packaging for mobile kitchens and fast-paced service.",
    needs: ["Portability", "Stackability", "Durability"],
    icon: Truck,
    color: "from-secondary to-secondary-light",
    stats: "Mobile-ready solutions"
  },
  {
    name: "Catering",
    description: "Bulk-ready solutions for transport, events, and temperature control.",
    needs: ["Volume", "Transport safety", "Presentation"],
    icon: Users,
    color: "from-accent to-accent-light",
    stats: "Large event capabilities"
  },
  {
    name: "Franchises",
    description: "Standardized packaging supply across multiple locations.",
    needs: ["Consistency", "Scalability", "Reliable supply"],
    icon: Coffee,
    color: "from-primary-dark to-primary",
    stats: "Multi-location support"
  },
  {
    name: "Convenience Stores",
    description: "Grab-and-go packaging that balances cost and durability.",
    needs: ["Speed", "Cost control", "Shelf readiness"],
    icon: Store,
    color: "from-secondary-dark to-secondary",
    stats: "High-turnover ready"
  },
];

const WhoWeSupply = () => {
  const [active, setActive] = useState(industries[0]);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/30 to-white">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-100 shadow-sm">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-accent-dark">Industry Solutions</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Packaging Solutions for
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Every Food Business
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Different operations have different demands. Our packaging is engineered to perform where it matters most for your specific business type.
          </p>
        </motion.div>

        {/* Interactive Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* LEFT — Industry Selector */}
          <div className="space-y-4">
            {industries.map((industry, index) => (
              <motion.button
                key={industry.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActive(industry)}
                onClick={() => setActive(industry)}
                whileHover={{ x: 10 }}
                className={`w-full text-left rounded-2xl border-2 p-6 transition-all duration-300 ${
                  active.name === industry.name
                    ? "border-primary bg-gradient-to-r from-primary/5 to-primary/10 shadow-xl"
                    : "border-gray-200 bg-white hover:border-primary/30 hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center flex-shrink-0`}>
                    <industry.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">
                        {industry.name}
                      </h3>
                      {active.name === industry.name && (
                        <ArrowRight className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">
                      {industry.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{industry.stats}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* RIGHT — Detail Panel */}
          <motion.div
            key={active.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-2xl p-8 lg:p-10 overflow-hidden">
              {/* Gradient top bar */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${active.color}`} />
              
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${active.color} flex items-center justify-center`}>
                  <active.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {active.name}
                  </h3>
                  <p className="text-gray-600">{active.stats}</p>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-10">
                {active.description}
              </p>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-semibold text-gray-900">
                    Key Operational Needs
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {active.needs.map((need, index) => (
                    <motion.div
                      key={need}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-gradient-to-br ${index === 0 ? 'from-primary/5 to-primary/10' : index === 1 ? 'from-secondary/5 to-secondary/10' : 'from-accent/5 to-accent/10'} rounded-2xl p-6 text-center border border-gray-100`}
                    >
                      <div className={`w-12 h-12 rounded-xl ${index === 0 ? 'bg-primary/10' : index === 1 ? 'bg-secondary/10' : 'bg-accent/10'} flex items-center justify-center mx-auto mb-4`}>
                        {index === 0 && <Shield className="w-6 h-6 text-primary" />}
                        {index === 1 && <TrendingUp className="w-6 h-6 text-secondary" />}
                        {index === 2 && <Clock className="w-6 h-6 text-accent" />}
                      </div>
                      <h5 className="font-semibold text-gray-900">{need}</h5>
                    </motion.div>
                  ))}
                </div>

                {/* Feature list */}
                <div className="mt-10 pt-10 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Why TRU PAC Works for {active.name}</h4>
                  <ul className="space-y-3">
                    {[
                      "Customized to your volume requirements",
                      "Reliable supply chain management",
                      "Competitive bulk pricing",
                      "Fast turnaround times",
                      "Dedicated account support"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-700">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Ready to optimize your packaging?</p>
                      <p className="font-medium text-gray-900">Get a personalized solution</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.href = "/custom-packaging-quote"}
                      className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Get Quote
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl" />
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl border border-gray-100 p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-gray-700">Businesses Supported</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">98%</div>
                <p className="text-gray-700">Customer Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">24h</div>
                <p className="text-gray-700">Average Response Time</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeSupply;