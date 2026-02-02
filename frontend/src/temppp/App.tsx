import { useState } from 'react';
import ChemicalLoader from './components/ChemicalLoader';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CompanySection from './components/CompanySection';
import ProductsSection from './components/ProductsSection';
import KeyMetricsSection from './components/KeyMetricsSection';
import Footer from './components/Footer';

// Placeholder for ChatWidget if not provided
function ChatWidget() {
  return null; // You can replace this with your actual ChatWidget component
}

function HomePage() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <ChemicalLoader onLoadComplete={handleLoadComplete} />}
      <div className={`min-h-screen bg-white transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <HeroSection />
        <CompanySection />
        <ProductsSection />
        <KeyMetricsSection />
        <ChatWidget />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
