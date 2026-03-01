import { useParams, Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useTranslation } from "../hooks/useTranslation";

const productImages: Record<string, { heroImage: string; images: string[] }> = {
  // Preservatives: microbiology + antimicrobial lab testing
  preservatives: {
    heroImage:
      "https://images.pexels.com/photos/8325710/pexels-photo-8325710.jpeg?auto=compress&cs=tinysrgb&w=1920",
    images: [
      "https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1595154038355-f717191eaab4?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Petri dish bacterial culture (fixed)
    ],
  },

  // Defoamers: industrial liquid processing & mixing tanks
  defoamers: {
    heroImage:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Industrial mixing tank (fixed)
    images: [
      "https://images.unsplash.com/photo-1707135719639-409915fbc68f?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1652947965461-9ec15359520a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Liquid chemical processing (fixed)
    ],
  },

  // Rheology Modifiers: viscosity / fluid behavior testing
  rheology: {
    heroImage:
      "https://images.pexels.com/photos/7723534/pexels-photo-7723534.jpeg?auto=compress&cs=tinysrgb&w=1920",
    images: [
      "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/954585/pexels-photo-954585.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },

  // Dispersing & Wetting Agents: surfactant chemistry & liquid dispersion
  "wetting-agents": {
    heroImage:
      "https://images.pexels.com/photos/3735706/pexels-photo-3735706.jpeg?auto=compress&cs=tinysrgb&w=1920", // Lab pipetting / dispersion (fixed)
    images: [
      "https://images.pexels.com/photos/8532826/pexels-photo-8532826.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/8544960/pexels-photo-8544960.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },

  // Flow Additives & Matting Agents: powder coatings & material finishing
  additives: {
    heroImage:
      "https://images.unsplash.com/photo-1598207548924-fcab47e9b272?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Powder coating process (fixed)
    images: [
      "https://images.unsplash.com/photo-1513828742140-ccaa28f3eda0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Industrial production line (fixed)
      "https://images.unsplash.com/photo-1751606803218-67f4b896fc4e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Material processing (fixed)
    ],
  },
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  console.log(productId);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const { t, tArray } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

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

  const productName = t(`productDetail.products.${productId}.name`);
  const tagline = t(`productDetail.products.${productId}.tagline`);
  const description = t(`productDetail.products.${productId}.description`);
  const categories = tArray(`productDetail.products.${productId}.categories`);

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
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/65" />
        </div>

        <div
          className="relative z-10 flex-1 flex flex-col justify-between px-4 md:px-6 max-w-7xl mx-auto w-full"
          style={{ animation: "fadeInUp 1s ease-out" }}
        >
          <div className="flex flex-col justify-center flex-1">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-white/60" />
              <span className="text-white/70 text-sm tracking-widest uppercase font-medium">
                Product
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-white mb-4 leading-tight">
              {productName}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              {tagline}
            </p>
          </div>

          <div className="py-8 md:py-12">
            <button
              className="group px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 hover:shadow-xl hover:scale-105"
              onClick={() => {
                document
                  .getElementById("product-content")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("productDetail.exploreButton")}
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Content */}
      <section
        id="product-content"
        ref={contentRef}
        className="py-16 md:py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div
            className={`mb-16 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-blue-800 rounded-full" />
              <span className="text-blue-800 text-sm font-semibold tracking-wider uppercase">
                {productName}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
              {productName}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>

          {/* Two-column layout: accordion + image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
            {/* Accordion Categories */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-3">
                {categories.map((cat: any, idx: number) => {
                  const isOpen = openCategory === idx;
                  const hasItems = cat.items && cat.items.length > 0;
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors duration-200"
                    >
                      <button
                        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenCategory(isOpen ? null : idx)}
                      >
                        <span className="font-semibold text-gray-800 text-base leading-snug pr-4">
                          {cat.title}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-blue-700 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen
                            ? hasItems
                              ? "max-h-96 opacity-100"
                              : "max-h-20 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {hasItems ? (
                          <ul className="px-6 pb-5 space-y-2 bg-gray-50 border-t border-gray-100">
                            {cat.items.map((item: string, i: number) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 pt-2 text-gray-700 text-sm"
                              >
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="px-6 pb-4 pt-3 bg-gray-50 border-t border-gray-100">
                            <p className="text-sm text-gray-500 italic">
                              Contact us for product details.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Images stacked */}
            <div
              className={`flex flex-col gap-5 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {images.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-52 md:h-64 rounded-xl overflow-hidden group"
                >
                  <img
                    src={img}
                    alt={`${productName} ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div
            className={`bg-blue-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-light text-white mb-2">
                Interested in {productName}?
              </h3>
              <p className="text-blue-200 text-base">
                Get in touch with our team for product details and samples.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-md"
            >
              {t("productDetail.contactButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
