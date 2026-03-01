import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  slug: string;
  number: string;
  name: string;
  image: string;
}

interface Service {
  number: string;
  name: string;
  image: string;
}

// Slugs and hero images taken directly from ProductDetailPage.tsx's productImages record.
const productData: { slug: string; heroImage: string }[] = [
  {
    slug: "preservatives",
    heroImage:
      "https://images.pexels.com/photos/8325710/pexels-photo-8325710.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    slug: "defoamers",
    heroImage:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slug: "rheology",
    heroImage:
      "https://images.pexels.com/photos/7723534/pexels-photo-7723534.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    slug: "wetting-agents",
    heroImage:
      "https://images.pexels.com/photos/3735706/pexels-photo-3735706.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    slug: "additives",
    heroImage:
      "https://images.unsplash.com/photo-1598207548924-fcab47e9b272?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Hardcoded services with individual hover images
const servicesData: Service[] = [
  {
    number: "01",
    name: "Microbiological Testing & Certification",
    // R&D / lab photo
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "02",
    name: "Custom Manufacturing, Plant Hygiene Audit",
    // Industrial plant / factory photo
    image:
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ProductsSection() {
  const [hoveredItem, setHoveredItem] = useState<{
    image: string;
    name: string;
  } | null>(null);
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
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const productItems = tArray("products.items");

  const products: Product[] = productItems.map((item: any, index: number) => ({
    id: String(index + 1),
    slug: productData[index]?.slug ?? "",
    number: item.number,
    name: item.name,
    image: productData[index]?.heroImage ?? "",
  }));

  return (
    <section
      ref={sectionRef}
      id="products"
      className="min-h-screen bg-white py-12 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Products */}
        <div className="mb-16">
          <div
            className={`flex items-center gap-2 text-blue-800 mb-12 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="w-1 h-6 bg-blue-800" />
            <span className="text-sm font-semibold">{t("products.title")}</span>
          </div>

          <div className="space-y-0">
            {products.map((product, index) => (
              <Link key={product.id} to={`/product/${product.slug}`}>
                <div
                  className={`group border-b border-gray-200 py-8 cursor-pointer transition-all duration-500 hover:bg-gray-50 hover:pl-4 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() =>
                    setHoveredItem({ image: product.image, name: product.name })
                  }
                  onMouseLeave={() => setHoveredItem(null)}
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

        {/* Services */}
        <div className="mt-20">
          <div
            className={`flex items-center gap-2 text-blue-800 mb-12 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="w-1 h-6 bg-blue-800" />
            <span className="text-sm font-semibold">{t("services.title")}</span>
          </div>

          <div className="space-y-0">
            {servicesData.map((service, index) => (
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
                onMouseEnter={() =>
                  setHoveredItem({ image: service.image, name: service.name })
                }
                onMouseLeave={() => setHoveredItem(null)}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unified hover preview image for both products and services */}
      {hoveredItem && (
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
              src={hoveredItem.image}
              alt={hoveredItem.name}
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
