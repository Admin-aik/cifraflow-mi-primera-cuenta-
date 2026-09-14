// Latin American Spanish Voice Narrator Engine (Speech Synthesis)
// Specially tuned for Venezuelan and Latin American youth educational content

class LatinSpanishNarratorEngine {
  private isEnabled: boolean = true;
  private voice: SpeechSynthesisVoice | null = null;
  private voicesLoaded: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private lastSpokenText: string = '';
  private rate: number = 1.05; // Natural Latin American cadence
  private pitch: number = 1.02; // Warm, clear cadet mentor tone
  private listeners: ((speaking: boolean, currentText: string) => void)[] = [];
  private isSpeakingState: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    this.voicesLoaded = true;

    // Prioritize Latin American Spanish voices
    // 1. es-419 (Latin America generic)
    // 2. es-VE (Venezuela)
    // 3. es-MX (Mexico)
    // 4. es-CO (Colombia)
    // 5. es-US (US Spanish)
    // 6. es-CL / es-AR / es-PE
    // 7. Any es-* voice
    const preferredLangCodes = ['es-419', 'es-VE', 'es-MX', 'es-CO', 'es-US', 'es-CL', 'es-AR', 'es-PE', 'es'];
    
    // Look for Google, Microsoft or Natural Latin voices first
    let selected: SpeechSynthesisVoice | null = null;

    for (const code of preferredLangCodes) {
      const match = voices.find(v => 
        v.lang.toLowerCase().startsWith(code.toLowerCase()) && 
        (v.name.toLowerCase().includes('natural') || 
         v.name.toLowerCase().includes('google') || 
         v.name.toLowerCase().includes('latino') ||
         v.name.toLowerCase().includes('mexico') ||
         v.name.toLowerCase().includes('venezuela') ||
         v.name.toLowerCase().includes('sabina') ||
         v.name.toLowerCase().includes('jorge') ||
         v.name.toLowerCase().includes('paul'))
      );
      if (match) {
        selected = match;
        break;
      }
    }

    if (!selected) {
      for (const code of preferredLangCodes) {
        const match = voices.find(v => v.lang.toLowerCase().startsWith(code.toLowerCase()));
        if (match) {
          selected = match;
          break;
        }
      }
    }

    // Fallback to any Spanish voice
    if (!selected) {
      selected = voices.find(v => v.lang.toLowerCase().includes('es')) || null;
    }

    this.voice = selected;
  }

  public getSelectedVoiceName(): string {
    if (!this.voice) {
      return 'Voz Español Latino Estándar';
    }
    return `${this.voice.name} (${this.voice.lang})`;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.7, Math.min(1.5, rate));
  }

  public getRate(): number {
    return this.rate;
  }

  public isSpeaking(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    return window.speechSynthesis.speaking;
  }

  public subscribe(listener: (speaking: boolean, currentText: string) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(speaking: boolean, text: string) {
    this.isSpeakingState = speaking;
    this.listeners.forEach(l => l(speaking, text));
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.notify(false, '');
    }
  }

  public speak(text: string, force: boolean = true) {
    if (!this.isEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!text || text.trim() === '') return;

    // Clean text of markdown, asterisks, brackets, or code symbols for natural speaking
    const cleanText = this.sanitizeTextForSpeech(text);
    if (!cleanText) return;

    if (force) {
      window.speechSynthesis.cancel();
    }

    if (!this.voicesLoaded) {
      this.loadVoices();
    }

    this.lastSpokenText = cleanText;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-419'; // Preferred Latin American Spanish
    if (this.voice) {
      utterance.voice = this.voice;
      utterance.lang = this.voice.lang || 'es-419';
    }
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.notify(true, cleanText);
    };

    utterance.onend = () => {
      this.notify(false, '');
    };

    utterance.onerror = (e) => {
      // Ignore canceled errors
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis error:', e);
      }
      this.notify(false, '');
    };

    this.currentUtterance = utterance;

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public replayLast() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText, true);
    }
  }

  public getLastSpokenText(): string {
    return this.lastSpokenText;
  }

  private sanitizeTextForSpeech(raw: string): string {
    return raw
      .replace(/[*_#`~>\[\]]/g, ' ') // markdown symbols
      .replace(/\$\s*(\d+(?:\.\d{2})?)/g, '$1 dólares') // Currency $
      .replace(/Bs\.\s*(\d+(?:[.,]\d{2})?)/g, '$1 bolívares') // Currency Bs.
      .replace(/BDVkids/gi, 'B D V kids')
      .replace(/SUDEBAN/gi, 'Sudebán')
      .replace(/BCV/gi, 'B C V')
      .replace(/P2P/gi, 'P dos P')
      .replace(/50\/30\/20/g, 'cincuenta treinta veinte')
      .replace(/[\n\r\t]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
}

export const speechNarrator = new LatinSpanishNarratorEngine();
