import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import CompanySection from "./components/CompanySection";
import ProductsSection from "./components/ProductsSection";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProductsListPage from "./pages/ProductsListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import ChemicalLoader from "./components/ChemicalLoader";
import { useEffect, useState } from "react";

function HomePage() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.hash]);

  return (
    <>
      {loading && <ChemicalLoader onLoadComplete={handleLoadComplete} />}
      <div
        className={`min-h-screen bg-white transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navigation />
        <HeroSection />
        <div id="company">
          <CompanySection />
        </div>
        <ProductsSection />
        {/* <ChatWidget /> */}
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
