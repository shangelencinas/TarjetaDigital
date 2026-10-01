import React, { useEffect, useRef } from 'react';
import { MessageSquare, Phone, Mail, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ProfileData } from '../data/profileConfig';

interface HeroProps {
  profile: ProfileData;
  onOpenQr: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenQr }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant slow reveal
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo(
        contentRef.current?.querySelectorAll('.hero-anim-item') || [],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.25 }
      );

      gsap.fromTo(
        actionsRef.current?.children || [],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out', delay: 0.7 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [profile]);

  const whatsappUrl = `https://wa.me/${profile.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    profile.whatsappDefaultMessage
  )}`;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center"
    >
      {/* Subtle atmospheric radial spotlight */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-[#c5a869]/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Profile Photograph with luxury double border */}
        <div ref={photoRef} className="relative mb-8 group">
          <div className="relative w-[190px] h-[190px] sm:w-[235px] sm:h-[235px] rounded-full p-[2px] bg-gradient-to-b from-[#dfb76c]/60 via-[#c5a869]/20 to-transparent shadow-2xl">
            <div className="w-full h-full rounded-full p-[3px] bg-[#09090b]">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#121217]">
                <img
                  src={profile.photoUrl}
                  alt={profile.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    // Fallback to elegant monogram avatar
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {/* Fallback Monogram */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1c1c24] to-[#0d0d11] text-[#dfb76c] font-serif text-5xl sm:text-6xl font-light tracking-wider -z-10">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Discreet status indicator */}
          <div
            className="absolute bottom-2 right-3 sm:bottom-2.5 sm:right-4 px-2 py-0.5 rounded-full bg-[#09090b]/90 border border-[#c5a869]/40 flex items-center gap-1.5 shadow-md"
            title="Disponible para reuniones y consultas de negocio"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] tracking-wide text-zinc-300 font-sans">Activo</span>
          </div>
        </div>

        {/* Content Box */}
        <div ref={contentRef} className="space-y-4 max-w-2xl">
          {/* Nombre Completo */}
          <h1 className="hero-anim-item font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-100">
            {profile.fullName}
          </h1>

          {/* Cargo / Especialidad */}
          <p className="hero-anim-item font-sans text-sm sm:text-base tracking-widest text-[#dfb76c] uppercase font-medium">
            {profile.role}
          </p>

          {/* Frase profesional reflexiva */}
          <div className="hero-anim-item pt-1">
            <p className="font-serif italic text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-xl mx-auto">
              &ldquo;{profile.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Direct Action Grid (Mobile-friendly, thumb-accessible) */}
        <div
          ref={actionsRef}
          className="mt-9 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 w-full max-w-md sm:max-w-none px-2"
        >
          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#0f241a] hover:bg-[#133324] border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg hover:shadow-emerald-950/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Call Direct */}
          <a
            href={`tel:${profile.phone}`}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-200 text-xs sm:text-sm font-medium tracking-wide transition-all hover:border-[#c5a869]/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Phone className="w-4 h-4 text-[#dfb76c]" />
            <span>Llamar</span>
          </a>

          {/* Email Direct */}
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-200 text-xs sm:text-sm font-medium tracking-wide transition-all hover:border-[#c5a869]/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Mail className="w-4 h-4 text-[#dfb76c]" />
            <span>Email</span>
          </a>

          {/* LinkedIn Direct */}
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-200 text-xs sm:text-sm font-medium tracking-wide transition-all hover:border-[#c5a869]/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Linkedin className="w-4 h-4 text-[#dfb76c]" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Scroll down indicator */}
        <a
          href="#perfil"
          aria-label="Continuar deslizando para ver perfil"
          className="mt-14 inline-flex flex-col items-center gap-2 text-zinc-500 hover:text-[#dfb76c] transition-colors group cursor-pointer"
        >
          <span className="text-[11px] tracking-widest uppercase font-sans font-medium text-zinc-400 group-hover:text-[#dfb76c]">
            Conocer experiencia
          </span>
          <div className="w-6 h-10 rounded-full border border-zinc-700/80 group-hover:border-[#c5a869]/50 flex items-start justify-center p-1.5 transition-colors">
            <div className="w-1 h-2 rounded-full bg-[#dfb76c] animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
