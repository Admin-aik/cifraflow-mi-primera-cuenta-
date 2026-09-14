import React from 'react';
import { 
  BookOpen, 
  Building2, 
  TrendingUp, 
  Coins, 
  ShieldAlert, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  User, 
  Volume2, 
  ExternalLink 
} from 'lucide-react';
import { EcosystemPillar, StudentProfile } from '../types';
import { CHARACTERS, getCharacterById } from '../assets/gameImages';
import { RightHudPanel } from './RightHudPanel';
import { CifraflowInfinityLogo } from './CifraflowInfinityLogo';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';

interface Phase2ModulesScreenProps {
  studentProfile: StudentProfile;
  selectedCharacterId: string;
  puntosAcumulados: number;
  onSelectPillar: (pillar: EcosystemPillar) => void;
  onStartFullCampaign: () => void;
  onBackToPhase1: () => void;
}

export const Phase2ModulesScreen: React.FC<Phase2ModulesScreenProps> = ({
  studentProfile,
  selectedCharacterId,
  puntosAcumulados,
  onSelectPillar,
  onStartFullCampaign,
  onBackToPhase1
}) => {
  const cadet = getCharacterById(selectedCharacterId);

  const MODULES = [
    {
      id: 'banca_fintech' as EcosystemPillar,
      number: 'Módulo 1',
      title: 'Banca Fintech & Primera Cuenta Bancaria',
      subtitle: 'BDVkids, Banco Plaza, Banco del Tesoro & PagoMóvil',
      description: 'Aprende los requisitos legales para menores de edad, abre tu primera cuenta digital, analiza comisiones y usa el simulador interactivo de PagoMóvil P2P y Biopago.',
      icon: Building2,
      color: '#00f3ff',
      badge: 'CAMPAÑA PRINCIPAL',
      tag: '4 Capítulos + Agencias 3D + PagoMóvil'
    },
    {
      id: 'lectura_contratos' as EcosystemPillar,
      number: 'Módulo 2',
      title: 'Comprensión Lectora & Análisis de Contratos',
      subtitle: 'Scanner de Cláusulas Abusivas y Letra Chica',
      description: 'Auditoría forense de términos y condiciones, contratos bancarios, tarjetas prepagadas y comisiones ocultas en plataformas digitales.',
      icon: BookOpen,
      color: '#38bdf8',
      badge: 'COMPRENSIÓN LECTORA',
      tag: 'Auditoría Forense de Contratos'
    },
    {
      id: 'emprendimiento' as EcosystemPillar,
      number: 'Módulo 3',
      title: 'Emprendimiento & Presupuesto 50/30/20',
      subtitle: 'Simulador de Costos, Punto de Equilibrio y Ganancias',
      description: 'Calcula costos fijos, costos variables, margen de beneficio y formula presupuestos equilibrados con la regla 50/30/20 en Bolívares y Divisas.',
      icon: TrendingUp,
      color: '#34d399',
      badge: 'EMPRENDIMIENTO JUVENIL',
      tag: 'Simulador de Negocio & Finanzas'
    },
    {
      id: 'bolsa_bvc' as EcosystemPillar,
      number: 'Módulo 4',
      title: 'Bolsa de Valores de Caracas (BVC)',
      subtitle: 'Inversión en Renta Variable & Acciones Venezolanas',
      description: 'Aprende qué es una acción, cómo funciona el corro bursátil de Caracas, compra y venta de activos (Banesco, Ron Santa Teresa, CANTV) y cobro de dividendos.',
      icon: Coins,
      color: '#fbbf24',
      badge: 'MERCADO DE CAPITALES',
      tag: 'Simulador Bursátil Venezolano'
    },
    {
      id: 'ciberseguridad' as EcosystemPillar,
      number: 'Módulo 5',
      title: 'Ciberseguridad FinTech & Blindaje FIDO2',
      subtitle: 'Defensa Real contra Phishing y Fraudes Digitales',
      description: 'Simulador de defensa cibernética: aprende a detectar mensajes SMS fraudulentos, enlaces maliciosos, clones de banca en línea y cómo blindarte con llaves FIDO2.',
      icon: ShieldAlert,
      color: '#a855f7',
      badge: 'CIBERDEFENSA',
      tag: 'Laboratorio Anti-Phishing'
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#ff007f] selection:text-white">
      
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-amber-500/10 rounded-full blur-3xl opacity-60" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            id="btn-back-to-phase1"
            onClick={() => {
              cyberAudio.playBlip();
              onBackToPhase1();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition cursor-pointer flex items-center gap-1.5 text-xs font-mono-code"
            title="Regresar a Selección de Avatar (Fase 1)"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Avatares</span>
          </button>

          <div 
            onClick={() => {
              cyberAudio.playBlip();
              onBackToPhase1();
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

        {/* Operator Profile Tag */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-xs font-mono-code">
          <img 
            src={cadet.avatar} 
            alt={cadet.name} 
            className="w-6 h-6 rounded-full object-cover border border-cyan-400"
          />
          <span className="text-cyan-300 font-bold">{studentProfile.name}</span>
          <span className="text-slate-400 hidden sm:inline">({cadet.name})</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 flex-1 flex flex-col justify-center">
        
        {/* Phase Header */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono-code font-bold text-cyan-300 tracking-wider">
            <Sparkles size={13} className="text-[#00f3ff] animate-spin" />
            <span>FASE 2 — SELECCIÓN DE MÓDULOS / CAMPAÑA PEDAGÓGICA</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-cyber font-black text-white">
            Matriz de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-fuchsia-400 to-[#fbbf24]">Módulos Financieros</span>
          </h2>

          <p className="text-xs sm:text-sm font-sans text-slate-300 max-w-2xl mx-auto">
            Elige un módulo específico para entrenar habilidades puntuales, o inicia la Campaña Completa guiada para superar los 4 capítulos pedagógicos y obtener tu Certificado Digital.
          </p>
        </div>

        {/* Main Campaign Hero Launcher */}
        <div className="max-w-5xl mx-auto w-full cyber-glass rounded-2xl p-5 sm:p-6 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,243,255,0.2)] flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-mono-code font-bold border border-cyan-500/30">
              <Sparkles size={12} />
              <span>RUTA RECOMENDADA DE APRENDIZAJE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-cyber font-bold text-white">
              Campaña Completa: Primera Cuenta Bancaria Juvenil
            </h3>
            <p className="text-xs sm:text-sm font-sans text-slate-300 max-w-xl">
              Recorre la historia completa con los 4 capítulos interactivos, consulta las agencias virtuales del Banco de Venezuela, Banco Plaza y Banco del Tesoro, recolecta tus requisitos legales y aprueba el desafío final.
            </p>
          </div>

          <button
            id="btn-start-full-campaign"
            onClick={() => {
              cyberAudio.playSuccess();
              speechNarrator.speak(
                `Iniciando la campaña completa de Cifraflow Financiero con el cadete ${cadet.fullName}. Cargando Capítulo 1: El Misterio del Primer Depósito.`,
                true
              );
              onStartFullCampaign();
            }}
            className="w-full md:w-auto py-3.5 px-8 rounded-xl font-cyber font-extrabold text-sm tracking-wider text-slate-950 bg-gradient-to-r from-[#00f3ff] via-cyan-400 to-[#38bdf8] hover:brightness-110 active:scale-98 transition shadow-[0_0_25px_rgba(0,243,255,0.5)] flex items-center justify-center gap-2 cursor-pointer flex-shrink-0 group"
          >
            <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
            <span>INICIAR CAMPAÑA COMPLETA</span>
          </button>
        </div>

        {/* 5 Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto w-full">
          {MODULES.map((mod) => {
            const IconComp = mod.icon;
            return (
              <div
                key={mod.id}
                id={`module-card-${mod.id}`}
                onClick={() => {
                  cyberAudio.playBlip();
                  speechNarrator.speak(`Seleccionaste ${mod.title}. ${mod.description}`);
                  onSelectPillar(mod.id);
                }}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/80 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div 
                      className="p-2.5 rounded-xl bg-slate-950 border flex items-center justify-center"
                      style={{ borderColor: `${mod.color}55`, color: mod.color }}
                    >
                      <IconComp size={20} />
                    </div>
                    <span 
                      className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded border"
                      style={{ borderColor: `${mod.color}44`, color: mod.color, backgroundColor: `${mod.color}15` }}
                    >
                      {mod.badge}
                    </span>
                  </div>

                  <div className="text-xs font-mono-code text-slate-400 mb-1">
                    {mod.number} • {mod.subtitle}
                  </div>

                  <h4 className="font-cyber font-bold text-base text-white group-hover:text-cyan-300 transition">
                    {mod.title}
                  </h4>

                  <p className="text-xs font-sans text-slate-300 mt-2 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono-code text-slate-400">
                    {mod.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-cyber font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>Entrar</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right HUD Integration Bar */}
        <div className="max-w-5xl mx-auto w-full">
          <RightHudPanel
            puntosAcumulados={puntosAcumulados}
            puntosNivelActual={0}
            racha={0}
            totalErrores={0}
            totalAciertos={0}
            capituloActual={1}
          />
        </div>

      </main>

    </div>
  );
};
