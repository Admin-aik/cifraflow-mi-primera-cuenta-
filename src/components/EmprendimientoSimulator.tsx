import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Calculator, 
  Sparkles, 
  ArrowLeft, 
  HelpCircle, 
  CheckCircle2, 
  Volume2, 
  Coins 
} from 'lucide-react';
import { cyberAudio } from '../utils/audioSynth';
import { speechNarrator } from '../utils/speechNarrator';

interface EmprendimientoSimulatorProps {
  tasaBcv: number;
  onBack: () => void;
}

export const EmprendimientoSimulator: React.FC<EmprendimientoSimulatorProps> = ({
  tasaBcv,
  onBack
}) => {
  // Business: Emprendimiento Escolar de Repostería Cyber / Drones
  const [costoFijoUsd, setCostoFijoUsd] = useState(60); // Alquiler horno/espacio/luz
  const [costoVariableUnidadUsd, setCostoVariableUnidadUsd] = useState(2.5); // Ingredientes por unidad
  const [precioVentaUnidadUsd, setPrecioVentaUnidadUsd] = useState(5.0); // Precio al público
  const [unidadesEstimadas, setUnidadesEstimadas] = useState(40); // Ventas proyectadas

  // Regla 50/30/20
  const [ingresoMensualUsd, setIngresoMensualUsd] = useState(150);

  // Formulas
  const margenContribucion = Math.max(0.1, precioVentaUnidadUsd - costoVariableUnidadUsd);
  const puntoEquilibrioUnidades = Math.ceil(costoFijoUsd / margenContribucion);
  const ingresosTotalesUsd = unidadesEstimadas * precioVentaUnidadUsd;
  const costosTotalesUsd = costoFijoUsd + (unidadesEstimadas * costoVariableUnidadUsd);
  const gananciaNetaUsd = ingresosTotalesUsd - costosTotalesUsd;

  // 50/30/20 Breakdown
  const necesidadesUsd = ingresoMensualUsd * 0.50;
  const gustosUsd = ingresoMensualUsd * 0.30;
  const inversionAhorroUsd = ingresoMensualUsd * 0.20;

  const handleSpeakCalculations = () => {
    cyberAudio.playBlip();
    speechNarrator.speak(
      `Análisis de Emprendimiento: Para cubrir tus costos fijos de ${costoFijoUsd} dólares, necesitas vender como mínimo ${puntoEquilibrioUnidades} unidades. Si vendes ${unidadesEstimadas} unidades a ${precioVentaUnidadUsd} dólares, tu ganancia neta estimada será de ${gananciaNetaUsd.toFixed(2)} dólares, equivalente a ${(gananciaNetaUsd * tasaBcv).toFixed(2)} bolívares a la tasa oficial del BCV.`,
      true
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl cyber-glass border border-emerald-500/40 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              cyberAudio.playBlip();
              onBack();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono-code text-xs font-bold uppercase">
              <TrendingUp size={14} />
              <span>Módulo 3: Ecosistema Emprendimiento</span>
            </div>
            <h2 className="font-cyber font-bold text-xl text-white">
              Simulador de Costos, Ganancias & Regla 50/30/20
            </h2>
          </div>
        </div>

        <button
          onClick={handleSpeakCalculations}
          className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900 transition flex items-center gap-1.5 text-xs font-cyber"
        >
          <Volume2 size={15} />
          <span className="hidden sm:inline">Explicar Números</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Simulator 1: Costos & Punto de Equilibrio */}
        <div className="cyber-glass rounded-2xl p-5 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-cyber font-bold text-base text-white flex items-center gap-2">
              <Calculator size={18} className="text-cyan-400" />
              <span>Punto de Equilibrio (Break-Even)</span>
            </h3>
            <span className="text-[11px] font-mono-code text-cyan-300">Tasa BCV: {tasaBcv.toFixed(2)} Bs</span>
          </div>

          <div className="space-y-3 text-xs font-mono-code">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Costos Fijos Totales (Alquiler, Licencias, Luz):</span>
                <span className="font-bold text-white">${costoFijoUsd} USD</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={costoFijoUsd}
                onChange={(e) => setCostoFijoUsd(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Costo Variable por Unidad producida:</span>
                <span className="font-bold text-white">${costoVariableUnidadUsd.toFixed(2)} USD</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={costoVariableUnidadUsd}
                onChange={(e) => setCostoVariableUnidadUsd(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Precio de Venta al Público:</span>
                <span className="font-bold text-white">${precioVentaUnidadUsd.toFixed(2)} USD</span>
              </div>
              <input
                type="range"
                min="3"
                max="25"
                step="0.5"
                value={precioVentaUnidadUsd}
                onChange={(e) => setPrecioVentaUnidadUsd(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Unidades Estimadas que venderás:</span>
                <span className="font-bold text-white">{unidadesEstimadas} unidades</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="1"
                value={unidadesEstimadas}
                onChange={(e) => setUnidadesEstimadas(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>

          {/* Results Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono-code">
            <div className="flex justify-between">
              <span className="text-slate-400">Punto de Equilibrio:</span>
              <span className="font-bold text-amber-300">{puntoEquilibrioUnidades} unidades vendidas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Ingresos Totales:</span>
              <span className="text-white">${ingresosTotalesUsd.toFixed(2)} (Bs. {(ingresosTotalesUsd * tasaBcv).toFixed(2)})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Costos Totales:</span>
              <span className="text-slate-300">${costosTotalesUsd.toFixed(2)} (Bs. {(costosTotalesUsd * tasaBcv).toFixed(2)})</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
              <span>Ganancia Neta Estimada:</span>
              <span className={gananciaNetaUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                ${gananciaNetaUsd.toFixed(2)} USD / Bs. {(gananciaNetaUsd * tasaBcv).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Simulator 2: Regla 50/30/20 */}
        <div className="cyber-glass rounded-2xl p-5 border border-emerald-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-cyber font-bold text-base text-white flex items-center gap-2">
              <PieChart size={18} className="text-emerald-400" />
              <span>Presupuesto con la Regla 50/30/20</span>
            </h3>
            <span className="text-[11px] font-mono-code text-emerald-300">Educación Financiera</span>
          </div>

          <div className="space-y-3 text-xs font-mono-code">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Ingreso Mensual del Joven Operador:</span>
                <span className="font-bold text-white">${ingresoMensualUsd} USD</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={ingresoMensualUsd}
                onChange={(e) => setIngresoMensualUsd(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
            </div>
          </div>

          {/* 3 Pillars Visualizer */}
          <div className="space-y-3 pt-2">
            
            {/* 50% Necesidades */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30">
              <div className="flex justify-between items-center text-xs font-mono-code mb-1">
                <span className="font-bold text-blue-300">50% Necesidades Básicas:</span>
                <span className="font-bold text-white">${necesidadesUsd.toFixed(2)} / Bs. {(necesidadesUsd * tasaBcv).toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Transporte escolar, materiales de estudio, merienda nutritiva e internet.
              </p>
            </div>

            {/* 30% Gustos */}
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
              <div className="flex justify-between items-center text-xs font-mono-code mb-1">
                <span className="font-bold text-purple-300">30% Deseos y Gustos Personales:</span>
                <span className="font-bold text-white">${gustosUsd.toFixed(2)} / Bs. {(gustosUsd * tasaBcv).toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Salidas con amigos, suscripciones de consolas de juegos y pasatiempos.
              </p>
            </div>

            {/* 20% Ahorro & Inversión */}
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
              <div className="flex justify-between items-center text-xs font-mono-code mb-1">
                <span className="font-bold text-emerald-300">20% Ahorro, Inversión & Fondo de Emergencia:</span>
                <span className="font-bold text-emerald-200 font-extrabold">${inversionAhorroUsd.toFixed(2)} / Bs. {(inversionAhorroUsd * tasaBcv).toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Tu fondo de custodia en la Cuenta Verde Plaza o Cuenta en Moneda Extranjera BDV.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
