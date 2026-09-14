import React from 'react';
import { Trophy, AlertTriangle, Flame, ShieldAlert, Award, TrendingDown, TrendingUp, Volume2 } from 'lucide-react';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';

interface RightHudPanelProps {
  puntosAcumulados: number;
  puntosNivelActual: number;
  racha: number;
  totalErrores: number;
  totalAciertos: number;
  capituloActual: number;
  isFloating?: boolean;
}

export const RightHudPanel: React.FC<RightHudPanelProps> = ({
  puntosAcumulados,
  puntosNivelActual,
  racha,
  totalErrores,
  totalAciertos,
  capituloActual,
  isFloating = false
}) => {
  const isNegative = puntosAcumulados < 0;
  const isNivelNegative = puntosNivelActual < 0;

  const handleSpeakScore = () => {
    cyberAudio.playBlip();
    if (isNegative) {
      speechNarrator.speak(
        `Alerta de telemetría: Puntuación acumulada en negativo: ${puntosAcumulados} puntos, debido a ${totalErrores} penalizaciones. Recuerda que los fallos restan 25 a 50 puntos. ¡Continúa analizando las lecturas para recuperarte!`,
        true
      );
    } else {
      speechNarrator.speak(
        `Telemetría del HUD: Puntuación acumulada global: ${puntosAcumulados} puntos. Puntos en este nivel: ${puntosNivelActual} puntos. Racha de aciertos: ${racha}.`,
        true
      );
    }
  };

  return (
    <div
      id="right_hud_panel"
      onClick={handleSpeakScore}
      className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 select-none cursor-pointer group backdrop-blur-xl ${
        isNegative
          ? 'bg-[#1a050d]/90 border-rose-500/70 shadow-[0_0_25px_rgba(244,63,94,0.35)] ring-1 ring-rose-500/40'
          : 'bg-[#060b1e]/90 border-cyan-500/40 shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:border-cyan-400'
      } ${isFloating ? 'fixed top-20 right-4 z-40 max-w-xs' : 'w-full'}`}
      title="Recuadro Derecho de Puntuación Acumulativa (Permite valores negativos) - Clic para escuchar"
    >
      {/* Top Header Label */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full animate-ping bg-cyan-400" />
          <span className="text-[10px] sm:text-[11px] font-mono-code font-bold uppercase tracking-widest text-cyan-300">
            HUD PUNTUACIÓN GLOBAL
          </span>
        </div>
        <Volume2 size={13} className="text-cyan-400 group-hover:scale-110 transition-transform" />
      </div>

      {/* Main Cumulative Score Badge */}
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <span className="text-[11px] font-mono-code text-slate-400">Total Acumulado:</span>
        <div className="flex items-center gap-1.5">
          {isNegative ? (
            <TrendingDown size={18} className="text-rose-400 animate-pulse" />
          ) : (
            <TrendingUp size={18} className="text-emerald-400" />
          )}
          <span
            className={`font-cyber font-extrabold text-xl sm:text-2xl tracking-wider ${
              isNegative
                ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-emerald-300'
            }`}
          >
            {puntosAcumulados > 0 ? `+${puntosAcumulados}` : puntosAcumulados} PTS
          </span>
        </div>
      </div>

      {/* Warning Alert if Negative */}
      {isNegative && (
        <div className="mb-2.5 px-2 py-1 rounded-lg bg-rose-950/60 border border-rose-500/40 text-[10px] font-mono-code text-rose-300 flex items-center gap-1.5">
          <AlertTriangle size={12} className="text-rose-400 flex-shrink-0" />
          <span>¡Saldo negativo por fallos! Revisa la lectura para sumar aciertos.</span>
        </div>
      )}

      {/* Level Breakdown & Stats Grid */}
      <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/10 text-[10px] font-mono-code">
        {/* Nivel Actual Points */}
        <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="text-slate-400 text-[9px] uppercase">Reto Actual:</div>
          <div className={`font-bold ${isNivelNegative ? 'text-rose-400' : 'text-cyan-300'}`}>
            {puntosNivelActual > 0 ? `+${puntosNivelActual}` : puntosNivelActual} PTS
          </div>
        </div>

        {/* Racha */}
        <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="text-slate-400 text-[9px] uppercase">Racha Activa:</div>
          <div className="font-bold text-amber-300 flex items-center gap-1">
            <Flame size={11} className="text-amber-400" />
            <span>{racha}</span>
          </div>
        </div>

        {/* Total Hits */}
        <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="text-slate-400 text-[9px] uppercase">Aciertos:</div>
          <div className="font-bold text-emerald-400">
            {totalAciertos} (+100/150)
          </div>
        </div>

        {/* Total Penalties */}
        <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="text-slate-400 text-[9px] uppercase">Penalizaciones:</div>
          <div className="font-bold text-rose-400">
            {totalErrores} (-25/-50)
          </div>
        </div>
      </div>
    </div>
  );
};
