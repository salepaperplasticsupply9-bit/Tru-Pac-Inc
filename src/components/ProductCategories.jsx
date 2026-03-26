import { productCategories } from "../data/productCategories";
import CategoryCard from "./CategoryCard";
import { motion } from "framer-motion";

const ProductCategories = () => {
  return (
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="section-muted"
>
      <div className="container">
        
        <div className="text-center mb-14">
          <h2 className="section-title">Product Categories</h2>
          <p className="section-description">
            Explore our full range of restaurant packaging and food service supplies.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category) => (
            <CategoryCard
              key={category.id}
              image={category.image}
              name={category.name}
              description={category.description}
            />
          ))}
        </div>

      </div>
    </motion.section>
  );
};

export default ProductCategories;
