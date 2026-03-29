// components/StatsSection.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const stats = [
  { id: 1, value: 200, suffix: "+", label: "Loyal Customers", duration: 2000 },
  { id: 2, value: 3400, suffix: "+", label: "Orders Fulfilled", duration: 2500 },
  { id: 3, value: 120, suffix: "K+", label: "Packaging Units Supplied", duration: 3000 },
];

const Counter = ({ end, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && typeof end === 'number' && end > 0) {
      // Ensure duration is valid
      const validDuration = typeof duration === 'number' && duration > 0 ? duration : 2000;
      
      const startTime = Date.now();
      const endTime = startTime + validDuration;
      
      const updateCounter = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / validDuration, 1);
        const currentCount = Math.floor(end * progress);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setCount(end); // Ensure we end at the exact value
        }
      };
      
      requestAnimationFrame(updateCounter);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section id="stats" className="relative py-24 overflow-hidden">
      {/* Background gradient with pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(42,76,125,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.1),transparent_50%)]" />
      
      <div className="relative container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by the Industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our numbers speak for themselves. Join hundreds of businesses that rely on TRU PAC for their packaging needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="mb-4">
                  <Counter 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    duration={stat.duration} 
                  />
                </div>
                <p className="text-gray-600 text-lg font-medium">{stat.label}</p>
                
                {/* Animated underline */}
                <div className="mt-6 h-1 w-20 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-secondary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};

export default StatsSection;