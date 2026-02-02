import { Atom, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "../hooks/useTranslation";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-black/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          style={{ animation: "slideInLeft 0.6s ease-out" }}
        >
          <Atom className="w-8 h-8 text-white group-hover:rotate-180 transition-transform duration-700" />
          <div className="text-white hidden sm:block">
            <div className="font-bold text-lg">
              {t("navigation.brand.name")}
            </div>
            <div className="text-xs uppercase tracking-wider">
              {t("navigation.brand.tagline")}
            </div>
          </div>
        </Link>

        <button
          className="md:hidden text-white hover:text-blue-300 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        <div
          className={`absolute md:static top-full left-0 right-0 md:flex items-center gap-4 md:gap-8 text-white text-sm transition-all duration-300 ${
            mobileOpen
              ? "flex flex-col p-4 bg-black/95 backdrop-blur-md"
              : "hidden"
          }`}
          style={{ animation: "slideInRight 0.6s ease-out" }}
        >
          <Link
            to="/"
            className="hover:text-blue-300 transition-all duration-300 block md:inline relative group"
            onClick={() => setMobileOpen(false)}
          >
            {t("navigation.links.home")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <a
            href="/#company"
            className="hover:text-blue-300 transition-all duration-300 block md:inline relative group"
            onClick={() => setMobileOpen(false)}
          >
            {t("navigation.links.company")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <Link
            to="/products"
            className="hover:text-blue-300 transition-all duration-300 block md:inline relative group"
            onClick={() => setMobileOpen(false)}
          >
            {t("navigation.links.products")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <a
            href="/#services"
            className="hover:text-blue-300 transition-all duration-300 block md:inline relative group"
            onClick={() => setMobileOpen(false)}
          >
            {t("navigation.links.services")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/#news"
            className="hover:text-blue-300 transition-all duration-300 block md:inline relative group"
            onClick={() => setMobileOpen(false)}
          >
            {t("navigation.links.news")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </a>
          <Link
            to="/contact"
            className="items-center gap-1 hover:text-blue-300 transition-all duration-300 block md:inline relative group"
            onClick={() => setMobileOpen(false)}
          >
            <span>↗</span> {t("navigation.links.contact")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}
