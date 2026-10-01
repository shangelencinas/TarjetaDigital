/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { initialProfileData, ProfileData } from './data/profileConfig';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProfileSection } from './components/ProfileSection';
import { AreasSection } from './components/AreasSection';
import { SolutionsSection } from './components/SolutionsSection';
import { MethodologySection } from './components/MethodologySection';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QrCodeModal } from './components/QrCodeModal';
import { FloatingControls } from './components/FloatingControls';

export default function App() {
  const [profile] = useState<ProfileData>(initialProfileData);
  const [isQrOpen, setIsQrOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f6] selection:bg-[#c5a869]/30 selection:text-[#f4f4f6] overflow-x-hidden">
      {/* Three.js Subtle Ambient Background (Golden Filaments & Particles) */}
      <ThreeCanvas />

      {/* Main Content Area */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <Navbar
          profile={profile}
          onOpenQr={() => setIsQrOpen(true)}
        />

        <main>
          {/* 1. Hero / Presentación */}
          <Hero
            profile={profile}
            onOpenQr={() => setIsQrOpen(true)}
          />

          {/* 2. Perfil Profesional */}
          <ProfileSection profile={profile} />

          {/* 3. Áreas de Experiencia */}
          <AreasSection areas={profile.expertiseAreas} />

          {/* 5. Soluciones para tu empresa */}
          <SolutionsSection
            solutions={profile.solutions}
            profile={profile}
          />

          {/* 6. Metodología de Trabajo */}
          <MethodologySection methodology={profile.methodology} />

          {/* 7. Experiencia y Logros (Indicadores) */}
          <StatsSection stats={profile.stats} />

          {/* 8. Testimonios */}
          <TestimonialsSection testimonials={profile.testimonials} />

          {/* 9. Contacto & vCard Generator */}
          <ContactSection
            profile={profile}
            onOpenQr={() => setIsQrOpen(true)}
          />
        </main>

        {/* Footer */}
        <Footer
          profile={profile}
          onOpenQr={() => setIsQrOpen(true)}
        />
      </div>

      {/* QR Code Sharing Modal */}
      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        profile={profile}
      />

      {/* Floating Controls: WhatsApp, Back to Top, QR Quick Opener */}
      <FloatingControls
        profile={profile}
        onOpenQr={() => setIsQrOpen(true)}
      />
    </div>
  );
}
