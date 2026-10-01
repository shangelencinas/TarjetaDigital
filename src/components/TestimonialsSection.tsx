import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, User } from 'lucide-react';
import { TestimonialItem } from '../data/profileConfig';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  // Auto advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonios"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#070709]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[11px] font-sans font-semibold tracking-widest text-[#dfb76c] uppercase mb-2">
            Referencias y Confianza
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-100 tracking-tight">
            Lo que dicen de mi trabajo
          </h2>
          <p className="text-xs text-zinc-400 mt-2 font-light">
            Testimonios de directivos, accionistas y líderes empresariales
          </p>
          <div className="w-12 h-[1px] bg-[#c5a869]/40 mx-auto mt-4" />
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-gradient-to-b from-[#111116] to-[#0c0c10] border border-zinc-800 rounded-xl p-8 sm:p-12 shadow-2xl">
          {/* Subtle Quote Icon */}
          <div className="w-12 h-12 rounded-full bg-[#181820] border border-[#c5a869]/30 flex items-center justify-center mb-6">
            <Quote className="w-5 h-5 text-[#dfb76c]" />
          </div>

          {/* Testimonial Quote */}
          <div className="min-h-[110px] sm:min-h-[90px] flex items-center">
            <blockquote className="font-serif italic text-base sm:text-xl text-zinc-200 leading-relaxed font-light">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
          </div>

          {/* Author info row */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#181820] border border-[#c5a869]/40 flex items-center justify-center text-[#dfb76c]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-medium text-sm text-zinc-100">
                  {current.name}
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  {current.role} · <span className="text-[#dfb76c]/80">{current.company}</span>
                </p>
              </div>
            </div>

            {/* Slider Navigation controls */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={prev}
                aria-label="Testimonio anterior"
                className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#dfb76c] hover:border-[#c5a869]/40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5 px-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Ir al testimonio ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'w-5 bg-[#dfb76c]' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Testimonio siguiente"
                className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#dfb76c] hover:border-[#c5a869]/40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-zinc-400 mt-4 tracking-wider uppercase font-sans">
          Contenido demostrativo editable en la configuración de la tarjeta
        </p>
      </div>
    </section>
  );
};
