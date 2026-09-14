import React, { useState } from 'react';
import { 
  Smartphone, 
  Send, 
  CheckCircle2, 
  ArrowRightLeft, 
  QrCode, 
  ShieldCheck, 
  KeyRound, 
  Building2, 
  Coins, 
  FileCheck,
  X
} from 'lucide-react';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';
import confetti from 'canvas-confetti';

interface PagoMovilSimulatorProps {
  saldoDinero: number;
  tasaBcv: number;
  onExecutePayment: (amountUsd: number) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const PagoMovilSimulator: React.FC<PagoMovilSimulatorProps> = ({
  saldoDinero,
  tasaBcv,
  onExecutePayment,
  onClose,
  isModal = false
}) => {
  const [mode, setMode] = useState<'p2p' | 'c2p' | 'token'>('p2p');
  const [destBank, setDestBank] = useState('0102');
  const [phonePrefix, setPhonePrefix] = useState('0412');
  const [phoneNumber, setPhoneNumber] = useState('5559876');
  const [idType, setIdType] = useState('V');
  const [idNumber, setIdNumber] = useState('28456123');
  const [amountBs, setAmountBs] = useState('182.50');
  const [concept, setConcept] = useState('Pago de Almuerzo Cyber-Mall');
  const [receipt, setReceipt] = useState<{
    reference: string;
    bankName: string;
    amountBs: number;
    amountUsd: number;
    destPhone: string;
    destId: string;
    date: string;
  } | null>(null);

  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  const bankNames: Record<string, string> = {
    '0102': 'Banco de Venezuela',
    '0138': 'Banco Plaza',
    '0163': 'Banco del Tesoro'
  };

  const parsedAmountBs = parseFloat(amountBs) || 0;
  const equivalentUsd = parsedAmountBs > 0 ? (parsedAmountBs / tasaBcv) : 0;

  const handleGenerateToken = () => {
    cyberAudio.playBlip();
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedToken(token);
  };

  const handleSendPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedAmountBs <= 0) return;

    if (equivalentUsd > saldoDinero) {
      cyberAudio.playError();
      alert('Saldo insuficiente en CifraTokens para procesar la transacción.');
      return;
    }

    cyberAudio.playSuccess();
    const ref = Math.floor(10000000 + Math.random() * 90000000).toString();
    
    setReceipt({
      reference: ref,
      bankName: bankNames[destBank] || 'Banco de Venezuela',
      amountBs: parsedAmountBs,
      amountUsd: equivalentUsd,
      destPhone: `${phonePrefix}-${phoneNumber}`,
      destId: `${idType}-${idNumber}`,
      date: new Date().toLocaleString('es-VE')
    });

