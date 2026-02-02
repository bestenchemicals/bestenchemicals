import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  number: string;
  name: string;
  image: string;
}

const productImages: { [key: string]: string } = {
  "1": "https://images.pexels.com/photos/1188470/pexels-photo-1188470.jpeg?auto=compress&cs=tinysrgb&w=600",
  "2": "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=600",
  "3": "https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=600",
  "4": "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=600",
  "5": "https://images.pexels.com/photos/7615469/pexels-photo-7615469.jpeg?auto=compress&cs=tinysrgb&w=600",
};

export default function ProductsSection() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, tArray } = useTranslation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  const productItems = tArray("products.items");
  const serviceItems = tArray("services.items");

  const products: Product[] = productItems.map((item: any, index: number) => ({
    id: String(index + 1),
    number: item.number,
    name: item.name,
    image: productImages[String(index + 1)],
  }));

  const hoveredProductData = products.find((p) => p.id === hoveredProduct);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="min-h-screen bg-white py-12 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-16">
          <div
            className={`flex items-center gap-2 text-blue-800 mb-12 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="w-1 h-6 bg-blue-800"></div>
            <span className="text-sm font-semibold">{t("products.title")}</span>
          </div>

          <div className="space-y-0">
            {products.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.name.toLowerCase()}`}
              >
                <div
                  key={product.id}
                  className={`group border-b border-gray-200 py-8 cursor-pointer transition-all duration-500 hover:bg-gray-50 hover:pl-4 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                    <div className="flex items-center gap-4 md:gap-12">
                      <span className="text-blue-400 text-xs md:text-sm font-mono">
                        [{product.number}]
                      </span>
                      <h3 className="text-xl md:text-3xl font-light text-gray-800 group-hover:text-blue-800 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-blue-800 group-hover:translate-x-2 transition-all flex-shrink-0" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div
            className={`flex items-center gap-2 text-blue-800 mb-12 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="w-1 h-6 bg-blue-800"></div>
            <span className="text-sm font-semibold">{t("services.title")}</span>
          </div>

          <div className="space-y-0">
            {serviceItems.map((service: any, index: number) => (
              <div
                key={service.number}
                className={`group border-b border-gray-200 py-6 md:py-8 cursor-pointer transition-all duration-500 hover:bg-gray-50 hover:pl-4 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${(products.length + index) * 100}ms`,
                }}
              >
                <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                  <div className="flex items-center gap-4 md:gap-12">
                    <span className="text-blue-400 text-xs md:text-sm font-mono">
                      [{service.number}]
                    </span>
                    <h3 className="text-xl md:text-3xl font-light text-gray-800 group-hover:text-blue-800 transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-blue-800 group-hover:translate-x-2 transition-all flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {hoveredProductData && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-200"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y + 20}px`,
            transform: "translate(0, -50%)",
            animation: "imageFloat 0.3s ease-out",
          }}
        >
          <div className="w-64 h-48 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={hoveredProductData.image}
              alt={hoveredProductData.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes imageFloat {
          from {
            opacity: 0;
            transform: translate(0, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(0, -50%) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
