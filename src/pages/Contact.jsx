import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../layouts/MainLayout";

const steps = ["Your Details", "Message", "Review & Send"];

const Contact = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  return (
    <MainLayout>

      {/* Intro */}
      <section className="section">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-extrabold text-primary mb-6">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg">
            Have a question or need more information?  
            Our team is here to help.
          </p>
        </div>
      </section>

      {/* Multi-step Contact Form */}
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
                    Your Contact Details
                  </h2>

                  <input
                    className="input"
                    placeholder="Full Name"
                    onChange={(e) => update("name", e.target.value)}
                  />
                  <input
                    className="input"
                    placeholder="Email Address"
                    onChange={(e) => update("email", e.target.value)}
                  />
                  <input
                    className="input"
                    placeholder="Phone Number (optional)"
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </div>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">
                    How can we help?
                  </h2>

                  <textarea
                    className="input h-40"
                    placeholder="Tell us what you’re looking for or how we can assist you."
                    onChange={(e) => update("message", e.target.value)}
                  />
                </div>
              )}

              {/* STEP 3 */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">
                    Review & Send
                  </h2>

                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    {form.phone && (
                      <p><strong>Phone:</strong> {form.phone}</p>
                    )}
                    <p><strong>Message:</strong> {form.message}</p>
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
                    Send Message
                  </button>
                )}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Business Info
      <section className="section">
        <div className="container max-w-3xl text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Business Contact
          </h3>

          <p className="text-gray-600">
            Email: <span className="font-medium">sales@trupacinc.com</span>
          </p>
          <p className="text-gray-600 mt-2">
            Phone: <span className="font-medium">(XXX) XXX-XXXX</span>
          </p>
        </div>
      </section> */}

    </MainLayout>
  );
};

export default Contact;
