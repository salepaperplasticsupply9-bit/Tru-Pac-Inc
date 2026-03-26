import { motion, AnimatePresence } from "framer-motion";

const InfoModal = ({ isOpen, onClose, title, description }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-paper max-w-lg w-full rounded-2xl p-8 relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-primary mb-4">
              {title}
            </h3>

            <p className="text-gray-700 leading-relaxed">
              {description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
