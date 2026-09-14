import React, { useState } from 'react';
import { X, Sparkles, User, Image as ImageIcon, Volume2, ShieldCheck, Zap, Award, BookOpen } from 'lucide-react';
import { CHARACTERS, SCENES, GameCharacter, GameScene } from '../assets/gameImages';
import { cyberAudio } from '../utils/audioSynth';

interface ComicGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCharacter?: (characterId: string) => void;
}

export const ComicGalleryModal: React.FC<ComicGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectCharacter
}) => {
  const [activeTab, setActiveTab] = useState<'characters' | 'scenes'>('characters');
  const [selectedChar, setSelectedChar] = useState<GameCharacter>(CHARACTERS[0]);
  const [selectedScene, setSelectedScene] = useState<GameScene>(SCENES[0]);

  if (!isOpen) return null;

  const handleCharClick = (char: GameCharacter) => {
    setSelectedChar(char);
    cyberAudio.playBlip();
    if (onSelectCharacter) {
      onSelectCharacter(char.id);
    }
  };

  const handleSceneClick = (scene: GameScene) => {
    setSelectedScene(scene);
    cyberAudio.playBlip();
  };

  const getThemeClasses = (color: GameCharacter['themeColor']) => {
    switch (color) {
      case 'cyan':
        return {
          border: 'border-cyan-400',
          badge: 'bg-cyan-950/70 border-cyan-400/40 text-cyan-300',
          glow: 'shadow-[0_0_20px_rgba(0,243,255,0.3)]',
          text: 'text-[#00f3ff]'
        };
      case 'fuchsia':
        return {
          border: 'border-fuchsia-400',
          badge: 'bg-fuchsia-950/70 border-fuchsia-400/40 text-fuchsia-300',
          glow: 'shadow-[0_0_20px_rgba(255,0,127,0.3)]',
          text: 'text-[#ff007f]'
        };
      case 'emerald':
        return {
          border: 'border-emerald-400',
          badge: 'bg-emerald-950/70 border-emerald-400/40 text-emerald-300',
          glow: 'shadow-[0_0_20px_rgba(52,211,153,0.3)]',
          text: 'text-emerald-400'
        };
      case 'amber':
        return {
          border: 'border-amber-400',
          badge: 'bg-amber-950/70 border-amber-400/40 text-amber-300',
          glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]',
          text: 'text-amber-400'
        };
    }
  };

  const currentTheme = getThemeClasses(selectedChar.themeColor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto cyber-glass rounded-2xl border border-cyan-500/40 shadow-2xl p-5 sm:p-7 text-slate-100 flex flex-col space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff007f] to-[#00f3ff] flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(0,243,255,0.4)]">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cyber font-bold text-white tracking-wide flex items-center gap-2">
                <span>Galería de Cómics & Avatares de Cifraflow</span>
              </h2>
              <p className="text-xs sm:text-sm font-mono-code text-cyan-300">
                Ilustraciones oficiales estilo Shonen Cyberpunk Juvenil en Alta Definición
              </p>
            </div>
          </div>

          <button
            id="btn-close-gallery-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-400 hover:text-rose-400 flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            id="tab-gallery-characters"
            onClick={() => {
              setActiveTab('characters');
              cyberAudio.playBlip();
            }}
            className={`px-4 py-2 rounded-xl font-cyber font-semibold text-xs sm:text-sm flex items-center gap-2 transition ${
              activeTab === 'characters'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <User size={16} />
            <span>Personajes & Cadetes (4)</span>
          </button>

          <button
            id="tab-gallery-scenes"
            onClick={() => {
              setActiveTab('scenes');
              cyberAudio.playBlip();
            }}
            className={`px-4 py-2 rounded-xl font-cyber font-semibold text-xs sm:text-sm flex items-center gap-2 transition ${
              activeTab === 'scenes'
                ? 'bg-gradient-to-r from-fuchsia-500 to-pink-600 text-slate-950 shadow-[0_0_15px_rgba(255,0,127,0.3)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <ImageIcon size={16} />
            <span>Escenarios del Universo (4)</span>
          </button>
        </div>

        {/* Tab 1: Characters */}
        {activeTab === 'characters' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Character Selector Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {CHARACTERS.map((char) => {
                const isSelected = selectedChar.id === char.id;
                const theme = getThemeClasses(char.themeColor);
                return (
                  <button
                    key={char.id}
                    id={`btn-select-char-${char.id}`}
                    onClick={() => handleCharClick(char)}
                    className={`relative p-2.5 rounded-xl border text-left transition-all duration-200 group overflow-hidden ${
                      isSelected
                        ? `${theme.border} bg-slate-900/90 ${theme.glow}`
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="aspect-square w-full rounded-lg overflow-hidden mb-2 bg-slate-950 border border-slate-800 relative">
                      <img
                        src={char.avatar}
                        alt={char.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold bg-slate-950/80 border border-slate-700 text-cyan-300">
                        {char.age}
                      </div>
                    </div>
                    <div className="font-cyber font-bold text-xs sm:text-sm text-white truncate">
                      {char.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans truncate">
                      {char.role}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Character Spotlight Card */}
            <div className={`lg:col-span-7 rounded-2xl bg-slate-900/90 border ${currentTheme.border} p-5 space-y-4 ${currentTheme.glow}`}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-xl flex-shrink-0 bg-slate-950">
                  <img
                    src={selectedChar.avatar}
                    alt={selectedChar.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono-code font-bold ${currentTheme.badge}`}>
                      {selectedChar.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono-code text-slate-300">
                      {selectedChar.age}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-cyber font-bold text-white">
                    {selectedChar.name}
                  </h3>

                  <p className="text-sm font-sans font-medium text-cyan-300">
                    {selectedChar.role}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-sans italic text-slate-300 flex items-start gap-2">
                    <Volume2 size={16} className={`flex-shrink-0 mt-0.5 ${currentTheme.text}`} />
                    <span>"{selectedChar.quote}"</span>
                  </div>
                </div>
              </div>

              {/* Bio & Specialty */}
              <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono-code uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                    <Zap size={12} className="text-amber-400" />
                    <span>Especialidad FinTech:</span>
                  </div>
                  <div className="text-slate-200 font-medium">
                    {selectedChar.specialty}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono-code uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-400" />
                    <span>Misión en Cifraflow:</span>
                  </div>
                  <div className="text-slate-200 font-medium">
                    {selectedChar.concept}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Scenes */}
        {activeTab === 'scenes' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Scene Selector Grid */}
            <div className="lg:col-span-4 space-y-2.5">
              {SCENES.map((scene) => {
                const isSelected = selectedScene.id === scene.id;
                return (
                  <button
                    key={scene.id}
                    id={`btn-select-scene-${scene.id}`}
                    onClick={() => handleSceneClick(scene)}
                    className={`w-full p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                      isSelected
                        ? 'border-fuchsia-400 bg-fuchsia-950/40 text-fuchsia-200 shadow-[0_0_15px_rgba(255,0,127,0.25)]'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-700">
                      <img
                        src={scene.image}
                        alt={scene.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-cyber font-bold truncate text-white">
                        {scene.title}
                      </div>
                      <div className="text-[10px] font-mono-code text-slate-400 truncate">
                        {scene.category}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Scene Showcase */}
            <div className="lg:col-span-8 rounded-2xl bg-slate-900/90 border border-fuchsia-500/40 p-4 space-y-3 shadow-[0_0_20px_rgba(255,0,127,0.2)]">
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl relative">
                <img
                  src={selectedScene.image}
                  alt={selectedScene.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4">
                  <div className="text-xs font-mono-code uppercase text-[#00f3ff] font-bold">
                    {selectedScene.category}
                  </div>
                  <h3 className="text-base sm:text-xl font-cyber font-bold text-white">
                    {selectedScene.title}
                  </h3>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
                <div className="text-cyan-300 font-cyber font-semibold">
                  {selectedScene.subtitle}
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">
                  {selectedScene.concept}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
