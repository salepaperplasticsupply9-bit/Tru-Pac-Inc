import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  User, 
  Phone, 
  MessageSquare,
  Send,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  MapPin,
  Clock
} from "lucide-react";

const steps = [
  { 
    number: 1, 
    title: "Your Details", 
    icon: User,
    description: "Tell us who you are"
  },
  { 
    number: 2, 
    title: "Message", 
    icon: MessageSquare,
    description: "How can we help?"
  },
  { 
    number: 3, 
    title: "Review & Send", 
    icon: Send,
    description: "Final check before sending"
  },
];

const ContactSection = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    botcheck: "",
  });

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = async () => {
    if (form.botcheck) return;

    // Simulate API call
    await fetch("http://localhost:5001/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <motion.div 
          className="absolute top-20 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-[700px] h-[700px] bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -30, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-2xl p-12 lg:p-16 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Message Sent Successfully!
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto mb-10">
              Thank you for contacting TRU PAC. We'll review your message and get back to you within 24 hours.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  message: "",
                  botcheck: "",
                });
              }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Send Another Message
              <MessageSquare className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-primary via-primary-dark to-primary-dark/90 rounded-3xl p-10 text-white h-full">
                <div className="mb-10">
                  <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-sm font-semibold">Contact Us</span>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Let's Talk
                    <span className="block text-white/90">Packaging</span>
                  </h2>
                  
                  <p className="text-white/80 leading-relaxed">
                    Have questions about our products or need custom solutions? We're here to help you find the perfect packaging for your business.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-white/70">trupacinc139@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-white/70">+1 (347) 567-0578
                      +1 (929) 284-5669</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Response Time</p>
                      <p className="text-white/70">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-10 h-px bg-white/20" />

                {/* Quick Response Note */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <p className="font-semibold">Quick Response Guaranteed</p>
                  </div>
                  <p className="text-sm text-white/70">
                    Our packaging experts review every inquiry and respond with personalized solutions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-2xl p-8 lg:p-12 h-full">
                {/* Steps Indicator */}
                <div className="flex items-center justify-between mb-10">
                  {steps.map((s, index) => (
                    <div key={s.number} className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index <= step 
                          ? "bg-gradient-to-r from-primary to-primary-dark text-white" 
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        {index <= step ? (
                          <s.icon className="w-6 h-6" />
                        ) : (
                          <span className="text-lg font-semibold">{s.number}</span>
                        )}
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-sm text-gray-500">Step {s.number}</p>
                        <p className={`font-medium ${
                          index <= step ? "text-gray-900" : "text-gray-400"
                        }`}>{s.title}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block w-12 h-0.5 bg-gray-200 ml-4" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Bot check (hidden) */}
                <input
                  type="text"
                  className="hidden"
                  value={form.botcheck}
                  onChange={(e) => update("botcheck", e.target.value)}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    {/* Step 1: Contact Details */}
                    {step === 0 && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/20 flex items-center justify-center">
                            <User className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">Your Contact Details</h3>
                            <p className="text-gray-600">We'll use this information to get back to you</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                            <input
                              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                              placeholder="John Smith"
                              value={form.name}
                              onChange={(e) => update("name", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                            <input
                              type="email"
                              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                              placeholder="john@example.com"
                              value={form.email}
                              onChange={(e) => update("email", e.target.value)}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                            <input
                              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                              placeholder="(123) 456-7890"
                              value={form.phone}
                              onChange={(e) => update("phone", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Message */}
                    {step === 1 && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-secondary/10 to-secondary/20 flex items-center justify-center">
                            <MessageSquare className="w-8 h-8 text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">How Can We Help?</h3>
                            <p className="text-gray-600">Tell us about your packaging needs</p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                          <textarea
                            className="w-full h-48 px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                            placeholder="Describe what you're looking for, any specific requirements, or questions you have..."
                            value={form.message}
                            onChange={(e) => update("message", e.target.value)}
                          />
                          <div className="flex items-center gap-3 mt-4 text-sm text-gray-500">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span>Be as detailed as possible for a better response</span>
                          </div>
                        </div>

                        {/* Common Questions */}
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Common inquiries:</h4>
                          <div className="flex flex-wrap gap-2">
                            {["Bulk pricing", "Custom design", "Material options", "Delivery time", "Sample request"].map((topic) => (
                              <span
                                key={topic}
                                className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Review & Send */}
                    {step === 2 && (
                      <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/20 flex items-center justify-center">
                            <Send className="w-8 h-8 text-accent" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">Review & Send</h3>
                            <p className="text-gray-600">Double-check your information before sending</p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8">
                          <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Name</p>
                                <p className="font-medium text-gray-900">{form.name || "Not provided"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Email</p>
                                <p className="font-medium text-gray-900">{form.email || "Not provided"}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Phone</p>
                                <p className="font-medium text-gray-900">{form.phone || "Not provided"}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Message</p>
                              <div className="bg-white rounded-xl border border-gray-200 p-4">
                                <p className="text-gray-700 whitespace-pre-wrap">{form.message || "No message provided"}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Confirmation Check */}
                        <div className="flex items-start gap-3 bg-gradient-to-r from-accent/5 to-accent/10 rounded-2xl border border-accent/20 p-6">
                          <CheckCircle className="w-6 h-6 text-accent mt-1" />
                          <div>
                            <p className="font-medium text-gray-900 mb-2">Ready to send?</p>
                            <p className="text-gray-600 text-sm">
                              Once submitted, our team will review your message and get back to you within 24 hours.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                      {step > 0 ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setStep(step - 1)}
                          className="flex items-center gap-3 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:border-primary/50 hover:text-primary transition-all duration-300"
                        >
                          <ArrowLeft className="w-5 h-5" />
                          Back
                        </motion.button>
                      ) : (
                        <div />
                      )}

                      {step < steps.length - 1 ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setStep(step + 1)}
                          className="flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          Continue
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSubmit}
                          className="flex items-center gap-3 bg-gradient-to-r from-accent to-accent-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                          Send Message
                          <Send className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;