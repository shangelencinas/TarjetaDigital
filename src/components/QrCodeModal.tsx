import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Download, QrCode as QrIcon, Share2 } from 'lucide-react';
import { ProfileData, downloadVCard } from '../data/profileConfig';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose, profile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Use current URL
    const url = window.location.href;
    const canvas = canvasRef.current;
    if (canvas) {
      QRCode.toCanvas(
        canvas,
        url,
        {
          width: 220,
          margin: 2,
          color: {
            dark: '#09090b',
            light: '#fdfbf7',
          },
        },
        (error) => {
          if (error) console.error('Error generating QR code', error);
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownloadQr = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `tarjeta_qr_${profile.firstName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm rounded-2xl bg-[#0f0f14] border border-[#c5a869]/40 p-6 text-center shadow-2xl space-y-5"
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="w-10 h-10 rounded-full bg-[#181820] border border-[#c5a869]/30 flex items-center justify-center mx-auto mb-2 text-[#dfb76c]">
            <QrIcon className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-medium text-zinc-100">
            Tarjeta Digital Interactiva
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Escanea con la cámara de tu smartphone para abrir al instante
          </p>
        </div>

        {/* QR Canvas Box */}
        <div className="p-3 rounded-xl bg-white/95 border border-[#dfb76c]/40 inline-block shadow-inner mx-auto">
          <canvas ref={canvasRef} className="rounded" />
        </div>

        {/* Owner Info Preview */}
        <div className="pt-1">
          <p className="font-serif text-base text-zinc-200 font-medium">{profile.fullName}</p>
          <p className="text-[11px] text-[#dfb76c] font-sans uppercase tracking-wider">{profile.role}</p>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">¡Enlace copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#dfb76c]" />
                <span>Copiar enlace de tarjeta</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              downloadVCard(profile);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-[#09090b] bg-gradient-to-r from-[#dfb76c] to-[#c5a869] hover:from-[#e8c872] hover:to-[#d4af37] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar archivo de contacto (.vcf)</span>
          </button>

          <button
            onClick={handleDownloadQr}
            className="w-full flex items-center justify-center gap-2 py-2 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Share2 className="w-3 h-3" />
            <span>Descargar imagen QR en PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
