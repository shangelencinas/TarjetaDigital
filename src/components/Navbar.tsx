import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Download, QrCode, Menu, X, Share2 } from 'lucide-react';
import { ProfileData, downloadVCard } from '../data/profileConfig';

interface NavbarProps {
  profile: ProfileData;
  onOpenQr: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, onOpenQr }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Perfil', href: '#perfil' },
    { name: 'Áreas', href: '#areas' },
    { name: 'Soluciones', href: '#soluciones' },
    { name: 'Metodología', href: '#metodologia' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-[#c5a869]/15 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Zone: Clean executive monogram & single-line title */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a869]"
        >
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#c5a869]/20 to-[#09090b] border border-[#c5a869]/40 flex items-center justify-center text-[#dfb76c] font-serif text-sm font-semibold tracking-wider group-hover:border-[#c5a869] transition-colors">
            {profile.firstName.charAt(0) || 'E'}
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg tracking-wide text-zinc-100 font-medium group-hover:text-[#dfb76c] transition-colors whitespace-nowrap">
              {profile.fullName}
            </span>
            <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-sans">
              Asesoría Ejecutiva
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[#dfb76c] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#dfb76c] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenQr}
            title="Compartir tarjeta por Código QR"
            aria-label="Compartir tarjeta vía QR"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-[#c5a869]/40 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-[#dfb76c]" />
            <span>QR</span>
          </button>

          <button
            onClick={() => downloadVCard(profile)}
            title="Guardar contacto en la agenda del teléfono"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-semibold text-[#09090b] bg-gradient-to-r from-[#dfb76c] to-[#c5a869] hover:from-[#e8c872] hover:to-[#d4af37] shadow-sm hover:shadow-[#c5a869]/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Guardar Contacto</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenQr}
            aria-label="Ver código QR"
            className="p-2 text-zinc-300 bg-zinc-900/80 rounded border border-zinc-800 hover:text-[#dfb76c]"
          >
            <QrCode className="w-4 h-4 text-[#dfb76c]" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="p-2 text-zinc-300 bg-zinc-900/80 rounded border border-zinc-800 hover:text-[#dfb76c]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0d0d10] border-b border-[#c5a869]/20 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium tracking-wide text-zinc-300 hover:text-[#dfb76c] py-1 border-b border-zinc-800/60"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                downloadVCard(profile);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded text-sm font-semibold text-[#09090b] bg-gradient-to-r from-[#dfb76c] to-[#c5a869]"
            >
              <Download className="w-4 h-4" />
              <span>Guardar en contactos (.vcf)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQr();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded text-sm font-medium text-zinc-300 bg-zinc-900 border border-zinc-700"
            >
              <QrCode className="w-4 h-4 text-[#dfb76c]" />
              <span>Mostrar Código QR</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
