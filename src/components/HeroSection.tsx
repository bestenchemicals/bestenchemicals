import { ArrowRight, ArrowRightIcon } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import home_img from "../resources/home.jpg";
import values_img from "../resources/values.jpg";
import mission_img from "../resources/mission.jpg";
import vision_img from "../resources/main_vision.png";

type FeatureType = "innovative" | "sustainability" | "integrative";

/** True when the device supports hover (mouse/trackpad), false for touch. */
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

/** Returns "above" | "below" based on available viewport space. */
function usePopupDirection(
  ref: React.RefObject<HTMLDivElement | null>,
  active: boolean
): "above" | "below" {
  const [dir, setDir] = useState<"above" | "below">("above");
  useEffect(() => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setDir(rect.top >= 280 ? "above" : "below");
  }, [active, ref]);
  return dir;
}

/** Clamps a popup so it never overflows the viewport horizontally. */
function useClampedLeft(
  ref: React.RefObject<HTMLDivElement | null>,
  active: boolean,
  popupWidth: number
): number {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centre = rect.left + rect.width / 2;
    const vw = window.innerWidth;
    const half = popupWidth / 2;
    const margin = 12;
    const clamped = Math.max(
      margin + half,
      Math.min(centre, vw - half - margin)
    );
    // Return offset relative to the element's left edge
    setLeft(clamped - rect.left);
  }, [active, ref, popupWidth]);
  return left;
}

