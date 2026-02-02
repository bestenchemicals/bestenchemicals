import { Atom, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const quickLinks = tArray('footer.quickLinks.links');
  const productLinks = tArray('footer.productsLinks.links');

  return (
    <footer ref={footerRef} className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-2 mb-4 group">
              <Atom className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" />
              <div>
                <div className="font-bold text-lg">{t('navigation.brand.name')}</div>
                <div className="text-xs uppercase tracking-wider text-gray-400">
                  {t('navigation.brand.tagline')}
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{t('footer.description')}</p>
          </div>

          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h4 className="font-semibold mb-4 text-blue-400">{t('footer.quickLinks.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {quickLinks.map((link: any, index: number) => (
                <li key={index}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {link.text}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {link.text}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h4 className="font-semibold mb-4 text-blue-400">{t('footer.productsLinks.title')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {productLinks.map((link: any, index: number) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h4 className="font-semibold mb-4 text-blue-400">{t('footer.contact.title')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2 group">
                <Mail className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                <a
                  href={`mailto:${t('footer.contact.email')}`}
                  className="hover:text-white transition-colors"
                >
                  {t('footer.contact.email')}
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <Phone className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                <a
                  href={`tel:${t('footer.contact.phone').replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {t('footer.contact.phone')}
                </a>
              </li>
              <li className="flex items-start gap-2 group">
                <MapPin className="w-4 h-4 mt-1 group-hover:text-blue-400 transition-colors" />
                <a href="/contact" className="hover:text-white transition-colors">
                  {t('footer.contact.location')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t border-gray-700 pt-8 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <p>&copy; {t('footer.copyright')}</p>
            <div className="flex gap-6 md:justify-end">
              <a href="#" className="hover:text-white transition-colors">
                {t('footer.legal.privacy')}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t('footer.legal.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