    onExecutePayment(equivalentUsd);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#00f3ff', '#ff007f', '#10b981']
      });
    } catch {
      // ignore
    }
  };

  const content = (
    <div className="cyber-glass rounded-2xl p-5 sm:p-7 border border-indigo-500/40 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-indigo-400 font-bold uppercase tracking-wider">
            <Smartphone size={15} />
            <span>Simulador de Pagos Inmediatos • Red Interbancaria</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-cyber font-bold text-white mt-1">
            PagoMóvil BDV / Plaza / Tesoro
          </h2>
          <p className="text-xs text-slate-400">
            Experimenta el funcionamiento en tiempo real de transferencias P2P y claves C2P en Venezuela.
          </p>
        </div>

        {onClose && (
          <button
            id="btn-close-simulator"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => { setMode('p2p'); setReceipt(null); }}
          className={`py-2 px-3 rounded-xl font-cyber text-xs font-bold border transition ${
            mode === 'p2p'
              ? 'bg-indigo-950/80 border-indigo-400 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          PagoMóvil P2P (Persona)
        </button>

        <button
          onClick={() => { setMode('c2p'); setReceipt(null); }}
          className={`py-2 px-3 rounded-xl font-cyber text-xs font-bold border transition ${
            mode === 'c2p'
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,243,255,0.3)]'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          PagoMóvil C2P (Comercio)
        </button>

        <button
          onClick={() => { setMode('token'); setReceipt(null); }}
          className={`py-2 px-3 rounded-xl font-cyber text-xs font-bold border transition ${
            mode === 'token'
              ? 'bg-fuchsia-950/80 border-fuchsia-400 text-fuchsia-300 shadow-[0_0_12px_rgba(255,0,127,0.3)]'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Generar Clave Dinámica C2P
        </button>
      </div>

      {/* Mode: P2P or C2P Payment Form */}
      {(mode === 'p2p' || mode === 'c2p') && !receipt && (
        <form onSubmit={handleSendPayment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Banco Destino */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-slate-300 font-semibold flex items-center gap-1.5">
                <Building2 size={13} className="text-cyan-400" />
                <span>Banco Receptor:</span>
              </label>
              <select
                value={destBank}
                onChange={(e) => setDestBank(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm font-cyber focus:border-cyan-400 focus:outline-none"
              >
                <option value="0102">0102 - Banco de Venezuela</option>
                <option value="0138">0138 - Banco Plaza</option>
                <option value="0163">0163 - Banco del Tesoro</option>
              </select>
            </div>

            {/* Teléfono Destino */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-slate-300 font-semibold flex items-center gap-1.5">
                <Smartphone size={13} className="text-cyan-400" />
                <span>Teléfono Afiliado:</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={phonePrefix}
                  onChange={(e) => setPhonePrefix(e.target.value)}
                  className="w-24 px-2 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm font-mono-code focus:border-cyan-400 focus:outline-none"
                >
                  <option value="0412">0412</option>
                  <option value="0414">0414</option>
                  <option value="0424">0424</option>
                  <option value="0416">0416</option>
                  <option value="0426">0426</option>
                </select>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="1234567"
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm font-mono-code focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Cédula Destino */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-slate-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-cyan-400" />
                <span>Cédula / RIF Beneficiario:</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-16 px-2 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm font-mono-code focus:border-cyan-400 focus:outline-none"
                >
                  <option value="V">V-</option>
                  <option value="E">E-</option>
                  <option value="J">J-</option>
                  <option value="G">G-</option>
                </select>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="28123456"
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm font-mono-code focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Monto en Bolívares */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono-code text-slate-300 font-semibold flex items-center gap-1.5">
                <Coins size={13} className="text-amber-400" />
                <span>Monto a Transferir (Bs.):</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                value={amountBs}
                onChange={(e) => setAmountBs(e.target.value)}
                placeholder="100.00"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm font-mono-code focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Currency Conversion Display */}
          <div 
            onClick={() => {
              cyberAudio.playBlip();
              speechNarrator.speak(`Tasa oficial del Banco Central de Venezuela: 1 dólar estadounidense equivale a ${tasaBcv.toFixed(2)} bolívares. El monto de ${parsedAmountBs} bolívares equivale a ${equivalentUsd.toFixed(2)} dólares.`);
            }}
            className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono-code cursor-pointer hover:border-cyan-500/40 transition"
            title="Haz clic para escuchar la conversión a tasa oficial BCV"
          >
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Tasa Oficial BCV ({tasaBcv.toFixed(2)} Bs/USD):</span>
            </div>
            <span className="font-bold text-cyan-300">
              ≈ ${equivalentUsd.toFixed(2)} USD / CifraTokens 🔊
            </span>
          </div>

          {/* Concepto */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono-code text-slate-300 font-semibold">
              Concepto / Motivo de Pago:
            </label>
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm font-sans focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              id="btn-submit-pagomovil"
              className="px-6 py-2.5 rounded-xl font-cyber font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition"
            >
              <Send size={15} />
              <span>Ejecutar Pago Inmediato</span>
            </button>
          </div>
        </form>
      )}

      {/* Mode: Token Generator (C2P dynamic key) */}
      {mode === 'token' && (
        <div className="p-6 rounded-xl bg-slate-950/90 border border-fuchsia-500/40 text-center space-y-4">
          <div className="max-w-md mx-auto space-y-2">
            <div className="p-3 rounded-full bg-fuchsia-500/20 text-[#ff007f] w-12 h-12 mx-auto flex items-center justify-center">
              <KeyRound size={24} />
            </div>
            <h3 className="font-cyber font-bold text-lg text-white">
              Generador de Clave de Pago C2P
            </h3>
            <p className="text-xs text-slate-300">
              En compras de comercio C2P, tú generas este código temporal de 6 dígitos desde tu BDVApp o SMS para que el cajero debite el monto exacto sin pedirte contraseñas fijas.
            </p>
          </div>

          {generatedToken ? (
            <div className="p-5 rounded-2xl bg-gradient-to-b from-fuchsia-950/80 to-slate-900 border-2 border-[#ff007f] max-w-xs mx-auto shadow-[0_0_25px_rgba(255,0,127,0.3)] space-y-2">
              <div className="text-[10px] uppercase font-mono-code text-fuchsia-300">
                CLAVE DINÁMICA TEMPORAL (OTP)
              </div>
              <div className="text-3xl font-mono-code font-bold text-white tracking-widest">
                {generatedToken}
              </div>
              <div className="text-[10px] text-slate-400 font-mono-code">
                Válida por 15 minutos • De un solo uso
              </div>
            </div>
          ) : (
            <button
              id="btn-generate-otp-token"
              onClick={handleGenerateToken}
              className="px-6 py-2.5 rounded-xl font-cyber font-bold text-xs sm:text-sm bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-500 hover:to-pink-400 text-white shadow-[0_0_15px_rgba(255,0,127,0.3)] transition"
            >
              Generar Clave de Pago C2P
            </button>
          )}

          {generatedToken && (
            <div className="pt-2">
              <button
                onClick={handleGenerateToken}
                className="text-xs text-fuchsia-400 hover:text-fuchsia-300 underline font-mono-code"
              >
                Generar otro código
              </button>
            </div>
          )}
        </div>
      )}

      {/* Transaction Receipt Display */}
      {receipt && (
        <div className="p-6 rounded-xl bg-slate-950/95 border border-emerald-500/50 space-y-5">
          <div className="text-center space-y-1">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-cyber font-bold text-lg text-emerald-300">
              ¡PagoMóvil Procesado Exitosamente!
            </h3>
            <p className="text-xs text-slate-400 font-mono-code">
              Transacción interbancaria liquidada en tiempo real
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto space-y-2.5 text-xs font-mono-code">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Referencia Bancaria:</span>
              <span className="font-bold text-white">{receipt.reference}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Banco Receptor:</span>
              <span className="font-bold text-cyan-300">{receipt.bankName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Destinatario:</span>
              <span className="font-bold text-white">{receipt.destPhone} ({receipt.destId})</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Monto Transferido:</span>
              <span className="font-bold text-emerald-400">Bs. {receipt.amountBs.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Débito CifraTokens:</span>
              <span className="font-bold text-cyan-400">${receipt.amountUsd.toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fecha y Hora:</span>
              <span className="text-slate-300">{receipt.date}</span>
            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setReceipt(null)}
              className="px-5 py-2 rounded-xl font-cyber text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
            >
              Realizar Otra Operación
            </button>
          </div>
        </div>
      )}

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
