import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft, 
  Volume2, 
  Sparkles, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';

interface LecturaContratosSimulatorProps {
  onBack: () => void;
  onAwardBonus?: (pts: number) => void;
}

interface ContractClause {
  id: number;
  text: string;
  isAbusive: boolean;
  explanation: string;
}

export const LecturaContratosSimulator: React.FC<LecturaContratosSimulatorProps> = ({
  onBack,
  onAwardBonus
}) => {
  const [selectedClauses, setSelectedClauses] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const CLAUSES: ContractClause[] = [
    {
      id: 1,
      text: 'Cláusula 4.1: El banco se compromete a emitir su primer estado de cuenta mensual digital en formato PDF descargable de forma gratuita a través de la aplicación oficial.',
      isAbusive: false,
      explanation: 'Cláusula estándar legítima de transparencia bancaria conforme a regulaciones SUDEBAN.'
    },
    {
      id: 2,
      text: 'Cláusula 8.3: La entidad financiera podrá debitar automáticamente de la cuenta de ahorros del cliente una comisión no especificada por inactividad a discreción del banco sin notificación previa por SMS ni correo electrónico.',
      isAbusive: true,
      explanation: '¡Cláusula abusiva! Todo cobro de comisión debe estar expresamente tarifado y autorizado por el BCV y notificado oportunamente al titular.'
    },
    {
      id: 3,
      text: 'Cláusula 12.5: Para las cuentas de menores de 14 a 17 años, los fondos depositados están protegidos por el Fondo de Protección Social de los Depósitos Bancarios (FOGADE) conforme al marco legal venezolano.',
      isAbusive: false,
      explanation: 'Garantía legal venezolana (FOGADE) que resguarda los ahorros del titular.'
    },
    {
      id: 4,
      text: 'Cláusula 15.2: En caso de disputas por cargos indebidos o fallas en terminales de punto de venta, el usuario renuncia irrevocablemente a su derecho de reclamo ante SUDEBAN y acepta el dictamen unilateral de la empresa proveedora del software.',
      isAbusive: true,
      explanation: '¡Cláusula abusiva y nula! Ningún contrato puede obligar a un usuario a renunciar a sus derechos constitucionales de reclamo ante la Superintendencia de Bancos (SUDEBAN).'
    }
  ];

  const handleToggleClause = (id: number) => {
    if (submitted) return;
    cyberAudio.playBlip();
    setSelectedClauses(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleScan = () => {
    cyberAudio.playSuccess();
    setSubmitted(true);

    const abusiveIds = CLAUSES.filter(c => c.isAbusive).map(c => c.id);
    const correctDetections = selectedClauses.filter(id => abusiveIds.includes(id)).length;
    const bonus = correctDetections * 75;

    if (onAwardBonus && bonus > 0) {
      onAwardBonus(bonus);
    }

    speechNarrator.speak(
      `Escaneo de contrato completado. Detectaste ${correctDetections} cláusulas abusivas. ¡Recuerda leer siempre la letra chica antes de firmar cualquier contrato bancario!`,
      true
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl cyber-glass border border-sky-500/40 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              cyberAudio.playBlip();
              onBack();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-sky-400 transition"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-sky-400 font-mono-code text-xs font-bold uppercase">
              <BookOpen size={14} />
              <span>Módulo 2: Comprensión Lectora & Contratos</span>
            </div>
            <h2 className="font-cyber font-bold text-xl text-white">
              Scanner Forense de Cláusulas Abusivas y Letra Chica
            </h2>
          </div>
        </div>

        <button
          onClick={() => speechNarrator.speak("Lee detenidamente cada fragmento del contrato y marca únicamente las cláusulas que consideres abusivas o sospechosas antes de presionar Escanear.")}
          className="p-2.5 rounded-xl bg-sky-950/80 border border-sky-500/50 text-sky-300 hover:bg-sky-900 transition flex items-center gap-1.5 text-xs font-cyber"
        >
          <Volume2 size={15} />
          <span className="hidden sm:inline">Instrucciones</span>
        </button>
      </div>

      {/* Contract Reader Document Box */}
      <div className="cyber-glass rounded-2xl p-6 border border-sky-500/30 space-y-5 max-w-3xl mx-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono-code text-sky-300 font-bold uppercase">
            <FileText size={15} />
            <span>Documento: Contrato de Apertura de Cuenta Bancaria Juvenil Digital</span>
          </div>
          <span className="text-[11px] font-mono-code text-slate-400">4 Cláusulas bajo examen</span>
        </div>

        <p className="text-xs font-sans text-slate-300">
          Haz clic sobre las cláusulas que consideres <strong>abusivas, desproporcionadas o violatorias</strong> de la normativa bancaria venezolana.
        </p>

        {/* Clauses List */}
        <div className="space-y-3">
          {CLAUSES.map((clause) => {
            const isSelected = selectedClauses.includes(clause.id);
            return (
              <div
                key={clause.id}
                onClick={() => handleToggleClause(clause.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-rose-950/60 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed">
                    {clause.text}
                  </p>
                  <span className={`text-xs font-mono-code font-bold px-2 py-0.5 rounded border flex-shrink-0 ${
                    isSelected ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}>
                    {isSelected ? 'MARCADA ABUSIVA' : 'SELECCIONAR'}
                  </span>
                </div>

                {submitted && (
                  <div className={`p-3 rounded-lg border text-xs font-mono-code ${
                    clause.isAbusive ? 'bg-rose-950/80 border-rose-500 text-rose-200' : 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      {clause.isAbusive ? <AlertCircle size={13} /> : <CheckCircle2 size={13} />}
                      <span>{clause.isAbusive ? 'CLÁUSULA ABUSIVA DETECTADA' : 'CLÁUSULA LEGÍTIMA'}</span>
                    </div>
                    <p className="font-sans text-slate-300">{clause.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {!submitted ? (
          <button
            onClick={handleScan}
            className="w-full py-3.5 px-6 rounded-xl font-cyber font-bold text-sm tracking-wider text-slate-950 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 hover:brightness-110 active:scale-98 transition shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search size={16} />
            <span>ACTIVAR SCANNER FORENSE DE CLÁUSULAS</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedClauses([]);
            }}
            className="w-full py-3 px-6 rounded-xl font-cyber font-bold text-xs tracking-wider text-slate-200 bg-slate-900 border border-slate-700 hover:border-cyan-400 transition cursor-pointer"
          >
            REINICIAR ANÁLISIS DE CONTRATO
          </button>
        )}

      </div>
    </div>
  );
};
