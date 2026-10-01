import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, QrCode } from 'lucide-react';
import { ProfileData } from '../data/profileConfig';

interface FloatingControlsProps {
  profile: ProfileData;
  onOpenQr: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({
  profile,
  onOpenQr,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${profile.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    profile.whatsappDefaultMessage
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating QR Quick Opener */}
      <button
        onClick={onOpenQr}
        aria-label="Abrir código QR de la tarjeta"
        className="pointer-events-auto p-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-[#dfb76c] border border-zinc-700/80 shadow-xl transition-all hover:scale-105 active:scale-95"
        title="Ver código QR para compartir"
      >
        <QrCode className="w-4 h-4 text-[#dfb76c]" />
      </button>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="pointer-events-auto p-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-[#dfb76c] border border-zinc-700/80 shadow-xl transition-all hover:scale-105 active:scale-95 animate-in fade-in zoom-in-75 duration-200"
          title="Volver al inicio"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="pointer-events-auto relative p-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_8px_25px_-4px_rgba(16,185,129,0.5)] transition-all hover:scale-110 active:scale-95 group"
        title="Escribir por WhatsApp"
      >
        {/* Radar ping effect */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500 animate-ping opacity-75" />
        <MessageSquare className="w-5 h-5 fill-white text-white" />
      </a>
    </div>
  );
};
