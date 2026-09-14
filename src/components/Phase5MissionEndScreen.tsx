import React, { useRef } from 'react';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  Download, 
  RotateCcw, 
  User, 
  GraduationCap, 
  CreditCard, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  Building2, 
  TrendingUp, 
  Coins, 
  ShieldAlert, 
  BookOpen 
} from 'lucide-react';
import { StudentProfile } from '../types';
import { CHARACTERS, getCharacterById } from '../assets/gameImages';
import { CifraflowInfinityLogo } from './CifraflowInfinityLogo';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';

interface Phase5MissionEndScreenProps {
  studentProfile: StudentProfile;
  selectedCharacterId: string;
  puntosAcumulados: number;
  totalAciertos: number;
  totalErrores: number;
  rachaMaxima: number;
  saldoUsd: number;
  saldoBs: string;
  onRestartSimulation: () => void;
}

export const Phase5MissionEndScreen: React.FC<Phase5MissionEndScreenProps> = ({
  studentProfile,
  selectedCharacterId,
  puntosAcumulados,
  totalAciertos,
  totalErrores,
  rachaMaxima,
  saldoUsd,
  saldoBs,
  onRestartSimulation
}) => {
  const cadet = getCharacterById(selectedCharacterId);
  const certificateRef = useRef<HTMLDivElement>(null);

  const totalIntentos = totalAciertos + totalErrores;
  const precision = totalIntentos > 0 ? Math.round((totalAciertos / totalIntentos) * 100) : 100;

  const currentDate = new Date().toLocaleDateString('es-VE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    cyberAudio.playSuccess();
    window.print();
  };

  const handleSpeakSummary = () => {
    cyberAudio.playBlip();
    speechNarrator.speak(
      `Fin de la misión. ¡Felicitaciones, estudiante ${studentProfile.name}! Has completado la simulación oficial CifraFlow Financiero con una puntuación final de ${puntosAcumulados} puntos y una precisión del ${precision} por ciento. Se ha expedido tu Certificado Digital de Competencias Financieras y Tecnológicas.`,
      true
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#ff007f] selection:text-white p-4 sm:p-6 md:p-8">
      
      {/* Background Cyber Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-cyan-500/15 via-emerald-500/15 to-purple-500/15 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full space-y-8 my-auto">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono-code font-bold text-emerald-300 tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.3)]">
            <Sparkles size={14} className="text-emerald-400 animate-spin" />
            <span>FASE 5 — EVALUACIÓN FINAL & CERTIFICACIÓN DIGITAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-cyber font-black tracking-tight text-white">
            ¡Misión <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-emerald-300 to-[#ff007f]">Completada!</span>
          </h1>

          <p className="text-xs sm:text-sm font-sans text-slate-300 max-w-xl mx-auto">
            Has demostrado tu capacidad de análisis crítico, comprensión lectora y dominio de herramientas FinTech reales.
          </p>

          <button
            onClick={handleSpeakSummary}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-cyber hover:bg-cyan-950 transition cursor-pointer"
          >
            <span>Escuchar Evaluación de la Misión</span>
          </button>
        </div>

        {/* Score Card General */}
        <div className="cyber-glass rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-[0_0_35px_rgba(0,243,255,0.2)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Trophy size={24} className="text-amber-400" />
              <div>
                <h3 className="font-cyber font-bold text-lg text-white">
                  SCORE CARD GENERAL DEL ESTUDIANTE
                </h3>
                <p className="text-xs font-mono-code text-slate-400">
                  Rendimiento acumulado a través de los desafíos de CifraFlow
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono-code text-slate-400">Puntuación Final:</span>
              <div className={`font-cyber font-black text-2xl sm:text-3xl ${puntosAcumulados < 0 ? 'text-rose-400' : 'text-cyan-300'}`}>
                {puntosAcumulados > 0 ? `+${puntosAcumulados}` : puntosAcumulados} PTS
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Aciertos Totales</div>
              <div className="font-cyber font-bold text-xl text-emerald-400 mt-1">{totalAciertos}</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Penalizaciones</div>
              <div className="font-cyber font-bold text-xl text-rose-400 mt-1">{totalErrores}</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Precisión de Análisis</div>
              <div className="font-cyber font-bold text-xl text-cyan-300 mt-1">{precision}%</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] font-mono-code uppercase text-slate-400">Capital Acumulado</div>
              <div className="font-cyber font-bold text-base text-amber-300 mt-1">${saldoUsd} / Bs.{saldoBs}</div>
            </div>
          </div>
        </div>

        {/* CERTIFICADO DIGITAL DE COMPETENCIAS */}
        <div 
          ref={certificateRef}
          id="digital-certificate-print-area"
          className="relative rounded-3xl p-8 sm:p-10 border-4 border-cyan-400/80 bg-gradient-to-b from-[#05091a] to-[#0a1233] text-slate-100 shadow-[0_0_50px_rgba(0,243,255,0.3)] space-y-6"
        >
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <CifraflowInfinityLogo size="xl" showShield={false} animate={false} />
          </div>

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-cyan-500/40 pb-6">
            <div className="flex items-center gap-3">
              <CifraflowInfinityLogo size="sm" showShield={true} />
              <div>
                <h4 className="font-cyber font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff007f]">
                  CIFRAFLOW FINANCIERO
                </h4>
                <p className="text-[10px] font-mono-code text-cyan-300 tracking-wider uppercase">
                  Ecosistema de Simulación y Educación FinTech
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-400 text-emerald-300 text-[11px] font-mono-code font-bold">
                CERTIFICADO OFICIAL VERIFICADO
              </span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-4 py-4">
            <p className="text-xs font-mono-code uppercase tracking-widest text-slate-400">
              Certifica formalmente que el estudiante operador:
            </p>

            <h2 className="text-2xl sm:text-4xl font-cyber font-extrabold text-white tracking-wide underline decoration-cyan-400 decoration-2 underline-offset-8">
              {studentProfile.name || 'Estudiante CifraFlow'}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono-code text-cyan-200 pt-2">
              <span className="flex items-center gap-1.5">
                <CreditCard size={14} className="text-[#ff007f]" />
                <span>Cédula: <strong>{studentProfile.idCard || 'V-PENDIENTE'}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={14} className="text-emerald-400" />
                <span>Institución: <strong>{studentProfile.institution || 'Colegio / Liceo'}</strong></span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-sans text-slate-300 max-w-2xl mx-auto leading-relaxed pt-3">
              Ha completado exitosamente las competencias de <strong>Comprensión Lectora Financiera, Primera Cuenta Bancaria Juvenil (BDV, Banco Plaza y Banco del Tesoro), Emprendimiento, Bolsa de Valores de Caracas (BVC) y Ciberseguridad Real con Autenticación FIDO2</strong> en la plataforma interactiva CifraFlow.
            </p>
          </div>

          {/* Competency Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono-code">
            <div className="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-cyan-300 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-cyan-400" />
              <span>Banca Digital & PagoMóvil</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-emerald-500/20 text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>Contratos & Letra Chica</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-amber-500/20 text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-amber-400" />
              <span>Presupuesto 50/30/20</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-purple-500/20 text-purple-300 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-purple-400" />
              <span>Ciberdefensa FIDO2</span>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-slate-800 text-xs font-mono-code text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-cyan-400" />
              <span>Fecha de Expedición: {currentDate}</span>
            </div>

            <div className="text-center sm:text-right">
              <span className="font-bold text-cyan-300">Avatar Tutor: {cadet.fullName}</span>
              <div className="text-[10px] text-slate-500">Hash Criptográfico: CIFRA-V3-{(Math.random()*1e9).toString(36).toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* Actions Bottom Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            id="btn-print-certificate"
            onClick={handlePrint}
            className="py-3 px-6 rounded-xl font-cyber font-bold text-sm tracking-wider text-slate-950 bg-gradient-to-r from-[#00f3ff] to-cyan-400 hover:brightness-110 active:scale-98 transition shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center gap-2 cursor-pointer"
          >
            <Download size={16} />
            <span>DESCARGAR / IMPRIMIR CERTIFICADO</span>
          </button>

          <button
            id="btn-restart-simulation"
            onClick={() => {
              cyberAudio.playBlip();
              onRestartSimulation();
            }}
            className="py-3 px-6 rounded-xl font-cyber font-bold text-sm tracking-wider text-slate-200 bg-slate-900 border border-slate-700 hover:border-cyan-400 hover:text-white transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw size={16} />
            <span>REINICIAR SIMULACIÓN</span>
          </button>
        </div>

      </div>

    </div>
  );
};
