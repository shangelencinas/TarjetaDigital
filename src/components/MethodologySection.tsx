import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MethodologyStep } from '../data/profileConfig';

interface MethodologySectionProps {
  methodology: MethodologyStep[];
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ methodology }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.querySelectorAll('.method-step-anim'),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="metodologia"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#070709]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] font-sans font-semibold tracking-widest text-[#dfb76c] uppercase mb-2">
            Rigor y Estructura
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-100 tracking-tight">
            Metodología de trabajo
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-light">
            Un proceso disciplinado y estructurado para transformar incertidumbre en certidumbre
          </p>
          <div className="w-12 h-[1px] bg-[#c5a869]/40 mx-auto mt-4" />
        </div>

        {/* Desktop Connected Line / Mobile Vertical Step flow */}
        <div className="relative">
          {/* Desktop Horizontal Guideline */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-7 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#c5a869]/30 to-transparent z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {methodology.map((step, index) => (
              <div
                key={step.number}
                className="method-step-anim flex flex-col items-center text-center p-6 rounded-lg bg-[#101015]/90 border border-zinc-800/80 hover:border-[#c5a869]/40 transition-all duration-300 group"
              >
                {/* Step Circle Badge */}
                <div className="w-14 h-14 rounded-full bg-[#09090b] border-2 border-[#c5a869]/60 group-hover:border-[#dfb76c] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center font-serif text-base font-semibold text-[#dfb76c] mb-5 transition-all">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-medium tracking-wide text-zinc-100 group-hover:text-[#dfb76c] transition-colors mb-1">
                  {step.title}
                </h3>

                {/* Subtitle */}
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#c5a869]/80 font-medium mb-3">
                  {step.subtitle}
                </span>

                {/* Description */}
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
