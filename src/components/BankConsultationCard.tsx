import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  CreditCard,
  X
} from 'lucide-react';
import { BankConsultationInfo, BankContext } from '../types';
import { BankCardVisual } from './BankCardVisual';

interface BankConsultationCardProps {
  bankInfo: BankConsultationInfo;
  onClose?: () => void;
  onOpenBankPortal?: (bankName: string) => void;
  isModal?: boolean;
}

export const BankConsultationCard: React.FC<BankConsultationCardProps> = ({
  bankInfo,
  onClose,
  onOpenBankPortal,
  isModal = false
}) => {
  if (!bankInfo.show_info_card) return null;

  const getThemeClasses = () => {
    switch (bankInfo.colorTheme) {
      case 'red':
        return {
          border: 'border-red-500/50',
          glow: 'shadow-[0_0_25px_rgba(200,16,46,0.25)]',
          badge: 'bg-red-950/80 border-red-500/50 text-red-300',
          accent: 'text-red-400',
          button: 'bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white shadow-[0_0_12px_rgba(200,16,46,0.35)]'
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/40',
          glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
          badge: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300',
          accent: 'text-emerald-400',
          button: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]'
        };
      case 'amber':
        return {
          border: 'border-amber-500/40',
          glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
          badge: 'bg-amber-950/80 border-amber-500/50 text-amber-300',
          accent: 'text-amber-400',
          button: 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.3)] font-bold'
        };
      case 'fuchsia':
        return {
          border: 'border-fuchsia-500/40',
          glow: 'shadow-[0_0_20px_rgba(255,0,127,0.2)]',
          badge: 'bg-fuchsia-950/80 border-fuchsia-500/50 text-fuchsia-300',
          accent: 'text-[#ff007f]',
          button: 'bg-gradient-to-r from-fuchsia-600 to-[#ff007f] hover:from-fuchsia-500 hover:to-pink-500 text-white shadow-[0_0_12px_rgba(255,0,127,0.3)]'
        };
      default:
        return {
          border: 'border-cyan-500/40',
          glow: 'shadow-[0_0_20px_rgba(0,243,255,0.2)]',
          badge: 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300',
          accent: 'text-[#00f3ff]',
          button: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_12px_rgba(0,243,255,0.3)]'
        };
    }
  };

  const theme = getThemeClasses();

  // Resolve matching BankContext
  let bankContext: BankContext = 'Banco de Venezuela';
  if (bankInfo.bank_name.toLowerCase().includes('plaza')) {
    bankContext = 'Banco Plaza';
  } else if (bankInfo.bank_name.toLowerCase().includes('tesoro')) {
    bankContext = 'Banco del Tesoro';
  }

  const content = (
    <div className={`cyber-glass rounded-2xl p-5 sm:p-6 border ${theme.border} ${theme.glow} space-y-5 relative`}>
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded font-mono-code text-[11px] font-bold uppercase tracking-wider border ${theme.badge}`}>
              Código: {bankInfo.code || 'SUDEBAN'}
            </span>
            <span className="text-xs font-mono-code text-slate-400">
              Ficha Pedagógica Oficial
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-cyber font-bold text-white flex items-center gap-2">
            <Building2 className={theme.accent} size={20} />
            <span>{bankInfo.bank_name}</span>
          </h3>
          {bankInfo.tagline && (
            <p className="text-xs text-slate-300 italic">
              "{bankInfo.tagline}"
            </p>
          )}
        </div>

        {onClose && (
          <button
            id="btn-close-bank-card"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Real Debit Card Visual Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono-code text-slate-300">
          <span className="flex items-center gap-1.5 font-bold uppercase text-slate-200">
            <CreditCard size={14} className={theme.accent} />
            Tarjeta de Débito Oficial (Colores Reales Web):
          </span>
          <span className="text-[10px] text-slate-400">SUDEBAN Certificada</span>
        </div>
        
        <div className="max-w-md mx-auto transform hover:scale-[1.02] transition-transform">
          <BankCardVisual bank={bankContext} isCompact={false} />
        </div>
      </div>

      {/* Account Type Spotlight */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
        <div className="text-[11px] uppercase font-mono-code text-slate-400 font-semibold flex items-center gap-1.5">
          <CreditCard size={13} className={theme.accent} />
          <span>Tipo de Cuenta Destacada:</span>
        </div>
        <p className="font-cyber font-bold text-sm sm:text-base text-white">
          {bankInfo.account_type}
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="space-y-2">
        <div className="text-xs uppercase font-mono-code font-bold text-cyan-300 flex items-center gap-1.5">
          <Sparkles size={13} />
          <span>Beneficios Clave para el Usuario:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {bankInfo.benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start gap-2 text-xs text-slate-200"
            >
              <CheckCircle2 size={15} className={`flex-shrink-0 mt-0.5 ${theme.accent}`} />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-2">
        <div className="text-xs uppercase font-mono-code font-bold text-fuchsia-300 flex items-center gap-1.5">
          <FileText size={13} />
          <span>Requisitos Exigidos para Apertura:</span>
        </div>
        <ul className="space-y-1.5">
          {bankInfo.requirements.map((req, idx) => (
            <li 
              key={idx}
              className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60 flex items-center gap-2 text-xs text-slate-300 font-mono-code"
            >
              <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Footer */}
      {onOpenBankPortal && (
        <div className="pt-2 flex items-center justify-end">
          <button
            id="btn-enter-virtual-branch"
            onClick={() => onOpenBankPortal(bankInfo.bank_name)}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl font-cyber text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${theme.button}`}
          >
            <span>Ingresar a la Agencia Virtual</span>
            <ExternalLink size={14} />
          </button>
        </div>
      )}

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
