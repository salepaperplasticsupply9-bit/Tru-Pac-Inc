import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import { useCart } from "../context/CartContext";

const steps = [
  "Business Info",
  "Cart Review",
  "Delivery",
  "Submit",
];

const RequestQuote = () => {
  const [step, setStep] = useState(0);
  const { cart } = useCart();

  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    location: "",
  });

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  return (
    <MainLayout>

      {/* Header */}
      <section className="section">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-extrabold text-primary mb-6">
            Request a Quote
          </h1>
          <p className="text-gray-600 text-lg">
            Review your bulk order and submit for pricing.
          </p>
        </div>
      </section>

      {/* Multi-step form */}
      <section className="section-tight">
        <div className="container max-w-3xl">

          {/* Step indicator */}
          <div className="flex gap-2 mb-10">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded ${
                  i <= step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="material-card p-8"
            >

              {/* STEP 1 */}
              {step === 0 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">
                    Business & Contact Details
                  </h2>

                  <input
                    className="input"
                    placeholder="Business Name"
                    onChange={(e) =>
                      update("businessName", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    placeholder="Contact Name"
                    onChange={(e) =>
                      update("contactName", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    placeholder="Email Address"
                    onChange={(e) =>
                      update("email", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    placeholder="Phone Number (optional)"
                    onChange={(e) =>
                      update("phone", e.target.value)
                    }
                  />
                </div>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">
                    Products in Your Cart
                  </h2>

                  {cart.length === 0 && (
                    <p className="text-gray-500">
                      No products added yet.
                    </p>
                  )}

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between border-b py-2"
                    >
                      <span>{item.name}</span>
                      <span>{item.quantity} units</span>
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 3 */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">
                    Delivery Location
                  </h2>

                  <input
                    className="input"
                    placeholder="City, State"
                    onChange={(e) =>
                      update("location", e.target.value)
                    }
                  />
                </div>
              )}

              {/* STEP 4 */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">
                    Review & Submit
                  </h2>

                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Business:</strong> {form.businessName}</p>
                    <p><strong>Contact:</strong> {form.contactName}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Location:</strong> {form.location}</p>
                    <p><strong>Items:</strong></p>
                    <ul className="list-disc ml-6">
                      {cart.map((item) => (
                        <li key={item.id}>
                          {item.name} – {item.quantity} units
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-10">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-sm underline"
                  >
                    Back
                  </button>
                )}

                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="btn-primary ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button className="btn-primary ml-auto">
                    Submit Quote Request
                  </button>
                )}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* What Happens Next */}
      <section className="section">
        <div className="container max-w-3xl text-center">
          <h3 className="text-3xl font-bold text-primary mb-4">
            What Happens Next
          </h3>

          <p className="text-gray-600">
            Our team will review your bulk order and contact you with
            pricing, availability, and next steps.
          </p>
        </div>
      </section>

    </MainLayout>
  );
};

export default RequestQuote;
