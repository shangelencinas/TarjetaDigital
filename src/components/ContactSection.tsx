import React, { useState } from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Linkedin,
  Download,
  Building,
  MapPin,
  Globe,
  Send,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { ProfileData, downloadVCard } from '../data/profileConfig';

interface ContactSectionProps {
  profile: ProfileData;
  onOpenQr: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onOpenQr }) => {
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTopic, setFormTopic] = useState('Diagnóstico empresarial');
  const [formNotes, setFormNotes] = useState('');
  const [isSent, setIsSent] = useState(false);

  const whatsappBaseUrl = `https://wa.me/${profile.whatsappNumber.replace(/\D/g, '')}`;

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Nueva Consulta Ejecutiva*\n\n*Nombre:* ${formName || 'No especificado'}\n*Empresa:* ${formCompany || 'No especificada'}\n*Teléfono:* ${formPhone || 'No especificado'}\n*Tema de interés:* ${formTopic}\n*Mensaje:* ${formNotes || 'Me gustaría agendar una llamada exploratoria.'}`;
    const url = `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSent(true);
  };

  return (
    <section
      id="contacto"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#09090b]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[11px] font-sans font-semibold tracking-widest text-[#dfb76c] uppercase mb-2">
            Contacto Directo & Confidencial
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-zinc-100 tracking-tight">
            Conversemos
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-4 font-light leading-relaxed">
            Si estás buscando orientación para tomar mejores decisiones financieras o empresariales, podemos conversar sobre tu proyecto.
          </p>
          <div className="w-12 h-[1px] bg-[#c5a869]/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Action Executive Digital Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#121217] to-[#0c0c0f] border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a869]/5 rounded-bl-full pointer-events-none" />

            {/* Profile Brief */}
            <div className="flex items-center gap-4 pb-6 border-b border-zinc-800/80">
              <div className="w-14 h-14 rounded-full p-[1px] bg-[#dfb76c]/40 shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 flex items-center justify-center text-[#dfb76c] font-serif text-xl font-medium">
                  {profile.photoUrl ? (
                    <img
                      src={profile.photoUrl}
                      alt={profile.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span>{profile.firstName.charAt(0)}{profile.lastName.charAt(0)}</span>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-zinc-100">
                  {profile.fullName}
                </h3>
                <p className="text-xs text-[#dfb76c] font-sans font-medium uppercase tracking-wide">
                  {profile.role}
                </p>
                <p className="text-[11px] text-zinc-400 font-light mt-0.5">
                  {profile.companyName}
                </p>
              </div>
            </div>

            {/* Action buttons list */}
            <div className="mt-6 space-y-3">
              {/* WhatsApp */}
              <a
                href={`${whatsappBaseUrl}?text=${encodeURIComponent(profile.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-lg bg-[#0f241a] hover:bg-[#133324] border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide transition-all shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Mensaje directo por WhatsApp</span>
                </div>
                <span className="text-[10px] text-emerald-400/80 font-normal uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  Abrir chat &rarr;
                </span>
              </a>

              {/* Call */}
              <a
                href={`tel:${profile.phone}`}
                className="w-full flex items-center justify-between p-3.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-700/60 hover:border-[#c5a869]/40 text-zinc-200 text-xs font-medium tracking-wide transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#dfb76c]" />
                  <span>Llamada telefónica</span>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">
                  {profile.phoneDisplay}
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="w-full flex items-center justify-between p-3.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-700/60 hover:border-[#c5a869]/40 text-zinc-200 text-xs font-medium tracking-wide transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#dfb76c]" />
                  <span>Correo electrónico</span>
                </div>
                <span className="text-[11px] text-zinc-400 truncate max-w-[140px]">
                  {profile.email}
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-700/60 hover:border-[#c5a869]/40 text-zinc-200 text-xs font-medium tracking-wide transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-[#dfb76c]" />
                  <span>Perfil en LinkedIn</span>
                </div>
                <span className="text-[11px] text-[#dfb76c] group-hover:underline">
                  Ver perfil &rarr;
                </span>
              </a>
            </div>

            {/* Share QR CTA */}
            <div className="mt-6 pt-5 border-t border-zinc-800/80">
              <button
                onClick={onOpenQr}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold tracking-wide text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-[#c5a869]/50 transition-all cursor-pointer shadow-md"
              >
                <Share2 className="w-4 h-4 text-[#dfb76c]" />
                <span>Compartir tarjeta mediante código QR</span>
              </button>
            </div>
          </div>

          {/* Right Column: Fast Consultation Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#101015]/80 border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-xl">
            <h3 className="font-serif text-xl font-medium text-zinc-100 mb-2">
              Solicitud de sesión exploratoria
            </h3>
            <p className="text-xs text-zinc-400 font-light mb-6">
              Envía los datos de tu empresa para preparar una conversación enfocada y productiva.
            </p>

            {isSent ? (
              <div className="p-6 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-lg text-emerald-200">
                  ¡Mensaje preparado con éxito!
                </h4>
                <p className="text-xs text-zinc-300">
                  Se ha generado el enlace para continuar la conversación directa por WhatsApp.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="text-xs text-[#dfb76c] underline hover:text-[#f5e6c8]"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ej. Ing. Carlos Mendoza"
                      className="w-full px-3.5 py-2.5 rounded bg-zinc-900/90 border border-zinc-700/80 text-xs text-zinc-100 focus:outline-none focus:border-[#c5a869] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                      Empresa / Organización
                    </label>
                    <input
                      type="text"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      placeholder="Ej. Grupo Industrial del Norte"
                      className="w-full px-3.5 py-2.5 rounded bg-zinc-900/90 border border-zinc-700/80 text-xs text-zinc-100 focus:outline-none focus:border-[#c5a869] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+52 (55) 1234-5678"
                      className="w-full px-3.5 py-2.5 rounded bg-zinc-900/90 border border-zinc-700/80 text-xs text-zinc-100 focus:outline-none focus:border-[#c5a869] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                      Área o solución de interés
                    </label>
                    <select
                      value={formTopic}
                      onChange={(e) => setFormTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded bg-zinc-900/90 border border-zinc-700/80 text-xs text-zinc-100 focus:outline-none focus:border-[#c5a869] transition-colors"
                    >
                      <optgroup label="Consultoría Empresarial (Principal)">
                        <option value="Diagnóstico empresarial integral">Diagnóstico empresarial integral</option>
                        <option value="Estrategia de crecimiento y escalamiento">Estrategia de crecimiento y escalamiento</option>
                        <option value="Acompañamiento a la alta dirección">Acompañamiento a la alta dirección</option>
                        <option value="Desarrollo de negocios y alianzas">Desarrollo de negocios y alianzas</option>
                      </optgroup>
                      <optgroup label="Asesoría Financiera">
                        <option value="Planeación financiera y liquidez">Planeación financiera y liquidez</option>
                        <option value="Gestión de crédito empresarial y banca">Gestión de crédito empresarial y banca</option>
                        <option value="Optimización y refinanciamiento de pasivos">Optimización y refinanciamiento de pasivos</option>
                      </optgroup>
                      <option value="Otra consulta estratégica">Otra consulta estratégica</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans font-medium uppercase tracking-wider text-zinc-400 mb-1.5">
                    Breve descripción de la necesidad (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Describe brevemente el contexto o situación financiera de tu interés..."
                    className="w-full px-3.5 py-2.5 rounded bg-zinc-900/90 border border-zinc-700/80 text-xs text-zinc-100 focus:outline-none focus:border-[#c5a869] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded text-xs font-semibold tracking-wide text-zinc-100 bg-[#162a20] hover:bg-[#1d3b2b] border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Enviar consulta por WhatsApp</span>
                </button>

                <p className="text-[11px] text-zinc-400 text-center font-light pt-1">
                  Tratamiento confidencial de la información bajo rigurosos estándares profesionales.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
