import React from 'react';
import { CHARACTERS, GameCharacter, cifraflowTeamBanner } from '../assets/gameImages';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';
import { Sparkles, Shield, Volume2 } from 'lucide-react';

interface CifraflowPanoramicBannerProps {
  selectedCharacterId?: string;
  onSelectCharacter?: (characterId: string) => void;
  interactive?: boolean;
}

export const CifraflowPanoramicBanner: React.FC<CifraflowPanoramicBannerProps> = ({
  selectedCharacterId = 'jorge',
  onSelectCharacter,
  interactive = true
}) => {
  const jorge = CHARACTERS.find(c => c.id === 'jorge') || CHARACTERS[0];
  const ircar = CHARACTERS.find(c => c.id === 'ircar') || CHARACTERS[1];
  const ivan = CHARACTERS.find(c => c.id === 'ivan') || CHARACTERS[2];
  const carlos = CHARACTERS.find(c => c.id === 'carlos') || CHARACTERS[3];

  const handleCadetClick = (cadet: GameCharacter) => {
    cyberAudio.playBlip();
    speechNarrator.speak(
      `Cadete ${cadet.fullName}. Especialidad: ${cadet.specialty}. Habilidad activa: ${cadet.perk}.`,
      true
    );
    if (onSelectCharacter) {
      onSelectCharacter(cadet.id);
    }
  };

  const handleBannerVoice = () => {
    cyberAudio.playChime();
    speechNarrator.speak(
      "Equipo Cifraflow Financiero: Jorge, Ircar, Iván y Carlos unidos en el ecosistema bancario digital y ciberseguridad.",
      true
    );
  };

  return (
    <div 
      id="cifraflow-panoramic-header-banner"
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#040716] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,243,255,0.25)] flex flex-col items-center"
    >
      {/* Top Cybernetic Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20" />

      {/* Main Single Panoramic Illustration (All 4 characters and central logo in ONE single image) */}
      <div 
        className="relative w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[3/1] max-h-[340px] overflow-hidden group cursor-pointer"
        onClick={handleBannerVoice}
        title="Equipo Cifraflow Financiero - Haz clic para escuchar la presentación del equipo"
      >
        <img 
          src={cifraflowTeamBanner} 
          alt="Equipo CifraFlow Financiero: Jorge, Ircar, Logotipo Central Infinito, Iván y Carlos en un solo banner" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />

        {/* Cinematic Vignette & Ambient Cyber Glow Overlays (no square boxes) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040716] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040716]/60 via-transparent to-[#040716]/60 pointer-events-none" />
        
        {/* Subtle Central Hologram Flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Voice Audio Icon Badge on Banner */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBannerVoice();
            }}
            className="p-2 rounded-xl bg-slate-950/80 border border-cyan-400/60 text-cyan-300 hover:text-white hover:bg-cyan-950 transition shadow-[0_0_12px_rgba(0,243,255,0.4)] cursor-pointer flex items-center gap-1.5 text-xs font-mono-code"
            title="Escuchar audio del equipo Cifraflow"
          >
            <Volume2 size={14} className="text-[#00f3ff] animate-pulse" />
            <span className="hidden sm:inline font-cyber font-bold">Audio Equipo</span>
          </button>
        </div>

        {/* Interactive Click Zones for the 4 Cadetes directly on the panoramic image */}
        <div className="absolute inset-0 grid grid-cols-4 z-10 pointer-events-auto">
          {/* Jorge Zone (Left) */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              handleCadetClick(jorge);
            }}
            className="h-full cursor-pointer hover:bg-cyan-500/10 transition-colors"
            title="Jorge (Operador Táctico) - Haz clic para seleccionar"
          />

          {/* Ircar Zone (Center-Left) */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              handleCadetClick(ircar);
            }}
            className="h-full cursor-pointer hover:bg-fuchsia-500/10 transition-colors"
            title="Ircar (Especialista Cloud) - Haz clic para seleccionar"
          />

          {/* Iván Zone (Center-Right) */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              handleCadetClick(ivan);
            }}
            className="h-full cursor-pointer hover:bg-emerald-500/10 transition-colors"
            title="Iván (Auditor Forense) - Haz clic para seleccionar"
          />

          {/* Carlos Zone (Right) */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              handleCadetClick(carlos);
            }}
            className="h-full cursor-pointer hover:bg-amber-500/10 transition-colors"
            title="Carlos (Estratega Mercados) - Haz clic para seleccionar"
          />
        </div>
      </div>

      {/* Unified Bottom Identification Bar: Direct Character Selectors */}
      <div className="w-full bg-[#030612]/95 border-t border-cyan-500/30 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 z-20">
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-cyber font-bold tracking-wider text-cyan-300">
            ESCUADRÓN FINTECH:
          </span>
        </div>

        {/* 4 Cadet Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Jorge */}
          <button
            id="btn-ident-jorge"
            onClick={() => handleCadetClick(jorge)}
            className={`px-2.5 py-1 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCharacterId === 'jorge'
                ? 'bg-cyan-950 border border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(0,243,255,0.5)] ring-1 ring-cyan-400'
                : 'bg-slate-950/60 border border-cyan-900/50 text-cyan-400 hover:border-cyan-400 hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff]" />
            <span>Jorge</span>
            <span className="text-[10px] text-cyan-400/70 hidden md:inline">• Táctico</span>
          </button>

          {/* Ircar */}
          <button
            id="btn-ident-ircar"
            onClick={() => handleCadetClick(ircar)}
            className={`px-2.5 py-1 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCharacterId === 'ircar'
                ? 'bg-fuchsia-950 border border-[#ff007f] text-pink-200 shadow-[0_0_12px_rgba(255,0,127,0.5)] ring-1 ring-[#ff007f]'
                : 'bg-slate-950/60 border border-fuchsia-900/50 text-pink-400 hover:border-[#ff007f] hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff007f]" />
            <span>Ircar</span>
            <span className="text-[10px] text-pink-400/70 hidden md:inline">• Cloud</span>
          </button>

          {/* Iván */}
          <button
            id="btn-ident-ivan"
            onClick={() => handleCadetClick(ivan)}
            className={`px-2.5 py-1 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCharacterId === 'ivan'
                ? 'bg-emerald-950 border border-[#34d399] text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.5)] ring-1 ring-[#34d399]'
                : 'bg-slate-950/60 border border-emerald-900/50 text-emerald-400 hover:border-[#34d399] hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
            <span>Iván</span>
            <span className="text-[10px] text-emerald-400/70 hidden md:inline">• Auditor</span>
          </button>

          {/* Carlos */}
          <button
            id="btn-ident-carlos"
            onClick={() => handleCadetClick(carlos)}
            className={`px-2.5 py-1 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCharacterId === 'carlos'
                ? 'bg-amber-950 border border-[#fbbf24] text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.5)] ring-1 ring-[#fbbf24]'
                : 'bg-slate-950/60 border border-amber-900/50 text-amber-400 hover:border-[#fbbf24] hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
            <span>Carlos</span>
            <span className="text-[10px] text-amber-400/70 hidden md:inline">• Estratega</span>
          </button>
        </div>

      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </div>
  );
};
