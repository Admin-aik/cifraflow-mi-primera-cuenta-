import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Building2, 
  TrendingUp, 
  Coins, 
  ShieldAlert, 
  Sparkles, 
  User, 
  CreditCard, 
  GraduationCap, 
  ArrowRight, 
  Volume2, 
  Calendar, 
  Clock, 
  ShieldCheck,
  Search
} from 'lucide-react';
import { CifraflowPanoramicBanner } from './CifraflowPanoramicBanner';
import { RightHudPanel } from './RightHudPanel';
import { StudentProfile, EcosystemPillar } from '../types';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';
import { BcvRateData } from '../utils/bcvRateService';

interface Phase0LoginScreenProps {
  tasaBcv: number;
  bcvData?: BcvRateData;
  initialProfile?: StudentProfile;
  selectedCharacterId?: string;
  onSelectCharacter?: (charId: string) => void;
  onSubmitRegistration: (profile: StudentProfile) => void;
  puntosAcumulados?: number;
}

export const Phase0LoginScreen: React.FC<Phase0LoginScreenProps> = ({
  tasaBcv,
  bcvData,
  initialProfile,
  selectedCharacterId = 'jorge',
  onSelectCharacter,
  onSubmitRegistration,
  puntosAcumulados = 0
}) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [idCard, setIdCard] = useState(initialProfile?.idCard || '');
  const [institution, setInstitution] = useState(initialProfile?.institution || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillarFilter, setSelectedPillarFilter] = useState<string | null>(null);
  const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false);

  const fechaTexto = bcvData?.fechaTexto || new Date().toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const horaTexto = bcvData?.horaActualizacion || new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: true });

  const playWelcomeSpeech = () => {
    cyberAudio.playUnlock();
    speechNarrator.speak(
      "Bienvenido a Cifraflow Financiero. Fase cero: Registro e ingreso al ecosistema unificado. Por favor ingresa tu nombre, cédula de identidad e institución educativa para comenzar la simulación.",
      true
    );
    setHasPlayedWelcome(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasPlayedWelcome) {
        playWelcomeSpeech();
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      cyberAudio.playError();
      speechNarrator.speak("Por favor ingresa tu nombre de estudiante para registrarte.");
      return;
    }

    cyberAudio.playSuccess();
    const profile: StudentProfile = {
      name: name.trim(),
      idCard: idCard.trim() || 'V-PENDIENTE',
      institution: institution.trim() || 'Liceo / Colegio Nacional',
      registeredAt: new Date().toISOString()
    };

    speechNarrator.speak(
      `Registro exitoso. Bienvenido, estudiante ${profile.name} de ${profile.institution}. Avanzando a la fase uno: Selección cinematográfica de tu avatar adolescente.`,
      true
    );

    onSubmitRegistration(profile);
  };

  // Pillars data with requested icons and styling
  const PILLARS = [
    {
      id: 'lectura_contratos',
      name: 'Lectura & Contratos',
      icon: BookOpen,
      badgeColor: 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-600',
      description: 'Comprensión lectora de términos bancarios, cláusulas y contratos.'
    },
    {
      id: 'banca_fintech',
      name: 'Banca Fintech',
      icon: Building2,
      badgeColor: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400',
      description: 'Apertura de primera cuenta en BDVkids, Banco Plaza, Banco del Tesoro y PagoMóvil.'
    },
    {
      id: 'emprendimiento',
      name: 'Emprendimiento',
      icon: TrendingUp,
      badgeColor: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:border-emerald-400',
      description: 'Presupuesto 50/30/20, cálculo de costos fijos, variables y punto de equilibrio.'
    },
    {
      id: 'bolsa_bvc',
      name: 'Bolsa BVC',
      icon: Coins,
      badgeColor: 'border-amber-500/50 bg-amber-950/40 text-amber-300 hover:border-amber-400',
      description: 'Bolsa de Valores de Caracas, acciones venezolanas, órdenes y dividendos.'
    },
    {
      id: 'ciberseguridad',
      name: 'Ciberseguridad',
      icon: ShieldAlert,
      badgeColor: 'border-purple-500/50 bg-purple-950/40 text-purple-300 hover:border-purple-400',
      description: 'Defensa contra phishing, token FIDO2, ingeniería social y claves dinámicas.'
    }
  ];

  // Filtered description dynamic update
  const defaultDescription = "Plataforma interactiva de simulación que integra Comprensión Lectora, Primera Cuenta Bancaria, Emprendimiento, Bolsa de Valores de Caracas (BVC) y Ciberseguridad Real.";
  const filteredDescription = searchQuery.trim() 
    ? `Plataforma interactiva de simulación que integra Comprensión Lectora, Primera Cuenta Bancaria, Emprendimiento, Bolsa de Valores de Caracas (BVC) y Ciberseguridad Real — Filtrando contenidos relacionados con: "${searchQuery}".`
    : defaultDescription;

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-[#ff007f] selection:text-white">
      
      {/* Background Cyber Glow & Ambient Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10 rounded-full blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(#00f3ff_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-15" />
      </div>

      {/* Top Telemetry & BCV Live Rate Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex flex-col md:flex-row items-center justify-between gap-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono-code font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>SISTEMA CIFRAFLOW FINANCIERO v3.0</span>
          </div>
        </div>

        {/* Live BCV Pill and Voice Narration Button */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div 
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`Tasa oficial del Banco Central de Venezuela al día de hoy, ${fechaTexto}: 1 dólar estadounidense equivale a ${tasaBcv.toFixed(2)} bolívares.`);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono-code cursor-pointer hover:border-emerald-300 transition shadow-[0_0_12px_rgba(52,211,153,0.25)]"
            title="Tasa Oficial del Banco Central de Venezuela en Tiempo Real"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white">BCV Oficial:</span>
            <span className="font-extrabold text-emerald-200">{tasaBcv.toFixed(2)} Bs/USD</span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">({fechaTexto})</span>
          </div>

          <button
            id="btn-phase0-welcome-voice"
            onClick={playWelcomeSpeech}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-cyber font-bold hover:bg-cyan-950 hover:text-white transition flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,243,255,0.2)] cursor-pointer"
          >
            <Volume2 size={13} className="text-[#00f3ff] animate-pulse" />
            <span>Instrucciones en Voz Alta</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 flex-1 flex flex-col justify-center">
        
        {/* 1. Banner Principal (Ilustración y Equipo de los 4 Adolescentes con Logo Central) */}
        <CifraflowPanoramicBanner
          selectedCharacterId={selectedCharacterId}
          onSelectCharacter={onSelectCharacter}
          interactive={true}
        />

        {/* 2. Encabezado y Título de la Fase */}
        <div className="text-center space-y-3 max-w-4xl mx-auto">
          
          {/* Etiqueta de estado requerida */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-purple-950/80 border border-cyan-500/40 text-xs sm:text-sm font-mono-code font-bold text-cyan-300 tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.2)]">
            <Sparkles size={14} className="text-amber-400 animate-spin" />
            <span>FASE 0 — REGISTRO E INGRESO AL ECOSISTEMA UNIFICADO</span>
          </div>

          {/* Título principal */}
          <h1 className="text-3xl sm:text-5xl font-cyber font-black tracking-tight text-white">
            CifraFlow <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff007f]">Financiero</span>
          </h1>

          {/* 3. Descripción de la Plataforma (Color Único Obligatorio: Plata Neón / Blanco Cristal) */}
          <div 
            onClick={() => speechNarrator.speak(filteredDescription, true)}
            className="cursor-pointer group"
            title="Haz clic para escuchar la descripción en voz alta"
          >
            <p 
              id="cifraflow-official-description"
              className="text-sm sm:text-base md:text-lg font-sans font-medium text-[#e2e8f0] drop-shadow-[0_0_12px_rgba(226,232,240,0.6)] leading-relaxed max-w-3xl mx-auto tracking-wide group-hover:text-white transition"
            >
              "{filteredDescription}"
            </p>
          </div>

          {/* Buscador de Módulos para actualizar la descripción con cada búsqueda */}
          <div className="max-w-md mx-auto relative pt-1">
            <div className="relative flex items-center">
              <input
                id="search-module-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar temas (ej. cuenta, intereses, acciones, contratos)..."
                className="w-full px-3.5 py-2 pl-9 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs font-mono-code text-slate-200 focus:outline-none focus:border-cyan-400 shadow-inner"
              />
              <Search size={14} className="absolute left-3 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Content Section: Registration Form + Right HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start max-w-5xl mx-auto w-full">
          
          {/* Registration Form (2 cols) */}
          <div className="lg:col-span-2 cyber-glass rounded-2xl p-5 sm:p-7 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,243,255,0.15)] space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-cyber font-bold text-lg text-white flex items-center gap-2">
                  <User className="text-[#00f3ff]" size={18} />
                  <span>IDENTIFICACIÓN DEL ESTUDIANTE OPERADOR</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono-code">
                  Ingresa tus datos académicos para habilitar tu carnet digital y telemetría
                </p>
              </div>
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Campo 1: Nombre del Estudiante */}
              <div>
                <label className="block text-xs font-mono-code uppercase font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User size={13} className="text-cyan-400" />
                  <span>1. Nombre del Estudiante (Obligatorio)</span>
                </label>
                <input
                  id="input-student-name"
                  type="text"
                  required
                  placeholder="Ej. Kael Mendoza / Valeria Rivas"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-sm font-sans text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                />
              </div>

              {/* Campo 2: Cédula de Identidad */}
              <div>
                <label className="block text-xs font-mono-code uppercase font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <CreditCard size={13} className="text-[#ff007f]" />
                  <span>2. Cédula de Identidad</span>
                </label>
                <input
                  id="input-student-idcard"
                  type="text"
                  placeholder="Ej. V-31.458.920"
                  value={idCard}
                  onChange={(e) => setIdCard(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-sm font-sans text-white focus:outline-none focus:border-fuchsia-400 focus:ring-1 focus:ring-fuchsia-400 transition"
                />
              </div>

              {/* Campo 3: Institución Educativa */}
              <div>
                <label className="block text-xs font-mono-code uppercase font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap size={13} className="text-emerald-400" />
                  <span>3. Institución Educativa (Liceo, Colegio o Universidad)</span>
                </label>
                <input
                  id="input-student-institution"
                  type="text"
                  placeholder="Ej. U.E. Nacional Simón Bolívar / Colegio San Ignacio"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-sm font-sans text-white focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="btn-submit-registration"
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-cyber font-bold text-sm tracking-wider text-slate-950 bg-gradient-to-r from-[#00f3ff] via-cyan-400 to-[#38bdf8] hover:brightness-110 active:scale-98 transition shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>CONFIRMAR REGISTRO Y ELEGIR AVATAR (FASE 1)</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </form>
          </div>

          {/* Right-Side HUD (Initialized to 0 and permits negatives) */}
          <div className="space-y-4">
            <div className="text-xs font-mono-code font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <span>Recuadro Derecho de Telemetría:</span>
            </div>
            
            <RightHudPanel
              puntosAcumulados={puntosAcumulados}
              puntosNivelActual={0}
              racha={0}
              totalErrores={0}
              totalAciertos={0}
              capituloActual={1}
            />

            {/* Quick Helper Pill */}
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/25 text-[11px] font-mono-code text-cyan-200 space-y-1">
              <div className="font-bold text-cyan-300 flex items-center gap-1">
                <Sparkles size={12} />
                <span>Reglas del Ecosistema:</span>
              </div>
              <p className="text-slate-300 font-sans leading-relaxed">
                • Los aciertos suman de +100 a +150 PTS.<br />
                • Los fallos restan de -25 a -50 PTS.<br />
                • Se admiten puntuaciones negativas en el HUD si fallas al inicio.
              </p>
            </div>
          </div>

        </div>

        {/* 4. Módulos / Pilares del Ecosistema en la parte inferior */}
        <div className="space-y-3 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400">
              Módulos / Pilares de Simulación del Ecosistema:
            </span>
            <span className="text-[11px] font-mono-code text-cyan-400">
              5 Módulos Activos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {PILLARS.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  id={`pillar-card-${pillar.id}`}
                  onClick={() => {
                    cyberAudio.playBlip();
                    speechNarrator.speak(`Módulo ${idx + 1}: ${pillar.name}. ${pillar.description}`);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between ${pillar.badgeColor} shadow-md`}
                  title={`Haz clic para escuchar el detalle del módulo ${pillar.name}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-slate-950/80 border border-current/30 text-current flex items-center justify-center">
                      <IconComp size={16} />
                    </div>
                    <span className="text-xs font-cyber font-bold tracking-wide">
                      {pillar.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans line-clamp-2 group-hover:text-slate-200 transition">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-code text-slate-500">
        <div>
          CIFRAFLOW FINANCIERO © 2026 • Motor Lógico y Servidor de Estado
        </div>
        <div className="text-cyan-400/80">
          SUDEBAN • BCV • FIDO2 Alliance • BVC
        </div>
      </footer>

    </div>
  );
};