export default function HeroSection() {
  const [activePopup, setActivePopup] = useState<FeatureType | null>(null);
  const { t } = useTranslation();
  const isHoverDevice = useIsHoverDevice();

  const features: Array<{
    type: FeatureType;
    icon: JSX.Element;
    image: string;
  }> = [
    {
      type: "innovative",
      icon: (
        <div className="grid grid-cols-3 gap-2">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-200" />
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-200" />
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500" />
        </div>
      ),
      image: vision_img,
    },
    {
      type: "sustainability",
      icon: (
        <div className="grid grid-cols-3 gap-1">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-300 rounded" />
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-400 rounded" />
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-300 rounded" />
        </div>
      ),
      image: mission_img,
    },
    {
      type: "integrative",
      icon: (
        <div className="grid grid-cols-2 gap-1">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-300 rounded-full" />
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-400 rounded-full" />
        </div>
      ),
      image: values_img,
    },
  ];

  const handleToggle = useCallback(
    (type: FeatureType) => {
      if (!isHoverDevice) {
        setActivePopup((prev) => (prev === type ? null : type));
      }
    },
    [isHoverDevice]
  );

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      {/* Background */}
      {/* <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div> */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${home_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Hero copy */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 max-w-7xl mx-auto w-full pt-20 sm:pt-24"
        style={{ animation: "fadeInUp 1s ease-out" }}
      >
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 md:mb-12 leading-tight">
          {t("hero.title")}
          <br />
          {t("hero.titleBreak")}
        </h1>

        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          style={{ width: "fit-content", maxWidth: "100%" }}
        >
          {/* Primary Button */}
          <Link
            to="/products"
            className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black rounded-full flex items-center justify-center gap-3 text-sm sm:text-base whitespace-nowrap overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105"
            style={{ animation: "fadeInUp 1s ease-out 0.2s both" }}
          >
            {/* Shimmer sweep on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12" />

            <span className="relative">{t("hero.buttons.products")}</span>

            {/* Arrow slides right and bounces */}
            <ArrowRight className="relative w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>

          {/* Secondary Button */}
          <Link to="/contact">
            <button
              className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border border-white/50 text-white rounded-full flex items-center justify-center gap-3 text-sm sm:text-base whitespace-nowrap overflow-hidden transition-all duration-300 hover:border-white hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              style={{ animation: "fadeInUp 1s ease-out 0.4s both" }}
            >
              {/* Frosted fill that wipes in from left */}
              <span className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out bg-white/10 rounded-full" />

              <span className="relative">{t("hero.buttons.services")}</span>

              {/* Arrow rotates to point more upright and slides */}
              <ArrowRightIcon className="relative w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 -rotate-45 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-[-55deg]" />
            </button>
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div
        className="relative z-10 py-8 md:py-12 px-4 sm:px-6"
        style={{ animation: "fadeInUp 1s ease-out 0.6s both" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-5 md:mb-6">
            <h2 className="text-white text-lg sm:text-xl md:text-2xl font-light mb-1.5 sm:mb-2">
              {t("hero.sectionTitle")}
            </h2>
            <p className="text-white/80 text-xs sm:text-sm">
              {t("hero.sectionSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.type}
                feature={feature}
                index={index}
                isHoverDevice={isHoverDevice}
                isActive={activePopup === feature.type}
                onMouseEnter={() =>
                  isHoverDevice && setActivePopup(feature.type)
                }
                onMouseLeave={() => isHoverDevice && setActivePopup(null)}
                onTap={() => handleToggle(feature.type)}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popupSlideIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes popupSlideInAbove {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        /* Mobile full-screen popup slide-up */
        @keyframes sheetUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

/* ─── FeatureCard ───────────────────────────────────────────────────────── */

interface FeatureCardProps {
  feature: { type: FeatureType; icon: JSX.Element; image: string };
  index: number;
  isHoverDevice: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onTap: () => void;
  t: (key: string) => string;
}

function FeatureCard({
  feature,
  index,
  isHoverDevice,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onTap,
  t,
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const popupWidth = 480; // desktop popup width (px)

  const direction = usePopupDirection(cardRef, isActive);
  const centreLeft = useClampedLeft(cardRef, isActive, popupWidth);

  return (
    <div
      ref={cardRef}
      className="relative border-t-2 border-white/30 pt-5 sm:pt-6 hover:border-white/60 transition-all duration-300 select-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onTap}
      style={{ animation: `fadeInUp 1s ease-out ${0.8 + index * 0.1}s both` }}
    >
      <div className="flex gap-2 mb-3 sm:mb-4">{feature.icon}</div>
      <h3 className="text-white text-base sm:text-lg md:text-xl leading-snug">
        {t(`hero.features.${feature.type}.title`)}
      </h3>

      {/* Touch hint */}
      {!isHoverDevice && (
        <span className="mt-2 inline-flex items-center gap-1 text-white/50 text-xs">
          {isActive ? "Tap to close" : "Tap to learn more"}
        </span>
      )}

      {/* ── Desktop hover popup ── */}
      {isActive && isHoverDevice && (
        <div
          className="absolute bg-white rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col"
          style={{
            ...(direction === "above"
              ? { bottom: "calc(100% + 12px)" }
              : { top: "calc(100% + 12px)" }),
            left: `${centreLeft}px`,
            transform: "translateX(-50%)",
            width: `${popupWidth}px`,
            height: "auto",
            maxHeight: "480px",
            animation:
              direction === "above"
                ? "popupSlideInAbove 0.25s ease-out"
                : "popupSlideIn 0.25s ease-out",
          }}
        >
          <PopupContent feature={feature} t={t} />
        </div>
      )}

      {/* ── Mobile tap popup (inline card below the heading) ── */}
      {isActive && !isHoverDevice && (
        <div
          className="mt-4 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col sm:flex-row"
          style={{
            animation: "sheetUp 0.25s ease-out",
            maxHeight: "460px",
          }}
        >
          <PopupContent feature={feature} t={t} mobile />
        </div>
      )}
    </div>
  );
}

/* ─── PopupContent ──────────────────────────────────────────────────────── */

function PopupContent({
  feature,
  t,
  mobile = false,
}: {
  feature: { type: FeatureType; icon: JSX.Element; image: string };
  t: (key: string) => string;
  mobile?: boolean;
}) {
  return (
    <>
      {/* Text */}
      <div
        className={`flex flex-col justify-center p-4 sm:p-5 flex-1 min-w-0 ${
          mobile ? "order-2" : ""
        }`}
      >
        <div className="flex gap-2 mb-2">{feature.icon}</div>
        <h4 className="text-blue-800 text-sm sm:text-base font-semibold mb-1.5 leading-tight">
          {t(`hero.features.${feature.type}.title`)}
        </h4>
        <p
          className="text-gray-600 text-xs leading-relaxed"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: mobile ? 6 : 8,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {t(`hero.features.${feature.type}.description`)}
        </p>
      </div>

      {/* Image */}
      <div
        className={`flex-shrink-0 ${mobile ? "hidden" : "w-full h-36"}`}
        style={{
          backgroundImage: `url(${feature.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </>
  );
}
