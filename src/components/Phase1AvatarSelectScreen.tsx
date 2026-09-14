import React, { useState } from 'react';
import { CHARACTERS, GameCharacter } from '../assets/gameImages';
import { StudentProfile } from '../types';
import { RightHudPanel } from './RightHudPanel';
import { CifraflowInfinityLogo } from './CifraflowInfinityLogo';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';
import { 
  Sparkles, 
  Shield, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Award, 
  Zap, 
  Volume2, 
  Flame 
} from 'lucide-react';

interface Phase1AvatarSelectScreenProps {
  studentProfile: StudentProfile;
  selectedCharacterId: string;
  puntosAcumulados: number;
  onSelectCharacter: (charId: string) => void;
  onConfirmAvatar: (charId: string) => void;
  onBackToPhase0: () => void;
}

export const Phase1AvatarSelectScreen: React.FC<Phase1AvatarSelectScreenProps> = ({
  studentProfile,
  selectedCharacterId,
  puntosAcumulados,
  onSelectCharacter,
  onConfirmAvatar,
  onBackToPhase0
}) => {
  const [activeId, setActiveId] = useState(selectedCharacterId || 'jorge');

  const selectedChar = CHARACTERS.find(c => c.id === activeId) || CHARACTERS[0];

  const handlePick = (cadet: GameCharacter) => {
    setActiveId(cadet.id);
    onSelectCharacter(cadet.id);
    cyberAudio.playBlip();
    speechNarrator.speak(
      `Seleccionaste a ${cadet.fullName}. ${cadet.role}. ${cadet.perk}. Cita: ${cadet.quote}`,
      true
    );
  };

  const handleConfirm = () => {
    cyberAudio.playSuccess();
    speechNarrator.speak(
      `¡Excelente elección! ${selectedChar.fullName} se sincroniza con el perfil de ${studentProfile.name}. Avanzando a la Fase 2: Matriz de Módulos y Campaña.`,
      true
    );
    onConfirmAvatar(activeId);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#ff007f] selection:text-white">
      
      {/* Background Cyber Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-amber-500/10 rounded-full blur-3xl opacity-60" />
      </div>

      {/* Header with Navigation & Logo */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between gap-4 border-b border-slate-800">
        
        {/* Return to Phase 0 by clicking Logo or Back Button */}
        <div className="flex items-center gap-3">
          <button
            id="btn-back-to-phase0"
            onClick={() => {
              cyberAudio.playBlip();
              onBackToPhase0();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono-code"
            title="Regresar a Fase 0 (Registro)"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Fase 0</span>
          </button>

          <div 
            onClick={() => {
              cyberAudio.playBlip();
              onBackToPhase0();
            }}
            className="flex items-center gap-2 cursor-pointer group"
            title="Clic para volver a la pantalla anterior"
          >
            <CifraflowInfinityLogo size="sm" showShield={false} />
            <span className="font-cyber font-bold text-lg text-white group-hover:text-cyan-300 transition">
              CIFRAFLOW
            </span>
          </div>
        </div>

        {/* Student Active Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-xs font-mono-code">
          <User size={13} className="text-cyan-400" />
          <span className="text-slate-400 hidden sm:inline">Operador:</span>
          <span className="text-white font-bold">{studentProfile.name || 'Estudiante'}</span>
          <span className="text-cyan-400 text-[10px] hidden md:inline">({studentProfile.institution})</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 flex-1 flex flex-col justify-center">
        
        {/* Phase Header */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono-code font-bold text-cyan-300 tracking-wider">
            <Sparkles size={13} className="text-[#00f3ff] animate-spin" />
            <span>FASE 1 — SELECCIÓN CINEMATOGRÁFICA DE AVATARES ADOLESCENTES EN GRANDE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-cyber font-black text-white">
            Elige a tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-fuchsia-400 to-[#fbbf24]">Cadete Especialista</span>
          </h2>

          <p className="text-xs sm:text-sm font-sans text-slate-300 max-w-2xl mx-auto">
            Cada avatar adolescente posee una habilidad táctica pasiva exclusiva que potencia tu rendimiento en los retos financieros de CifraFlow.
          </p>
        </div>

        {/* 4 Adolescent 3D Cards in Large Format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto w-full">
          {CHARACTERS.map((cadet) => {
            const isSelected = cadet.id === activeId;
            return (
              <div
                key={cadet.id}
                id={`avatar-card-${cadet.id}`}
                onClick={() => handlePick(cadet)}
                className={`relative rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between group p-4 sm:p-5 ${
                  isSelected
                    ? 'bg-slate-900/95 border-2 shadow-[0_0_30px_rgba(0,243,255,0.4)] scale-102 ring-2'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-600 hover:bg-slate-900/80'
                }`}
                style={{
                  borderColor: isSelected ? cadet.glowColor : undefined,
                  boxShadow: isSelected ? `0 0 25px ${cadet.glowColor}55` : undefined
                }}
              >
                {/* Active Checkmark Pill */}
                {isSelected && (
                  <div 
                    className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold text-slate-950 flex items-center gap-1 shadow-lg"
                    style={{ backgroundColor: cadet.glowColor }}
                  >
                    <CheckCircle2 size={12} />
                    <span>ACTIVO</span>
                  </div>
                )}

                {/* Cadet Portrait Image */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3.5 bg-slate-950/80 border border-white/10 group-hover:border-white/20 transition">
                  <img
                    src={cadet.avatar}
                    alt={cadet.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div 
                    className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-mono-code font-bold text-white uppercase border border-white/20 backdrop-blur-md"
                    style={{ backgroundColor: `${cadet.glowColor}44` }}
                  >
                    {cadet.badge}
                  </div>
                </div>

                {/* Cadet Info & Role */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cyber font-bold text-lg text-white flex items-center justify-between">
                      <span>{cadet.name}</span>
                      <span className="text-xs font-mono-code text-slate-400">{cadet.age}</span>
                    </h3>
                    <div 
                      className="text-xs font-mono-code font-semibold tracking-wide mt-0.5"
                      style={{ color: cadet.glowColor }}
                    >
                      {cadet.role}
                    </div>
                  </div>

                  {/* Speciality & Perk */}
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono-code space-y-1">
                    <div className="text-slate-400 text-[10px] uppercase flex items-center gap-1">
                      <Zap size={11} style={{ color: cadet.glowColor }} />
                      <span>Habilidad Pasiva:</span>
                    </div>
                    <div className="text-white font-medium">
                      {cadet.perk}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-[11px] font-sans italic text-slate-400 leading-snug line-clamp-2 pt-1 border-t border-slate-800/60">
                    "{cadet.quote}"
                  </p>
                </div>

                {/* Select / Pick Button */}
                <div className="pt-3 mt-3 border-t border-slate-800">
                  <button
                    type="button"
                    className={`w-full py-2 px-3 rounded-xl text-xs font-cyber font-bold tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'text-slate-950 font-black shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                    style={{
                      backgroundColor: isSelected ? cadet.glowColor : undefined
                    }}
                  >
                    {isSelected ? '✓ SELECCIONADO' : 'ELEGIR AVATAR'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Bar with Right HUD Integration & Confirmation */}
        <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          
          <div className="flex items-center gap-3">
            <RightHudPanel
              puntosAcumulados={puntosAcumulados}
              puntosNivelActual={0}
              racha={0}
              totalErrores={0}
              totalAciertos={0}
              capituloActual={1}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="btn-voice-avatar-info"
              onClick={() => {
                cyberAudio.playBlip();
                speechNarrator.speak(`Avatar seleccionado: ${selectedChar.fullName}. Rol: ${selectedChar.role}. Habilidad: ${selectedChar.perk}.`);
              }}
              className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 hover:text-white transition cursor-pointer"
              title="Escuchar información del avatar en voz alta"
            >
              <Volume2 size={18} />
            </button>

            <button
              id="btn-confirm-avatar-proceed"
              onClick={handleConfirm}
              className="flex-1 sm:flex-none py-3.5 px-8 rounded-xl font-cyber font-bold text-sm tracking-wider text-slate-950 bg-gradient-to-r from-[#00f3ff] via-cyan-400 to-[#38bdf8] hover:brightness-110 active:scale-98 transition shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>CONFIRMAR Y AVANZAR A MÓDULOS (FASE 2)</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </main>

    </div>
  );
};
