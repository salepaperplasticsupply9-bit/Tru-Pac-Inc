import { motion } from "framer-motion";


const CategoryCard = ({ name, description }) => {
  return (
<motion.div
  whileHover={{ y: -6 }}
  transition={{ type: "spring", stiffness: 200, damping: 15 }}
  className="card"
>
      <div className="card-image">Category Image</div>

      <h3 className="card-title">{name}</h3>
      <p className="card-text">{description}</p>

      <button className="text-primary font-medium hover:underline">
        View Products →
      </button>
    </motion.div>
  );
};

export default CategoryCard;
