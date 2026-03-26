import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EntryPrompt = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      className="mt-16"
    >
      <p className="text-sm uppercase tracking-wide text-gray-500 mb-6 text-center">
        What are you looking for?
      </p>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Browse Products */}
        <button
          onClick={() => navigate("/products")}
          className="material-card p-8 text-left hover:shadow-xl transition group"
        >
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
            Browse Products
          </h3>
          <p className="text-gray-600 text-sm">
            Explore our full range of food packaging and restaurant supplies.
          </p>
        </button>

        {/* Request Quote */}
        <button
          onClick={() => navigate("/request-quote")}
          className="material-card p-8 text-left hover:shadow-xl transition group"
        >
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
            Request a Quote
          </h3>
          <p className="text-gray-600 text-sm">
            Tell us what you need and get competitive bulk pricing.
          </p>
        </button>
      </div>
    </motion.div>
  );
};

export default EntryPrompt;
