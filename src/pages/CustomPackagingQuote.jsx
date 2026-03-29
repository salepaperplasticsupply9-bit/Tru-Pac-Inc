import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import { 
  Building2, 
  Package, 
  MapPin, 
  FileText,
  Upload,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

const steps = [
  { 
    number: 1, 
    title: "Business Info", 
    icon: Building2 
  },
  { 
    number: 2, 
    title: "Packaging Details", 
    icon: Package 
  },
  { 
    number: 3, 
    title: "Volume & Location", 
    icon: MapPin 
  },
  { 
    number: 4, 
    title: "Review & Submit", 
    icon: FileText 
  },
];

const PRODUCTS = [
  { id: "paper-bags", name: "Paper Bags", icon: "🛍️" },
  { id: "cups-lids", name: "Cups & Lids", icon: "☕" },
  { id: "takeout-boxes", name: "Takeout Boxes", icon: "🥡" },
  { id: "plastic-containers", name: "Plastic Containers", icon: "🥤" },
  { id: "aluminium-foil", name: "Aluminium Foil", icon: "🥘" },
  { id: "other", name: "Other", icon: "📦" },
];

const PRINT_TYPES = [
  { id: "logo", name: "Logo only" },
  { id: "text", name: "Text only" },
  { id: "full", name: "Full design (logo + text)" },
  { id: "unsure", name: "Not sure yet" },
];

const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming"
];

const CustomPackagingQuote = () => {
  const [step, setStep] = useState(0);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    products: [],
    printType: "",
    quantity: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    message: "",
    logo: null,
  });

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  const toggleProduct = (product) => {
    if (!allowMultiple) {
      update("products", [product]);
    } else {
      update(
        "products",
        form.products.includes(product)
          ? form.products.filter((p) => p !== product)
          : [...form.products, product]
      );
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      update("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      data.append(key, value)
    );

    await fetch("${import.meta.env.VITE_API_URL}/api/custom-quote", {
      method: "POST",
      body: data,
    });

    setSubmitted(true);
  };

  const stepContent = [
    // Step 1: Business Info
    <div key="step1" className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Business & Contact Information</h2>
          <p className="text-gray-600">Tell us about your business</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
          <input 
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Your business name"
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
          <input 
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Your name"
            value={form.contactName}
            onChange={(e) => update("contactName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input 
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="(123) 456-7890"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input 
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>
    </div>,

    // Step 2: Packaging Details
    <div key="step2" className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Packaging Details</h2>
          <p className="text-gray-600">What do you want to customize?</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-900">Select Products</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={allowMultiple}
                onChange={() => {
                  setAllowMultiple(!allowMultiple);
                  update("products", []);
                }}
              />
              <div className={`w-10 h-6 rounded-full transition ${allowMultiple ? 'bg-primary' : 'bg-gray-300'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${allowMultiple ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
            </div>
            <span className="text-sm text-gray-700">Multiple products</span>
          </label>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleProduct(item.name)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                form.products.includes(item.name)
                  ? "border-primary bg-gradient-to-r from-primary/5 to-primary/10 shadow-md"
                  : "border-gray-200 bg-white hover:border-primary/30 hover:shadow-sm"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-gray-900">{item.name}</span>
              {form.products.includes(item.name) && (
                <CheckCircle className="w-5 h-5 text-primary ml-auto" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Printing Requirements</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {PRINT_TYPES.map((type) => (
            <motion.button
              key={type.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => update("printType", type.name)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                form.printType === type.name
                  ? "border-accent bg-gradient-to-r from-accent/5 to-accent/10 shadow-md"
                  : "border-gray-200 bg-white hover:border-accent/30 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{type.name}</span>
                {form.printType === type.name && (
                  <CheckCircle className="w-5 h-5 text-accent" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {(form.printType === "Logo only" || form.printType === "Full design (logo + text)") && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Upload Your Logo</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary/50 transition-colors duration-200">
            <input
              type="file"
              id="logo-upload"
              className="hidden"
              accept="image/*"
              onChange={handleLogoUpload}
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Click to upload your logo</p>
              <p className="text-sm text-gray-500">PNG, JPG, SVG up to 10MB</p>
            </label>
            {logoPreview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6"
              >
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <img src={logoPreview} alt="Logo preview" className="max-h-32 mx-auto rounded-lg" />
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>,

    // Step 3: Volume & Location
    <div key="step3" className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Volume & Location</h2>
          <p className="text-gray-600">Tell us about your needs</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Quantity *</label>
        <div className="relative">
          <input
            type="number"
            min="100"
            step="100"
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 pl-12"
            placeholder="1000"
            value={form.quantity}
            onChange={(e) => update("quantity", e.target.value)}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            📦
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
            units
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Minimum order: 100 units</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Delivery Location</h3>
        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Street Address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <input
              className="px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="City"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
            <select
              className="px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
            >
              <option value="">Select State</option>
              {STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <input
              className="px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="ZIP Code"
              value={form.zip}
              onChange={(e) => update("zip", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>,

    // Step 4: Review & Submit
    <div key="step4" className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
          <p className="text-gray-600">Review your information and submit</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Additional Requirements</h3>
          <textarea
            className="w-full h-40 px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Any special requirements, deadlines, or notes..."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Business:</span>
              <span className="font-medium">{form.businessName || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Contact:</span>
              <span className="font-medium">{form.contactName || "Not provided"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Products:</span>
              <span className="font-medium">{form.products.length > 0 ? form.products.join(", ") : "Not selected"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-medium">{form.quantity || "0"} units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery to:</span>
              <span className="font-medium">{form.city && form.state ? `${form.city}, ${form.state}` : "Not specified"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <CheckCircle className="w-5 h-5 text-accent" />
          <span>You'll receive a quote within 24 hours</span>
        </div>
      </div>
    </div>
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-100 shadow-sm"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-accent-dark">Custom Quote</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get Your Custom
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Packaging Quote
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Fill out this form and we'll prepare a personalized quote for your custom packaging needs.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index <= step 
                    ? "bg-gradient-to-r from-primary to-primary-dark text-white" 
                    : "bg-gray-100 text-gray-400"
                }`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Step {s.number}</p>
                  <p className={`font-medium ${
                    index <= step ? "text-gray-900" : "text-gray-400"
                  }`}>{s.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-12 h-0.5 bg-gray-200 ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-2xl p-12 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Thank you for your interest in custom packaging. We'll review your requirements and get back to you within 24 hours with a detailed quote.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "/"}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                Back to Homepage
              </motion.button>
            </motion.div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-2xl p-8 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {stepContent[step]}
                </motion.div>
              </AnimatePresence>

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
                    Submit Quote Request
                    <CheckCircle className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Assurance Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose TRU PAC?</h3>
            <p className="text-gray-600">We make custom packaging simple and reliable</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⏱️</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-3">24-Hour Quote</h4>
              <p className="text-gray-600">Get your personalized quote within one business day</p>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary/10 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-3">Free Design Review</h4>
              <p className="text-gray-600">Our experts review your design at no extra cost</p>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent/10 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📦</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-3">No Minimum Order</h4>
              <p className="text-gray-600">Custom packaging available for businesses of all sizes</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CustomPackagingQuote;