import React from 'react';
import { 
  Coins, 
  BrainCircuit, 
  Flame, 
  FileCheck, 
  Volume2, 
  VolumeX, 
  Code2, 
  Wallet, 
  Building2, 
  Smartphone,
  Bot,
  Image as ImageIcon,
  Map,
  UserCheck,
  Home,
  Headphones,
  RefreshCw,
  Calendar,
  LayoutGrid
} from 'lucide-react';
import { AnalysisLevel } from '../types';
import { CHARACTERS } from '../assets/gameImages';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';
import { BcvRateData } from '../utils/bcvRateService';

interface CyberNavbarProps {
  saldoDinero: number;
  tasaBcv: number;
  bcvData?: BcvRateData;
  puntosComprension: number;
  nivelAnalisis: AnalysisLevel;
  racha: number;
  requisitosCount: number;
  totalRequisitos: number;
  soundEnabled: boolean;
  selectedCharacterId?: string;
  characterAlias?: string;
  textSize?: 'sm' | 'normal' | 'lg' | 'xl';
  onChangeTextSize?: (size: 'sm' | 'normal' | 'lg' | 'xl') => void;
  onLogoClick?: () => void;
  onToggleSound: () => void;
  onRefreshBcvRate?: () => void;
  onOpenJsonInspector: () => void;
  onOpenWallet: () => void;
  onOpenBanks: () => void;
  onOpenSimulator: () => void;
  onOpenAiMentor: () => void;
  onOpenGallery: () => void;
  onOpenCoverScreen: () => void;
  onOpenModulesScreen?: () => void;
  activeView: 'adventure' | 'map' | 'banks' | 'simulator' | 'wallet' | 'cover';
  onChangeView: (view: 'adventure' | 'map' | 'banks' | 'simulator' | 'wallet' | 'cover') => void;
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({
  saldoDinero,
  tasaBcv,
  bcvData,
  puntosComprension,
  nivelAnalisis,
  racha,
  requisitosCount,
  totalRequisitos,
  soundEnabled,
  selectedCharacterId = 'kael',
  characterAlias,
  textSize = 'normal',
  onChangeTextSize,
  onLogoClick,
  onToggleSound,
  onRefreshBcvRate,
  onOpenJsonInspector,
  onOpenWallet,
  onOpenBanks,
  onOpenSimulator,
  onOpenAiMentor,
  onOpenGallery,
  onOpenCoverScreen,
  onOpenModulesScreen,
  activeView,
  onChangeView
}) => {
  const activeChar = CHARACTERS.find(c => c.id === selectedCharacterId) || CHARACTERS[0];
  const saldoBs = (saldoDinero * tasaBcv).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const saldoUsd = saldoDinero.toFixed(2);
  const fechaTexto = bcvData?.fechaTexto || new Date().toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const horaTexto = bcvData?.horaActualizacion || new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: true });

  const getNivelBadgeColor = (nivel: AnalysisLevel) => {
    switch (nivel) {
      case 'Avanzado':
        return 'border-[#ff007f] text-[#ff007f] bg-[rgba(255,0,127,0.15)] shadow-[0_0_10px_rgba(255,0,127,0.3)]';
      case 'Intermedio':
        return 'border-[#00f3ff] text-[#00f3ff] bg-[rgba(0,243,255,0.15)] shadow-[0_0_10px_rgba(0,243,255,0.3)]';
      default:
        return 'border-emerald-400 text-emerald-400 bg-[rgba(52,211,153,0.15)] shadow-[0_0_10px_rgba(52,211,153,0.3)]';
    }
  };

  const handleSpeakBcvRate = () => {
    cyberAudio.playBlip();
    speechNarrator.speak(
      `Tasa oficial del Banco Central de Venezuela al día de hoy, ${fechaTexto}: 1 dólar estadounidense equivale a ${tasaBcv.toFixed(2)} bolívares. Actualizado a las ${horaTexto}.`
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full cyber-glass border-b border-cyan-500/20 px-3 sm:px-6 py-2.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2.5">
        
        {/* Logo, Game Title & Active Cadet Profile Avatar */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-3">
          <div 
            className="flex items-center gap-2.5 cursor-pointer group" 
            onClick={() => {
              cyberAudio.playBlip();
              if (onLogoClick) {
                onLogoClick();
              } else {
                speechNarrator.speak("Cifraflow: Academia Juvenil de Educación Financiera y Ciberseguridad.");
                onOpenCoverScreen();
              }
            }}
            title="Haz clic para volver a la pantalla anterior del sistema (Retorno de Fase)"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f3ff] via-indigo-600 to-[#ff007f] p-[1.5px] flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#050814] rounded-[6.5px] flex items-center justify-center">
                <span className="font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff007f] text-lg">CF</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-cyber text-lg sm:text-xl font-bold tracking-wider text-white">
                  CIFRA<span className="text-[#00f3ff]">FLOW</span>
                </h1>
                <span className="text-[10px] uppercase font-mono-code px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold tracking-wider">
                  VEN v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Abriendo Mi Primera Cuenta de Banco
              </p>
            </div>
          </div>

          {/* Active Cadet Avatar Badge (Clickable to switch) */}
          <button
            id="nav-cadet-profile-pill"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`Cadete activo: ${characterAlias || activeChar.name}. Rol: ${activeChar.role}. ${activeChar.quote}`);
              onOpenCoverScreen();
            }}
            className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900/90 border border-cyan-400/40 hover:border-cyan-300 transition shadow-[0_0_10px_rgba(0,243,255,0.2)] group cursor-pointer"
            title="Cadete Activo - Haz clic para cambiar de personaje en la portada"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-cyan-400 flex-shrink-0 bg-slate-950">
              <img 
                src={activeChar.avatar} 
                alt={activeChar.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[10px] font-mono-code text-cyan-300 font-bold group-hover:text-white transition">
                {characterAlias || activeChar.name.split(' ')[0]}
              </div>
              <div className="text-[8px] font-mono-code text-slate-400 uppercase">
                {activeChar.badge}
              </div>
            </div>
          </button>

          {/* Quick Nav Toggles on Mobile/Tablet */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              id="btn-sound-mobile"
              onClick={onToggleSound}
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 transition"
              title={soundEnabled ? 'Silenciar Efectos y Voz' : 'Activar Efectos y Voz'}
            >
              {soundEnabled ? <Volume2 size={16} className="text-[#00f3ff]" /> : <VolumeX size={16} className="text-slate-500" />}
            </button>
            <button
              id="btn-json-mobile"
              onClick={onOpenJsonInspector}
              className="p-2 rounded-lg bg-slate-900/80 border border-fuchsia-500/40 text-fuchsia-400 hover:bg-fuchsia-950/30 transition"
              title="Inspeccionar Estado JSON del Motor"
            >
              <Code2 size={16} />
            </button>
          </div>
        </div>

        {/* HUD Data Matrix (Saldo, Comprensión, Nivel, Racha, Requisitos) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full lg:w-auto">
          
          {/* Saldo Dinero Dual */}
          <div 
            id="hud-saldo-card"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,243,255,0.15)] hover:border-cyan-400 transition cursor-pointer"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`Tu saldo actual es de ${saldoUsd} dólares, equivalente a ${saldoBs} bolívares a la tasa oficial del Banco Central de Venezuela.`);
              onOpenWallet();
            }}
            title="Saldo Total Ganado en Misiones (Tasa Oficial BCV)"
          >
            <div className="p-1 rounded bg-cyan-500/20 text-[#00f3ff]">
              <Coins size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono-code text-cyan-400 font-semibold tracking-wider">
                Saldo Dinero
              </div>
              <div className="font-mono-code font-bold text-xs sm:text-sm text-white flex items-center gap-1">
                <span>${saldoUsd}</span>
                <span className="text-slate-500 font-normal">/</span>
                <span className="text-cyan-300 font-normal">Bs.{saldoBs}</span>
              </div>
            </div>
          </div>

          {/* Puntos de Comprensión */}
          <div 
            id="hud-puntos-card"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`Puntos de comprensión acumulados: ${puntosComprension} puntos.`);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.15)] cursor-pointer hover:border-indigo-400 transition"
            title="Puntos acumulados por análisis de lectura y acertijos resueltos"
          >
            <div className="p-1 rounded bg-indigo-500/20 text-indigo-400">
              <BrainCircuit size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono-code text-indigo-400 font-semibold tracking-wider">
                Comprensión
              </div>
              <div className={`font-mono-code font-bold text-xs sm:text-sm ${
                puntosComprension < 0 ? 'text-rose-400 font-black' : 'text-indigo-200'
              }`}>
                {puntosComprension > 0 ? `+${puntosComprension}` : puntosComprension} <span className="text-[10px] text-slate-400 font-normal">PTS</span>
              </div>
            </div>
          </div>

          {/* Nivel de Análisis */}
          <div 
            id="hud-nivel-badge"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`Nivel de análisis financiero: ${nivelAnalisis}.`);
            }}
            className={`px-2.5 py-1 rounded-lg border font-mono-code text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${getNivelBadgeColor(nivelAnalisis)}`}
            title="Nivel de Educación Financiera alcanzado"
          >
            <span className="w-2 h-2 rounded-full animate-ping bg-current opacity-75"></span>
            <span>{nivelAnalisis}</span>
          </div>

          {/* Racha de Aciertos */}
          <div 
            id="hud-racha-badge"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`Racha actual de respuestas correctas consecutivas: ${racha}.`);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-300 font-mono-code text-xs font-bold cursor-pointer hover:border-amber-400 transition"
            title="Racha consecutiva de respuestas correctas sin fallos"
          >
            <Flame size={14} className="text-amber-400 animate-bounce" />
            <span>Racha: {racha}</span>
          </div>

          {/* Requisitos Recolectados */}
          <div 
            id="hud-requisitos-button"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`Has recolectado ${requisitosCount} de ${totalRequisitos} requisitos legales para tu cuenta bancaria juvenil.`);
              onOpenWallet();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/40 transition cursor-pointer font-mono-code text-xs font-semibold"
            title="Requisitos legales recolectados para abrir cuenta bancaria"
          >
            <FileCheck size={14} className="text-[#00f3ff]" />
            <span>Req: {requisitosCount}/{totalRequisitos}</span>
          </div>

          {/* Dynamic BCV Exchange Rate & Active Date Pill */}
          <div 
            id="hud-bcv-rate-pill"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono-code text-xs shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:border-emerald-400 transition"
          >
            <div 
              onClick={handleSpeakBcvRate}
              className="flex items-center gap-1.5 cursor-pointer hover:text-white transition"
              title={`Tasa BCV Oficial: 1 USD = ${tasaBcv.toFixed(2)} Bs. | Fecha Activa: ${fechaTexto} (${horaTexto})`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-white tracking-wide">BCV:</span>
              <span className="text-emerald-200 font-bold">{tasaBcv.toFixed(2)} Bs</span>
            </div>

            {onRefreshBcvRate && (
              <button
                id="btn-nav-refresh-bcv"
                onClick={(e) => {
                  e.stopPropagation();
                  cyberAudio.playBlip();
                  onRefreshBcvRate();
                }}
                className="p-0.5 rounded hover:bg-emerald-900/60 text-emerald-400 hover:text-white transition cursor-pointer"
                title="Actualizar tasa del BCV y fecha ahora"
              >
                <RefreshCw size={11} className="hover:rotate-180 transition-transform duration-500" />
              </button>
            )}
          </div>
        </div>

        {/* Action Controls & Navigation Modules */}
        <div className="flex items-center gap-1.5">
          
          <button
            id="nav-btn-cover"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak("Regresando a la portada principal y selector de personajes.");
              onOpenCoverScreen();
            }}
            className="px-2 py-1.5 rounded-lg text-xs font-semibold font-cyber tracking-wider bg-slate-900/80 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/40 hover:text-white transition flex items-center gap-1 shadow-[0_0_10px_rgba(0,243,255,0.2)] cursor-pointer"
            title="Volver a la Portada y Elegir Personaje"
          >
            <Home size={13} />
            <span className="hidden sm:inline">Portada</span>
          </button>

          <button
            id="nav-btn-adventure"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak("Módulo de Misiones y Aventura Narrativa.");
              onChangeView('adventure');
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-cyber tracking-wider transition flex items-center gap-1.5 cursor-pointer ${
              activeView === 'adventure' 
                ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(0,243,255,0.4)]' 
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Misiones
          </button>

          <button
            id="nav-btn-banks"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak("Agencias Virtuales de Bancos Venezolanos: Banco de Venezuela, Banco Plaza y Banco del Tesoro.");
              onOpenBanks();
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-cyber tracking-wider transition flex items-center gap-1.5 cursor-pointer ${
              activeView === 'banks' 
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-emerald-300'
            }`}
            title="Agencias Virtuales de Bancos Venezolanos"
          >
            <Building2 size={13} />
            <span className="hidden sm:inline">Bancos</span>
          </button>

          <button
            id="nav-btn-simulator"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak("Simulador Interactivo de Pago Móvil P2P y Biopago.");
              onOpenSimulator();
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-cyber tracking-wider transition flex items-center gap-1.5 cursor-pointer ${
              activeView === 'simulator' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]' 
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-indigo-300'
            }`}
            title="Simulador de PagoMóvil y Biopago"
          >
            <Smartphone size={13} />
            <span className="hidden sm:inline">PagoMóvil</span>
          </button>

          <button
            id="nav-btn-wallet"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak("Billetera Digital, Carnet de Identidad y Requisitos Legales recolectados.");
              onOpenWallet();
            }}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-cyber tracking-wider transition flex items-center gap-1.5 cursor-pointer ${
              activeView === 'wallet' 
                ? 'bg-gradient-to-r from-fuchsia-600 to-[#ff007f] text-white shadow-[0_0_12px_rgba(255,0,127,0.4)]' 
                : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-fuchsia-300'
            }`}
            title="Billetera Digital y Requisitos Recolectados"
          >
            <Wallet size={13} />
            <span className="hidden md:inline">Billetera</span>
          </button>

          <button
            id="nav-btn-gallery"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak("Galería de Cómics, Avatares y Escenarios Cyberpunk.");
              onOpenGallery();
            }}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold font-cyber tracking-wider bg-slate-900/80 border border-fuchsia-500/40 text-fuchsia-300 hover:bg-fuchsia-950/40 hover:text-white transition flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,0,127,0.2)] cursor-pointer"
            title="Galería de Cómics, Personajes y Escenarios"
          >
            <ImageIcon size={13} className="text-[#ff007f]" />
            <span className="hidden xl:inline">Cómics</span>
          </button>

          <button
            id="nav-btn-ai-mentor"
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak("Abriendo Asesor Financiero Inteligente CifraBot.");
              onOpenAiMentor();
            }}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold font-cyber tracking-wider bg-gradient-to-r from-purple-900/80 to-fuchsia-950/80 border border-purple-500/40 text-purple-200 hover:text-white hover:border-purple-400 transition flex items-center gap-1.5 shadow-[0_0_10px_rgba(168,85,247,0.2)] cursor-pointer"
            title="Asesor Bancario Inteligente"
          >
            <Bot size={13} className="text-[#00f3ff]" />
            <span className="hidden lg:inline">Asesor IA</span>
          </button>

          {onOpenModulesScreen && (
            <button
              id="nav-btn-modules-screen"
              onClick={() => {
                cyberAudio.playBlip();
                speechNarrator.speak("Matriz de Módulos y Ecosistema CifraFlow.");
                onOpenModulesScreen();
              }}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold font-cyber tracking-wider bg-gradient-to-r from-teal-900/80 to-cyan-950/80 border border-teal-500/40 text-teal-200 hover:text-white hover:border-teal-400 transition flex items-center gap-1.5 shadow-[0_0_10px_rgba(20,184,166,0.2)] cursor-pointer"
              title="Ir a la Matriz de Módulos y Ecosistema"
            >
              <LayoutGrid size={13} className="text-[#00f3ff]" />
              <span className="hidden sm:inline">Módulos</span>
            </button>
          )}

          {/* Accessibility Text Size Controller (A-, A, A+, A++) */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-950/90 border border-cyan-500/30 font-mono-code text-xs">
            <button
              id="btn-font-sm"
              onClick={() => {
                cyberAudio.playBlip();
                onChangeTextSize?.('sm');
              }}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                textSize === 'sm' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_8px_rgba(0,243,255,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
              title="Tamaño de texto 85% (A-)"
            >
              A-
            </button>
            <button
              id="btn-font-normal"
              onClick={() => {
                cyberAudio.playBlip();
                onChangeTextSize?.('normal');
              }}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                textSize === 'normal' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_8px_rgba(0,243,255,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
              title="Tamaño de texto estándar 100% (A)"
            >
              A
            </button>
            <button
              id="btn-font-lg"
              onClick={() => {
                cyberAudio.playBlip();
                onChangeTextSize?.('lg');
              }}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                textSize === 'lg' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_8px_rgba(0,243,255,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
              title="Tamaño de texto 115% (A+)"
            >
              A+
            </button>
            <button
              id="btn-font-xl"
              onClick={() => {
                cyberAudio.playBlip();
                onChangeTextSize?.('xl');
              }}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                textSize === 'xl' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_8px_rgba(0,243,255,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
              title="Tamaño de texto 130% (A++)"
            >
              A++
            </button>
          </div>

          {/* Desktop utility icons */}
          <div className="hidden lg:flex items-center gap-1 pl-1 border-l border-slate-800">
            <button
              id="btn-sound-desktop"
              onClick={onToggleSound}
              className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 transition cursor-pointer"
              title={soundEnabled ? 'Silenciar Audio' : 'Activar Audio y Voz'}
            >
              {soundEnabled ? <Volume2 size={15} className="text-[#00f3ff]" /> : <VolumeX size={15} className="text-slate-500" />}
            </button>
            <button
              id="btn-json-desktop"
              onClick={onOpenJsonInspector}
              className="p-1.5 rounded-lg bg-slate-900/80 border border-fuchsia-500/40 text-fuchsia-400 hover:bg-fuchsia-950/30 transition cursor-pointer"
              title="Inspeccionar Motor de Estado JSON (JSON Engine Debugger)"
            >
              <Code2 size={15} />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};


