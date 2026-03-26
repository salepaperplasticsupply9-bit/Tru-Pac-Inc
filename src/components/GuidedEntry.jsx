// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const GuidedEntry = ({ onComplete }) => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(0);
//   const [path, setPath] = useState(null);

//   const complete = (route) => {
//     sessionStorage.setItem("guidedEntrySeen", "true");
//     onComplete();
//     navigate(route);
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-[9999] bg-paper flex items-center justify-center px-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           className="max-w-xl w-full text-center"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//         >

//           {/* STEP 1 */}
//           {step === 0 && (
//             <>
//               <h1 className="text-3xl font-bold mb-6">
//                 What brings you here today?
//               </h1>

//               <div className="grid gap-4">
//                 <button
//                   onClick={() => {
//                     setPath("business");
//                     setStep(1);
//                   }}
//                   className="material-card p-6 text-left"
//                 >
//                   <h3 className="font-semibold mb-1">
//                     I’m sourcing packaging for a business
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Restaurants, food trucks, catering, franchises
//                   </p>
//                 </button>

//                 <button
//                   onClick={() => {
//                     setPath("explore");
//                     setStep(1);
//                   }}
//                   className="material-card p-6 text-left"
//                 >
//                   <h3 className="font-semibold mb-1">
//                     I’m just exploring
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Learn more about what TRU PAC offers
//                   </p>
//                 </button>
//               </div>
//             </>
//           )}

//           {/* STEP 2 — BUSINESS */}
//           {step === 1 && path === "business" && (
//             <>
//               <h1 className="text-3xl font-bold mb-6">
//                 How would you like to proceed?
//               </h1>

//               <div className="grid gap-4">
//                 <button
//                   onClick={() => complete("/products")}
//                   className="material-card p-6 text-left"
//                 >
//                   <h3 className="font-semibold">
//                     Browse available products
//                   </h3>
//                 </button>

//                 <button
//                   onClick={() => complete("/request-quote")}
//                   className="material-card p-6 text-left"
//                 >
//                   <h3 className="font-semibold">
//                     Request pricing / a quote
//                   </h3>
//                 </button>
//               </div>
//             </>
//           )}

//           {/* STEP 2 — EXPLORE */}
//           {step === 1 && path === "explore" && (
//             <>
//               <h1 className="text-3xl font-bold mb-6">
//                 How would you like to explore?
//               </h1>

//               <div className="grid gap-4">
//                 <button
//                   onClick={() => complete("/")}
//                   className="material-card p-6 text-left"
//                 >
//                   <h3 className="font-semibold">
//                     Learn about TRU PAC
//                   </h3>
//                 </button>

//                 <button
//                   onClick={() => complete("/products")}
//                   className="material-card p-6 text-left"
//                 >
//                   <h3 className="font-semibold">
//                     Browse products
//                   </h3>
//                 </button>
//               </div>
//             </>
//           )}

//           {/* Skip */}
//           <button
//             onClick={() => complete("/")}
//             className="text-sm text-gray-500 underline mt-10"
//           >
//             Skip and explore site
//           </button>

//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default GuidedEntry;
