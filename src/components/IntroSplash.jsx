import { motion } from "framer-motion";
import logo from "../assets/logo/tru-pac-logo-pattern.png";

const IntroSplash = ({ onFinish }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-paper flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={logo}
        alt="TRU PAC"
        className="w-56"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onAnimationComplete={() => {
          setTimeout(onFinish, 1400); // total ~2s
        }}
      />
    </motion.div>
  );
};

export default IntroSplash;
