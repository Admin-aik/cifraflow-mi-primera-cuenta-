export type AnalysisLevel = 'Básico' | 'Intermedio' | 'Avanzado';

export type ChallengeType = 
  | 'Comprensión Lectora'
  | 'Acertijo Lógico'
  | 'Selección Financiera'
  | 'Ciberseguridad FinTech'
  | 'Apertura de Cuenta';

export type BankContext = 
  | 'Banco de Venezuela'
  | 'Banco Plaza'
  | 'Banco del Tesoro'
  | 'Ninguno';

export interface OptionReward {
  dinero: number;
  puntos: number;
  requisitoDesbloqueado?: string;
  cuentaDesbloqueada?: string;
}

export interface ChallengeOption {
  id: number;
  text: string;
  feedback_immediate: string;
  reward_if_correct: OptionReward;
}

export interface MainModal {
  title: string;
  bank_context: BankContext;
  source_text: string;
  challenge_type: ChallengeType;
  question: string;
  options: ChallengeOption[];
  correct_option_id: number;
}

export interface BankConsultationInfo {
  show_info_card: boolean;
  bank_name: string;
  account_type: string;
  benefits: string[];
  requirements: string[];
  code?: string;
  colorTheme?: 'red' | 'cyan' | 'fuchsia' | 'emerald' | 'amber';
  tagline?: string;
}

export interface HudUpdate {
  saldo_dinero: string; // e.g. "$100.00 / Bs.3,650.00"
  puntos_comprension: number;
  nivel_analisis: AnalysisLevel;
  racha: number;
  requisitos_completados: string; // e.g. "1/3"
}

export interface GameEngineOutput {
  hud_update: HudUpdate;
  main_modal: MainModal;
  bank_consultation_info: BankConsultationInfo;
  world_events: string[];
}

export type GamePhase = 
  | 'phase0_login'       // FASE 0: REGISTRO E INGRESO AL ECOSISTEMA UNIFICADO
  | 'phase1_avatars'     // FASE 1: SELECCIÓN CINEMATOGRÁFICA DE AVATARES EN GRANDE
  | 'phase2_modules'     // FASE 2: SELECCIÓN DE MÓDULOS / CAMPAÑA
  | 'phase3_gameplay'    // FASE 3: GAMEPLAY, REINTEGRACIÓN DE INTENTOS Y CONFIDENCIALIDAD
  | 'phase4_transition'  // FASE 4: TRANSICIÓN ENTRE RETOS ("GAME OVER DE RETO")
  | 'phase5_final';      // FASE 5: EVALUACIÓN FINAL ("FIN DE LA MISIÓN")

export type TextSizeLevel = 'sm' | 'normal' | 'lg' | 'xl';

export type EcosystemPillar = 
  | 'lectura_contratos'
  | 'banca_fintech'
  | 'emprendimiento'
  | 'bolsa_bvc'
  | 'ciberseguridad';

export interface StudentProfile {
  name: string;
  idCard: string;
  institution: string;
  registeredAt: string;
}

export interface GameState {
  // Phase and Navigation
  current_phase: GamePhase;
  phase_history: GamePhase[];
  active_pillar: EcosystemPillar;
  text_size: TextSizeLevel;

  // Student Profile
  student_profile: StudentProfile;

  // Avatar Selection
  selected_character_id?: string;
  character_alias?: string;

  // Cumulative Scoring & Right HUD
  puntos_acumulados: number; // Permits negative values!
  puntos_nivel_actual: number;
  total_errores_cometidos: number;
  total_aciertos: number;
  opciones_falladas_en_reto: number[]; // Disables failed options without revealing correct one

  // Financial Balance & Progression
  saldo_dinero: number; // in USD / digital tokens
  puntos_comprension: number;
  nivel_analisis: AnalysisLevel;
  requisitos_recolectados: string[];
  cuentas_desbloqueadas: string[];
  racha_aciertos: number;
  capitulo_actual_id: number;
  capitulos_completados: number[];
  banco_seleccionado: BankContext | null;
  selected_option_id: number | null;
  feedback_state: 'idle' | 'correct' | 'incorrect';
  feedback_message: string;
  sound_enabled: boolean;
  tasa_bcv: number; // e.g. 36.50 Bs / USD
  log_eventos: string[];
}

export interface Chapter {
  id: number;
  numero: number;
  title: string;
  subtitle: string;
  location: string;
  difficulty: 'Inicial' | 'Media' | 'Avanzada';
  bank_context: BankContext;
  mission_goal: string;
  source_text: string;
  challenge_type: ChallengeType;
  question: string;
  options: ChallengeOption[];
  correct_option_id: number;
  bank_info: BankConsultationInfo;
  event_on_success: string[];
}

export interface RequirementItem {
  id: string;
  nombre: string;
  descripcion: string;
  entidadEmisora: string;
  icono: string;
  desbloqueadoEnCapitulo: number;
  esObligatorio: boolean;
  detalles: string[];
}

export interface BankAccountProduct {
  id: string;
  nombre: string;
  banco: BankContext;
  codigoBanco: string;
  edadRequerida: string;
  moneda: 'VES (Bolívares)' | 'USD/EUR (Divisas)' | 'Bimonetaria';
  tasaInteres: string;
  requisitosMinimos: string[];
  beneficiosClave: string[];
  costoMantenimiento: string;
  canalesDigitales: string[];
}
