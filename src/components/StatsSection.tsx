import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { StatMetric } from '../data/profileConfig';

interface StatsSectionProps {
  stats: StatMetric[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValues, setDisplayValues] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate card appearance
            gsap.fromTo(
              entry.target.querySelectorAll('.stat-card-anim'),
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
            );

            // Count-up numbers
            const targets = stats.map((s) => s.numericTarget || 0);
            const duration = 1800; // ms
            const startTime = performance.now();

            const updateCount = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out quad
              const easeOut = 1 - Math.pow(1 - progress, 3);

              setDisplayValues(targets.map((val) => Math.round(val * easeOut)));

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              }
            };

            requestAnimationFrame(updateCount);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, stats]);

  return (
    <section
      id="logros"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#09090b]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[11px] font-sans font-semibold tracking-widest text-[#dfb76c] uppercase mb-2">
            Indicadores Profesionales
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-100 tracking-tight">
            Experiencia y logros
          </h2>
          <p className="text-xs text-zinc-400 mt-2 font-light">
            Métricas de referencia en el ámbito bancario y asesoría corporativa
          </p>
          <div className="w-12 h-[1px] bg-[#c5a869]/40 mx-auto mt-4" />
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              className="stat-card-anim p-6 sm:p-8 rounded-lg bg-[#111116]/80 border border-zinc-800/80 hover:border-[#c5a869]/40 transition-all text-center group flex flex-col justify-between"
            >
              <div>
                {/* Number Display with Cormorant Garamond */}
                <div className="font-serif text-3xl sm:text-5xl font-light text-[#dfb76c] tracking-tight tabular-nums group-hover:scale-105 transition-transform duration-300">
                  <span>{stat.prefix}</span>
                  <span>{hasAnimated ? displayValues[i] : stat.value.replace(/[^0-9]/g, '') || 'XX'}</span>
                  <span>{stat.suffix}</span>
                </div>

                {/* Main Label */}
                <h3 className="font-serif text-sm sm:text-base font-medium text-zinc-100 mt-3">
                  {stat.label}
                </h3>
              </div>

              {/* Sublabel */}
              <p className="text-[11px] text-zinc-400 font-light mt-2 pt-3 border-t border-zinc-800/60">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-zinc-400 mt-6 font-light">
          * Valores de referencia personalizables en la configuración con datos reales auditables.
        </p>
      </div>
    </section>
  );
};
