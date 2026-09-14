import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft, 
  DollarSign, 
  Volume2, 
  CheckCircle2, 
  Building2, 
  BarChart3, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';

interface BolsaBvcSimulatorProps {
  tasaBcv: number;
  saldoUsd: number;
  onUpdateSaldo?: (newSaldoUsd: number) => void;
  onBack: () => void;
}

interface StockItem {
  symbol: string;
  name: string;
  priceBs: number;
  changePercent: number;
  dividendYield: string;
  volume: string;
}

export const BolsaBvcSimulator: React.FC<BolsaBvcSimulatorProps> = ({
  tasaBcv,
  saldoUsd,
  onUpdateSaldo,
  onBack
}) => {
  const [selectedStock, setSelectedStock] = useState<string>('BVCC');
  const [sharesToBuy, setSharesToBuy] = useState<number>(10);
  const [portfolio, setPortfolio] = useState<Record<string, number>>({
    BVCC: 25,
    RST: 50
  });

  const STOCKS: StockItem[] = [
    {
      symbol: 'BVCC',
      name: 'Bolsa de Valores de Caracas, C.A.',
      priceBs: 145.50,
      changePercent: +3.2,
      dividendYield: '8.5% anual',
      volume: '154,200 acciones'
    },
    {
      symbol: 'RST',
      name: 'C.A. Ron Santa Teresa (Clase A y B)',
      priceBs: 92.40,
      changePercent: +1.8,
      dividendYield: '6.2% anual',
      volume: '380,100 acciones'
    },
    {
      symbol: 'BPAT',
      name: 'Banco Provincial, S.A. Banco Universal',
      priceBs: 210.00,
      changePercent: -0.5,
      dividendYield: '10.1% anual',
      volume: '95,400 acciones'
    },
    {
      symbol: 'BNC',
      name: 'Banco Nacional de Crédito, C.A.',
      priceBs: 84.60,
      changePercent: +2.1,
      dividendYield: '7.8% anual',
      volume: '210,000 acciones'
    },
    {
      symbol: 'CANTV',
      name: 'CANTV Clase D',
      priceBs: 58.20,
      changePercent: +0.4,
      dividendYield: '4.5% anual',
      volume: '85,000 acciones'
    }
  ];

  const currentStock = STOCKS.find(s => s.symbol === selectedStock) || STOCKS[0];
  const priceUsd = currentStock.priceBs / tasaBcv;
  const totalCostUsd = priceUsd * sharesToBuy;
  const totalCostBs = currentStock.priceBs * sharesToBuy;

  const handleBuy = () => {
    if (totalCostUsd > saldoUsd) {
      cyberAudio.playError();
      speechNarrator.speak("Saldo insuficiente en tu billetera para ejecutar esta orden en la Bolsa de Valores de Caracas.");
      return;
    }

    cyberAudio.playSuccess();
    const newSaldo = Math.max(0, saldoUsd - totalCostUsd);
    if (onUpdateSaldo) onUpdateSaldo(newSaldo);

    setPortfolio(prev => ({
      ...prev,
      [selectedStock]: (prev[selectedStock] || 0) + sharesToBuy
    }));

    speechNarrator.speak(
      `¡Orden ejecutada en la BVC! Compraste ${sharesToBuy} acciones de ${currentStock.name} a un valor de ${totalCostBs.toFixed(2)} bolívares.`,
      true
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl cyber-glass border border-amber-500/40 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              cyberAudio.playBlip();
              onBack();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-amber-400 transition"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono-code text-xs font-bold uppercase">
              <Coins size={14} />
              <span>Módulo 4: Renta Variable & Mercado Bursátil</span>
            </div>
            <h2 className="font-cyber font-bold text-xl text-white">
              Bolsa de Valores de Caracas (BVC) — Simulador Bursátil
            </h2>
          </div>
        </div>

        <div className="text-right text-xs font-mono-code">
          <span className="text-slate-400">Tasa Oficial BCV:</span>
          <div className="font-bold text-emerald-300">{tasaBcv.toFixed(2)} Bs/USD</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Stock Tickers List */}
        <div className="lg:col-span-1 cyber-glass rounded-2xl p-4 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-code uppercase font-bold text-slate-400 pb-2 border-b border-slate-800">
            <span>Pizarra de Cotizaciones BVC</span>
            <span className="text-amber-400">En Vivo</span>
          </div>

          <div className="space-y-2">
            {STOCKS.map((stock) => {
              const isSelected = stock.symbol === selectedStock;
              return (
                <div
                  key={stock.symbol}
                  onClick={() => {
                    setSelectedStock(stock.symbol);
                    cyberAudio.playBlip();
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="font-cyber font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{stock.symbol}</span>
                      {stock.changePercent >= 0 ? (
                        <span className="text-[10px] text-emerald-400 font-mono-code font-bold flex items-center">
                          <TrendingUp size={11} /> +{stock.changePercent}%
                        </span>
                      ) : (
                        <span className="text-[10px] text-rose-400 font-mono-code font-bold flex items-center">
                          <TrendingDown size={11} /> {stock.changePercent}%
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[170px] font-sans">
                      {stock.name}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono-code font-bold text-xs text-amber-300">
                      Bs. {stock.priceBs.toFixed(2)}
                    </div>
                    <div className="text-[10px] font-mono-code text-slate-400">
                      ${(stock.priceBs / tasaBcv).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center & Right: Stock Details & Order Execution */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Selected Stock Overview Card */}
          <div className="cyber-glass rounded-2xl p-5 border border-amber-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono-code text-amber-400 font-bold uppercase">
                  {currentStock.symbol} • Renta Variable
                </span>
                <h3 className="text-lg sm:text-xl font-cyber font-bold text-white">
                  {currentStock.name}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xl sm:text-2xl font-cyber font-black text-amber-300">
                  Bs. {currentStock.priceBs.toFixed(2)}
                </div>
                <div className="text-xs font-mono-code text-slate-400">
                  ≈ ${priceUsd.toFixed(2)} USD (Tasa BCV)
                </div>
              </div>
            </div>

            {/* Fundamentals */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono-code">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Rendimiento Dividendos:</span>
                <span className="font-bold text-emerald-400">{currentStock.dividendYield}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Volumen Diario:</span>
                <span className="font-bold text-slate-200">{currentStock.volume}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Acciones en tu Cartera:</span>
                <span className="font-bold text-amber-300">{portfolio[selectedStock] || 0} acciones</span>
              </div>
            </div>

            {/* Buy Order Box */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/20 space-y-3">
              <div className="text-xs font-mono-code font-bold uppercase text-slate-300">
                Terminal de Ejecución de Órdenes
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:w-1/2">
                  <label className="block text-[10px] font-mono-code text-slate-400 mb-1">
                    Cantidad de Acciones a Comprar:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={sharesToBuy}
                    onChange={(e) => setSharesToBuy(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono-code text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="w-full sm:w-1/2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono-code space-y-0.5">
                  <div className="text-slate-400 text-[10px]">Costo Total Estimado:</div>
                  <div className="font-bold text-white">Bs. {totalCostBs.toFixed(2)}</div>
                  <div className="text-amber-300 font-semibold">${totalCostUsd.toFixed(2)} USD</div>
                </div>
              </div>

              <button
                onClick={handleBuy}
                className="w-full py-3 px-4 rounded-xl font-cyber font-bold text-sm tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-110 active:scale-98 transition shadow-[0_0_20px_rgba(251,191,36,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={16} />
                <span>EJECUTAR ORDEN DE COMPRA EN BVC</span>
              </button>
            </div>
          </div>

          {/* Educational Pill about BVC */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-mono-code text-slate-300 space-y-1.5">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>¿Por qué invertir en la Bolsa de Valores de Caracas?</span>
            </div>
            <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
              Comprar acciones de empresas venezolanas históricas te convierte en copropietario y te otorga derecho a recibir dividendos anuales. Es una herramienta clave contra la inflación y para hacer crecer tus ahorros en moneda nacional e indexada.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
