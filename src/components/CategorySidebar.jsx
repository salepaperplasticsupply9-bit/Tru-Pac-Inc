const categories = [
  "All",
  "Paper Bags",
  "Aluminum Foil & Containers",
  "Plastic Containers & Lids",
  "Cups & Lids",
  "Takeout Boxes",
];

const CategorySidebar = ({ active, setActive }) => {
  return (
    <aside className="border rounded-lg p-6 bg-white">
      <h3 className="font-semibold text-primary mb-4">
        Categories
      </h3>

      <ul className="space-y-3 text-sm">
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => setActive(cat)}
            className={`cursor-pointer ${
              active === cat
                ? "text-primary font-semibold"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
