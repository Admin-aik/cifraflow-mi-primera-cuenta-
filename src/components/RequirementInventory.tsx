import React, { useState } from 'react';
import { 
  BadgeCheck, 
  FileText, 
  GraduationCap, 
  Users, 
  Fingerprint, 
  Coins, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Building2,
  X,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { RequirementItem, BankAccountProduct } from '../types';
import { CHARACTERS } from '../assets/gameImages';

interface RequirementInventoryProps {
  allRequirements: RequirementItem[];
  collectedRequirementNames: string[];
  bankProducts: BankAccountProduct[];
  selectedCharacterId?: string;
  characterAlias?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export const RequirementInventory: React.FC<RequirementInventoryProps> = ({
  allRequirements,
  collectedRequirementNames,
  bankProducts,
  selectedCharacterId = 'kael',
  characterAlias,
  onClose,
  isModal = false
}) => {
  const [selectedReq, setSelectedReq] = useState<RequirementItem | null>(null);
  const activeCadet = CHARACTERS.find(c => c.id === selectedCharacterId) || CHARACTERS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BadgeCheck': return <BadgeCheck className="text-cyan-400" size={22} />;
      case 'FileText': return <FileText className="text-emerald-400" size={22} />;
      case 'GraduationCap': return <GraduationCap className="text-indigo-400" size={22} />;
      case 'Users': return <Users className="text-amber-400" size={22} />;
      case 'Fingerprint': return <Fingerprint className="text-[#ff007f]" size={22} />;
      case 'Coins': return <Coins className="text-yellow-400" size={22} />;
      default: return <ShieldCheck className="text-cyan-400" size={22} />;
    }
  };

  const content = (
    <div className="cyber-glass rounded-2xl p-5 sm:p-7 border border-fuchsia-500/30 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#ff007f] font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Cyber-Wallet • Expediente Digital Bancario</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-cyber font-bold text-white mt-1">
            Requisitos Recolectados para Apertura
          </h2>
          <p className="text-xs text-slate-400">
            Documentación exigida por la normativa SUDEBAN en Venezuela para personas naturales y jóvenes.
          </p>
        </div>

        {onClose && (
          <button
            id="btn-close-wallet"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Cadet Official Passport ID Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 p-4 relative overflow-hidden shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.4)] flex-shrink-0 bg-slate-950">
            <img 
              src={activeCadet.avatar} 
              alt={activeCadet.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span className="font-cyber font-bold text-white text-base">
                {characterAlias || activeCadet.name}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                {activeCadet.badge}
              </span>
            </div>
            <div className="text-xs font-mono-code text-slate-400">
              Edad: <strong className="text-cyan-200">{activeCadet.age}</strong> • Rol: <strong className="text-slate-300">{activeCadet.role}</strong>
            </div>
            <div className="text-[11px] text-slate-400 italic">
              "{activeCadet.quote}"
            </div>
          </div>
        </div>

        <div className="text-center sm:text-right p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[10px] font-mono-code uppercase text-slate-400">Estado SUDEBAN</div>
          <div className="text-xs font-mono-code font-bold text-emerald-400 flex items-center gap-1 justify-center sm:justify-end">
            <ShieldCheck size={13} />
            <span>Cadete Acreditado</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono-code">
          <span className="text-slate-300">Progreso del Expediente:</span>
          <span className="font-bold text-cyan-400">
            {collectedRequirementNames.length} de {allRequirements.length} completados
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-850 p-[1px]">
          <div 
            className="h-full bg-gradient-to-r from-[#00f3ff] to-[#ff007f] rounded-full transition-all duration-500 shadow-[0_0_10px_#00f3ff]"
            style={{ width: `${(collectedRequirementNames.length / allRequirements.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Requirements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {allRequirements.map((req) => {
          const isCollected = collectedRequirementNames.includes(req.nombre);

          return (
            <div
              key={req.id}
              id={`req-card-${req.id}`}
              onClick={() => setSelectedReq(req)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                isCollected
                  ? 'bg-slate-900/90 border-cyan-500/40 shadow-[0_0_15px_rgba(0,243,255,0.15)] hover:border-cyan-400'
                  : 'bg-slate-950/50 border-slate-850 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  {getIcon(req.icono)}
                </div>

                {isCollected ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    <span>Verificado</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code text-slate-500 bg-slate-900 border border-slate-800 flex items-center gap-1">
                    <Lock size={10} />
                    <span>Bloqueado</span>
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-cyber font-bold text-sm text-white">
                  {req.nombre}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {req.descripcion}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                <span>{req.entidadEmisora}</span>
                <span className="text-cyan-400 text-[10px]">Ver detalles</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Requirement Detail Modal/Drawer */}
      {selectedReq && (
        <div className="p-4 rounded-xl bg-slate-950/95 border border-cyan-500/40 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <h4 className="font-cyber font-bold text-base text-white flex items-center gap-2">
              {getIcon(selectedReq.icono)}
              <span>{selectedReq.nombre}</span>
            </h4>
            <button
              onClick={() => setSelectedReq(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cerrar
            </button>
          </div>
          <p className="text-xs text-slate-300">
            {selectedReq.descripcion}
          </p>
          <div className="space-y-1">
            <div className="text-[11px] font-mono-code uppercase text-cyan-400 font-bold">
              Criterios de Validez Oficial (SUDEBAN / SENIAT):
            </div>
            <ul className="text-xs text-slate-300 space-y-1">
              {selectedReq.detalles.map((d, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#ff007f]">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Bank Account Eligibility Check */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
        <h3 className="font-cyber text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <Building2 size={16} className="text-cyan-400" />
          <span>Elegibilidad para Apertura de Cuentas:</span>
        </h3>

        <div className="space-y-2">
          {bankProducts.map((prod) => {
            const hasAllReqs = prod.requisitosMinimos.every(reqName => 
              collectedRequirementNames.some(c => c.toLowerCase().includes(reqName.toLowerCase()) || reqName.toLowerCase().includes(c.toLowerCase()))
            );

            return (
              <div 
                key={prod.id}
                className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="font-cyber font-bold text-white flex items-center gap-1.5">
                    <span>{prod.nombre}</span>
                    <span className="text-[10px] font-mono-code text-cyan-400">({prod.codigoBanco})</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Requisitos requeridos: {prod.requisitosMinimos.join(', ')}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {hasAllReqs ? (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-mono-code font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      <span>Elegible para Abrir</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 font-mono-code">
                      Faltan Requisitos
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
