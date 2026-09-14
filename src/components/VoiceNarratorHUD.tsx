import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  RotateCcw, 
  Sparkles, 
  Gauge, 
  Radio,
  ChevronDown,
  ChevronUp,
  Headphones
} from 'lucide-react';
import { speechNarrator } from '../utils/speechNarrator';
import { cyberAudio } from '../utils/audioSynth';

interface VoiceNarratorHUDProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const VoiceNarratorHUD: React.FC<VoiceNarratorHUDProps> = ({
  soundEnabled,
  onToggleSound
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [voiceRate, setVoiceRate] = useState<number>(1.05);

  useEffect(() => {
    const unsubscribe = speechNarrator.subscribe((speaking, text) => {
      setIsSpeaking(speaking);
      if (text) {
        setCurrentText(text);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleToggleMute = () => {
    const nextState = !soundEnabled;
    onToggleSound();
    speechNarrator.setEnabled(nextState);
    cyberAudio.setMuted(!nextState);
    if (!nextState) {
      speechNarrator.stop();
    } else {
      cyberAudio.playBlip();
      speechNarrator.speak("Narrador de voz en español latino activado.");
    }
  };

  const handleStop = () => {
    speechNarrator.stop();
  };

  const handleReplay = () => {
    cyberAudio.playBlip();
    speechNarrator.replayLast();
  };

  const handleChangeRate = () => {
    const rates = [0.9, 1.05, 1.25];
    const currentIndex = rates.indexOf(voiceRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setVoiceRate(nextRate);
    speechNarrator.setRate(nextRate);
    cyberAudio.playBlip();
    speechNarrator.speak(`Velocidad de narración ajustada a ${nextRate === 0.9 ? 'pausada' : nextRate === 1.05 ? 'normal' : 'rápida'}.`);
  };

  return (
    <aside 
      id="voice-narrator-hud"
      aria-label="Controles del Narrador de Voz"
      className="fixed bottom-3 right-3 sm:right-6 z-50 transition-all duration-300 max-w-sm sm:max-w-md w-[calc(100vw-24px)] sm:w-auto"
    >
      <div className={`rounded-2xl border ${
        isSpeaking 
          ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,243,255,0.45)] bg-slate-950/95' 
          : 'border-slate-800/90 shadow-xl bg-slate-950/90'
      } backdrop-blur-md p-3 transition-all duration-300`}>
        
        {/* Header line */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              isSpeaking ? 'bg-cyan-500/20 text-[#00f3ff] animate-pulse' : 'bg-slate-800 text-slate-400'
            }`}>
              <Headphones size={15} />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-cyber font-bold text-white tracking-wide">
                  NARRADOR DE VOZ
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono-code font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  ES-LATAM
                </span>
              </div>
              <p className="text-[10px] font-mono-code text-slate-400">
                {isSpeaking ? 'Narrando en vivo...' : soundEnabled ? 'Audio listo para cada clic' : 'Audio en silencio'}
              </p>
            </div>
          </div>

          {/* Controls button group */}
          <div className="flex items-center gap-1">
            {/* Speed toggle button */}
            <button
              id="btn-voice-speed"
              onClick={handleChangeRate}
              title={`Velocidad actual: ${voiceRate}x`}
              className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[10px] font-mono-code text-cyan-300 hover:border-cyan-400 hover:text-white transition cursor-pointer flex items-center gap-0.5"
            >
              <Gauge size={11} />
              <span>{voiceRate}x</span>
            </button>

            {/* Replay button */}
            <button
              id="btn-voice-replay"
              onClick={handleReplay}
              disabled={!soundEnabled}
              title="Repetir última lectura"
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-40 transition cursor-pointer"
            >
              <RotateCcw size={13} />
            </button>

            {/* Stop current speech button */}
            {isSpeaking && (
              <button
                id="btn-voice-stop"
                onClick={handleStop}
                title="Detener lectura actual"
                className="p-1.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-300 hover:bg-red-900 transition cursor-pointer"
              >
                <Square size={13} />
              </button>
            )}

            {/* Mute/Unmute audio button */}
            <button
              id="btn-voice-toggle-mute"
              onClick={handleToggleMute}
              title={soundEnabled ? "Desactivar audio" : "Activar audio"}
              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                soundEnabled 
                  ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300 hover:border-cyan-400' 
                  : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>

            {/* Minimize toggle */}
            <button
              id="btn-voice-minimize"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded text-slate-500 hover:text-slate-300"
            >
              {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>

        {/* Live Audio Visualizer Wave & Spoken Text Caption (if not minimized) */}
        {!isMinimized && (
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-2">
            {/* Waveform Bars */}
            <div className="flex items-center gap-1 justify-center h-4">
              {[40, 75, 90, 60, 100, 45, 80, 65, 95, 50, 85, 30].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isSpeaking 
                      ? 'bg-gradient-to-t from-cyan-500 to-[#00f3ff]' 
                      : 'bg-slate-800'
                  }`}
                  style={{
                    height: isSpeaking ? `${Math.max(4, (h * (0.4 + (i % 3) * 0.3)))}px` : '4px',
                    animation: isSpeaking ? `pulse 0.${(i % 5) + 3}s infinite alternate` : 'none'
                  }}
                ></span>
              ))}
            </div>

            {/* Last or Current Spoken Subtitle */}
            <div className="bg-slate-900/90 rounded-xl p-2 border border-slate-800/80 text-[11px] font-sans text-slate-300 leading-snug max-h-16 overflow-y-auto">
              <span className="text-cyan-400 font-mono-code font-bold mr-1">🎙️</span>
              {currentText || 'Haz clic en cualquier personaje, botón o desafío para escucharlo en español latino.'}
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
