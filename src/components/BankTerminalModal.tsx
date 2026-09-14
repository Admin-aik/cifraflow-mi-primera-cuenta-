import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Phone, 
  FileText, 
  ArrowRight,
  ExternalLink,
  Info,
  X,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BankContext, BankAccountProduct } from '../types';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';
import { BankCardVisual } from './BankCardVisual';

interface BankTerminalModalProps {
  initialBank?: BankContext;
  bankProducts: BankAccountProduct[];
  collectedRequirements: string[];
  unlockedAccountNames: string[];
  saldoDinero: number;
  tasaBcv: number;
  onUnlockAccount: (accountName: string) => void;
  onClose: () => void;
}

export const BankTerminalModal: React.FC<BankTerminalModalProps> = ({
  initialBank,
  bankProducts,
  collectedRequirements,
  unlockedAccountNames,
  saldoDinero,
  tasaBcv,
  onUnlockAccount,
  onClose
}) => {
  const [selectedBank, setSelectedBank] = useState<BankContext>(
    initialBank && initialBank !== 'Ninguno' ? initialBank : 'Banco de Venezuela'
  );
  const [selectedProduct, setSelectedProduct] = useState<BankAccountProduct | null>(null);
  const [openingStep, setOpeningStep] = useState<'select' | 'form' | 'success' | 'gallery'>('select');
  const [userName, setUserName] = useState('CYBER CADETE');
  const [userCi, setUserCi] = useState('V-31.542.980');
  const [userPhone, setUserPhone] = useState('0412-5551234');
  const [generatedAccountNum, setGeneratedAccountNum] = useState('');

  const currentProducts = bankProducts.filter(p => p.banco === selectedBank);

  const handleStartOpening = (product: BankAccountProduct) => {
    setSelectedProduct(product);
    setOpeningStep('form');
    cyberAudio.playBlip();
  };

  const handleConfirmOpening = () => {
    if (!selectedProduct) return;
    cyberAudio.playUnlock();

    // Generate real Venezuelan 20-digit bank account number format: BBBB-GGGG-DC-CCCCCCCCCC
    const bankCode = selectedProduct.codigoBanco;
    const agency = '0101';
    const checkDigits = '23';
    const randomAcc = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const fullAccount = `${bankCode}-${agency}-${checkDigits}-${randomAcc}`;
    
    setGeneratedAccountNum(fullAccount);
    onUnlockAccount(selectedProduct.nombre);
    setOpeningStep('success');

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#c8102e', '#006837', '#d97706', '#00f3ff']
      });
    } catch {
      // fallback
    }
  };

  const getBankBadgeStyle = (bank: BankContext) => {
    if (bank === 'Banco de Venezuela') {
      return {
        tabActive: 'bg-red-950/80 border-red-500 text-red-100 shadow-[0_0_20px_rgba(200,16,46,0.4)] ring-1 ring-red-400',
        cardBg: 'from-[#58000d] via-[#a30b1e] to-[#c8102e]',
        textAccent: 'text-red-400',
        name: 'Banco de Venezuela (0102)',
        desc: 'Rojo Institucional BDV & Líder en pagos digitales'
      };
    } else if (bank === 'Banco Plaza') {
      return {
        tabActive: 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(5,150,105,0.4)] ring-1 ring-emerald-400',
        cardBg: 'from-[#022c22] via-[#006837] to-[#059669]',
        textAccent: 'text-emerald-400',
        name: 'Banco Plaza (0138)',
        desc: 'Verde Institucional Plaza & Cuenta Verde'
      };
    } else {
      return {
        tabActive: 'bg-amber-950/80 border-amber-500 text-amber-100 shadow-[0_0_20px_rgba(217,119,6,0.4)] ring-1 ring-amber-400',
        cardBg: 'from-[#3b1200] via-[#92400e] to-[#d97706]',
        textAccent: 'text-amber-400',
        name: 'Banco del Tesoro (0163)',
        desc: 'Dorado / Oro Tesoro & Ocre Cálido'
      };
    }
  };

  const currentTheme = getBankBadgeStyle(selectedBank);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-4xl max-h-[92vh] cyber-glass rounded-2xl border border-cyan-500/30 overflow-y-auto p-5 sm:p-7 space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 font-bold uppercase tracking-wider">
              <Building2 size={15} />
              <span>Agencia Virtual & Terminal Bancario Oficial</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-cyber font-bold text-white mt-1 flex items-center gap-2">
              <span>Portal Bancario Interconectado</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono-code font-normal">
                SUDEBAN
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Apertura digital y muestrario con los colores y diseños reales de cada tarjeta bancaria en la web.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* BCV Rate Pill */}
            <div 
              onClick={() => {
                cyberAudio.playBlip();
                speechNarrator.speak(`Tasa oficial del Banco Central de Venezuela aplicable a cuentas en moneda extranjera y transferencias: 1 dólar equivale a ${tasaBcv.toFixed(2)} bolívares.`);
              }}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code cursor-pointer hover:border-emerald-300 transition"
              title="Tasa oficial BCV para conversión de divisas"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-white">BCV:</span>
              <span className="text-emerald-200">{tasaBcv.toFixed(2)} Bs/USD 🔊</span>
            </div>

            <button
              id="btn-close-bank-terminal"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Top Switcher: Bank Selection Tabs with Authentic Web Colors */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
            <span>SELECCIONA LA ENTIDAD BANCARIA:</span>
            <button
              onClick={() => {
                setOpeningStep(openingStep === 'gallery' ? 'select' : 'gallery');
                cyberAudio.playBlip();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/50 text-cyan-300 hover:text-white flex items-center gap-1.5 cursor-pointer text-xs font-cyber"
            >
              <Layers size={13} />
              <span>{openingStep === 'gallery' ? 'Ver Productos' : 'Comparar las 3 Tarjetas Reales'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {(['Banco de Venezuela', 'Banco Plaza', 'Banco del Tesoro'] as BankContext[]).map((bank) => {
              const isSelected = selectedBank === bank;
              const bStyle = getBankBadgeStyle(bank);

              return (
                <button
                  key={bank}
                  id={`tab-bank-${bank.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => {
                    setSelectedBank(bank);
                    if (openingStep === 'form') setOpeningStep('select');
                    cyberAudio.playBlip();
                    speechNarrator.speak(`${bank}. Colores institucionales oficiales aplicados.`);
                  }}
                  className={`p-3 rounded-xl font-cyber text-xs sm:text-sm font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? bStyle.tabActive
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        bank === 'Banco de Venezuela' ? 'bg-[#c8102e]' : bank === 'Banco Plaza' ? 'bg-[#059669]' : 'bg-[#d97706]'
                      }`} />
                      <span>{bank}</span>
                    </div>
                    <span className="block text-[10px] font-mono-code font-normal text-slate-400 mt-0.5">
                      {bank === 'Banco de Venezuela' ? '0102 • Rojo BDV' : bank === 'Banco Plaza' ? '0138 • Verde Plaza' : '0163 • Dorado Tesoro'}
                    </span>
                  </div>
                  <CreditCard size={16} className={isSelected ? 'text-white' : 'text-slate-500'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Gallery Mode: Compare all 3 authentic cards side by side */}
        {openingStep === 'gallery' && (
          <div className="space-y-5 p-4 rounded-xl bg-slate-950/90 border border-cyan-500/40">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-cyber font-bold text-white flex items-center gap-2">
                  <CreditCard className="text-cyan-400" size={18} />
                  <span>Tarjetas de Débito Bancarias de Venezuela (Colores Web Oficiales)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Paleta cromática exacta, chips de contacto EMV, contactless y normas de diseño bancario nacional.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: BDV */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="font-bold text-red-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#c8102e]" />
                    Banco de Venezuela
                  </span>
                  <span className="text-[10px] text-slate-400">0102 • DébitoClave</span>
                </div>
                <BankCardVisual 
                  bank="Banco de Venezuela" 
                  accountNumber="0102 •••• •••• 9210" 
                  cardHolderName={userName}
                  cardHolderId={userCi}
                  isCompact={true}
                />
                <p className="text-[11px] text-slate-400 italic">
                  Rojo Institucional carmesí (#c8102e) con franja bandera roja/amarilla y chip dorado.
                </p>
              </div>

              {/* Card 2: Banco Plaza */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#059669]" />
                    Banco Plaza
                  </span>
                  <span className="text-[10px] text-slate-400">0138 • Cuenta Verde</span>
                </div>
                <BankCardVisual 
                  bank="Banco Plaza" 
                  accountNumber="0138 •••• •••• 4402" 
                  cardHolderName={userName}
                  cardHolderId={userCi}
                  isCompact={true}
                />
                <p className="text-[11px] text-slate-400 italic">
                  Verde bosque y esmeralda (#006837 / #059669) característico de su Cuenta Verde en divisas.
                </p>
              </div>

              {/* Card 3: Banco del Tesoro */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#d97706]" />
                    Banco del Tesoro
                  </span>
                  <span className="text-[10px] text-slate-400">0163 • Master Debit</span>
                </div>
                <BankCardVisual 
                  bank="Banco del Tesoro" 
                  accountNumber="0163 •••• •••• 8155" 
                  cardHolderName={userName}
                  cardHolderId={userCi}
                  isCompact={true}
                />
                <p className="text-[11px] text-slate-400 italic">
                  Dorado / Oro Tesoro y ocre cálido (#b45309 / #d97706) con el emblema solar espiral.
                </p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setOpeningStep('select')}
                className="px-5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-cyber font-bold text-white transition"
              >
                Continuar con la Apertura de Cuenta
              </button>
            </div>
          </div>
        )}

        {/* Mode: Selection of Products */}
        {openingStep === 'select' && (
          <div className="space-y-6">
            
            {/* Top Bank Card Preview in Selected Bank's Real Web Colors */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row items-center gap-5">
              <div className="w-full md:w-80 flex-shrink-0">
                <BankCardVisual 
                  bank={selectedBank}
                  accountNumber={selectedBank === 'Banco de Venezuela' ? '0102 •••• •••• 8842' : selectedBank === 'Banco Plaza' ? '0138 •••• •••• 3014' : '0163 •••• •••• 6195'}
                  cardHolderName={userName}
                  cardHolderId={userCi}
                  isCompact={true}
                />
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-slate-900 border border-slate-700 text-slate-300">
                    DISEÑO WEB OFICIAL
                  </span>
                  <span className={`text-xs font-mono-code font-bold ${currentTheme.textAccent}`}>
                    {currentTheme.name}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-cyber font-bold text-white">
                  Tarjeta de Débito Digital {selectedBank}
                </h3>
                <p className="text-xs text-slate-300">
                  Emitida conforme a la normativa SUDEBAN con tecnología Contactless, chip de seguridad EMV y liquidación cambiaria automática a la Tasa Oficial del Banco Central de Venezuela (BCV).
                </p>
                <div className="text-[11px] font-mono-code text-slate-400 flex items-center gap-2">
                  <span>• Autenticación biométrica</span>
                  <span>• PagoMóvil C2P</span>
                  <span>• Compras en línea</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-cyber font-bold text-white text-base">
                Cuentas Disponibles para Apertura en {selectedBank}
              </h3>
              <span className="text-xs font-mono-code text-slate-400">
                Selecciona una cuenta para iniciar apertura
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentProducts.map((prod) => {
                const isAlreadyUnlocked = unlockedAccountNames.includes(prod.nombre);
                const hasRequirements = prod.requisitosMinimos.every(reqName => 
                  collectedRequirements.some(c => c.toLowerCase().includes(reqName.toLowerCase()) || reqName.toLowerCase().includes(c.toLowerCase()))
                );

                return (
                  <div
                    key={prod.id}
                    className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-4 relative overflow-hidden"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                          {prod.moneda}
                        </span>
                        {isAlreadyUnlocked ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-emerald-950 border border-emerald-500 text-emerald-300 flex items-center gap-1">
                            <CheckCircle2 size={11} />
                            <span>Cuenta Activa</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono-code text-slate-400">
                            {prod.edadRequerida}
                          </span>
                        )}
                      </div>

                      <h4 className="font-cyber font-bold text-base text-white">
                        {prod.nombre}
                      </h4>

                      <p className="text-xs text-slate-300">
                        {prod.costoMantenimiento}
                      </p>

                      <div className="space-y-1 text-xs">
                        <div className={`text-[10px] uppercase font-mono-code font-bold ${currentTheme.textAccent}`}>
                          Beneficios Principales:
                        </div>
                        <ul className="space-y-0.5 text-slate-300">
                          {prod.beneficiosClave.map((ben, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              <span>{ben}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-1">
                        <div className="text-[10px] uppercase font-mono-code text-slate-400 font-bold mb-1">
                          Requisitos Necesarios:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {prod.requisitosMinimos.map((req, i) => {
                            const hasIt = collectedRequirements.some(c => 
                              c.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(c.toLowerCase())
                            );
                            return (
                              <span 
                                key={i}
                                className={`text-[10px] font-mono-code px-2 py-0.5 rounded border ${
                                  hasIt 
                                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' 
                                    : 'bg-slate-900 border-slate-800 text-slate-500'
                                }`}
                              >
                                {hasIt ? '✓ ' : '○ '} {req}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      id={`btn-open-prod-${prod.id}`}
                      onClick={() => handleStartOpening(prod)}
                      className={`w-full py-2.5 px-4 rounded-xl font-cyber text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                        isAlreadyUnlocked 
                          ? 'bg-slate-800 text-slate-400 hover:text-white'
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg'
                      }`}
                    >
                      <span>{isAlreadyUnlocked ? 'Revisar Datos de Cuenta' : 'Iniciar Apertura Digital'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mode: Registration Form */}
        {openingStep === 'form' && selectedProduct && (
          <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono-code text-cyan-400 font-bold uppercase">Paso 2 de 2: Verificación de Identidad</span>
                <h3 className="text-lg font-cyber font-bold text-white">
                  Formulario Digital: {selectedProduct.nombre}
                </h3>
              </div>
              <button
                onClick={() => setOpeningStep('select')}
                className="text-xs text-slate-400 hover:text-white font-mono-code"
              >
                ← Volver a productos
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-slate-300 flex items-center gap-1.5">
                  <User size={13} className="text-cyan-400" />
                  <span>Nombre del Titular:</span>
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-cyber focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-slate-300 flex items-center gap-1.5">
                  <FileText size={13} className="text-fuchsia-400" />
                  <span>Cédula de Identidad:</span>
                </label>
                <input
                  type="text"
                  value={userCi}
                  onChange={(e) => setUserCi(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono-code focus:outline-hidden focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono-code text-slate-300 flex items-center gap-1.5">
                  <Phone size={13} className="text-emerald-400" />
                  <span>Teléfono Afiliado:</span>
                </label>
                <input
                  type="text"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono-code focus:outline-hidden focus:border-cyan-400"
                />
              </div>
            </div>

            {/* SUDEBAN Compliance Notice */}
            <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-2.5 text-xs text-slate-300">
              <ShieldCheck size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                Al confirmar, se emitirá una tarjeta de débito digital con los colores y sellos oficiales del banco, habilitando tu registro para pagos electrónicos inmediatos.
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setOpeningStep('select')}
                className="px-4 py-2 rounded-xl text-xs font-mono-code text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                id="btn-confirm-opening"
                onClick={handleConfirmOpening}
                className="px-6 py-2.5 rounded-xl font-cyber font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={15} />
                <span>Emitir Tarjeta y Activar Cuenta</span>
              </button>
            </div>
          </div>
        )}

        {/* Mode: Success & Virtual Debit Card Issued in Real Web Colors */}
        {openingStep === 'success' && selectedProduct && (
          <div className="p-6 rounded-xl bg-slate-950/90 border border-emerald-500/50 space-y-6 text-center">
            
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-emerald-950 border border-emerald-400 text-emerald-300 inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>¡CUENTA BANCARIA APERTURADA CON ÉXITO!</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-cyber font-bold text-white mt-2">
                Bienvenido al Sistema Bancario Venezolano
              </h3>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Tu solicitud ha sido aprobada conforme a SUDEBAN. A continuación se presenta tu tarjeta de débito digital oficial en sus colores reales de la web:
              </p>
            </div>

            {/* Virtual Real-Colored Card Preview */}
            <div className="w-full max-w-md mx-auto transform hover:scale-[1.02] transition-transform">
              <BankCardVisual 
                bank={selectedBank}
                accountNumber={generatedAccountNum}
                cardHolderName={userName}
                cardHolderId={userCi}
                expiryDate="12/30"
                isCompact={false}
              />
            </div>

            {/* Next Action Tips */}
            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 max-w-lg mx-auto text-xs text-slate-300 space-y-1 text-left">
              <div className={`font-bold ${currentTheme.textAccent} font-mono-code`}>
                Pasos Inmediatos Habilitados:
              </div>
              <div>• Puedes afiliar esta cuenta a <strong>PagoMóvil</strong> interbancario.</div>
              <div>• Tus compras en comercios se debitarán a la <strong>Tasa Oficial del BCV</strong> ({tasaBcv.toFixed(2)} Bs/USD).</div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                id="btn-finish-opening"
                onClick={() => setOpeningStep('select')}
                className="px-6 py-2.5 rounded-xl font-cyber font-bold text-xs sm:text-sm bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-lg cursor-pointer"
              >
                Volver al Menú Bancario
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
