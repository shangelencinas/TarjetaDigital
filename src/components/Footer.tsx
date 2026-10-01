import React from 'react';
import { ProfileData } from '../data/profileConfig';

interface FooterProps {
  profile: ProfileData;
  onOpenQr: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenQr }) => {
  return (
    <footer className="border-t border-zinc-900 bg-[#060608] py-12 px-4 sm:px-6 lg:px-8 text-zinc-500 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-2.5">
            <span className="font-serif text-base text-zinc-200 font-medium tracking-wide whitespace-nowrap">
              {profile.fullName}
            </span>
            <span aria-hidden="true" className="hidden md:inline text-zinc-700">·</span>
            <span className="text-[11px] text-[#dfb76c] font-sans uppercase tracking-wider whitespace-nowrap">
              {profile.role}
            </span>
          </div>
        </div>

        {/* Quick Footer Links */}
        <div className="flex items-center gap-5 text-xs text-zinc-400">
          <button
            onClick={onOpenQr}
            className="hover:text-[#dfb76c] transition-colors cursor-pointer"
          >
            Código QR
          </button>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#dfb76c] transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* Legal notice & copyright */}
        <div className="text-center md:text-right text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} {profile.fullName}. Confidencialidad y reserva profesional.</p>
        </div>
      </div>
    </footer>
  );
};
