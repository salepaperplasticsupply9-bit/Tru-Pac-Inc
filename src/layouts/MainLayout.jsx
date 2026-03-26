import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-paper overflow-hidden">

      {/* Global logo pattern (subtle) */}
      <div className="absolute inset-0 logo-pattern opacity-[0.02] pointer-events-none"></div>

      {/* Actual content */}
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>

    </div>
  );
};

export default MainLayout;
