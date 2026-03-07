import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";
import { Link } from "react-router-dom";
import preserv_one_img from "../resources/preserv_one.jpg";
import defoam_one_img from "../resources/defoam_one.jpg";
import rheolo_one_img from "../resources/rheology_one.jpg";
import wetting_one_img from "../resources/wetting_one.jpg";
import matting_one_img from "../resources/matting_one.jpg";

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

const productData: { slug: string; heroImage: string }[] = [
  {
    slug: "preservatives",
    heroImage: preserv_one_img,
  },
  {
    slug: "defoamers",
    heroImage: defoam_one_img,
  },
  {
    slug: "rheology",
    heroImage: rheolo_one_img,
  },
  {
    slug: "wetting-agents",
    heroImage: wetting_one_img,
  },
  {
    slug: "additives",
    heroImage: matting_one_img,
  },
];

const servicesData: Service[] = [
  {
    number: "01",
    name: "Microbiological Testing & Certification",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    number: "02",
    name: "Custom Manufacturing, Plant Hygiene Audit",
    image:
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

/** Returns true if the primary input is a pointer that can hover (i.e. mouse/trackpad). */
function useIsHoverDevice() {
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isHover;
}

export default function ProductsSection() {
  const [hoveredItem, setHoveredItem] = useState<{
    image: string;
    name: string;
  } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, tArray } = useTranslation();
  const isHoverDevice = useIsHoverDevice();

  /* Track mouse only on hover-capable devices */
  useEffect(() => {
    if (!isHoverDevice) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHoverDevice]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
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

  /** Clamp the preview card so it never overflows the viewport */
  const previewStyle = (() => {
    const cardW = 256; // w-64
    const cardH = 192; // h-48
    const gap = 20;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
    const vh = typeof window !== "undefined" ? window.innerHeight : 768;

    let left = mousePosition.x + gap;
    let top = mousePosition.y - cardH / 2;

    // Flip to left side if card would overflow right edge
    if (left + cardW > vw - gap) left = mousePosition.x - cardW - gap;
    // Keep within vertical bounds
    top = Math.max(gap, Math.min(top, vh - cardH - gap));

    return { left, top };
  })();

  return (
    <section
      ref={sectionRef}
      id="products"
      className="min-h-screen bg-white py-10 sm:py-14 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Products ── */}
        <div className="mb-12 md:mb-16">
          <SectionLabel label={t("products.title")} isVisible={isVisible} />

          <div className="space-y-0">
            {products.map((product, index) => (
              <Link key={product.id} to={`/product/${product.slug}`}>
                <ListRow
                  number={product.number}
                  name={product.name}
                  image={product.image}
                  index={index}
                  isVisible={isVisible}
                  isHoverDevice={isHoverDevice}
                  showArrow
                  onMouseEnter={() =>
                    setHoveredItem({ image: product.image, name: product.name })
                  }
                  onMouseLeave={() => setHoveredItem(null)}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Services ── */}
        <div className="mt-16 md:mt-20">
          <SectionLabel label={t("services.title")} isVisible={isVisible} />

          <div className="space-y-0">
            {servicesData.map((service, index) => (
              <ListRow
                key={service.number}
                number={service.number}
                name={service.name}
                image={service.image}
                index={products.length + index}
                isVisible={isVisible}
                isHoverDevice={isHoverDevice}
                showArrow={false}
                onMouseEnter={() =>
                  setHoveredItem({ image: service.image, name: service.name })
                }
                onMouseLeave={() => setHoveredItem(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Cursor-following preview — desktop/hover only ── */}
      {isHoverDevice && hoveredItem && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: `${previewStyle.left}px`,
            top: `${previewStyle.top}px`,
            animation: "imageFloat 0.25s ease-out forwards",
          }}
        >
          <div className="w-56 h-40 sm:w-64 sm:h-48 rounded-lg overflow-hidden shadow-2xl">
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
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function SectionLabel({
  label,
  isVisible,
}: {
  label: string;
  isVisible: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-blue-800 mb-8 md:mb-12 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
    >
      <div className="w-1 h-5 sm:h-6 bg-blue-800 flex-shrink-0" />
      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

interface ListRowProps {
  number: string;
  name: string;
  image: string;
  index: number;
  isVisible: boolean;
  isHoverDevice: boolean;
  showArrow: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ListRow({
  number,
  name,
  image,
  index,
  isVisible,
  isHoverDevice,
  showArrow,
  onMouseEnter,
  onMouseLeave,
}: ListRowProps) {
  return (
    <div
      className={`
        group border-b border-gray-200 py-5 sm:py-6 md:py-8
        cursor-pointer
        transition-all duration-500
        hover:bg-gray-50 hover:pl-2 sm:hover:pl-4
        active:bg-gray-100
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
      onMouseEnter={isHoverDevice ? onMouseEnter : undefined}
      onMouseLeave={isHoverDevice ? onMouseLeave : undefined}
    >
      {/* Mobile: stacked thumbnail + text; Desktop: single row */}
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: number + name */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-12 min-w-0">
          <span className="text-blue-400 text-[10px] sm:text-xs md:text-sm font-mono flex-shrink-0">
            [{number}]
          </span>
          <h3
            className="
            text-base sm:text-xl md:text-2xl lg:text-3xl
            font-light text-gray-800
            group-hover:text-blue-800
            transition-colors duration-300
            leading-snug
            truncate sm:whitespace-normal
          "
          >
            {name}
          </h3>
        </div>

        {/* Right: thumbnail (mobile only) + arrow */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Thumbnail visible only on non-hover devices (touch screens) */}
          {!isHoverDevice && (
            <div className="w-12 h-9 sm:w-16 sm:h-12 rounded overflow-hidden flex-shrink-0 opacity-80">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {showArrow && (
            <ArrowRight
              className="
                w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6
                text-gray-400
                group-hover:text-blue-800
                group-hover:translate-x-1 sm:group-hover:translate-x-2
                transition-all duration-300
                flex-shrink-0
              "
            />
          )}
        </div>
      </div>
    </div>
  );
}
