import React, { useEffect, useState } from 'react';
import { 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Flame, 
  Volume2, 
  TrendingUp, 
  TrendingDown, 
  Clock 
} from 'lucide-react';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';
import { RightHudPanel } from './RightHudPanel';
import { CifraflowInfinityLogo } from './CifraflowInfinityLogo';

interface Phase4ChallengeGameOverProps {
  completedChallengeTitle: string;
  completedChapterNumber: number;
  totalChapters: number;
  pointsEarnedInChallenge: number;
  penaltyErrorsInChallenge: number;
  puntosAcumulados: number;
  racha: number;
  studentName: string;
  onProceedToNextChallenge: () => void;
  isLastChallenge?: boolean;
}

export const Phase4ChallengeGameOver: React.FC<Phase4ChallengeGameOverProps> = ({
  completedChallengeTitle,
  completedChapterNumber,
  totalChapters,
  pointsEarnedInChallenge,
  penaltyErrorsInChallenge,
  puntosAcumulados,
  racha,
  studentName,
  onProceedToNextChallenge,
  isLastChallenge = false
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(6);

  useEffect(() => {
    // Required Audio Announcement
    cyberAudio.playSuccess();
    speechNarrator.speak(
      "GAME OVER. Fin de este reto, vamos al siguiente.",
      true
    );

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onProceedToNextChallenge();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleManualProceed = () => {
    cyberAudio.playBlip();
    onProceedToNextChallenge();
  };

  const isNegative = puntosAcumulados < 0;

  return (
    <div className="fixed inset-0 z-50 bg-[#030712]/95 backdrop-blur-2xl text-slate-100 flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-emerald-500/20 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-xl cyber-glass rounded-3xl p-6 sm:p-8 border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(0,243,255,0.35)] text-center space-y-6 animate-in fade-in zoom-in duration-300">
        
        {/* Central Infinity Logo */}
        <div className="flex justify-center">
          <CifraflowInfinityLogo size="sm" showShield={true} />
        </div>

        {/* REQUIRED BANNER: GAME OVER DE RETO */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400 text-xs font-mono-code font-bold text-cyan-300 tracking-widest uppercase shadow-[0_0_15px_rgba(0,243,255,0.3)]">
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span>TRANSICIÓN OFICIAL DE NIVEL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-cyber font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-white to-[#ff007f]">
            GAME OVER
          </h2>

          <p className="text-sm sm:text-base font-cyber font-bold text-cyan-200 tracking-wide">
            Fin de este reto, vamos al siguiente.
          </p>

          <p className="text-xs font-mono-code text-slate-400">
            Reto superado: "{completedChallengeTitle}" (Nivel {completedChapterNumber} de {totalChapters})
          </p>
        </div>

        {/* Challenge Score Breakdown */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 text-left space-y-3">
          <div className="text-xs font-mono-code font-bold uppercase text-cyan-300 border-b border-slate-800 pb-2 flex items-center justify-between">
            <span>Desglose de Puntos del Reto:</span>
            <span className="text-slate-400 font-normal">Operador: {studentName}</span>
          </div>

          <div className="space-y-1.5 text-xs font-mono-code">
            <div className="flex justify-between items-center text-emerald-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Respuesta Correcta Identificada:</span>
              </span>
              <span className="font-bold">+{pointsEarnedInChallenge > 0 ? pointsEarnedInChallenge : 100} PTS</span>
            </div>

            {penaltyErrorsInChallenge > 0 && (
              <div className="flex justify-between items-center text-rose-400">
                <span className="flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  <span>Penalizaciones por Fallos ({penaltyErrorsInChallenge}):</span>
                </span>
                <span className="font-bold">-{penaltyErrorsInChallenge * 25} PTS</span>
              </div>
            )}

            <div className="flex justify-between items-center text-amber-300">
              <span className="flex items-center gap-1.5">
                <Flame size={14} />
                <span>Racha Consecutiva:</span>
              </span>
              <span className="font-bold">{racha} aciertos</span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
              <span className="text-white">Puntuación Acumulada Global:</span>
              <span className={isNegative ? 'text-rose-400' : 'text-cyan-300'}>
                {puntosAcumulados > 0 ? `+${puntosAcumulados}` : puntosAcumulados} PTS
              </span>
            </div>
          </div>
        </div>

        {/* Countdown & Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            id="btn-proceed-next-challenge"
            onClick={handleManualProceed}
            className="w-full py-3.5 px-6 rounded-xl font-cyber font-bold text-sm tracking-wider text-slate-950 bg-gradient-to-r from-[#00f3ff] via-cyan-400 to-[#38bdf8] hover:brightness-110 active:scale-98 transition shadow-[0_0_25px_rgba(0,243,255,0.4)] flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>{isLastChallenge ? 'FINALIZAR MISIÓN Y VER CERTIFICADO' : 'AVANZAR AL SIGUIENTE RETO'}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs font-mono-code text-slate-400">
            <Clock size={13} className="text-cyan-400 animate-pulse" />
            <span>Avance automático en {secondsRemaining}s</span>
          </div>
        </div>

      </div>
    </div>
  );
};
