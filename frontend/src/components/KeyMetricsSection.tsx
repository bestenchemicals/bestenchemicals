import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function KeyMetricsSection() {
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

  const metrics = tArray('metrics.items');

  return (
    <section ref={sectionRef} id="metrics" className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:h-screen relative z-10">
        <div className="w-full md:w-1/2 sticky top-0 h-auto md:h-screen flex flex-col justify-start p-6 md:p-16">
          <div
            className={`flex items-center gap-2 text-white/80 mb-8 md:mb-12 mt-4 md:mt-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="w-1 h-6 bg-blue-400"></div>
            <span className="text-sm">{t('metrics.label')}</span>
          </div>

          <h2
            className={`text-4xl md:text-7xl font-light text-white leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {t('metrics.title')}
            <br />
            {t('metrics.titleLine2')}
            <br />
            {t('metrics.titleLine3')}
          </h2>
        </div>

        <div className="w-full md:w-1/2 bg-gray-50 overflow-y-auto">
          <div className="p-6 md:p-16 space-y-16 md:space-y-32">
            {metrics.map((metric: any, index: number) => (
              <div
                key={index}
                className={`min-h-auto md:min-h-screen flex flex-col justify-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="mb-6 md:mb-8 group">
                  <div className="text-6xl md:text-8xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-blue-800 transition-colors duration-500">
                    {metric.value}
                  </div>
                  <div className="text-2xl md:text-4xl font-light text-gray-900 mb-4 md:mb-6">
                    {metric.label}
                  </div>
                </div>
                <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-xl">
                  {metric.description}
                </p>
              </div>
            ))}
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
