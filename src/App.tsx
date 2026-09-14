import React, { useState, useEffect, useMemo } from 'react';
import { 
  GameState, 
  GameEngineOutput, 
  ChallengeOption, 
  BankContext,
  AnalysisLevel,
  GamePhase,
  StudentProfile,
  EcosystemPillar,
  TextSizeLevel
} from './types';
import { 
  CHAPTERS, 
  BANK_PROFILES, 
  BANK_PRODUCTS, 
  REQUIREMENTS_CATALOG, 
  FINANCIAL_TIPS 
} from './data/gameContent';
import { CyberNavbar } from './components/CyberNavbar';
import { ChallengeModal } from './components/ChallengeModal';
import { BankConsultationCard } from './components/BankConsultationCard';
import { CyberCityMap } from './components/CyberCityMap';
import { RequirementInventory } from './components/RequirementInventory';
import { BankTerminalModal } from './components/BankTerminalModal';
import { PagoMovilSimulator } from './components/PagoMovilSimulator';
import { JsonEngineInspector } from './components/JsonEngineInspector';
import { AiMentorDrawer } from './components/AiMentorDrawer';
import { ComicGalleryModal } from './components/ComicGalleryModal';
import { RightHudPanel } from './components/RightHudPanel';
import { Phase0LoginScreen } from './components/Phase0LoginScreen';
import { Phase1AvatarSelectScreen } from './components/Phase1AvatarSelectScreen';
import { Phase2ModulesScreen } from './components/Phase2ModulesScreen';
import { Phase4ChallengeGameOver } from './components/Phase4ChallengeGameOver';
import { Phase5MissionEndScreen } from './components/Phase5MissionEndScreen';
import { EmprendimientoSimulator } from './components/EmprendimientoSimulator';
import { BolsaBvcSimulator } from './components/BolsaBvcSimulator';
import { CiberseguridadSimulator } from './components/CiberseguridadSimulator';
import { LecturaContratosSimulator } from './components/LecturaContratosSimulator';
import { CHARACTERS, getCharacterById } from './assets/gameImages';
import { cyberAudio } from './utils/audioSynth';
import { speechNarrator } from './utils/speechNarrator';
import { bcvRateService, BcvRateData } from './utils/bcvRateService';
import { 
  RotateCcw, 
  Calendar, 
  Clock, 
  RefreshCw, 
  LayoutGrid, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'cifraflow_game_state_v4';
const TASA_BCV_DEFAULT = 36.50; // Bs por USD oficial

const INITIAL_DEFAULT_STATE: GameState = {
  current_phase: 'phase0_login',
  phase_history: [],
  active_pillar: 'banca_fintech',
  text_size: 'normal',
  student_profile: {
    name: '',
    idCard: '',
    institution: '',
    registeredAt: new Date().toISOString()
  },
  selected_character_id: 'jorge',
  character_alias: 'Jorge',
  puntos_acumulados: 0,
  puntos_nivel_actual: 0,
  total_errores_cometidos: 0,
  total_aciertos: 0,
  opciones_falladas_en_reto: [],
  saldo_dinero: 0,
  puntos_comprension: 0,
  nivel_analisis: 'Básico',
  requisitos_recolectados: [],
  cuentas_desbloqueadas: [],
  racha_aciertos: 0,
  capitulo_actual_id: 1,
  capitulos_completados: [],
  banco_seleccionado: 'Banco de Venezuela',
  selected_option_id: null,
  feedback_state: 'idle',
  feedback_message: '',
  sound_enabled: true,
  tasa_bcv: TASA_BCV_DEFAULT,
  log_eventos: [
    'Sistema CifraFlow Financiero inicializado en Modo Seguro FIDO2.',
    'Esperando registro formal de estudiante operador en Fase 0.'
  ]
};

export default function App() {
  // State Initialization
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...INITIAL_DEFAULT_STATE,
            ...parsed,
            student_profile: {
              ...INITIAL_DEFAULT_STATE.student_profile,
              ...(parsed.student_profile || {})
            },
            phase_history: parsed.phase_history || []
          };
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_DEFAULT_STATE;
  });

  // Navigation & Modals UI states
  const [activeView, setActiveView] = useState<'adventure' | 'map' | 'banks' | 'simulator' | 'wallet' | 'cover'>('adventure');
  const [activePillarSimulator, setActivePillarSimulator] = useState<EcosystemPillar | null>(null);
  const [showJsonInspector, setShowJsonInspector] = useState(false);
  const [showBankInfoModal, setShowBankInfoModal] = useState(false);
  const [showAiMentor, setShowAiMentor] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showPhase4GameOver, setShowPhase4GameOver] = useState(false);

  // Accessibility Text Size Controller
  const [textSize, setTextSize] = useState<TextSizeLevel>(gameState.text_size || 'normal');

  // BCV Real-Time Exchange Rate & Date Synchronization
  const [bcvData, setBcvData] = useState<BcvRateData>(() => bcvRateService.getCurrentRate());
  const [isRefreshingBcv, setIsRefreshingBcv] = useState(false);

  // Subscribe to live BCV rate updates and date sync
  useEffect(() => {
    const unsubscribe = bcvRateService.subscribe((data) => {
      setBcvData(data);
      setGameState(prev => {
        if (prev.tasa_bcv !== data.tasa) {
          return {
            ...prev,
            tasa_bcv: data.tasa,
            log_eventos: [
              `[Sincronización BCV] Tasa oficial actualizada a ${data.tasa} Bs/USD (${data.fechaTexto}, ${data.horaActualizacion})`,
              ...prev.log_eventos.slice(0, 19)
            ]
          };
        }
        return prev;
      });
    });

    return () => unsubscribe();
  }, []);

  const handleRefreshBcvRate = async () => {
    setIsRefreshingBcv(true);
    cyberAudio.playBlip();
    speechNarrator.speak("Sincronizando tasa oficial del Banco Central de Venezuela a la fecha actual...");
    
    try {
      const updated = await bcvRateService.fetchLiveBcvRate(true);
      setBcvData(updated);
      setGameState(prev => ({
        ...prev,
        tasa_bcv: updated.tasa,
        log_eventos: [
          `[Sincronización Manual] Tasa oficial BCV: 1 USD = ${updated.tasa} Bs. (${updated.fechaTexto} - ${updated.horaActualizacion})`,
          ...prev.log_eventos.slice(0, 19)
        ]
      }));

      speechNarrator.speak(
        `Tasa del Banco Central de Venezuela sincronizada al ${updated.fechaTexto}: 1 dólar estadounidense equivale a ${updated.tasa.toFixed(2)} bolívares.`
      );
    } catch {
      // Handled in service
    } finally {
      setIsRefreshingBcv(false);
    }
  };

  // Sync sound settings to audio synth
  useEffect(() => {
    cyberAudio.setMuted(!gameState.sound_enabled);
  }, [gameState.sound_enabled]);

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  // Current Chapter Object
  const currentChapter = useMemo(() => {
    return CHAPTERS.find(c => c.id === gameState.capitulo_actual_id) || CHAPTERS[0];
  }, [gameState.capitulo_actual_id]);

  // Dynamic Level Calculation
  const calculateAnalysisLevel = (puntos: number): AnalysisLevel => {
    if (puntos >= 300) return 'Avanzado';
    if (puntos >= 120) return 'Intermedio';
    return 'Básico';
  };

  // Structured Engine Output JSON Generator (matches prompt exactly)
  const currentEngineOutput: GameEngineOutput = useMemo(() => {
    const saldoBs = (gameState.saldo_dinero * gameState.tasa_bcv).toLocaleString('es-VE', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
    const saldoUsd = gameState.saldo_dinero.toFixed(2);

    return {
      hud_update: {
        saldo_dinero: `$${saldoUsd} / Bs.${saldoBs}`,
        puntos_comprension: gameState.puntos_acumulados,
        nivel_analisis: gameState.nivel_analisis,
        racha: gameState.racha_aciertos,
        requisitos_completados: `${gameState.requisitos_recolectados.length}/3`
      },
      main_modal: {
        title: currentChapter.title,
        bank_context: currentChapter.bank_context,
        source_text: currentChapter.source_text,
        challenge_type: currentChapter.challenge_type,
        question: currentChapter.question,
        options: currentChapter.options,
        correct_option_id: currentChapter.correct_option_id
      },
      bank_consultation_info: currentChapter.bank_info,
      world_events: gameState.log_eventos.slice(-4)
    };
  }, [gameState, currentChapter]);

  // PHASE TRANSITIONS & NAVIGATION HISTORY
  const pushPhase = (nextPhase: GamePhase) => {
    setGameState(prev => ({
      ...prev,
      phase_history: [...prev.phase_history, prev.current_phase],
      current_phase: nextPhase
    }));
  };

  // Header Logo Click: Returns to previous phase in history
  const handleLogoClickBack = () => {
    cyberAudio.playBlip();
    setGameState(prev => {
      const history = [...prev.phase_history];
      if (history.length > 0) {
        const prevPhase = history.pop()!;
        speechNarrator.speak(`Regresando a la pantalla anterior del sistema CifraFlow.`);
        return {
          ...prev,
          current_phase: prevPhase,
          phase_history: history
        };
      } else if (prev.current_phase !== 'phase0_login') {
        speechNarrator.speak(`Regresando al menú de módulos.`);
        return {
          ...prev,
          current_phase: 'phase2_modules'
        };
      }
      return prev;
    });
  };

  // Phase 0: Student Registration Completed
  const handleCompleteRegistration = (profile: StudentProfile) => {
    setGameState(prev => ({
      ...prev,
      student_profile: profile,
      log_eventos: [
        `[Registro Oficial] Estudiante ${profile.name} (CI: ${profile.idCard || 'N/A'}) - Institución: ${profile.institution || 'Colegio / Liceo'}.`,
        ...prev.log_eventos.slice(0, 19)
      ]
    }));
    pushPhase('phase1_avatars');
  };

  // Phase 1: Avatar Selected
  const handleSelectCadet = (characterId: string) => {
    const char = getCharacterById(characterId);
    setGameState(prev => ({
      ...prev,
      selected_character_id: characterId,
      character_alias: char.fullName,
      log_eventos: [
        `[Avatar Activo] Cadete ${char.fullName} (${char.role}) activado con bono: ${char.perk}.`,
        ...prev.log_eventos.slice(0, 19)
      ]
    }));
    pushPhase('phase2_modules');
  };

  // Phase 2: Pillar / Module Selected
  const handleSelectPillar = (pillarId: EcosystemPillar) => {
    setGameState(prev => ({
      ...prev,
      active_pillar: pillarId
    }));

    if (pillarId === 'banca_fintech') {
      setActivePillarSimulator(null);
      pushPhase('phase3_gameplay');
    } else {
      setActivePillarSimulator(pillarId);
    }
  };

  // Handle Option Selection (Strict Confidentiality & Reintegration)
  const handleSelectOptionSuccess = (option: ChallengeOption) => {
    const bonusPerk = gameState.selected_character_id === 'carlos' ? 25 : 0;
    const ptsEarned = (option.reward_if_correct.puntos || 100) + bonusPerk;
    const newSaldo = gameState.saldo_dinero + (option.reward_if_correct.dinero || 0);
    const newPuntosAcumulados = gameState.puntos_acumulados + ptsEarned;
    const newPuntosNivel = gameState.puntos_nivel_actual + ptsEarned;
    const newRacha = gameState.racha_aciertos + 1;
    const newTotalAciertos = gameState.total_aciertos + 1;
    const newNivel = calculateAnalysisLevel(newPuntosAcumulados);

    const newReqs = [...gameState.requisitos_recolectados];
    if (option.reward_if_correct.requisitoDesbloqueado && !newReqs.includes(option.reward_if_correct.requisitoDesbloqueado)) {
      newReqs.push(option.reward_if_correct.requisitoDesbloqueado);
    }

    const newAccounts = [...gameState.cuentas_desbloqueadas];
    if (option.reward_if_correct.cuentaDesbloqueada && !newAccounts.includes(option.reward_if_correct.cuentaDesbloqueada)) {
      newAccounts.push(option.reward_if_correct.cuentaDesbloqueada);
    }

    const newCompleted = [...gameState.capitulos_completados];
    if (!newCompleted.includes(currentChapter.id)) {
      newCompleted.push(currentChapter.id);
    }

    setGameState(prev => ({
      ...prev,
      saldo_dinero: newSaldo,
      puntos_acumulados: newPuntosAcumulados,
      puntos_nivel_actual: newPuntosNivel,
      puntos_comprension: newPuntosAcumulados,
      total_aciertos: newTotalAciertos,
      racha_aciertos: newRacha,
      nivel_analisis: newNivel,
      requisitos_recolectados: newReqs,
      cuentas_desbloqueadas: newAccounts,
      capitulos_completados: newCompleted,
      selected_option_id: option.id,
      feedback_state: 'correct',
      feedback_message: option.feedback_immediate,
      opciones_falladas_en_reto: [],
      log_eventos: [
        `[Acierto FinTech] Capítulo #${currentChapter.numero} superado (+${ptsEarned} PTS). Racha: ${newRacha}.`,
        ...prev.log_eventos.slice(0, 19)
      ]
    }));

    // Activate Phase 4: GAME OVER DE RETO
    setShowPhase4GameOver(true);
  };

  // Option Failed (Answer confidentiality strictly enforced, negative scores permitted)
  const handleOptionFailed = (option: ChallengeOption) => {
    const penalty = 25;
    const newPuntosAcumulados = gameState.puntos_acumulados - penalty;
    const newPuntosNivel = gameState.puntos_nivel_actual - penalty;
    const newTotalErrores = gameState.total_errores_cometidos + 1;
    const newFailedOptions = [...gameState.opciones_falladas_en_reto, option.id];

    setGameState(prev => ({
      ...prev,
      puntos_acumulados: newPuntosAcumulados,
      puntos_nivel_actual: newPuntosNivel,
      puntos_comprension: newPuntosAcumulados,
      total_errores_cometidos: newTotalErrores,
      racha_aciertos: 0,
      opciones_falladas_en_reto: newFailedOptions,
      selected_option_id: option.id,
      feedback_state: 'incorrect',
      feedback_message: `${option.feedback_immediate} (Penalización: -${penalty} PTS en el HUD derecho. La respuesta correcta permanece confidencial; continúa analizando e intenta con las demás opciones).`,
      log_eventos: [
        `[Penalización CifraFlow] Fallo en Capítulo #${currentChapter.numero}: -${penalty} PTS. Puntos acumulados: ${newPuntosAcumulados}.`,
        ...prev.log_eventos.slice(0, 19)
      ]
    }));
  };

  // Advance from Phase 4 to next challenge or Phase 5
  const handleProceedAfterGameOver = () => {
    setShowPhase4GameOver(false);

    if (gameState.capitulo_actual_id < CHAPTERS.length) {
      const nextId = gameState.capitulo_actual_id + 1;
      setGameState(prev => ({
        ...prev,
        capitulo_actual_id: nextId,
        puntos_nivel_actual: 0,
        selected_option_id: null,
        feedback_state: 'idle',
        feedback_message: '',
        opciones_falladas_en_reto: [],
        log_eventos: [
          `Iniciando Capítulo #${nextId}: ${CHAPTERS.find(c => c.id === nextId)?.title || ''}`,
          ...prev.log_eventos.slice(0, 19)
        ]
      }));
    } else {
      // Completed all chapters -> Enter Phase 5
      pushPhase('phase5_final');
      cyberAudio.playUnlock();
      speechNarrator.speak(
        `¡Misión CifraFlow completada con éxito! Has finalizado la aventura oficial y obtenido tu Certificado Digital de Competencias Financieras y Tecnológicas.`,
        true
      );
      try {
        confetti({
          particleCount: 120,
          spread: 120,
          origin: { y: 0.5 },
          colors: ['#00f3ff', '#ff007f', '#3b82f6', '#10b981', '#fbbf24']
        });
      } catch {
        // ignore
      }
    }
  };

  // Unlock account from terminal
  const handleUnlockAccount = (accountName: string) => {
    setGameState(prev => {
      if (prev.cuentas_desbloqueadas.includes(accountName)) return prev;
      return {
        ...prev,
        cuentas_desbloqueadas: [...prev.cuentas_desbloqueadas, accountName],
        log_eventos: [
          `¡Apertura Exitosa! Has activado formalmente: ${accountName}`,
          ...prev.log_eventos.slice(0, 19)
        ]
      };
    });
  };

  // Full Simulation Reset
  const handleResetGame = () => {
    cyberAudio.playBlip();
    if (window.confirm('¿Deseas reiniciar la simulación completa y volver al inicio?')) {
      localStorage.removeItem(STORAGE_KEY);
      setGameState(INITIAL_DEFAULT_STATE);
      setActiveView('adventure');
      setActivePillarSimulator(null);
      setShowPhase4GameOver(false);
      speechNarrator.speak("Simulación reiniciada desde la Fase 0.");
    }
  };

  // Text size container scale styling
  const getTextScaleClass = () => {
    switch (textSize) {
      case 'sm': return 'scale-[0.92] origin-top transition-transform duration-200';
      case 'lg': return 'scale-[1.05] origin-top transition-transform duration-200';
      case 'xl': return 'scale-[1.12] origin-top transition-transform duration-200';
      default: return 'transition-transform duration-200';
    }
  };

  // ==========================================
  // PHASE ROUTING ENGINE
  // ==========================================

  // FASE 0: Student Login & Registration
  if (gameState.current_phase === 'phase0_login') {
    return (
      <Phase0LoginScreen
        tasaBcv={gameState.tasa_bcv}
        bcvData={bcvData}
        initialProfile={gameState.student_profile}
        selectedCharacterId={gameState.selected_character_id}
        onSelectCharacter={(charId) => setGameState(prev => ({ ...prev, selected_character_id: charId }))}
        onSubmitRegistration={handleCompleteRegistration}
        puntosAcumulados={gameState.puntos_acumulados}
      />
    );
  }

  // FASE 1: Cadet Avatar Selection
  if (gameState.current_phase === 'phase1_avatars') {
    return (
      <Phase1AvatarSelectScreen
        studentProfile={gameState.student_profile}
        selectedCharacterId={gameState.selected_character_id || 'jorge'}
        puntosAcumulados={gameState.puntos_acumulados}
        onSelectCharacter={(charId) => setGameState(prev => ({ ...prev, selected_character_id: charId }))}
        onConfirmAvatar={handleSelectCadet}
        onBackToPhase0={() => pushPhase('phase0_login')}
      />
    );
  }

  // FASE 2: Modules & Ecosystem Matrix
  if (gameState.current_phase === 'phase2_modules' && !activePillarSimulator) {
    return (
      <Phase2ModulesScreen
        studentProfile={gameState.student_profile}
        selectedCharacterId={gameState.selected_character_id || 'jorge'}
        puntosAcumulados={gameState.puntos_acumulados}
        onSelectPillar={handleSelectPillar}
        onStartFullCampaign={() => {
          setActivePillarSimulator(null);
          pushPhase('phase3_gameplay');
        }}
        onBackToPhase1={() => pushPhase('phase1_avatars')}
      />
    );
  }

  // FASE 5: Mission End & Digital Certificate
  if (gameState.current_phase === 'phase5_final') {
    const saldoBs = (gameState.saldo_dinero * gameState.tasa_bcv).toLocaleString('es-VE', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
    return (
      <Phase5MissionEndScreen
        studentProfile={gameState.student_profile}
        selectedCharacterId={gameState.selected_character_id || 'jorge'}
        puntosAcumulados={gameState.puntos_acumulados}
        totalAciertos={gameState.total_aciertos}
        totalErrores={gameState.total_errores_cometidos}
        rachaMaxima={Math.max(gameState.racha_aciertos, gameState.total_aciertos)}
        saldoUsd={gameState.saldo_dinero}
        saldoBs={saldoBs}
        onRestartSimulation={handleResetGame}
      />
    );
  }

  // Active Ecosystem Pillar Simulators (Accessible from Phase 2 or Navbar)
  if (activePillarSimulator) {
    return (
      <div className="min-h-screen bg-[#050814] text-slate-100 cyber-grid-bg p-4 sm:p-6">
        {activePillarSimulator === 'emprendimiento' && (
          <EmprendimientoSimulator
            tasaBcv={gameState.tasa_bcv}
            onBack={() => setActivePillarSimulator(null)}
          />
        )}

        {activePillarSimulator === 'bolsa_bvc' && (
          <BolsaBvcSimulator
            tasaBcv={gameState.tasa_bcv}
            saldoUsd={gameState.saldo_dinero}
            onUpdateSaldo={(newSaldo) => setGameState(prev => ({ ...prev, saldo_dinero: newSaldo }))}
            onBack={() => setActivePillarSimulator(null)}
          />
        )}

        {activePillarSimulator === 'ciberseguridad' && (
          <CiberseguridadSimulator
            onBack={() => setActivePillarSimulator(null)}
            onAwardBonus={(bonus) => {
              setGameState(prev => ({
                ...prev,
                puntos_acumulados: prev.puntos_acumulados + bonus,
                puntos_comprension: prev.puntos_comprension + bonus
              }));
            }}
          />
        )}

        {activePillarSimulator === 'lectura_contratos' && (
          <LecturaContratosSimulator
            onBack={() => setActivePillarSimulator(null)}
            onAwardBonus={(bonus) => {
              setGameState(prev => ({
                ...prev,
                puntos_acumulados: prev.puntos_acumulados + bonus,
                puntos_comprension: prev.puntos_comprension + bonus
              }));
            }}
          />
        )}
      </div>
    );
  }

  // FASE 3: Active Interactive Adventure Challenge
  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 cyber-grid-bg selection:bg-[#ff007f] selection:text-white pb-16 flex flex-col justify-between">
      
      {/* Background Neon Glow Orbs */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Primary Cyber HUD & Navbar */}
      <CyberNavbar
        saldoDinero={gameState.saldo_dinero}
        tasaBcv={gameState.tasa_bcv}
        bcvData={bcvData}
        puntosComprension={gameState.puntos_acumulados}
        nivelAnalisis={gameState.nivel_analisis}
        racha={gameState.racha_aciertos}
        requisitosCount={gameState.requisitos_recolectados.length}
        totalRequisitos={REQUIREMENTS_CATALOG.length}
        soundEnabled={gameState.sound_enabled}
        selectedCharacterId={gameState.selected_character_id}
        characterAlias={gameState.character_alias}
        textSize={textSize}
        onChangeTextSize={setTextSize}
        onLogoClick={handleLogoClickBack}
        onToggleSound={() => setGameState(prev => ({ ...prev, sound_enabled: !prev.sound_enabled }))}
        onRefreshBcvRate={handleRefreshBcvRate}
        onOpenJsonInspector={() => setShowJsonInspector(true)}
        onOpenWallet={() => setActiveView('wallet')}
        onOpenBanks={() => setActiveView('banks')}
        onOpenSimulator={() => setActiveView('simulator')}
        onOpenAiMentor={() => setShowAiMentor(true)}
        onOpenGallery={() => setShowGalleryModal(true)}
        onOpenCoverScreen={() => pushPhase('phase1_avatars')}
        onOpenModulesScreen={() => pushPhase('phase2_modules')}
        activeView={activeView}
        onChangeView={setActiveView}
      />

      {/* Main App Container with Dynamic Grid: Challenge on Left + Right Telemetry HUD */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 pt-5 w-full flex-1 ${getTextScaleClass()}`}>
        
        {/* Dynamic Financial Banner Ticker with Real-Time BCV Rate & Active Date */}
        <div className="mb-5 p-3 rounded-xl bg-[#080d22]/90 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,243,255,0.1)] flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono-code text-slate-300">
          <div className="flex flex-wrap items-center gap-2.5">
            <div 
              onClick={() => {
                cyberAudio.playBlip();
                speechNarrator.speak(`Tasa oficial del Banco Central de Venezuela al día de hoy, ${bcvData.fechaTexto}: 1 dólar estadounidense equivale a ${gameState.tasa_bcv.toFixed(2)} bolívares.`);
              }}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 cursor-pointer hover:border-emerald-300 transition"
              title="Haz clic para escuchar la tasa oficial del día en voz alta"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-900/80 text-emerald-200 font-bold text-[10px]">
                BCV OFICIAL
              </span>
              <span className="font-bold text-white tracking-wide text-sm">
                1 USD = {gameState.tasa_bcv.toFixed(2)} Bs.
              </span>
            </div>

            {/* Active Date and Time Badge */}
            <div 
              onClick={() => {
                cyberAudio.playBlip();
                speechNarrator.speak(`Fecha activa de cotización bancaria: ${bcvData.fechaTexto}, actualizada a las ${bcvData.horaActualizacion}.`);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 cursor-pointer hover:text-cyan-300 transition text-[11px]"
              title="Fecha y hora de actualización"
            >
              <Calendar size={13} className="text-cyan-400 flex-shrink-0" />
              <span className="capitalize">{bcvData.fechaTexto}</span>
              <span className="text-slate-500">•</span>
              <Clock size={12} className="text-slate-400 flex-shrink-0" />
              <span className="text-slate-400">{bcvData.horaActualizacion}</span>
            </div>

            {/* Force Refresh Rate & Date Button */}
            <button
              id="btn-banner-refresh-bcv"
              onClick={handleRefreshBcvRate}
              disabled={isRefreshingBcv}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/80 hover:text-white transition cursor-pointer text-[11px] font-cyber ${
                isRefreshingBcv ? 'opacity-70 cursor-wait' : ''
              }`}
              title="Actualizar tasa BCV a la fecha actual"
            >
              <RefreshCw size={12} className={isRefreshingBcv ? 'animate-spin text-cyan-200' : ''} />
              <span>{isRefreshingBcv ? 'Actualizando...' : 'Actualizar Tasa'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-2 md:pt-0">
            <span className="hidden lg:inline text-slate-400 max-w-sm truncate">
              {FINANCIAL_TIPS[(gameState.capitulo_actual_id - 1) % FINANCIAL_TIPS.length]}
            </span>
            <button
              id="btn-restart-simulation"
              onClick={handleResetGame}
              className="text-slate-400 hover:text-rose-400 transition flex items-center gap-1 cursor-pointer"
              title="Reiniciar Simulación"
            >
              <RotateCcw size={12} />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>

        {/* View Routing */}
        {activeView === 'adventure' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (8 cols): Challenge Modal & Bank Card */}
            <div className="xl:col-span-8 space-y-6">
              <ChallengeModal
                mainModal={currentEngineOutput.main_modal}
                currentChapterNum={currentChapter.numero}
                totalChapters={CHAPTERS.length}
                selectedOptionId={gameState.selected_option_id}
                feedbackState={gameState.feedback_state}
                feedbackMessage={gameState.feedback_message}
                failedOptionIds={gameState.opciones_falladas_en_reto}
                onSelectOption={handleSelectOptionSuccess}
                onOptionFailed={handleOptionFailed}
                onNextChapter={() => setShowPhase4GameOver(true)}
                onOpenBankInfo={() => setShowBankInfoModal(true)}
                onOpenSimulator={() => setActiveView('simulator')}
                onOpenGallery={() => setShowGalleryModal(true)}
                textSize={textSize}
                onChangeTextSize={setTextSize}
              />

              {/* Embedded Bank Info Card if relevant */}
              {currentChapter.bank_info.show_info_card && (
                <div className="max-w-4xl mx-auto">
                  <BankConsultationCard
                    bankInfo={currentChapter.bank_info}
                    onOpenBankPortal={(bankName) => {
                      setGameState(prev => ({ ...prev, banco_seleccionado: bankName as BankContext }));
                      setActiveView('banks');
                    }}
                  />
                </div>
              )}
            </div>

            {/* Right Column (4 cols): Persistent Right HUD Panel */}
            <div className="xl:col-span-4 sticky top-20 space-y-4">
              <RightHudPanel
                puntosAcumulados={gameState.puntos_acumulados}
                puntosNivelActual={gameState.puntos_nivel_actual}
                racha={gameState.racha_aciertos}
                totalErrores={gameState.total_errores_cometidos}
                totalAciertos={gameState.total_aciertos}
                capituloActual={currentChapter.numero}
              />
            </div>

          </div>
        )}

        {activeView === 'map' && (
          <CyberCityMap
            chapters={CHAPTERS}
            currentChapterId={gameState.capitulo_actual_id}
            completedChapterIds={gameState.capitulos_completados}
            unlockedAccounts={gameState.cuentas_desbloqueadas}
            worldEvents={gameState.log_eventos}
            onSelectChapter={(chapterId) => {
              cyberAudio.playBlip();
              setGameState(prev => ({
                ...prev,
                capitulo_actual_id: chapterId,
                selected_option_id: null,
                feedback_state: 'idle',
                feedback_message: '',
                opciones_falladas_en_reto: []
              }));
              setActiveView('adventure');
            }}
            onOpenBankPortal={(bankName) => {
              setGameState(prev => ({ ...prev, banco_seleccionado: bankName as BankContext }));
              setActiveView('banks');
            }}
            onOpenGallery={() => setShowGalleryModal(true)}
          />
        )}

        {activeView === 'banks' && (
          <BankTerminalModal
            initialBank={gameState.banco_seleccionado}
            bankProducts={BANK_PRODUCTS}
            collectedRequirements={gameState.requisitos_recolectados}
            unlockedAccountNames={gameState.cuentas_desbloqueadas}
            saldoDinero={gameState.saldo_dinero}
            tasaBcv={gameState.tasa_bcv}
            onUnlockAccount={handleUnlockAccount}
            onClose={() => setActiveView('adventure')}
          />
        )}

        {activeView === 'simulator' && (
          <div className="max-w-3xl mx-auto">
            <PagoMovilSimulator
              saldoDinero={gameState.saldo_dinero}
              tasaBcv={gameState.tasa_bcv}
              onExecutePayment={(usdAmount) => {
                setGameState(prev => ({
                  ...prev,
                  saldo_dinero: Math.max(0, prev.saldo_dinero - usdAmount),
                  log_eventos: [
                    `PagoMóvil emitido por $${usdAmount.toFixed(2)} USD (Bs. ${(usdAmount * prev.tasa_bcv).toFixed(2)})`,
                    ...prev.log_eventos.slice(0, 19)
                  ]
                }));
              }}
            />
          </div>
        )}

        {activeView === 'wallet' && (
          <div className="max-w-4xl mx-auto">
            <RequirementInventory
              allRequirements={REQUIREMENTS_CATALOG}
              collectedRequirementNames={gameState.requisitos_recolectados}
              bankProducts={BANK_PRODUCTS}
              selectedCharacterId={gameState.selected_character_id}
              characterAlias={gameState.character_alias}
            />
          </div>
        )}

      </main>

      {/* FASE 4: Transition Between Challenges (Game Over de Reto) */}
      {showPhase4GameOver && (
        <Phase4ChallengeGameOver
          completedChallengeTitle={currentChapter.title}
          completedChapterNumber={currentChapter.numero}
          totalChapters={CHAPTERS.length}
          pointsEarnedInChallenge={100 + (gameState.selected_character_id === 'carlos' ? 25 : 0)}
          penaltyErrorsInChallenge={gameState.opciones_falladas_en_reto.length}
          puntosAcumulados={gameState.puntos_acumulados}
          racha={gameState.racha_aciertos}
          studentName={gameState.student_profile?.name || gameState.character_alias || 'Operador'}
          onProceedToNextChallenge={handleProceedAfterGameOver}
          isLastChallenge={gameState.capitulo_actual_id === CHAPTERS.length}
        />
      )}

      {/* Bank Consultation Modal */}
      {showBankInfoModal && (
        <BankConsultationCard
          bankInfo={currentChapter.bank_info}
          onClose={() => setShowBankInfoModal(false)}
          onOpenBankPortal={(bankName) => {
            setShowBankInfoModal(false);
            setGameState(prev => ({ ...prev, banco_seleccionado: bankName as BankContext }));
            setActiveView('banks');
          }}
          isModal={true}
        />
      )}

      {/* JSON State Engine Inspector Modal */}
      {showJsonInspector && (
        <JsonEngineInspector
          engineOutput={currentEngineOutput}
          onClose={() => setShowJsonInspector(false)}
          isModal={true}
        />
      )}

      {/* AI Mentor Drawer */}
      {showAiMentor && (
        <AiMentorDrawer
          onClose={() => setShowAiMentor(false)}
          saldoDinero={gameState.saldo_dinero}
          tasaBcv={gameState.tasa_bcv}
        />
      )}

      {/* Comic Gallery & Avatars Modal */}
      <ComicGalleryModal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
      />

    </div>
  );
}
