const ProductCard = ({ category, onView }) => {
  if (!category) return null;

  return (
    <div 
    onClick={() => onView(category)}
    className="material-card text-center p-6 cursor-pointer hover:shadow-xl">
      <img
        src={category.image}
        alt={category.name}
        className="h-40 w-full object-cover rounded-xl mb-6"
      />

      <h3 className="font-semibold mb-3">
        {category.name}
      </h3>

      <button
        onClick={() => onView(category)}
        className="text-sm font-medium underline text-primary"
      >
        View More
      </button>
    </div>
  );
};

export default ProductCard;
