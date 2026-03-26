import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const OPTIONS = [
  {
    id: "bags",
    title: "Bags & Takeout Packaging",
    description: "Paper bags, takeout boxes, and food containers",
    capabilities: [
      "Custom logo printing",
      "Food-safe inks",
      "Grease-resistant materials",
      "Bulk production pricing",
    ],
    industries: ["Restaurants", "Food Trucks", "Catering"],
  },
  {
    id: "cups",
    title: "Cups & Beverage Packaging",
    description: "Hot & cold cups with custom branding",
    capabilities: [
      "Single & double wall cups",
      "High-quality logo prints",
      "Durable lids",
      "Large volume manufacturing",
    ],
    industries: ["Coffee Shops", "QSR", "Convenience Stores"],
  },
  {
    id: "full",
    title: "Full Brand Packaging",
    description: "Complete packaging system for your business",
    capabilities: [
      "Multiple product types",
      "Consistent branding",
      "Scalable supply",
      "Dedicated account handling",
    ],
    industries: ["Franchises", "Restaurant Groups", "Distributors"],
  },
  {
    id: "unsure",
    title: "Not Sure Yet?",
    description: "We help you choose the right solution",
    capabilities: [
      "Consultation-based guidance",
      "Material recommendations",
      "Cost optimization",
      "Production planning",
    ],
    industries: ["New Businesses", "Growing Brands"],
  },
];

const HOW_IT_WORKS = [
  {
    title: "Share your logo or idea",
    short: "Send us your logo or concept",
    long:
      "You provide your logo, design, or concept. Our team reviews it and prepares a print-ready layout suited for your chosen packaging material.",
    handles: ["Design review", "Print layout preparation", "Material checks"],
  },
  {
    title: "Approve the sample",
    short: "Review before production",
    long:
      "We generate a proof so you can verify colors, size, and branding before full-scale production.",
    handles: ["Proof generation", "Color matching", "Size validation"],
  },
  {
    title: "Bulk production",
    short: "We manufacture at scale",
    long:
      "Once approved, your packaging is produced in bulk using food-safe materials.",
    handles: ["High-volume manufacturing", "Quality control"],
  },
  {
    title: "Delivery to your location",
    short: "We ship directly to you",
    long:
      "Finished packaging is securely packed and delivered to your business location.",
    handles: ["Logistics coordination", "On-time delivery"],
  },
];

const CustomPackaging = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(OPTIONS[0]);
  const [activeStep, setActiveStep] = useState(HOW_IT_WORKS[0]);

  return (
    <MainLayout>

      {/* Hero */}
      <section className="section pb-4">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-primary mb-6">
            Custom Printed Packaging
          </h1>
          <p className="text-gray-600 text-lg">
            We help food businesses create packaging that looks professional,
            performs reliably, and scales with their growth.
          </p>
        </div>
      </section>

      {/* Guided Selector */}
      <section className="py-12">
        <div className="container max-w-5xl mx-auto">
          <div className="section-paper rounded-3xl p-10">

            <h2 className="section-title text-center mb-12">
              What are you looking to customize?
            </h2>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-4">
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActive(opt)}
                    className={`w-full text-left material-card px-6 py-5 ${
                      active.id === opt.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold">{opt.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {opt.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="material-card p-8">
                <h3 className="text-2xl font-bold mb-4">{active.title}</h3>

                <ul className="space-y-3 mb-6">
                  {active.capabilities.map((cap) => (
                    <li key={cap} className="flex gap-2">
                      <span className="text-primary">•</span>
                      {cap}
                    </li>
                  ))}
                </ul>

                <p className="text-sm font-semibold mb-3">
                  Commonly used by:
                </p>

                <div className="flex flex-wrap gap-3">
                  {active.industries.map((ind) => (
                    <span
                      key={ind}
                      className="px-4 py-2 rounded-full text-sm bg-white border"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container max-w-5xl mx-auto">
          <div className="section-paper rounded-3xl p-10">

            <h2 className="section-title text-center mb-12">
              What happens after you choose a solution?
            </h2>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-4">
                {HOW_IT_WORKS.map((step, index) => (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(step)}
                    className={`w-full text-left material-card px-6 py-5 ${
                      activeStep.title === step.title
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {step.short}
                    </p>
                  </button>
                ))}
              </div>

              <div className="material-card p-8">
                <h3 className="text-2xl font-bold mb-4">
                  {activeStep.title}
                </h3>

                <p className="text-gray-700 mb-6">
                  {activeStep.long}
                </p>

                <ul className="space-y-2">
                  {activeStep.handles.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container max-w-4xl mx-auto">
          <div className="section-paper rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Ready to Create Custom Packaging?
            </h2>
            <p className="text-gray-600 mb-8">
              Tell us what you need and we’ll prepare a personalized quote
              for your business.
            </p>

            <button
              onClick={() => navigate("/custom-packaging-quote")}
              className="btn-primary"
            >
              Request a Custom Quote
            </button>
          </div>
        </div>
      </section>

    </MainLayout>
  );
};

export default CustomPackaging;
