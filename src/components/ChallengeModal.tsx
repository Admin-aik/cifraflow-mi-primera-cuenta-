import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Coins, 
  BrainCircuit, 
  Award,
  ChevronRight,
  Info,
  User,
  Volume2,
  VolumeX,
  Square,
  Play,
  RotateCcw,
  Headphones,
  Gauge,
  Image as ImageIcon
} from 'lucide-react';
import { MainModal, ChallengeOption, BankContext } from '../types';
import confetti from 'canvas-confetti';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';
import { CHARACTERS, SCENES } from '../assets/gameImages';

interface ChallengeModalProps {
  mainModal: MainModal;
  currentChapterNum: number;
  totalChapters: number;
  selectedOptionId: number | null;
  feedbackState: 'idle' | 'correct' | 'incorrect';
  feedbackMessage: string;
  failedOptionIds?: number[];
  onSelectOption: (option: ChallengeOption) => void;
  onOptionFailed?: (option: ChallengeOption) => void;
  onNextChapter: () => void;
  onOpenBankInfo: () => void;
  onOpenSimulator: () => void;
  onOpenGallery?: () => void;
  textSize?: 'sm' | 'normal' | 'lg' | 'xl';
  onChangeTextSize?: (size: 'sm' | 'normal' | 'lg' | 'xl') => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  mainModal,
  currentChapterNum,
  totalChapters,
  selectedOptionId,
  feedbackState,
  feedbackMessage,
  failedOptionIds = [],
  onSelectOption,
  onOptionFailed,
  onNextChapter,
  onOpenBankInfo,
  onOpenSimulator,
  onOpenGallery,
  textSize = 'normal',
  onChangeTextSize
}) => {
  const [chosenOption, setChosenOption] = useState<ChallengeOption | null>(null);
  const [isReadingSource, setIsReadingSource] = useState(false);
  const [readingParagraphIdx, setReadingParagraphIdx] = useState<number | null>(null);
  const [readingFontSize, setReadingFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [speechSpeed, setSpeechSpeed] = useState<number>(() => speechNarrator.getRate());

  // Reset local state when chapter changes
  useEffect(() => {
    setIsReadingSource(false);
    setReadingParagraphIdx(null);
  }, [mainModal.title]);

  // Subscribe to speech narrator state to sync UI
  useEffect(() => {
    const unsub = speechNarrator.subscribe((speaking) => {
      if (!speaking) {
        setIsReadingSource(false);
        setReadingParagraphIdx(null);
      }
    });
    return () => unsub();
  }, []);

  const handleReadFullSource = () => {
    if (isReadingSource) {
      speechNarrator.stop();
      setIsReadingSource(false);
      setReadingParagraphIdx(null);
      cyberAudio.playBlip();
    } else {
      cyberAudio.playDataBeep();
      setIsReadingSource(true);
      setReadingParagraphIdx(null);
      const textToRead = `Capítulo ${currentChapterNum}. ${mainModal.title}. Fuente de lectura y contexto financiero: ${mainModal.source_text}`;
      speechNarrator.speak(textToRead, true);
    }
  };

  const handleReadParagraph = (paragraph: string, idx: number) => {
    cyberAudio.playDataBeep();
    setIsReadingSource(true);
    setReadingParagraphIdx(idx);
    speechNarrator.speak(`Párrafo ${idx + 1}: ${paragraph}`, true);
  };

  const handleSetSpeed = (speed: number) => {
    cyberAudio.playBlip();
    setSpeechSpeed(speed);
    speechNarrator.setRate(speed);
    speechNarrator.speak(`Velocidad ajustada a ${speed} equis.`, false);
  };

  const getFontSizeClass = () => {
    switch (readingFontSize) {
      case 'sm':
        return 'text-xs sm:text-sm';
      case 'lg':
        return 'text-base sm:text-lg';
      default:
        return 'text-sm sm:text-base';
    }
  };

  // Chapter Guide Character Mapping
  const getChapterGuide = (chapterNum: number) => {
    switch (chapterNum) {
      case 1:
        return { char: CHARACTERS[0], scene: SCENES[0] }; // Kael - Cafe
      case 2:
        return { char: CHARACTERS[2], scene: SCENES[1] }; // Valeria - Bank
      case 3:
        return { char: CHARACTERS[1], scene: SCENES[0] }; // Maya - Cafe / Maker
      case 4:
        return { char: CHARACTERS[3], scene: SCENES[2] }; // Dante - Loft
      default:
        return { char: CHARACTERS[0], scene: SCENES[3] }; // Team / Kael - City
    }
  };

  const { char: guideChar, scene: guideScene } = getChapterGuide(currentChapterNum);

  // Auto-narrate challenge title and question on chapter load
  useEffect(() => {
    if (feedbackState === 'idle') {
      const speech = `Capítulo ${currentChapterNum}. ${mainModal.title}. ${guideChar.name} dice: "${guideChar.quote}". Pregunta: ${mainModal.question}`;
      speechNarrator.speak(speech, false);
    }
  }, [currentChapterNum, mainModal.title, mainModal.question]);

  const getBankBadge = (bank: BankContext) => {
    switch (bank) {
      case 'Banco de Venezuela':
        return {
          name: 'Banco de Venezuela (0102)',
          color: 'border-cyan-400/50 bg-cyan-950/60 text-cyan-300 shadow-[0_0_10px_rgba(0,243,255,0.2)]'
        };
      case 'Banco Plaza':
        return {
          name: 'Banco Plaza (0138)',
          color: 'border-emerald-400/50 bg-emerald-950/60 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
        };
      case 'Banco del Tesoro':
        return {
          name: 'Banco del Tesoro (0163)',
          color: 'border-amber-400/50 bg-amber-950/60 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.2)]'
        };
      default:
        return {
          name: 'Seguridad Financiera Interbancaria',
          color: 'border-fuchsia-400/50 bg-fuchsia-950/60 text-fuchsia-300 shadow-[0_0_10px_rgba(255,0,127,0.2)]'
        };
    }
  };

  const bankBadge = getBankBadge(mainModal.bank_context);

  const handleOptionClick = (option: ChallengeOption) => {
    if (feedbackState === 'correct') return; // already solved
    if (failedOptionIds.includes(option.id)) return; // already failed and locked

    setChosenOption(option);
    cyberAudio.playBlip();

    const isCorrect = option.id === mainModal.correct_option_id;
    if (isCorrect) {
      cyberAudio.playSuccess();
      const feedbackSpeech = `¡Respuesta correcta! ${option.feedback_immediate} Recompensas: más ${option.reward_if_correct.dinero} dólares y ${option.reward_if_correct.puntos} puntos de comprensión.`;
      speechNarrator.speak(feedbackSpeech, true);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#00f3ff', '#ff007f', '#3b82f6', '#10b981']
        });
      } catch {
        // confetti fallback
      }

      onSelectOption(option);
    } else {
      cyberAudio.playError();
      const feedbackSpeech = `Respuesta incorrecta. ${option.feedback_immediate} La respuesta correcta permanece confidencial. Penalización descontada en el HUD. ¡Analiza nuevamente la lectura y selecciona otra opción!`;
      speechNarrator.speak(feedbackSpeech, true);

      if (onOptionFailed) {
        onOptionFailed(option);
      } else {
        onSelectOption(option);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      
      {/* Chapter Progress & Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded font-mono-code font-bold bg-[#ff007f]/20 border border-[#ff007f]/40 text-[#ff007f]">
            CAPÍTULO {currentChapterNum} / {totalChapters}
          </span>
          <span className="text-slate-400 font-medium hidden sm:inline">•</span>
          <span className="font-cyber font-semibold text-slate-200">
            {mainModal.challenge_type}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono-code font-semibold flex items-center gap-1.5 ${bankBadge.color}`}>
            <Building2 size={12} />
            <span>{bankBadge.name}</span>
          </div>

          {mainModal.bank_context !== 'Ninguno' && (
            <button
              id="btn-view-bank-profile"
              onClick={onOpenBankInfo}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1 font-medium transition"
            >
              <Info size={12} />
              <span className="hidden md:inline">Ver Ficha</span>
            </button>
          )}

          {onOpenGallery && (
            <button
              id="btn-open-gallery-quick"
              onClick={onOpenGallery}
              className="text-[11px] text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 font-medium px-2 py-0.5 rounded bg-fuchsia-950/40 border border-fuchsia-500/30 transition"
              title="Ver Galería de Cómics y Avatares"
            >
              <ImageIcon size={12} />
              <span className="hidden sm:inline">Cómics</span>
            </button>
          )}
        </div>
      </div>

      {/* Narrative Comic Guide Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 p-4 relative overflow-hidden shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Background Scene Ambience */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img 
            src={guideScene.image} 
            alt={guideScene.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Character Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_15px_rgba(0,243,255,0.4)] bg-slate-950">
            <img 
              src={guideChar.avatar} 
              alt={guideChar.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded text-[9px] font-mono-code font-bold bg-[#00f3ff] text-slate-950 shadow">
            {guideChar.age}
          </div>
        </div>

        {/* Character Speech / Guide Info */}
        <div className="flex-1 space-y-1 text-center sm:text-left relative z-10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-cyber font-bold text-sm sm:text-base text-white">
              {guideChar.name}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              {guideChar.badge}
            </span>
            <span className="text-xs text-slate-400 font-sans hidden md:inline">
              • Escenario: {guideScene.title}
            </span>
          </div>
          <p 
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`${guideChar.name} dice: "${guideChar.quote}"`);
            }}
            className="text-xs sm:text-sm text-cyan-100 font-sans italic cursor-pointer hover:text-white transition flex items-center gap-1.5 justify-center sm:justify-start"
            title="Haz clic para escuchar el diálogo del cadete"
          >
            <Volume2 size={13} className="text-[#00f3ff] flex-shrink-0" />
            <span>"{guideChar.quote}"</span>
          </p>
        </div>
      </div>

      {/* Main Glassmorphic Challenge Terminal */}
      <div className="cyber-glass rounded-2xl p-5 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent shadow-[0_0_15px_#00f3ff]"></div>

        {/* Title Header */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-code uppercase tracking-wider font-semibold">
            <Sparkles size={14} className="text-[#00f3ff]" />
            <span>Terminal de Desafío FinTech</span>
          </div>
          <h2 
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`${mainModal.title}. ${mainModal.question}`);
            }}
            className="text-xl sm:text-2xl font-cyber font-bold text-white tracking-wide cursor-pointer hover:text-cyan-300 transition"
            title="Haz clic para escuchar el título del reto"
          >
            {mainModal.title} 🔊
          </h2>
        </div>

        {/* Holographic Source Text / Reading Content with Interactive Audio Suite */}
        <div 
          id="fuente-lectura-contexto-financiero"
          className="p-4 sm:p-6 rounded-xl bg-[#070c1e]/95 border border-cyan-500/35 relative shadow-inner space-y-4"
        >
          {/* Top Audio Player Station Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-cyan-500/25 pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-[#00f3ff] shadow-[0_0_12px_rgba(0,243,255,0.25)] flex items-center justify-center">
                <Headphones size={18} className={isReadingSource ? 'animate-bounce text-[#00f3ff]' : 'text-cyan-300'} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-cyber font-bold text-white tracking-wide flex items-center gap-1.5">
                    FUENTE DE LECTURA Y CONTEXTO FINANCIERO
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono-code font-bold">
                    AUDIO-LECTURA 🔊
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono-code">
                  Lectura guiada en voz alta • Haz clic en el botón o en cualquier párrafo
                </p>
              </div>
            </div>

            {/* Audio Action Buttons and Controls */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
              {/* Voice Speed Toggle */}
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-mono-code text-slate-300">
                <Gauge size={12} className="text-cyan-400" />
                <span className="text-slate-400">Voz:</span>
                {[0.9, 1.0, 1.2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => handleSetSpeed(spd)}
                    className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                      Math.abs(speechSpeed - spd) < 0.05
                        ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40'
                        : 'hover:text-white text-slate-400'
                    }`}
                    title={`Velocidad ${spd}x`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Font Size Adjuster */}
              <div className="flex items-center rounded-lg bg-slate-900/90 border border-slate-800 p-0.5 text-xs text-slate-400">
                <button
                  onClick={() => setReadingFontSize('sm')}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${readingFontSize === 'sm' ? 'bg-cyan-950 text-cyan-300 font-bold' : 'hover:text-white'}`}
                  title="Texto Pequeño"
                >
                  A-
                </button>
                <button
                  onClick={() => setReadingFontSize('base')}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${readingFontSize === 'base' ? 'bg-cyan-950 text-cyan-300 font-bold' : 'hover:text-white'}`}
                  title="Texto Normal"
                >
                  A
                </button>
                <button
                  onClick={() => setReadingFontSize('lg')}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${readingFontSize === 'lg' ? 'bg-cyan-950 text-cyan-300 font-bold' : 'hover:text-white'}`}
                  title="Texto Grande"
                >
                  A+
                </button>
              </div>

              {/* Main Audio Narration Button */}
              <button
                id="btn-read-source-text"
                onClick={handleReadFullSource}
                className={`px-3.5 py-2 rounded-lg border text-xs font-cyber flex items-center gap-2 transition cursor-pointer shadow-[0_0_15px_rgba(0,243,255,0.25)] ${
                  isReadingSource
                    ? 'bg-rose-950/90 border-rose-500/60 text-rose-300 hover:bg-rose-900 hover:text-white'
                    : 'bg-gradient-to-r from-cyan-950 via-blue-950 to-indigo-950 border-cyan-500/50 text-cyan-300 hover:text-white hover:border-cyan-400'
                }`}
                title="Escuchar toda la fuente de lectura en voz alta"
              >
                {isReadingSource ? (
                  <>
                    <Square size={13} className="text-rose-400 fill-current animate-pulse" />
                    <span className="font-bold">Detener Lectura</span>
                  </>
                ) : (
                  <>
                    <Play size={13} className="text-[#00f3ff] fill-[#00f3ff]" />
                    <span className="font-bold">Escuchar Todo el Contexto</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reading Active Soundwave Indicator & Live Audio Spectrum */}
          {isReadingSource && (
            <div className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/40 text-xs font-mono-code text-cyan-200 shadow-md">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping flex-shrink-0"></span>
                <span>
                  {readingParagraphIdx !== null 
                    ? `Leyendo Párrafo ${readingParagraphIdx + 1} con Voz Latinoamericana...`
                    : 'Reproduciendo Lectura Completa del Contexto Financiero...'}
                </span>
              </div>

              {/* Animated Equalizer Wave */}
              <div className="flex items-center gap-1">
                <span className="w-1 h-3.5 bg-cyan-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite]"></span>
                <span className="w-1 h-5 bg-[#00f3ff] rounded-full animate-[pulse_0.35s_ease-in-out_infinite]"></span>
                <span className="w-1 h-2.5 bg-blue-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                <span className="w-1 h-4 bg-emerald-400 rounded-full animate-[pulse_0.45s_ease-in-out_infinite]"></span>
              </div>
            </div>
          )}

          {/* Reading Paragraphs with Individual Highlighting & Click-to-Speech */}
          <div className={`text-slate-200 ${getFontSizeClass()} leading-relaxed space-y-3 font-sans`}>
            {mainModal.source_text.split('\n\n').map((paragraph, idx) => {
              const isSelected = readingParagraphIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleReadParagraph(paragraph, idx)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer group relative ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-400/80 text-cyan-50 shadow-[0_0_20px_rgba(0,243,255,0.25)]'
                      : 'bg-slate-950/50 border-cyan-900/30 hover:border-cyan-500/40 hover:bg-slate-900/70 hover:text-white'
                  }`}
                  title="Haz clic para escuchar este párrafo en voz alta"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadParagraph(paragraph, idx);
                      }}
                      className={`p-1.5 rounded-lg border text-[11px] font-mono-code mt-0.5 flex-shrink-0 transition ${
                        isSelected 
                          ? 'bg-cyan-900 border-cyan-400 text-cyan-200' 
                          : 'bg-slate-900/90 text-cyan-400 border-cyan-500/30 group-hover:border-cyan-400 group-hover:bg-cyan-950 group-hover:text-white'
                      }`}
                      title="Reproducir párrafo"
                    >
                      <Volume2 size={13} className={isSelected ? 'animate-pulse text-[#00f3ff]' : ''} />
                    </button>
                    <p className="whitespace-pre-line flex-1">
                      {paragraph}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Challenge Question */}
        <div 
          onClick={() => {
            cyberAudio.playBlip();
            speechNarrator.speak(`Pregunta del reto: ${mainModal.question}`);
          }}
          className="p-4 rounded-xl bg-slate-900/90 border border-fuchsia-500/30 shadow-[0_0_12px_rgba(255,0,127,0.15)] space-y-2 cursor-pointer hover:border-fuchsia-400 transition"
          title="Haz clic para escuchar la pregunta"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase text-[#ff007f] font-bold tracking-wider">
              <HelpCircle size={14} />
              <span>Pregunta / Acertijo de Comprensión:</span>
            </div>
            <Volume2 size={14} className="text-fuchsia-400 animate-pulse" />
          </div>
          <p className="text-base sm:text-lg font-cyber font-semibold text-white leading-snug">
            {mainModal.question}
          </p>
        </div>

        {/* Interactive Options Matrix */}
        <div className="space-y-3">
          <div className="text-xs font-mono-code uppercase tracking-wider text-slate-400 font-semibold">
            Selecciona la respuesta correcta:
          </div>

          <div className="grid grid-cols-1 gap-3">
            {mainModal.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isFailed = failedOptionIds.includes(option.id);
              const isCorrectAndRevealed = feedbackState === 'correct' && option.id === mainModal.correct_option_id;

              let optionStyle = 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 text-slate-200';

              if (isCorrectAndRevealed) {
                // ONLY illuminate emerald green when answered correctly!
                optionStyle = 'bg-emerald-950/70 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.3)]';
              } else if (isFailed) {
                // Failed options are marked with error border, dimmed and disabled
                optionStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-300 line-through opacity-70 cursor-not-allowed';
              } else if (feedbackState === 'correct') {
                optionStyle = 'bg-slate-900/40 border-slate-850 text-slate-500 opacity-50 cursor-not-allowed';
              } else if (isSelected) {
                optionStyle = 'bg-cyan-950/60 border-cyan-400 text-cyan-100 shadow-[0_0_12px_rgba(0,243,255,0.3)]';
              }

              return (
                <button
                  key={option.id}
                  id={`challenge-option-${option.id}`}
                  onClick={() => handleOptionClick(option)}
                  disabled={feedbackState === 'correct' || isFailed}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 group relative ${optionStyle}`}
                >
                  <div className={`flex-shrink-0 w-7 h-7 rounded-lg font-mono-code font-bold text-xs flex items-center justify-center border transition ${
                    isFailed 
                      ? 'bg-rose-950 border-rose-500 text-rose-300' 
                      : isCorrectAndRevealed
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                        : 'bg-slate-950/80 border-slate-700 text-slate-300 group-hover:border-cyan-400 group-hover:text-cyan-300'
                  }`}>
                    {option.id}
                  </div>

                  <div className="flex-1 text-sm sm:text-base font-sans leading-relaxed">
                    {option.text}
                  </div>

                  <div className="flex-shrink-0 pt-0.5">
                    {isCorrectAndRevealed ? (
                      <CheckCircle2 size={20} className="text-emerald-400 animate-pulse" />
                    ) : isFailed ? (
                      <XCircle size={20} className="text-rose-400" />
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Immediate Feedback Card */}
        {feedbackState !== 'idle' && (
          <div 
            id="challenge-feedback-panel"
            className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 space-y-3 ${
              feedbackState === 'correct'
                ? 'bg-emerald-950/70 border-emerald-400/60 shadow-[0_0_20px_rgba(52,211,153,0.25)]'
                : 'bg-rose-950/70 border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedbackState === 'correct' ? (
                <>
                  <CheckCircle2 size={20} className="text-emerald-400" />
                  <span className="font-cyber font-bold text-emerald-300 text-base sm:text-lg">
                    ¡Respuesta Correcta! Acertijo Superado
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={20} className="text-rose-400" />
                  <span className="font-cyber font-bold text-rose-300 text-base sm:text-lg">
                    Respuesta Incorrecta — Revisa la lectura
                  </span>
                </>
              )}
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
              {feedbackMessage}
            </p>

            {/* Rewards Breakdown (if correct) */}
            {feedbackState === 'correct' && chosenOption && (
              <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center gap-3">
                {chosenOption.reward_if_correct.dinero > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 font-mono-code text-xs font-bold">
                    <Coins size={14} className="text-amber-400" />
                    <span>+${chosenOption.reward_if_correct.dinero}.00 CifraTokens</span>
                  </div>
                )}

                {chosenOption.reward_if_correct.puntos > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-900/60 border border-indigo-500/40 text-indigo-200 font-mono-code text-xs font-bold">
                    <BrainCircuit size={14} className="text-indigo-400" />
                    <span>+{chosenOption.reward_if_correct.puntos} Pts Comprensión</span>
                  </div>
                )}

                {chosenOption.reward_if_correct.requisitoDesbloqueado && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-900/60 border border-cyan-500/40 text-cyan-200 font-mono-code text-xs font-bold">
                    <Award size={14} className="text-[#00f3ff]" />
                    <span>Requisito: {chosenOption.reward_if_correct.requisitoDesbloqueado}</span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons to Advance */}
            <div className="pt-2 flex flex-wrap items-center justify-end gap-2.5">
              {feedbackState === 'correct' ? (
                <button
                  id="btn-next-chapter"
                  onClick={onNextChapter}
                  className="px-5 py-2.5 rounded-xl font-cyber font-bold text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.4)] flex items-center gap-2 transition-all transform hover:scale-[1.02]"
                >
                  <span>{currentChapterNum < totalChapters ? 'Siguiente Capítulo' : 'Ver Certificado Final'}</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  id="btn-retry-option"
                  onClick={() => {
                    // allow re-trying
                  }}
                  className="px-4 py-2 rounded-lg font-cyber text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
                >
                  Intenta con otra opción
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
