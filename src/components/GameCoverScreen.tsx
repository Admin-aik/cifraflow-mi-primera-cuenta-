import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Award, 
  Play, 
  Volume2, 
  VolumeX,
  CheckCircle2, 
  Smartphone, 
  Building2, 
  Search, 
  User, 
  Flame,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { CHARACTERS, SCENES, GameCharacter, GAME_ART_ASSETS } from '../assets/gameImages';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';
import { BcvRateData } from '../utils/bcvRateService';
import confetti from 'canvas-confetti';

interface CharacterPerk {
  id: string;
  perkName: string;
  perkDescription: string;
  bonusEffect: string;
  stats: {
    ahorro: number;
    logica: number;
    auditoria: number;
    innovacion: number;
  };
}

const CHARACTER_PERKS: Record<string, CharacterPerk> = {
  kael: {
    id: 'kael',
    perkName: 'Bono Salario Inicial BDVkids',
    perkDescription: 'Comienza con depósito inicial de nómina y facilidad para dominar Salario Bruto versus Neto.',
    bonusEffect: '+$15.00 USD en tu primera cuenta bancaria',
    stats: { ahorro: 85, logica: 82, auditoria: 78, innovacion: 90 }
  },
  maya: {
    id: 'maya',
    perkName: 'Radar Anti-Gastos Hormiga',
    perkDescription: 'Detección automática de microgastos innecesarios y optimización de componentes para inventos.',
    bonusEffect: '-50% en comisiones del simulador Pago Móvil',
    stats: { ahorro: 92, logica: 88, auditoria: 82, innovacion: 98 }
  },
  valeria: {
    id: 'valeria',
    perkName: 'Reactor de Interés Compuesto 50/30/20',
    perkDescription: 'Especialista en proyectar ahorros exponenciales y clasificar presupuestos sin error.',
    bonusEffect: '+20% de rendimiento en el simulador de ahorro',
    stats: { ahorro: 98, logica: 95, auditoria: 90, innovacion: 85 }
  },
  dante: {
    id: 'dante',
    perkName: 'Monóculo Scanner de Letra Chica',
    perkDescription: 'Inmunidad ante suscripciones trampa y cláusulas abusivas en contratos digitales.',
    bonusEffect: 'Doble puntaje en desafíos de Ciberseguridad & Auditoría',
    stats: { ahorro: 84, logica: 94, auditoria: 99, innovacion: 86 }
  }
};

interface GameCoverScreenProps {
  onStartGame: (characterId: string, customAlias?: string) => void;
  initialCharacterId?: string;
  tasaBcv?: number;
  bcvData?: BcvRateData;
}

