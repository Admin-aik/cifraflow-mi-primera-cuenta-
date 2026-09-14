import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  ArrowLeft, 
  AlertTriangle, 
  KeyRound, 
  Smartphone, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Lock, 
  Sparkles 
} from 'lucide-react';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';

interface CiberseguridadSimulatorProps {
  onBack: () => void;
  onAwardBonus?: (pts: number) => void;
}

interface CyberScenario {
  id: number;
  title: string;
  sender: string;
  channel: 'SMS' | 'Correo' | 'WhatsApp';
  message: string;
  link?: string;
  isPhishing: boolean;
  explanation: string;
  redFlags: string[];
}

export const CiberseguridadSimulator: React.FC<CiberseguridadSimulatorProps> = ({
  onBack,
  onAwardBonus
}) => {
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [evaluated, setEvaluated] = useState<boolean>(false);
  const [userChoice, setUserChoice] = useState<'legit' | 'phishing' | null>(null);
  const [score, setScore] = useState(0);

  const SCENARIOS: CyberScenario[] = [
    {
      id: 1,
      title: 'Notificación de Bloqueo de BDVApp',
      sender: '+58 412-9988771',
      channel: 'SMS',
      message: 'BANCO DE VENEZUELA: Su usuario BDVenLinea ha sido bloqueado por actividad sospechosa. Para desbloquear ingrese de inmediato en:',
      link: 'https://bancodevenezuela-desbloqueo-urgente.xyz/login',
      isPhishing: true,
      explanation: '¡Es Phishing evidente! El Banco de Venezuela nunca envía SMS desde números personales para pedirte que ingreses tus credenciales en enlaces sospechosos (.xyz). El dominio oficial es únicamente bancodevenezuela.com.',
      redFlags: ['Número celular personal no oficial', 'Dominio .xyz falso', 'Sentido falso de extrema urgencia']
    },
    {
      id: 2,
      title: 'Alerta de Débito Biopago',
      sender: 'BDV (2661 / 2662)',
      channel: 'SMS',
      message: 'BDV INFORMA: Débito por Biopago en COMERCIAL EL ÉXITO por Bs. 320,50 con fecha 14/09/2026. Saldo disponible: Bs. 1.250,00.',
      isPhishing: false,
      explanation: '¡Mensaje legítimo! Es una notificación informativa de débito real proveniente de la mensajería oficial del BDV (2661/2662). No te pide claves ni enlaces externos.',
      redFlags: ['Ninguna. Es una notificación oficial sin enlaces ni solicitudes de datos sensibles.']
    },
    {
      id: 3,
      title: 'Soporte Técnico Solicitando Token por WhatsApp',
      sender: 'Soporte Virtual Banco Plaza',
      channel: 'WhatsApp',
      message: 'Hola estimado cliente. Hemos detectado un intento de hackeo a tu Cuenta Verde. Por favor envíanos la foto de tu tarjeta de coordenadas y el código SMS de 6 dígitos que te acaba de llegar para protegerte.',
      isPhishing: true,
      explanation: '¡Ingeniería Social peligrosa! Ninguna institución bancaria te solicitará por WhatsApp tus coordenadas, códigos OTP de un solo uso o contraseñas.',
      redFlags: ['Solicitud de código OTP por chat', 'Solicitud de tarjeta de coordenadas', 'Canal no verificado de mensajería']
    }
  ];

  const currentScenario = SCENARIOS[currentScenarioIdx];

  const handleEvaluate = (choice: 'legit' | 'phishing') => {
    setUserChoice(choice);
    setEvaluated(true);

    const isCorrect = (choice === 'phishing' && currentScenario.isPhishing) || (choice === 'legit' && !currentScenario.isPhishing);

    if (isCorrect) {
      cyberAudio.playSuccess();
      setScore(prev => prev + 100);
      if (onAwardBonus) onAwardBonus(100);
      speechNarrator.speak(`¡Análisis forense certero! ${currentScenario.explanation}`);
    } else {
      cyberAudio.playError();
      speechNarrator.speak(`¡Error de seguridad! ${currentScenario.explanation}`);
    }
  };

  const handleNext = () => {
    cyberAudio.playBlip();
    setEvaluated(false);
    setUserChoice(null);
    setCurrentScenarioIdx((prev) => (prev + 1) % SCENARIOS.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl cyber-glass border border-purple-500/40 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              cyberAudio.playBlip();
              onBack();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-purple-400 transition"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-mono-code text-xs font-bold uppercase">
              <ShieldAlert size={14} />
              <span>Módulo 5: Ciberdefensa FinTech & FIDO2</span>
            </div>
            <h2 className="font-cyber font-bold text-xl text-white">
              Laboratorio Anti-Phishing & Blindaje Criptográfico
            </h2>
          </div>
        </div>

        <div className="text-right text-xs font-mono-code">
          <span className="text-slate-400">Puntaje Auditor:</span>
          <div className="font-bold text-purple-300">{score} PTS</div>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="cyber-glass rounded-2xl p-6 border border-purple-500/30 space-y-5 max-w-3xl mx-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono-code text-purple-300 font-bold uppercase">
            <Smartphone size={15} />
            <span>Escenario #{currentScenario.id} de {SCENARIOS.length} • Canal {currentScenario.channel}</span>
          </div>
          <span className="text-[11px] font-mono-code text-slate-400">Emisor: {currentScenario.sender}</span>
        </div>

        {/* Smartphone UI Mockup */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 font-mono-code text-xs">
          <div className="flex items-center gap-2 text-slate-400 border-b border-slate-800/80 pb-2">
            <Lock size={12} className="text-cyan-400" />
            <span>Mensaje entrante a tu dispositivo</span>
          </div>

          <p className="text-sm font-sans text-white leading-relaxed">
            {currentScenario.message}
          </p>

          {currentScenario.link && (
            <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs break-all font-mono-code">
              🔗 {currentScenario.link}
            </div>
          )}
        </div>

        {/* Choice Buttons */}
        {!evaluated ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleEvaluate('phishing')}
              className="py-3 px-4 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-rose-950/80 border border-rose-500 text-rose-200 hover:bg-rose-900 transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.25)]"
            >
              <AlertTriangle size={16} />
              <span>ALERTA: ES PHISHING / FRAUDE</span>
            </button>

            <button
              onClick={() => handleEvaluate('legit')}
              className="py-3 px-4 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-emerald-950/80 border border-emerald-500 text-emerald-200 hover:bg-emerald-900 transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(52,211,153,0.25)]"
            >
              <ShieldCheck size={16} />
              <span>MENSAJE OFICIAL / LEGÍTIMO</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className={`p-4 rounded-xl border text-xs font-mono-code space-y-2 ${
              ((userChoice === 'phishing' && currentScenario.isPhishing) || (userChoice === 'legit' && !currentScenario.isPhishing))
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500 text-rose-200'
            }`}>
              <div className="font-cyber font-bold text-sm flex items-center gap-2">
                {((userChoice === 'phishing' && currentScenario.isPhishing) || (userChoice === 'legit' && !currentScenario.isPhishing)) ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>¡Diagnóstico Correcto! (+100 PTS)</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} />
                    <span>Diagnóstico Erróneo — Riesgo de Seguridad</span>
                  </>
                )}
              </div>
              <p className="font-sans text-slate-300 leading-relaxed">
                {currentScenario.explanation}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 px-4 rounded-xl font-cyber font-bold text-xs tracking-wider text-slate-950 bg-gradient-to-r from-purple-400 to-fuchsia-400 hover:brightness-110 transition cursor-pointer"
            >
              SIGUIENTE CASO FORENSE
            </button>
          </div>
        )}

        {/* FIDO2 Info Footer */}
        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] font-mono-code text-purple-300 flex items-center gap-2">
          <KeyRound size={16} className="text-[#00f3ff] flex-shrink-0" />
          <span>FIDO2 Passkeys: El estándar internacional que reemplaza las contraseñas vulnerables con biometría local criptográfica.</span>
        </div>
      </div>
    </div>
  );
};
