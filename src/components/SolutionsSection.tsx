import React, { useEffect, useRef, useState } from 'react';
import { MessageSquare, ArrowRight, Briefcase, Landmark, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { BusinessSolution, ProfileData } from '../data/profileConfig';

interface SolutionsSectionProps {
  solutions: BusinessSolution[];
  profile: ProfileData;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ solutions, profile }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'consultoria' | 'financiero'>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.querySelectorAll('.solution-card-anim'),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
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

  const filteredSolutions = solutions.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleWhatsappSolution = (solutionTitle: string) => {
    const msg = `Hola ${profile.firstName}, me interesa conversar sobre el servicio de "${solutionTitle}" para mi empresa.`;
    const url = `https://wa.me/${profile.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const generalWhatsappUrl = `https://wa.me/${profile.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    'Hola, me gustaría conversar sobre consultoría empresarial y posibles soluciones para mi empresa.'
  )}`;

  return (
    <section
      id="soluciones"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#09090b]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] font-sans font-semibold tracking-widest text-[#dfb76c] uppercase mb-2">
            Servicios Principales & Especializados
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-100 tracking-tight">
            Soluciones para tu empresa
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-light leading-relaxed">
            Especialidad central en <strong>Consultoría Empresarial</strong> para la toma de decisiones estratégicas, respaldada por sólida trayectoria como <strong>asesor financiero</strong>.
          </p>
          <div className="w-12 h-[1px] bg-[#c5a869]/40 mx-auto mt-4" />
        </div>

        {/* Category Filter Tabs (Zero-pill compliant, clean segmented controls) */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1 rounded-lg bg-[#121217] border border-zinc-800/80 gap-1 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded font-medium transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Todos los servicios ({solutions.length})
            </button>
            <button
              onClick={() => setActiveCategory('consultoria')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded font-medium transition-all cursor-pointer ${
                activeCategory === 'consultoria'
                  ? 'bg-[#181820] text-[#dfb76c] shadow-sm border border-[#c5a869]/50'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span>Consultoría Empresarial (Principal)</span>
            </button>
            <button
              onClick={() => setActiveCategory('financiero')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded font-medium transition-all cursor-pointer ${
                activeCategory === 'financiero'
                  ? 'bg-[#181820] text-[#dfb76c] shadow-sm border border-[#c5a869]/50'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-[#dfb76c]" />
              <span>Asesoría Financiera</span>
            </button>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSolutions.map((item) => {
            const isPrimary = item.isPrimary ?? item.category === 'consultoria';
            return (
              <div
                key={item.id}
                className={`solution-card-anim rounded-lg p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group relative ${
                  isPrimary
                    ? 'bg-gradient-to-b from-[#131319] to-[#0e0e13] border border-[#c5a869]/30 hover:border-[#dfb76c]/70'
                    : 'bg-[#101015]/90 border border-zinc-800 hover:border-[#c5a869]/40'
                }`}
              >
                {/* Visual indicator for Primary Service */}
                {isPrimary && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 px-2.5 py-0.5 rounded-full bg-[#1e1c12] border border-[#c5a869]/60 text-[#dfb76c] text-[10px] font-sans font-semibold tracking-wider uppercase shadow-sm">
                    Servicio Principal
                  </div>
                )}

                <div>
                  {/* Number & Category Kicker */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-light text-[#dfb76c]/70 group-hover:text-[#dfb76c] transition-colors">
                      {item.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-sans font-medium">
                      {item.categoryLabel || (isPrimary ? 'Consultoría Empresarial' : 'Asesoría Financiera')}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-zinc-100 group-hover:text-[#dfb76c] transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Deliverable info */}
                  <div className="space-y-2 pt-3 border-t border-zinc-800/60 text-xs">
                    <div className="flex items-start gap-2 text-zinc-400 font-light">
                      <span className="text-[#dfb76c] font-medium text-[11px] shrink-0">Entregable:</span>
                      <span className="text-zinc-300 text-[11px]">{item.deliverable}</span>
                    </div>
                    <div className="flex items-start gap-2 text-zinc-400 font-light">
                      <span className="text-zinc-500 font-medium text-[11px] shrink-0">Ideal para:</span>
                      <span className="text-zinc-400 text-[11px]">{item.idealFor}</span>
                    </div>
                  </div>
                </div>

                {/* Action per card */}
                <div className="mt-6 pt-4 border-t border-zinc-800/40">
                  <button
                    onClick={() => handleWhatsappSolution(item.title)}
                    className="w-full flex items-center justify-between text-xs text-[#dfb76c] hover:text-[#f5e6c8] transition-colors py-1 group/btn focus:outline-none cursor-pointer"
                  >
                    <span className="font-medium tracking-wide">Consultar este servicio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA Box */}
        <div className="mt-14 p-8 rounded-xl bg-gradient-to-r from-[#121218] via-[#15151e] to-[#121218] border border-[#c5a869]/30 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-1 bg-[#dfb76c]/40" />

          <h3 className="font-serif text-xl sm:text-2xl font-normal text-zinc-100">
            ¿Buscas consultoría directiva o soluciones financieras?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mt-2 max-w-md mx-auto">
            Conversemos sobre la situación y prioridades estratégicas de tu empresa con total confidencialidad.
          </p>

          <div className="mt-6">
            <a
              href={generalWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded text-xs sm:text-sm font-semibold tracking-wide text-[#09090b] bg-gradient-to-r from-[#dfb76c] to-[#c5a869] hover:from-[#e8c872] hover:to-[#d4af37] shadow-lg hover:shadow-[#c5a869]/20 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Quiero conversar sobre mi empresa</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