export const GameCoverScreen: React.FC<GameCoverScreenProps> = ({
  onStartGame,
  initialCharacterId = 'kael',
  tasaBcv = 36.50,
  bcvData
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialCharacterId);
  const [customName, setCustomName] = useState<string>('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);

  const fechaTexto = bcvData?.fechaTexto || new Date().toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const selectedChar = CHARACTERS.find(c => c.id === selectedId) || CHARACTERS[0];
  const perk = CHARACTER_PERKS[selectedId] || CHARACTER_PERKS.kael;

  const playWelcomeSpeech = () => {
    cyberAudio.playUnlock();
    speechNarrator.speak(
      "¡Bienvenido a Cifraflow! Academia Juvenil de Educación Financiera y Ciberseguridad. Elige tu avatar protagonista entre Kael, Maya, Valeria y Dante para ingresar a la misión.",
      true
    );
    setHasWelcomed(true);
  };

  // Attempt auto-welcome narration once on mount / interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasWelcomed) {
        playWelcomeSpeech();
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectCharacter = (char: GameCharacter) => {
    setSelectedId(char.id);
    cyberAudio.playBlip();
    const charPerk = CHARACTER_PERKS[char.id] || CHARACTER_PERKS.kael;
    
    // Narrate character details in Latin American Spanish
    const speechText = `Has seleccionado a ${char.name}, ${char.age}. ${char.role}. Habilidad especial: ${charPerk.perkName}. Cita: "${char.quote}". Beneficio activo: ${charPerk.bonusEffect}.`;
    speechNarrator.speak(speechText, true);
  };

  const handleSpeakSelectedPerk = (e: React.MouseEvent) => {
    e.stopPropagation();
    cyberAudio.playBlip();
    speechNarrator.speak(`Cadete ${selectedChar.name}. Cita del personaje: "${selectedChar.quote}". Especialidad: ${perk.perkDescription}`);
  };

  const handleLaunch = () => {
    setIsLaunching(true);
    cyberAudio.playSuccess();
    
    const alias = customName.trim() || selectedChar.name;
    speechNarrator.speak(`¡Excelente elección, Cadete ${alias}! Conectando al Distrito Financiero. Iniciando aventura en la cafetería escolar.`, true);

    // Confetti explosion
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onStartGame(selectedId, customName.trim() || undefined);
    }, 600);
  };

  const getThemeColors = (color: GameCharacter['themeColor']) => {
    switch (color) {
      case 'cyan':
        return {
          glow: 'shadow-[0_0_25px_rgba(0,243,255,0.4)]',
          border: 'border-cyan-400',
          accent: 'text-[#00f3ff]',
          bgLight: 'bg-cyan-950/60',
          gradientBtn: 'from-cyan-500 via-blue-500 to-indigo-600'
        };
      case 'fuchsia':
        return {
          glow: 'shadow-[0_0_25px_rgba(255,0,127,0.4)]',
          border: 'border-fuchsia-400',
          accent: 'text-[#ff007f]',
          bgLight: 'bg-fuchsia-950/60',
          gradientBtn: 'from-fuchsia-500 via-pink-600 to-rose-600'
        };
      case 'emerald':
        return {
          glow: 'shadow-[0_0_25px_rgba(52,211,153,0.4)]',
          border: 'border-emerald-400',
          accent: 'text-emerald-400',
          bgLight: 'bg-emerald-950/60',
          gradientBtn: 'from-emerald-500 via-teal-600 to-cyan-600'
        };
      case 'amber':
        return {
          glow: 'shadow-[0_0_25px_rgba(251,191,36,0.4)]',
          border: 'border-amber-400',
          accent: 'text-amber-400',
          bgLight: 'bg-amber-950/60',
          gradientBtn: 'from-amber-500 via-yellow-500 to-orange-600'
        };
    }
  };

  const currentTheme = getThemeColors(selectedChar.themeColor);

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col justify-between overflow-x-hidden">
      
      {/* Background Cyber Panorama with Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img 
          src={GAME_ART_ASSETS.scenes.city} 
          alt="Neo-Metropolis" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-[#030712]/90 to-[#030712]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-amber-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Top Header Badge */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f3ff] via-[#ff007f] to-amber-400 p-0.5 shadow-[0_0_20px_rgba(0,243,255,0.4)]">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles size={20} className="text-[#00f3ff]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cyber font-extrabold text-xl sm:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-white to-[#ff007f]">
                CIFRAFLOW
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                EDICIÓN 2026
              </span>
            </div>
            <p className="text-[11px] font-mono-code text-slate-400">
              Academia Juvenil de Educación Financiera & Ciberseguridad
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Live BCV Rate & Date Pill */}
          <div 
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`Tasa oficial del Banco Central de Venezuela al día de hoy, ${fechaTexto}: 1 dólar equivale a ${tasaBcv.toFixed(2)} bolívares.`);
            }}
            className="flex items-center gap-1.5 text-xs font-mono-code text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 px-3 py-1.5 rounded-xl cursor-pointer hover:border-emerald-300 transition shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            title={`Tasa BCV del día (${fechaTexto}): 1 USD = ${tasaBcv.toFixed(2)} Bs.`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-white">BCV Oficial:</span>
            <span className="text-emerald-200 font-bold">{tasaBcv.toFixed(2)} Bs/USD</span>
            <span className="text-[10px] text-slate-400 hidden md:inline">({fechaTexto})</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Regulaciones SUDEBAN • Diseñado para 12 a 13 años</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 flex flex-col justify-center">
        
        {/* Hero Title & Mission Brief */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-950/80 to-fuchsia-950/80 border border-cyan-500/30 text-xs font-mono-code text-cyan-300 shadow">
              <Flame size={14} className="text-amber-400 animate-bounce" />
              <span>PASO 1: SELECCIONA TU CADETE FINTECH</span>
            </div>

            {/* Listen Welcome Button */}
            <button
              id="btn-listen-welcome"
              onClick={playWelcomeSpeech}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-400/50 text-xs font-cyber font-bold text-cyan-300 hover:bg-cyan-950 hover:text-white transition shadow-[0_0_12px_rgba(0,243,255,0.3)] cursor-pointer"
            >
              <Volume2 size={13} className="text-[#00f3ff] animate-pulse" />
              <span>Escuchar Bienvenida (Voz Latina)</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-cyber font-black tracking-tight text-white leading-tight">
            Elige tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff007f]">Avatar Protagonista</span>
          </h1>

          <p 
            onClick={() => speechNarrator.speak("Cada cadete posee una especialidad financiera única para superar los cuatro capítulos narrativos, abrir cuentas en BDVkids, Banco Plaza y Banco del Tesoro, y dominar el dinero real en Venezuela.")}
            className="text-xs sm:text-sm md:text-base text-slate-300 font-sans leading-relaxed cursor-pointer hover:text-cyan-200 transition"
            title="Haz clic para escuchar este texto"
          >
            Cada cadete posee una especialidad financiera única para superar los 4 capítulos narrativos, abrir cuentas en <strong className="text-white">BDVkids</strong>, <strong className="text-white">Banco Plaza</strong> y <strong className="text-white">Banco del Tesoro</strong>, y dominar el dinero real en Venezuela. 🔊
          </p>
        </div>

        {/* 4 Avatar Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8">
          {CHARACTERS.map((char) => {
            const isSelected = selectedId === char.id;
            const theme = getThemeColors(char.themeColor);
            const charPerk = CHARACTER_PERKS[char.id] || CHARACTER_PERKS.kael;

            return (
              <div
                key={char.id}
                id={`avatar-card-${char.id}`}
                onClick={() => handleSelectCharacter(char)}
                className={`relative rounded-2xl cursor-pointer transition-all duration-300 p-4 flex flex-col justify-between border-2 bg-slate-900/80 backdrop-blur-md group hover:-translate-y-1.5 ${
                  isSelected 
                    ? `${theme.border} ${theme.glow} bg-slate-900/95 ring-2 ring-cyan-400/20` 
                    : 'border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Top Badge & Selection Indicator */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold border ${theme.bgLight} ${theme.accent} border-current/30`}>
                    {char.badge}
                  </span>
                  
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#00f3ff] text-slate-950 shadow-[0_0_10px_rgba(0,243,255,0.6)]' : 'border border-slate-700 text-slate-600'
                  }`}>
                    {isSelected ? <CheckCircle2 size={15} /> : <div className="w-2 h-2 rounded-full bg-slate-700"></div>}
                  </div>
                </div>

                {/* Character Illustration Frame */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-950 border border-slate-800 shadow-lg">
                  <img 
                    src={char.avatar} 
                    alt={char.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-mono-code font-bold bg-slate-950/85 border border-slate-700 text-cyan-300">
                    {char.age}
                  </div>
                </div>

                {/* Name & Role */}
                <div className="space-y-1 mb-3">
                  <h3 className="font-cyber font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {char.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans line-clamp-1">
                    {char.role}
                  </p>
                </div>

                {/* Specialty Pill */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-sans text-slate-300 space-y-1 mb-3">
                  <div className="font-mono-code text-[9px] uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                    <Zap size={11} />
                    <span>Habilidad Especial:</span>
                  </div>
                  <div className="font-semibold text-slate-100">
                    {charPerk.perkName}
                  </div>
                  <div className="text-[10px] text-cyan-300 font-mono-code">
                    ✦ {charPerk.bonusEffect}
                  </div>
                </div>

                {/* Stat Mini Bars */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[10px] font-mono-code">
                  <div className="flex justify-between text-slate-400">
                    <span>Ahorro & Lógica</span>
                    <span className="text-slate-200 font-bold">{charPerk.stats.ahorro}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                      style={{ width: `${charPerk.stats.ahorro}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Cadet Spotlight & Enter Adventure Action Bar */}
        <div className={`cyber-glass rounded-2xl p-5 sm:p-7 border-2 ${currentTheme.border} ${currentTheme.glow} relative overflow-hidden transition-all duration-300`}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            
            {/* Cadet Quote & Summary */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left flex-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-xl flex-shrink-0 bg-slate-950">
                <img 
                  src={selectedChar.avatar} 
                  alt={selectedChar.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="font-cyber font-bold text-lg text-white">
                    Cadete Seleccionado: {selectedChar.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-slate-950 border border-slate-700 ${currentTheme.accent}`}>
                    {selectedChar.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-cyan-200 font-sans italic flex items-center gap-1.5 justify-center sm:justify-start">
                  <Volume2 size={15} className={`flex-shrink-0 ${currentTheme.accent}`} />
                  <span>"{selectedChar.quote}"</span>
                </p>

                <p className="text-xs text-slate-400 font-sans">
                  {perk.perkDescription}
                </p>
              </div>
            </div>

            {/* Optional Cadet Custom Name & Launch Action */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="w-full sm:w-48">
                <label className="block text-[10px] font-mono-code uppercase text-slate-400 mb-1">
                  Tu Alias / Nombre:
                </label>
                <div className="relative">
                  <input
                    id="input-cadet-alias"
                    type="text"
                    placeholder={selectedChar.name}
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    maxLength={25}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-700 text-xs font-cyber text-white focus:outline-none focus:border-cyan-400"
                  />
                  <User size={13} className="absolute right-3 top-2.5 text-slate-500 pointer-events-none" />
                </div>
              </div>

              <button
                id="btn-launch-adventure"
                onClick={handleLaunch}
                disabled={isLaunching}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-cyber font-bold text-sm tracking-wider text-slate-950 bg-gradient-to-r ${currentTheme.gradientBtn} hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center justify-center gap-2 group cursor-pointer`}
              >
                <span>{isLaunching ? 'CONECTANDO AL DISTRITO...' : 'ENTRAR AL JUEGO'}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </main>

      {/* Footer Feature Badges */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-code text-slate-400">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Building2 size={14} className="text-cyan-400" />
            <span>3 Bancos Venezolanos Reales</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Smartphone size={14} className="text-fuchsia-400" />
            <span>Simulador Pago Móvil P2P</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <TrendingUp size={14} className="text-amber-400" />
            <span>Interés Compuesto & Presupuesto</span>
          </span>
        </div>

        <div className="text-[11px] text-slate-500">
          Cifraflow v2.0 • Antigravity Engine
        </div>
      </footer>

    </div>
  );
};
