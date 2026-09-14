import React from 'react';
import { BankContext } from '../types';
import { ShieldCheck, Wifi, Sparkles } from 'lucide-react';

interface BankCardVisualProps {
  bank: BankContext | 'Banco de Venezuela' | 'Banco Plaza' | 'Banco del Tesoro';
  accountNumber?: string;
  cardHolderName?: string;
  cardHolderId?: string;
  expiryDate?: string;
  isCompact?: boolean;
  showBack?: boolean;
}

export const BankCardVisual: React.FC<BankCardVisualProps> = ({
  bank,
  accountNumber = '5412 •••• •••• 8842',
  cardHolderName = 'ESTUDIANTE JUVENIL',
  cardHolderId = 'V-31.542.980',
  expiryDate = '12/30',
  isCompact = false
}) => {
  // 1. BANCO DE VENEZUELA (0102) - Real Corporate Web Colors: Rojo Institucional BDV (#c8102e / #991b1b) con acentos dorados y azul profundo
  if (bank === 'Banco de Venezuela') {
    return (
      <div 
        id="bank-card-bdv"
        className={`relative w-full rounded-2xl overflow-hidden text-white transition-all duration-300 shadow-2xl border ${
          isCompact ? 'aspect-[1.586/1] p-4 text-xs' : 'aspect-[1.586/1] p-5 sm:p-6'
        } bg-gradient-to-tr from-[#58000d] via-[#a30b1e] to-[#c8102e] border-red-500/50 shadow-[0_0_35px_rgba(200,16,46,0.35)]`}
      >
        {/* Subtle BDV Background Security Guilloche Waves & Dark Blue Angle Accent */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#0a1128] rounded-full blur-2xl" />
          <div className="w-full h-full bg-[radial-gradient(#ffffff_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-20" />
        </div>

        {/* Diagonal Light Sheen */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-b from-white/15 via-transparent to-transparent rotate-25 pointer-events-none" />

        {/* Card Content Layout */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          
          {/* Top Row: Official BDV Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* BDV Flag Bar (Rojo y Amarillo oficial) */}
              <div className="flex flex-col gap-0.5">
                <span className="w-4 h-1.5 bg-[#e20613] rounded-xs shadow-sm" />
                <span className="w-4 h-1.5 bg-[#f59e0b] rounded-xs shadow-sm" />
              </div>
              <div>
                <span className="font-cyber font-black tracking-wider text-sm sm:text-base text-white drop-shadow-md">
                  Banco de Venezuela
                </span>
                <span className="block text-[8px] sm:text-[9px] font-mono-code font-bold tracking-widest text-amber-300 uppercase">
                  Código 0102 • BDV Digital
                </span>
              </div>
            </div>

            <div className="px-2 py-0.5 rounded bg-red-950/90 border border-red-400/40 text-[9px] sm:text-[10px] font-mono-code font-bold text-red-200 uppercase tracking-wider">
              DébitoClave
            </div>
          </div>

          {/* Middle Row: Gold EMV Chip & Contactless Symbol */}
          <div className="flex items-center gap-3 my-auto">
            {/* Realistic Golden Chip */}
            <div className="w-10 h-7 sm:w-11 sm:h-8 rounded bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-600/80 shadow-md flex items-center justify-center p-0.5 relative">
              <div className="w-full h-full border border-amber-800/40 rounded-xs grid grid-cols-2">
                <div className="border-r border-b border-amber-800/40"></div>
                <div className="border-b border-amber-800/40"></div>
                <div className="border-r border-amber-800/40"></div>
                <div></div>
              </div>
            </div>

            {/* Contactless waves */}
            <Wifi size={16} className="text-amber-300 rotate-90" />
            <span className="text-[10px] font-mono-code text-red-200/90 hidden sm:inline">
              Contactless
            </span>
          </div>

          {/* Bottom Row: Account Number, Cardholder Name, CI & Mastercard / Maestro */}
          <div className="space-y-1 sm:space-y-2">
            <div className="font-mono-code text-sm sm:text-lg md:text-xl font-extrabold tracking-widest text-white drop-shadow-md">
              {accountNumber}
            </div>

            <div className="flex items-end justify-between text-slate-200">
              <div className="space-y-0.5">
                <span className="text-[8px] sm:text-[9px] font-mono-code text-amber-300 block uppercase tracking-wider">
                  Titular de la Cuenta
                </span>
                <span className="font-cyber font-bold text-xs sm:text-sm text-white uppercase tracking-wide block">
                  {cardHolderName}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono-code text-red-200 block">
                  C.I. {cardHolderId}
                </span>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div>
                  <span className="text-[8px] sm:text-[9px] font-mono-code text-amber-300 block uppercase">
                    Vence
                  </span>
                  <span className="font-mono-code font-bold text-xs sm:text-sm text-white">
                    {expiryDate}
                  </span>
                </div>

                {/* Mastercard Debit Emblem (Red & Orange overlapping circles) */}
                <div className="flex -space-x-2.5">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#eb001b] opacity-90 shadow-sm" />
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ff5f00] opacity-90 shadow-sm" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. BANCO PLAZA (0138) - Real Corporate Web Colors: Verde Institucional Plaza (#006837 / #059669 / #008752) & Cuenta Verde
  if (bank === 'Banco Plaza') {
    return (
      <div 
        id="bank-card-plaza"
        className={`relative w-full rounded-2xl overflow-hidden text-white transition-all duration-300 shadow-2xl border ${
          isCompact ? 'aspect-[1.586/1] p-4 text-xs' : 'aspect-[1.586/1] p-5 sm:p-6'
        } bg-gradient-to-tr from-[#022c22] via-[#006837] to-[#059669] border-emerald-400/50 shadow-[0_0_35px_rgba(5,150,105,0.35)]`}
      >
        {/* Subtle Plaza Geometric Matrix & Emerald Ambient Reflections */}
        <div className="absolute inset-0 pointer-events-none opacity-35">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl" />
          <div className="w-full h-full bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-25" />
        </div>

        {/* Diagonal Light Sheen */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-b from-white/15 via-transparent to-transparent rotate-25 pointer-events-none" />

        {/* Card Content Layout */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          
          {/* Top Row: Official Banco Plaza Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* White Square Emblem with Plaza "P" Monogram */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center shadow-md">
                <span className="font-cyber font-black text-base sm:text-lg text-[#006837]">
                  P
                </span>
              </div>
              <div>
                <span className="font-cyber font-black tracking-wider text-sm sm:text-base text-white drop-shadow-md">
                  BANCO PLAZA
                </span>
                <span className="block text-[8px] sm:text-[9px] font-mono-code font-bold tracking-widest text-emerald-200 uppercase">
                  Código 0138 • Tú Cuentas
                </span>
              </div>
            </div>

            <div className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-400/40 text-[9px] sm:text-[10px] font-mono-code font-bold text-emerald-200 uppercase tracking-wider">
              Cuenta Verde
            </div>
          </div>

          {/* Middle Row: Gold EMV Chip & Contactless Symbol */}
          <div className="flex items-center gap-3 my-auto">
            {/* Realistic Golden Chip */}
            <div className="w-10 h-7 sm:w-11 sm:h-8 rounded bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-600/80 shadow-md flex items-center justify-center p-0.5 relative">
              <div className="w-full h-full border border-amber-800/40 rounded-xs grid grid-cols-2">
                <div className="border-r border-b border-amber-800/40"></div>
                <div className="border-b border-amber-800/40"></div>
                <div className="border-r border-amber-800/40"></div>
                <div></div>
              </div>
            </div>

            <Wifi size={16} className="text-emerald-300 rotate-90" />
            <span className="text-[10px] font-mono-code text-emerald-200/90 hidden sm:inline">
              Maestro Débito Plaza
            </span>
          </div>

          {/* Bottom Row: Account Number, Cardholder Name, CI & Maestro Network */}
          <div className="space-y-1 sm:space-y-2">
            <div className="font-mono-code text-sm sm:text-lg md:text-xl font-extrabold tracking-widest text-white drop-shadow-md">
              {accountNumber}
            </div>

            <div className="flex items-end justify-between text-slate-200">
              <div className="space-y-0.5">
                <span className="text-[8px] sm:text-[9px] font-mono-code text-emerald-300 block uppercase tracking-wider">
                  Titular de la Cuenta
                </span>
                <span className="font-cyber font-bold text-xs sm:text-sm text-white uppercase tracking-wide block">
                  {cardHolderName}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono-code text-emerald-200 block">
                  C.I. {cardHolderId}
                </span>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div>
                  <span className="text-[8px] sm:text-[9px] font-mono-code text-emerald-300 block uppercase">
                    Vence
                  </span>
                  <span className="font-mono-code font-bold text-xs sm:text-sm text-white">
                    {expiryDate}
                  </span>
                </div>

                {/* Maestro Debit Emblem (Blue & Red overlapping circles) */}
                <div className="flex -space-x-2.5">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0061a8] opacity-95 shadow-sm" />
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#cc0000] opacity-95 shadow-sm" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 3. BANCO DEL TESORO (0163) - Real Corporate Web Colors: Dorado / Oro Tesoro (#b45309 / #d97706) & Ocre Cálido
  return (
    <div 
      id="bank-card-tesoro"
      className={`relative w-full rounded-2xl overflow-hidden text-white transition-all duration-300 shadow-2xl border ${
        isCompact ? 'aspect-[1.586/1] p-4 text-xs' : 'aspect-[1.586/1] p-5 sm:p-6'
      } bg-gradient-to-tr from-[#3b1200] via-[#92400e] to-[#d97706] border-amber-400/50 shadow-[0_0_35px_rgba(217,119,6,0.35)]`}
    >
      {/* Subtle Tesoro Sunburst Rays & Gold Ambient Sheen */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/25 rounded-full blur-3xl" />
        <div className="w-full h-full bg-[radial-gradient(#fbbf24_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-20" />
      </div>

      {/* Diagonal Light Sheen */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-b from-white/15 via-transparent to-transparent rotate-25 pointer-events-none" />

      {/* Card Content Layout */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        
        {/* Top Row: Official Banco del Tesoro Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Golden Spiral / Sunburst Emblem of Banco del Tesoro */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-yellow-300 to-amber-500 border border-amber-200 flex items-center justify-center shadow-md">
              <Sparkles size={16} className="text-amber-950" />
            </div>
            <div>
              <span className="font-cyber font-black tracking-wider text-sm sm:text-base text-white drop-shadow-md">
                Banco del Tesoro
              </span>
              <span className="block text-[8px] sm:text-[9px] font-mono-code font-bold tracking-widest text-amber-200 uppercase">
                Código 0163 • Un tesoro a tu alcance
              </span>
            </div>
          </div>

          <div className="px-2 py-0.5 rounded bg-amber-950/90 border border-amber-400/40 text-[9px] sm:text-[10px] font-mono-code font-bold text-amber-200 uppercase tracking-wider">
            Master Debit
          </div>
        </div>

        {/* Middle Row: Gold EMV Chip & Contactless Symbol */}
        <div className="flex items-center gap-3 my-auto">
          {/* Realistic Golden Chip */}
          <div className="w-10 h-7 sm:w-11 sm:h-8 rounded bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-amber-600/80 shadow-md flex items-center justify-center p-0.5 relative">
            <div className="w-full h-full border border-amber-800/40 rounded-xs grid grid-cols-2">
              <div className="border-r border-b border-amber-800/40"></div>
              <div className="border-b border-amber-800/40"></div>
              <div className="border-r border-amber-800/40"></div>
              <div></div>
            </div>
          </div>

          <Wifi size={16} className="text-amber-200 rotate-90" />
          <span className="text-[10px] font-mono-code text-amber-200/90 hidden sm:inline">
            Débito Tesoro
          </span>
        </div>

        {/* Bottom Row: Account Number, Cardholder Name, CI & Master Debit */}
        <div className="space-y-1 sm:space-y-2">
          <div className="font-mono-code text-sm sm:text-lg md:text-xl font-extrabold tracking-widest text-white drop-shadow-md">
            {accountNumber}
          </div>

          <div className="flex items-end justify-between text-slate-200">
            <div className="space-y-0.5">
              <span className="text-[8px] sm:text-[9px] font-mono-code text-amber-300 block uppercase tracking-wider">
                Titular de la Cuenta
              </span>
              <span className="font-cyber font-bold text-xs sm:text-sm text-white uppercase tracking-wide block">
                {cardHolderName}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono-code text-amber-200 block">
                C.I. {cardHolderId}
              </span>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <span className="text-[8px] sm:text-[9px] font-mono-code text-amber-300 block uppercase">
                  Vence
                </span>
                <span className="font-mono-code font-bold text-xs sm:text-sm text-white">
                  {expiryDate}
                </span>
              </div>

              {/* Master Debit Red and Orange Circles */}
              <div className="flex -space-x-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#eb001b] opacity-90 shadow-sm" />
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ff5f00] opacity-90 shadow-sm" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
