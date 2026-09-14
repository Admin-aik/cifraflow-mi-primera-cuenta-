import React from 'react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle, 
  Lock, 
  ArrowRight,
  ShieldAlert,
  Compass,
  Radio,
  ExternalLink,
  Users
} from 'lucide-react';
import { Chapter, BankContext } from '../types';
import { GAME_ART_ASSETS, CHARACTERS } from '../assets/gameImages';

interface CyberCityMapProps {
  chapters: Chapter[];
  currentChapterId: number;
  completedChapterIds: number[];
  unlockedAccounts: string[];
  worldEvents: string[];
  onSelectChapter: (chapterId: number) => void;
  onOpenBankPortal: (bankName: string) => void;
  onOpenGallery?: () => void;
}

export const CyberCityMap: React.FC<CyberCityMapProps> = ({
  chapters,
  currentChapterId,
  completedChapterIds,
  unlockedAccounts,
  worldEvents,
  onSelectChapter,
  onOpenBankPortal,
  onOpenGallery
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      
      {/* City Overview Hero Banner with Comic Illustration Backdrop */}
      <div className="cyber-glass rounded-2xl p-5 sm:p-7 border border-cyan-500/30 relative overflow-hidden shadow-2xl">
        {/* Background Comic Panorama */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src={GAME_ART_ASSETS.scenes.city} 
            alt="Neo-Metrópolis Ciudad Cyber" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 uppercase tracking-wider font-semibold">
              <Compass size={14} className="text-[#00f3ff] animate-spin" />
              <span>Mapa Urbano Cuántico • Neo-Metrópolis Cyber-Net</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-cyber font-bold text-white tracking-wide">
              Distrito Financiero Interbancario de Venezuela
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explora los 3 grandes rascacielos bancarios regulados por SUDEBAN. Supera los retos de lectura y lógica para desbloquear acceso a sus agencias virtuales y abrir tus cuentas reales ajustadas a Venezuela.
            </p>

            {/* Character Team Preview */}
            <div className="pt-2 flex items-center gap-2">
              <div className="flex -space-x-2 overflow-hidden">
                {CHARACTERS.map((c) => (
                  <img
                    key={c.id}
                    src={c.avatar}
                    alt={c.name}
                    referrerPolicy="no-referrer"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-cyan-400/60 object-cover"
                    title={`${c.name} (${c.age}) - ${c.role}`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono-code text-cyan-300 font-semibold pl-1">
                4 Cadetes Activos en la Misión
              </span>
              {onOpenGallery && (
                <button
                  id="btn-map-open-gallery"
                  onClick={onOpenGallery}
                  className="text-[11px] font-mono-code text-fuchsia-400 hover:text-fuchsia-300 underline ml-2 cursor-pointer"
                >
                  Ver Cómics
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/85 border border-slate-800 shadow-xl">
            <div className="text-center">
              <div className="text-[10px] uppercase font-mono-code text-slate-400 font-semibold">Cuentas</div>
              <div className="text-base font-cyber font-bold text-cyan-400">{unlockedAccounts.length} / 5</div>
            </div>
            <div className="w-[1px] h-8 bg-slate-850"></div>
            <div className="text-center">
              <div className="text-[10px] uppercase font-mono-code text-slate-400 font-semibold">Capítulos</div>
              <div className="text-base font-cyber font-bold text-fuchsia-400">{completedChapterIds.length} / {chapters.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Bank Skyscraper Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Banco de Venezuela Skyscraper */}
        <div className="cyber-glass rounded-2xl p-5 border border-red-500/40 shadow-[0_0_20px_rgba(200,16,46,0.2)] flex flex-col justify-between space-y-4 hover:border-red-400 transition group relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-red-500/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded font-mono-code text-[11px] font-bold bg-red-950/90 border border-red-500/40 text-red-300">
                0102 • BDV
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </div>

            <div>
              <h3 className="text-lg font-cyber font-bold text-white group-hover:text-red-300 transition flex items-center gap-2">
                <Building2 size={18} className="text-[#c8102e]" />
                <span>Banco de Venezuela</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Líder en inclusión digital, BDVApp, PagoMóvil SMS y red nacional Biopago.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
              <div className="text-[10px] uppercase font-mono-code text-red-400 font-bold">Cuentas Disponibles:</div>
              <ul className="text-slate-300 space-y-0.5">
                <li>• Cuenta Digital BDV / BDVkids</li>
                <li>• Cuenta Digital Juvenil (14-17 años)</li>
                <li>• Cuenta en Moneda Extranjera</li>
              </ul>
            </div>
          </div>

          <button
            id="map-btn-bdv"
            onClick={() => onOpenBankPortal('Banco de Venezuela')}
            className="w-full py-2 px-3 rounded-xl font-cyber text-xs font-bold bg-red-700/30 hover:bg-red-600/50 border border-red-500/50 text-red-200 flex items-center justify-center gap-2 transition"
          >
            <span>Visitar Torre BDV</span>
            <ExternalLink size={13} />
          </button>
        </div>

        {/* Banco Plaza Skyscraper */}
        <div className="cyber-glass rounded-2xl p-5 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col justify-between space-y-4 hover:border-emerald-400 transition group relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded font-mono-code text-[11px] font-bold bg-emerald-950/90 border border-emerald-500/40 text-emerald-300">
                0138 • PLAZA
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <h3 className="text-lg font-cyber font-bold text-white group-hover:text-emerald-300 transition flex items-center gap-2">
                <Building2 size={18} className="text-emerald-400" />
                <span>Banco Plaza</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Atención ágil, Cuenta Verde de custodia en divisas y crédito para jóvenes emprendedores.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
              <div className="text-[10px] uppercase font-mono-code text-emerald-400 font-bold">Cuentas Disponibles:</div>
              <ul className="text-slate-300 space-y-0.5">
                <li>• Tu Cuenta Plaza Tradicional</li>
                <li>• Cuenta Verde en Divisas (Custodia)</li>
                <li>• Plaza Emprendedor Joven</li>
              </ul>
            </div>
          </div>

          <button
            id="map-btn-plaza"
            onClick={() => onOpenBankPortal('Banco Plaza')}
            className="w-full py-2 px-3 rounded-xl font-cyber text-xs font-bold bg-emerald-600/30 hover:bg-emerald-500/50 border border-emerald-500/50 text-emerald-200 flex items-center justify-center gap-2 transition"
          >
            <span>Visitar Torre Plaza</span>
            <ExternalLink size={13} />
          </button>
        </div>

        {/* Banco del Tesoro Skyscraper */}
        <div className="cyber-glass rounded-2xl p-5 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex flex-col justify-between space-y-4 hover:border-amber-400 transition group relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded font-mono-code text-[11px] font-bold bg-amber-950/90 border border-amber-500/40 text-amber-300">
                0163 • TESORO
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </div>

            <div>
              <h3 className="text-lg font-cyber font-bold text-white group-hover:text-amber-300 transition flex items-center gap-2">
                <Building2 size={18} className="text-amber-400" />
                <span>Banco del Tesoro</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Educación financiera comunitaria, primer empleo y trámites públicos.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1 text-xs">
              <div className="text-[10px] uppercase font-mono-code text-amber-400 font-bold">Cuentas Disponibles:</div>
              <ul className="text-slate-300 space-y-0.5">
                <li>• Cuenta Ahorro / Corriente Social</li>
                <li>• Tesoro En Línea & Tesoro Móvil</li>
                <li>• Cuenta Moneda Extranjera Plus</li>
              </ul>
            </div>
          </div>

          <button
            id="map-btn-tesoro"
            onClick={() => onOpenBankPortal('Banco del Tesoro')}
            className="w-full py-2 px-3 rounded-xl font-cyber text-xs font-bold bg-amber-600/30 hover:bg-amber-500/50 border border-amber-500/50 text-amber-200 flex items-center justify-center gap-2 transition"
          >
            <span>Visitar Nodo Tesoro</span>
            <ExternalLink size={13} />
          </button>
        </div>

      </div>

      {/* Chapters Linear Progression Nodes */}
      <div className="cyber-glass rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-cyber text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-[#ff007f]" />
            <span>Misiones de la Aventura Cifraflow</span>
          </h3>
          <span className="text-xs font-mono-code text-slate-400">
            Haz clic en un capítulo para jugar
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {chapters.map((ch) => {
            const isCompleted = completedChapterIds.includes(ch.id);
            const isCurrent = ch.id === currentChapterId;

            return (
              <div
                key={ch.id}
                id={`map-chapter-card-${ch.id}`}
                onClick={() => onSelectChapter(ch.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                  isCurrent
                    ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                    : isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-[11px] font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    CAPÍTULO #{ch.numero}
                  </span>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono-code font-bold">
                      <CheckCircle size={13} />
                      <span>Completado</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono-code font-bold animate-pulse">
                      <Radio size={13} />
                      <span>En Curso</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono-code">
                      <Lock size={12} />
                      <span>Pendiente</span>
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-cyber font-bold text-sm text-white line-clamp-1">
                    {ch.title.split(':')[1] || ch.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {ch.mission_goal}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                  <span>{ch.challenge_type}</span>
                  <span className="text-cyan-400 flex items-center gap-0.5 group-hover:translate-x-1 transition">
                    Jugar <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Holographic World Events Ticker */}
      {worldEvents.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-fuchsia-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#ff007f] font-bold uppercase tracking-wider">
            <ShieldAlert size={14} />
            <span>Registro de Eventos del Mundo (World Events):</span>
          </div>
          <div className="space-y-1 text-xs text-slate-300 font-mono-code">
            {worldEvents.map((evt, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[#00f3ff]">▸</span>
                <span>{evt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
