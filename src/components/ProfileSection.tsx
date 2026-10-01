import React, { useEffect, useRef } from 'react';
import { Landmark, Users2, TrendingUp, Briefcase, DollarSign, Handshake, Target, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ProfileData } from '../data/profileConfig';

interface ProfileSectionProps {
  profile: ProfileData;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.querySelectorAll('.profile-reveal'),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
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

  const corePillars = [
    { label: 'Consultoría Empresarial', desc: 'Diagnóstico estratégico y acompañamiento directivo', icon: Briefcase },
    { label: 'Planeación & Estrategia', desc: 'Visión a largo plazo y alineación de objetivos corporativos', icon: Target },
    { label: 'Desarrollo de Negocios', desc: 'Apertura de nuevos mercados y alianzas comerciales', icon: TrendingUp },
    { label: 'Gestión de Clientes C-Level', desc: 'Atención personalizada para comités, socios y accionistas', icon: Users2 },
    { label: 'Asesoría Financiera', desc: 'Estructuración de liquidez, presupuestos y tesorería', icon: DollarSign },
    { label: 'Crédito & Sector Bancario', desc: 'Estructuración de expedientes y negociación bancaria', icon: Landmark },
    { label: 'Relaciones Comerciales', desc: 'Vínculos sólidos basados en rigor y confianza', icon: Handshake },
  ];

  return (
    <section
      id="perfil"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900"
    >
      <div className="max-w-5xl mx-auto">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="profile-reveal text-[11px] font-sans font-semibold tracking-widest text-[#dfb76c] uppercase mb-2">
            Perfil Profesional
          </p>
          <h2 className="profile-reveal font-serif text-3xl sm:text-4xl font-normal text-zinc-100 tracking-tight">
            {profile.bioHeadline}
          </h2>
          <div className="profile-reveal w-12 h-[1px] bg-[#c5a869]/40 mx-auto mt-4" />
        </div>

        {/* Executive Bio Card */}
        <div className="profile-reveal bg-gradient-to-b from-[#121217]/90 to-[#0c0c0f]/90 border border-zinc-800/80 rounded-lg p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
          {/* Subtle corner ornament */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a869]/5 rounded-bl-full pointer-events-none" />
          
          <div className="space-y-5 text-zinc-300 leading-relaxed text-sm sm:text-base font-light">
            {profile.bioParagraphs.map((paragraph, index) => (
              <p key={index} className="text-justify sm:text-left">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Guarantee / Value Statement */}
          <div className="mt-8 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#dfb76c]" />
              <span>Criterio analítico fundamentado en normativas y mejores prácticas de mercado</span>
            </span>
            <span className="font-sans font-medium text-zinc-300 tracking-wide">
              Confidencialidad & Ética Profesional
            </span>
          </div>
        </div>

        {/* 7 Core Pillars Grid */}
        <div className="profile-reveal">
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-4 text-center sm:text-left">
            Pilares de competencia ejecutiva:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {corePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3.5 p-4 rounded bg-[#101014]/60 border border-zinc-800/60 hover:border-[#c5a869]/30 transition-all group"
                >
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800 group-hover:border-[#c5a869]/40 transition-colors shrink-0">
                    <Icon className="w-4 h-4 text-[#dfb76c]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200 group-hover:text-[#dfb76c] transition-colors">
                      {pillar.label}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light mt-0.5">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
