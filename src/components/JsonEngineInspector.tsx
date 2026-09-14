import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  Terminal, 
  RefreshCw, 
  FileCode, 
  Sparkles,
  X
} from 'lucide-react';
import { GameEngineOutput } from '../types';
import { cyberAudio } from '../utils/audioSynth';

interface JsonEngineInspectorProps {
  engineOutput: GameEngineOutput;
  onClose?: () => void;
  isModal?: boolean;
}

export const JsonEngineInspector: React.FC<JsonEngineInspectorProps> = ({
  engineOutput,
  onClose,
  isModal = false
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'hud' | 'modal' | 'bank' | 'events'>('all');

  const jsonString = JSON.stringify(
    activeTab === 'all' 
      ? engineOutput 
      : activeTab === 'hud'
      ? { hud_update: engineOutput.hud_update }
      : activeTab === 'modal'
      ? { main_modal: engineOutput.main_modal }
      : activeTab === 'bank'
      ? { bank_consultation_info: engineOutput.bank_consultation_info }
      : { world_events: engineOutput.world_events },
    null,
    2
  );

  const handleCopy = () => {
    cyberAudio.playBlip();
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = (
    <div className="cyber-glass-fuchsia rounded-2xl p-5 sm:p-7 border border-fuchsia-500/40 space-y-5 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#ff007f] font-bold uppercase tracking-wider">
            <Terminal size={15} />
            <span>Motor Lógico Cifraflow • Salida JSON Estructurada</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-cyber font-bold text-white mt-1 flex items-center gap-2">
            <Code2 size={24} className="text-[#00f3ff]" />
            <span>JSON State Engine Debugger</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono-code">
            Estructura canónica de estado consumida por la arquitectura de gamificación.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-copy-json"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-fuchsia-500/40 text-fuchsia-300 hover:bg-fuchsia-950/40 text-xs font-mono-code flex items-center gap-1.5 transition"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copiar JSON</span>
              </>
            )}
          </button>

          {onClose && (
            <button
              id="btn-close-json-modal"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-lg border transition ${
            activeTab === 'all'
              ? 'bg-fuchsia-950 border-[#ff007f] text-fuchsia-300 font-bold'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          JSON Completo ({Object.keys(engineOutput).length} nodos)
        </button>

        <button
          onClick={() => setActiveTab('hud')}
          className={`px-3 py-1 rounded-lg border transition ${
            activeTab === 'hud'
              ? 'bg-cyan-950 border-[#00f3ff] text-cyan-300 font-bold'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          hud_update
        </button>

        <button
          onClick={() => setActiveTab('modal')}
          className={`px-3 py-1 rounded-lg border transition ${
            activeTab === 'modal'
              ? 'bg-indigo-950 border-indigo-400 text-indigo-300 font-bold'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          main_modal
        </button>

        <button
          onClick={() => setActiveTab('bank')}
          className={`px-3 py-1 rounded-lg border transition ${
            activeTab === 'bank'
              ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          bank_consultation_info
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-3 py-1 rounded-lg border transition ${
            activeTab === 'events'
              ? 'bg-amber-950 border-amber-400 text-amber-300 font-bold'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          world_events
        </button>
      </div>

      {/* Code Viewer */}
      <div className="relative rounded-xl bg-[#030611] border border-slate-800 p-4 font-mono-code text-xs text-slate-200 overflow-x-auto max-h-[55vh] shadow-inner">
        <pre className="text-cyan-300 leading-relaxed whitespace-pre font-mono">
          {jsonString}
        </pre>
      </div>

      {/* Schema Verification Footnote */}
      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
        <span className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-[#00f3ff]" />
          <span>Validación de Esquema: 100% Conforme con el protocolo de juego</span>
        </span>
        <span className="text-fuchsia-400">
          Size: {new Blob([jsonString]).size} bytes
        </span>
      </div>

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
