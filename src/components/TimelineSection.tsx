import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Building, Calendar, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { CareerExperience } from '../data/profileConfig';

interface TimelineSectionProps {
  experiences: CareerExperience[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ experiences }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.querySelectorAll('.timeline-node-anim'),
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="trayectoria"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#09090b]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] font-sans font-semibold tracking-widest text-[#dfb76c] uppercase mb-2">
            Evolución y Liderazgo
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-100 tracking-tight">
            Trayectoria profesional
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-light">
            Recorrido en instituciones bancarias y asesoría de alta dirección
          </p>
          <div className="w-12 h-[1px] bg-[#c5a869]/40 mx-auto mt-4" />
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l border-zinc-800 ml-3 sm:ml-6 space-y-8">
          {experiences.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="timeline-node-anim relative group">
                {/* Golden node indicator */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#09090b] border-2 border-[#c5a869] group-hover:bg-[#dfb76c] group-hover:scale-110 transition-all shadow-[0_0_10px_rgba(197,168,105,0.4)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#dfb76c] group-hover:bg-[#09090b]" />
                </div>

                {/* Card Container */}
                <div className="bg-[#101014]/90 border border-zinc-800/80 hover:border-[#c5a869]/40 rounded-lg p-5 sm:p-7 transition-all duration-300 shadow-lg">
                  {/* Top metadata row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/60">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#dfb76c] uppercase font-sans">
                      <Calendar className="w-3.5 h-3.5 text-[#c5a869]" />
                      <span>{item.period}</span>
                    </span>

                    {item.location && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 font-light">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>

                  {/* Role & Institution */}
                  <div className="mt-3">
                    <h3 className="text-base sm:text-lg font-serif font-medium text-zinc-100">
                      {item.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans font-medium text-zinc-400 mt-0.5 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#c5a869]" />
                      <span>{item.institution}</span>
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Collapsible Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-zinc-800/40">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-[#dfb76c] hover:text-[#f5e6c8] transition-colors font-medium focus:outline-none"
                      >
                        <span>{isExpanded ? 'Ocultar logros clave' : 'Ver responsabilidades y logros clave'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <ul className="mt-3 space-y-2 text-xs text-zinc-300 pl-3 border-l border-[#c5a869]/30">
                          {item.highlights.map((hl, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-[#dfb76c] mt-1.5 shrink-0" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
