// components/WhyTruPac.jsx
import { motion } from "framer-motion";
import { 
  Truck, 
  Shield, 
  Package, 
  TrendingUp,
  Clock,
  Users,
  Award,
  CheckCircle
} from "lucide-react";

const reasons = [
  {
    title: "Built for Bulk",
    text: "Packaging designed to perform under high-volume food service demands.",
    icon: Package,
    color: "from-primary to-primary-light",
  },
  {
    title: "Material First",
    text: "Paper that holds weight. Plastic that seals. Foil that retains heat.",
    icon: Shield,
    color: "from-secondary to-secondary-light",
  },
  {
    title: "Price-Competitive",
    text: "Wholesale pricing without sacrificing reliability.",
    icon: TrendingUp,
    color: "from-accent to-accent-light",
  },
  {
    title: "Long-Term Supply",
    text: "We focus on consistent sourcing, not one-time orders.",
    icon: Clock,
    color: "from-primary-dark to-primary",
  },
  {
    title: "Reliable Delivery",
    text: "On-time logistics for your continuous operations.",
    icon: Truck,
    color: "from-secondary-dark to-secondary",
  },
  {
    title: "Dedicated Support",
    text: "Direct line to our team for quick issue resolution.",
    icon: Users,
    color: "from-accent-dark to-accent",
  },
];

const WhyTruPac = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section heading with gradient */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2 mb-6">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary-dark">Why Choose Us</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">TRU PAC</span> Stands Out
            </h2>
            
            <p className="text-xl text-gray-600">
              We're not just suppliers—we're partners in your operational success.
            </p>
          </motion.div>
        </div>

        {/* Centered reason cards with justified center */}
        <div className="flex justify-center">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Icon with gradient background */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <reason.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {reason.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {reason.text}
                    </p>

                    {/* Bottom line */}
                    {/* <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Learn more</span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Centered trust indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-gray-200"
        >
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <Award className="w-12 h-12 text-primary mb-4" />
            <div>
              <p className="text-lg font-semibold text-gray-900">
                Trusted by leading food service businesses across the region
              </p>
              <p className="text-gray-600 mt-2">
                Join hundreds of satisfied customers who rely on our consistent quality and service.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTruPac;