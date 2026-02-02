import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useTranslation } from "../hooks/useTranslation";

export default function ProductsListPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t, tArray } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const products = tArray("productsListPage.products");

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=1920)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div
          className="relative z-10 flex-1 flex flex-col justify-between px-4 md:px-6 max-w-7xl mx-auto w-full"
          style={{ animation: "fadeInUp 1s ease-out" }}
        >
          <div className="flex flex-col justify-center flex-1">
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
              {t("productsListPage.hero.title")}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              {t("productsListPage.hero.description")}
            </p>
          </div>

          <div className="py-8 md:py-12">
            <button
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center gap-2 hover:shadow-xl"
              onClick={() => {
                const element = document.getElementById("products-list");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("productsListPage.hero.exploreButton")}
              <span>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Products List Section */}
      <section
        id="products-list"
        ref={sectionRef}
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div
            className={`flex items-center gap-2 text-blue-800 mb-12 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="w-1 h-6 bg-blue-800"></div>
            <span className="text-sm font-semibold">
              {t("productsListPage.sectionLabel")}
            </span>
          </div>

          <div className="space-y-0">
            {products.map((product: any, index: number) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`group border-b border-gray-200 py-6 md:py-8 cursor-pointer transition-all duration-500 hover:bg-gray-50 hover:pl-4 block ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 md:gap-12">
                    <span className="text-blue-400 text-xs md:text-sm font-mono">
                      [{product.number}]
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light text-gray-800 group-hover:text-blue-800 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-800 group-hover:translate-x-2 transition-all flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
