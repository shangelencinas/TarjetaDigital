import React, { useEffect, useRef } from 'react';
import {
  Briefcase,
  Landmark,
  TrendingUp,
  BarChart3,
  Compass,
  Users,
  ShieldCheck,
  Handshake,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ExpertiseArea } from '../data/profileConfig';

interface AreasSectionProps {
  areas: ExpertiseArea[];
  onSelectArea?: (areaTitle: string) => void;
}

export const AreasSection: React.FC<AreasSectionProps> = ({ areas, onSelectArea }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target.querySelectorAll('.area-card-anim'),
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' }
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return Briefcase;
      case 'Landmark':
        return Landmark;
      case 'TrendingUp':
        return TrendingUp;
      case 'BarChart3':
        return BarChart3;
      case 'Compass':
        return Compass;
      case 'Users':
        return Users;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Handshake':
      default:
        return Handshake;
    }
  };

  return (
    <section
      id="areas"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#070709]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] font-sans font-semibold tracking-widest text-[#dfb76c] uppercase mb-2">
            Especialización Sectorial
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-100 tracking-tight">
            Áreas de experiencia
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-light">
            Competencias de alto calibre aplicadas a la gestión estratégica y financiera
          </p>
          <div className="w-12 h-[1px] bg-[#c5a869]/40 mx-auto mt-4" />
        </div>

        {/* 8 Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {areas.map((area) => {
            const Icon = getIcon(area.iconName);
            return (
              <div
                key={area.id}
                className="area-card-anim group relative p-6 rounded-lg bg-[#111116]/80 border border-zinc-800/80 hover:border-[#c5a869]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-lg hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.6),0_0_15px_rgba(197,168,105,0.08)] flex flex-col justify-between"
              >
                {/* Top Subtle Golden Accent Hairline */}
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a869]/0 to-transparent group-hover:via-[#dfb76c] transition-all duration-500" />

                <div>
                  {/* Icon Container */}
                  <div className="w-10 h-10 rounded bg-[#181820] border border-zinc-700/60 group-hover:border-[#c5a869]/50 flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-5 h-5 text-[#dfb76c] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-serif font-medium text-zinc-100 group-hover:text-[#dfb76c] transition-colors mb-2.5">
                    {area.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {area.shortDesc}
                  </p>
                </div>

                {/* Tags / Subtitle */}
                {area.tags && (
                  <div className="mt-5 pt-4 border-t border-zinc-800/60 flex flex-wrap gap-2 text-[10px] text-zinc-500 font-sans">
                    {area.tags.map((tag, idx) => (
                      <span key={idx} className="tracking-wider uppercase">
                        {tag} {idx < (area.tags?.length || 0) - 1 ? '·' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
