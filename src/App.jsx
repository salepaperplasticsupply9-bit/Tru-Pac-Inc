import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import CustomPackaging from "./pages/CustomPackaging";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import RequestQuote from "./pages/RequestQuote";
import About from "./pages/About";
import CustomPackagingQuote from "./pages/CustomPackagingQuote";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/custom-packaging" element={<CustomPackaging />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-quote" element={<RequestQuote />} />
        <Route path="/about" element={<About />} />
        <Route
  path="/custom-packaging-quote"
  element={<CustomPackagingQuote />}
/>
        <Route path="/cart" element={<Cart />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
