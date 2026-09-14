import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  Lightbulb, 
  Building2, 
  ShieldCheck, 
  Coins, 
  X,
  Loader2
} from 'lucide-react';
import { cyberAudio } from '../utils/audioSynth';

interface AiMentorDrawerProps {
  onClose: () => void;
  saldoDinero: number;
  tasaBcv: number;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiMentorDrawer: React.FC<AiMentorDrawerProps> = ({
  onClose,
  saldoDinero,
  tasaBcv
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: '¡Saludos, Ciber-Ciudadano! Soy tu Asesor Financiero FinTech. Puedo resolver cualquier duda sobre cómo abrir tu primera cuenta en el Banco de Venezuela, Banco Plaza o Banco del Tesoro, requisitos del SENIAT (RIF), normas de SUDEBAN o el funcionamiento de PagoMóvil. ¿Qué deseas consultar hoy?',
      timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    '¿Qué diferencia hay entre BDVkids y Digital Juvenil en el BDV?',
    '¿Cómo funciona la Cuenta Verde de Banco Plaza con la tasa BCV?',
    '¿Por qué el Banco del Tesoro es ideal para jóvenes emprendedores?',
    '¿Qué hago si no tengo trabajo formal para abrir mi cuenta?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    cyberAudio.playBlip();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Try backend AI endpoint
      const response = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          context: {
            saldoDinero,
            tasaBcv
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })
          }]);
          cyberAudio.playSuccess();
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // fallback to offline knowledge base
    }

    // Smart pedagogical offline fallback
    setTimeout(() => {
      let reply = '';
      const q = textToSend.toLowerCase();

      if (q.includes('bdvkids') || q.includes('juvenil') || q.includes('venezuela') || q.includes('bdv')) {
        reply = 'En el **Banco de Venezuela (0102)**:\n- **BDVkids / Digital Juvenil:** Diseñada para menores de 18 años. Desde los 14 años puedes gestionarla con tu Cédula laminada y acompañamiento de tu representante legal.\n- Permite afiliarte a **BDVApp** y utilizar **PagoMóvil BDV** con límites especiales de seguridad.\n- Para mayores de 18 años, la **Cuenta Digital BDV** se abre 100% en línea desde la app escaneando tu rostro y documento sin ir a la agencia.';
      } else if (q.includes('verde') || q.includes('plaza') || q.includes('divisas') || q.includes('dolar')) {
        reply = 'La **Cuenta Verde de Banco Plaza (0138)** es una cuenta de custodia en divisas extranjeras (USD/EUR) 100% legal en el sistema bancario venezolano.\n- Tus fondos se resguardan de forma segura.\n- Cuando compras en comercios con tu tarjeta, el débito se liquida automáticamente al valor de la **Tasa Oficial del Banco Central de Venezuela (BCV)** del día, sin cobros informales arbitrarios.';
      } else if (q.includes('tesoro') || q.includes('social') || q.includes('comunitaria')) {
        reply = 'El **Banco del Tesoro (0163)** destaca por su enfoque de **inclusión social y educación financiera**:\n- Sus cuentas de ahorro no exigen montos mínimos altos de apertura.\n- Es el canal preferencial para programas juveniles, becas universitarias y microcréditos para pequeños emprendimientos comunales mediante **Tesoro En Línea**.';
      } else if (q.includes('requisito') || q.includes('trabajo') || q.includes('constancia') || q.includes('rif')) {
        reply = 'Si eres estudiante o estás comenzando tu primer proyecto:\n1. **Cédula de Identidad:** Vigente y legible.\n2. **RIF del SENIAT:** Puedes tramitarlo o actualizarlo gratuitamente en la web del SENIAT e imprimirlo en PDF.\n3. **Constancia de Estudios o Declaración de Origen de Fondos:** En lugar de carta de trabajo, los bancos aceptan constancia de inscripción escolar o una declaración jurada simple de ingresos lícitos.';
      } else {
        reply = 'En la banca venezolana moderna regulada por **SUDEBAN**, tienes derecho a la inclusión financiera digital. Puedes abrir cuentas de ahorro en bolívares y cuentas de custodia en moneda extranjera. Recuerda nunca compartir tus contraseñas ni códigos OTP por WhatsApp o llamadas telefónicas.';
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })
      }]);
      cyberAudio.playSuccess();
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-end p-2 sm:p-4">
      <div className="w-full max-w-xl h-full max-h-[95vh] cyber-glass rounded-2xl border border-purple-500/40 flex flex-col justify-between shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <div className="w-full h-full bg-[#070b1e] rounded-[9px] flex items-center justify-center">
                <Bot size={20} className="text-[#00f3ff]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-cyber font-bold text-base text-white">
                  CifraBot FinTech
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono-code font-bold bg-purple-950 border border-purple-500/40 text-purple-300">
                  IA ASESOR
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Mentor Educativo de Banca y Normativa Venezolana
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Messages List */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-sans text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl space-y-1.5 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-[0_0_12px_rgba(147,51,234,0.3)]'
                    : 'cyber-glass border border-cyan-500/30 text-slate-100 rounded-bl-none shadow-[0_0_12px_rgba(0,243,255,0.15)]'
                }`}
              >
                <div className="text-xs sm:text-sm whitespace-pre-line font-sans">
                  {msg.text}
                </div>
                <div className={`text-[10px] font-mono-code text-right ${msg.sender === 'user' ? 'text-purple-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-code p-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 max-w-xs">
              <Loader2 size={15} className="animate-spin" />
              <span>Analizando base de datos SUDEBAN...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 space-y-2">
          <div className="text-[10px] uppercase font-mono-code text-slate-400 flex items-center gap-1 font-semibold">
            <Lightbulb size={12} className="text-amber-400" />
            <span>Preguntas Rápidas Sugeridas:</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-[11px] text-slate-300 hover:text-cyan-300 transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Haz tu pregunta sobre bancos, cuentas o requisitos..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm font-sans focus:border-cyan-400 focus:outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:opacity-90 disabled:opacity-50 transition shadow-[0_0_10px_rgba(168,85,247,0.4)]"
            >
              <Send size={16} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
