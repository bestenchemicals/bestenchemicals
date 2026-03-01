import { ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

type FeatureType = "innovative" | "sustainability" | "integrative";

interface PopupPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export default function HeroSection() {
  const [activePopup, setActivePopup] = useState<FeatureType | null>(null);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({});
  const featureRefs = useRef<{ [key in FeatureType]?: HTMLDivElement | null }>(
    {}
  );
  const { t } = useTranslation();

  const calculatePopupPosition = (featureType: FeatureType) => {
    const element = featureRefs.current[featureType];
    if (!element) return {};

    const rect = element.getBoundingClientRect();
    const popupHeight = 280; // Approximate popup height
    const spaceAbove = rect.top;

    const position: PopupPosition = {};

    if (spaceAbove >= popupHeight) {
      // Enough space above — open upward
      position.bottom = "100%";
    } else {
      // Fall back to below
      position.top = "100%";
    }

    return position;
  };

  const handleMouseEnter = (featureType: FeatureType) => {
    const position = calculatePopupPosition(featureType);
    setPopupPosition(position);
    setActivePopup(featureType);
  };

  const handleMouseLeave = () => {
    setActivePopup(null);
  };

  const features: Array<{
    type: FeatureType;
    icon: JSX.Element;
    image: string;
  }> = [
    {
      type: "innovative",
      icon: (
        <div className="grid grid-cols-3 gap-2">
          <div className="w-6 h-6 rounded-full bg-red-200"></div>
          <div className="w-6 h-6 rounded-full bg-red-200"></div>
          <div className="w-6 h-6 rounded-full bg-red-500"></div>
        </div>
      ),
      image:
        "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      type: "sustainability",
      icon: (
        <div className="grid grid-cols-3 gap-1">
          <div className="w-6 h-6 bg-orange-300 rounded"></div>
          <div className="w-6 h-6 bg-orange-400 rounded"></div>
          <div className="w-6 h-6 bg-orange-300 rounded"></div>
        </div>
      ),
      image:
        "https://images.pexels.com/photos/5029857/pexels-photo-5029857.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      type: "integrative",
      icon: (
        <div className="grid grid-cols-2 gap-1">
          <div className="w-6 h-6 bg-red-300 rounded-full"></div>
          <div className="w-6 h-6 bg-red-400 rounded-full"></div>
        </div>
      ),
      image:
        "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      <div
        className="relative z-10 flex-1 flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pt-20"
        style={{ animation: "fadeInUp 1s ease-out" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-8 md:mb-12 leading-tight">
          {t("hero.title")}
          <br />
          {t("hero.titleBreak")}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/products"
            className="px-8 py-4 bg-white text-black rounded-full flex items-center gap-3 hover:bg-gray-100 hover:scale-105 transition-all duration-300 hover:shadow-xl"
            style={{ animation: "fadeInUp 1s ease-out 0.2s both" }}
          >
            {t("hero.buttons.products")}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button
            className="px-8 py-4 bg-transparent border border-white/50 text-white rounded-full flex items-center gap-3 hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:border-white"
            style={{ animation: "fadeInUp 1s ease-out 0.4s both" }}
          >
            {t("hero.buttons.services")}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className="relative z-10 py-8 md:py-12 px-4 md:px-6"
        style={{ animation: "fadeInUp 1s ease-out 0.6s both" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-white text-xl md:text-2xl font-light mb-2">
              {t("hero.sectionTitle")}
            </h2>
            <p className="text-white/80 text-xs md:text-sm">
              {t("hero.sectionSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.type}
                ref={(el) => (featureRefs.current[feature.type] = el)}
                className="relative border-t-2 border-white/30 pt-6 hover:border-white/60 transition-all duration-300"
                onMouseEnter={() => handleMouseEnter(feature.type)}
                onMouseLeave={handleMouseLeave}
                style={{
                  animation: `fadeInUp 1s ease-out ${0.8 + index * 0.1}s both`,
                }}
              >
                <div className="flex gap-2 mb-4">{feature.icon}</div>
                <h3 className="text-white text-xl mb-2">
                  {t(`hero.features.${feature.type}.title`)}
                </h3>

                {activePopup === feature.type && (
                  <div
                    className="absolute bg-white rounded-xl shadow-2xl overflow-hidden z-50"
                    style={{
                      ...popupPosition,
                      animation: "popupSlideIn 0.3s ease-out",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "560px",
                      height: "200px",
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: popupPosition.bottom ? "12px" : undefined,
                      marginTop: popupPosition.top ? "12px" : undefined,
                    }}
                  >
                    {/* Text side */}
                    <div
                      style={{
                        flex: "1 1 0",
                        padding: "20px 22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <div className="flex gap-2 mb-2">{feature.icon}</div>
                      <h4 className="text-blue-800 text-base font-semibold mb-2 leading-tight">
                        {t(`hero.features.${feature.type}.title`)}
                      </h4>
                      <p
                        className="text-gray-600 text-xs leading-relaxed"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {t(`hero.features.${feature.type}.description`)}
                      </p>
                    </div>
                    {/* Image side */}
                    <div
                      style={{
                        width: "200px",
                        flexShrink: 0,
                        backgroundImage: `url(${feature.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

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

        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
