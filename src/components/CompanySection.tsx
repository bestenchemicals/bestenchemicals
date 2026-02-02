import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function CompanySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const paragraphs = tArray('company.paragraphs');

  return (
    <section
      ref={sectionRef}
      id="company"
      className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-12 md:py-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-3">
            <div
              className={`flex items-center gap-2 text-white transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="w-1 h-6 bg-blue-500"></div>
              <span className="text-xs md:text-sm">{t('company.label')}</span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-9">
            <h2
              className={`text-3xl md:text-5xl font-light text-white mb-6 md:mb-8 leading-tight transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {t('company.title')}
              <br />
              {t('company.titleBreak')}
            </h2>

            <div className="space-y-4 md:space-y-6 text-white/80 text-base md:text-lg leading-relaxed mb-8 md:mb-12">
              {paragraphs.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div
                className={`relative h-48 md:h-64 rounded-lg overflow-hidden group transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <img
                  src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Integrated"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-xl font-light">{t('company.imageLabels.integrated')}</span>
                    <div className="w-20 h-px bg-white"></div>
                    <span className="text-xl font-light">{t('company.imageLabels.innovative')}</span>
                  </div>
                </div>
              </div>

              <div
                className={`relative h-48 md:h-64 rounded-lg overflow-hidden group transition-all duration-700 delay-400 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <img
                  src="https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Chemical solutions"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
}
