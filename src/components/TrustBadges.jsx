const badges = [
  "Bulk Pricing",
  "Fast Supply",
  "Custom Branding",
  "Reliable Quality",
];

const TrustBadges = () => {
  return (
    <section className="bg-muted py-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {badges.map((item) => (
          <div key={item} className="font-medium text-gray-700">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
