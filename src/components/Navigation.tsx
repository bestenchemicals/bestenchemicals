import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";
import newlogoo from "../resources/besten_logo_final.png";
import { useScrollToSection } from "../hooks/useScrollToSection";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes logoPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 0.75; transform: scale(1.04); }
        }

        .logo-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        /* Soft ambient glow that matches the orange hex + blue molecule in the logo */
        .logo-wrapper::before {
          content: "";
          position: absolute;
          inset: -12px -16px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at 40% 50%,
            rgba(234, 108, 28, 0.30) 0%,
            rgba(30, 120, 210, 0.18) 45%,
            transparent 70%
          );
          filter: blur(10px);
          animation: logoPulse 4s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .logo-img {
          position: relative;
          z-index: 1;
          /* Gentle drop shadow so the mark reads on any bg */
          filter: drop-shadow(0 0 6px rgba(234, 108, 28, 0.45))
                  drop-shadow(0 0 14px rgba(30, 120, 210, 0.30));
          transition: filter 0.35s ease, transform 0.35s ease;
        }
        .logo-link:hover .logo-img {
          filter: drop-shadow(0 0 10px rgba(234, 108, 28, 0.70))
                  drop-shadow(0 0 22px rgba(30, 120, 210, 0.50));
          transform: scale(1.06);
        }

        /* Bottom accent line on the nav */
        .nav-root::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(234, 108, 28, 0.60) 30%,
            rgba(30, 120, 210, 0.60) 70%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .nav-root.scrolled::after {
          opacity: 1;
        }

        /* Nav link hover underline using brand orange */
        .nav-link {
          position: relative;
          letter-spacing: 0.03em;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #ea6c1c, #1e78d2);
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .nav-link:hover {
          color: #fff;
        }
        .nav-link:hover::after {
          width: 100%;
        }


      `}</style>

      <nav
        className={`nav-root fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "scrolled bg-black/95 backdrop-blur-md shadow-xl"
            : "bg-black/40 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
          {/* ── Logo ── */}
          <Link
            to="/"
            className="logo-link flex items-start gap-2"
            style={{ animation: "slideInLeft 0.6s ease-out" }}
          >
            <div className="logo-wrapper flex flex-col items-start">
              <img
                src={newlogoo}
                alt="Besten Chemicals"
                className="logo-img h-16 w-auto object-contain"
                style={{
                  transform: "scale(1.5)",
                  transformOrigin: "left center",
                  marginLeft: "-22px",
                }}
              />
              <span
                className="uppercase tracking-[0.22em] -mt-1"
                style={{
                  fontSize: "9px",
                  background: "linear-gradient(90deg, #ea6c1c, #1e78d2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                }}
              >
                {t("navigation.brand.tagline")}
              </span>
            </div>
          </Link>

          {/* ── Mobile toggle ── */}
          <button
            className="md:hidden text-white hover:text-orange-400 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* ── Desktop / Mobile links ── */}
          <div
            className={`absolute md:static top-full left-0 right-0 md:flex items-center gap-6 md:gap-8 transition-all duration-300 ${
              mobileOpen
                ? "flex flex-col p-5 bg-black/95 backdrop-blur-md border-t border-white/10"
                : "hidden"
            }`}
            style={{ animation: "slideInRight 0.6s ease-out" }}
          >
            <Link
              to="/"
              className="nav-link block md:inline"
              onClick={() => setMobileOpen(false)}
            >
              {t("navigation.links.home")}
            </Link>

            <a
              href="/#company"
              className="nav-link block md:inline"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                scrollToSection("company");
              }}
            >
              {t("navigation.links.company")}
            </a>

            <Link
              to="/products"
              className="nav-link block md:inline"
              onClick={() => setMobileOpen(false)}
            >
              {t("navigation.links.products")}
            </Link>

            <Link
              to="/contact"
              className="nav-link block md:inline"
              onClick={() => setMobileOpen(false)}
            >
              <span style={{ marginRight: "4px", opacity: 0.75 }}>↗</span>
              {t("navigation.links.contact")}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
