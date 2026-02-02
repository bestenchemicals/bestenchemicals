import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useTranslation } from "../hooks/useTranslation";

// Image mapping for products
const productImages: Record<string, { heroImage: string; images: string[] }> = {
  preservatives: {
    heroImage:
      "https://images.pexels.com/photos/1188470/pexels-photo-1188470.jpeg?auto=compress&cs=tinysrgb&w=1920",
    images: [
      "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  surfactants: {
    heroImage:
      "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1920",
    images: [
      "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  defoamers: {
    heroImage:
      "https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1920",
    images: [
      "https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2280567/pexels-photo-2280567.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  "wetting-agents": {
    heroImage:
      "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=1920",
    images: [
      "https://images.pexels.com/photos/2280570/pexels-photo-2280570.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2280572/pexels-photo-2280572.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  "pre-treatment": {
    heroImage:
      "https://images.pexels.com/photos/7615469/pexels-photo-7615469.jpeg?auto=compress&cs=tinysrgb&w=1920",
    images: [
      "https://images.pexels.com/photos/2280543/pexels-photo-2280543.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2280546/pexels-photo-2280546.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);
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

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  // Validate product exists
  if (!productId || !productImages[productId]) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-2xl text-gray-600">
            {t("productDetail.notFound")}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const productKey = productId as keyof typeof productImages;
  const images = productImages[productKey];

  // Get product data from translations
  const productName = t(`productDetail.products.${productId}.name`);
  const tagline = t(`productDetail.products.${productId}.tagline`);
  const fullDescription = t(
    `productDetail.products.${productId}.fullDescription`
  );
  const whyChoose = t(`productDetail.products.${productId}.whyChoose`);
  const applications = tArray(
    `productDetail.products.${productId}.applications`
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${images.heroImage})`,
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
            <h1 className="text-4xl md:text-6xl font-light text-white mb-4 leading-tight">
              {productName}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">{tagline}</p>
          </div>

          <div className="py-8 md:py-12">
            <button
              className="px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center gap-2 hover:shadow-xl"
              onClick={() => {
                const element = document.getElementById("product-content");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("productDetail.exploreButton")}
              <span>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section
        id="product-content"
        ref={contentRef}
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Product Label */}
          <div
            className={`flex items-center gap-2 text-blue-800 mb-8 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="w-1 h-6 bg-blue-800"></div>
            <span className="text-sm font-semibold">{productName}</span>
          </div>

          {/* Product Title */}
          <h2
            className={`text-4xl md:text-5xl font-light text-gray-900 mb-8 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {productName}
          </h2>

          {/* Description */}
          <p
            className={`text-lg text-gray-700 leading-relaxed mb-12 max-w-3xl transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {fullDescription}
          </p>

          {/* Applications Section */}
          <h3
            className={`text-2xl md:text-3xl font-light text-gray-900 mb-8 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {t("productDetail.sectionTitle")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {applications.map((app: any, idx: number) => (
              <div
                key={idx}
                className={`border-b border-gray-200 pb-4 hover:border-blue-400 transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${400 + idx * 100}ms` }}
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {app.category}
                </h4>
                <p className="text-blue-600 hover:text-blue-800 transition-colors">
                  {app.uses}
                </p>
              </div>
            ))}
          </div>

          {/* Product Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {images.images.map((img, idx) => (
              <div
                key={idx}
                className={`relative h-64 md:h-80 rounded-lg overflow-hidden group transition-all duration-700 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: `${600 + idx * 100}ms` }}
              >
                <img
                  src={img}
                  alt={`${productName} ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Why Choose Section */}
          <div
            className={`bg-gray-50 rounded-lg p-8 md:p-12 mb-12 transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
              {t("productDetail.whyChooseTitle")} {productName}?
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {whyChoose}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-blue-800 text-blue-800 rounded-full hover:bg-blue-50 hover:scale-105 transition-all duration-300"
            >
              {t("productDetail.contactButton")}
              <ArrowRight className="w-5 h-5" />
            </Link>
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
