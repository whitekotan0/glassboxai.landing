import React from 'react';
import { DotPattern } from './Decorations';

export const LayerDiagram: React.FC = () => (
    <div className="relative h-40 w-full overflow-hidden rounded-lg border border-white/10 bg-black/40 p-4">
        <DotPattern className="opacity-20" width={8} height={8} cr={0.5} />
        
        {/* Transformer Block Visualization */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
             {[32, 31, 30].map((layer) => (
                 <div key={layer} className="relative flex w-48 items-center justify-between gap-2">
                     <div className="flex-1 h-8 rounded border border-white/10 bg-neutral-800/80 shadow-sm flex items-center justify-center text-[9px] font-mono text-neutral-400">
                        FFN
                     </div>
                     <div className="flex-1 h-8 rounded border border-white/10 bg-neutral-800/80 shadow-sm flex items-center justify-center text-[9px] font-mono text-neutral-400">
                        ATTN
                     </div>
                     {/* Residual Stream Arrow */}
                     <div className="absolute -left-6 top-1/2 h-[1px] w-4 bg-neutral-600"></div>
                     <div className="absolute left-[-26px] top-1/2 -translate-y-1/2 text-[8px] font-mono text-neutral-500">
                        L{layer}
                     </div>
                     
                     {/* Probe Indicator */}
                     {layer === 31 && (
                         <div className="absolute -right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-500 ring-4 ring-cyan-900/50 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                     )}
                 </div>
             ))}
             {/* Flow arrows */}
             <div className="absolute inset-y-0 w-[1px] bg-neutral-700 -z-10"></div>
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-cyan-400 bg-black/60 px-1 rounded border border-cyan-900/30">
            RESIDUAL STREAM
        </div>
    </div>
);

export const HealthScoreGauge: React.FC<{ score?: number, status?: string }> = ({ score = 94, status = "Stable" }) => {
    // Logic: Red if < 30, Orange if < 60, Cyan/White if good.
    const isCritical = score < 30;
    const isWarning = score >= 30 && score < 70;
    
    let color = "#22d3ee"; // Cyan
    if (isCritical) color = "#ef4444"; // Red
    if (isWarning) color = "#f59e0b"; // Amber

    const strokeDashoffset = 251.2 - (251.2 * score) / 100;

    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center py-6">
            <div className="relative h-32 w-32">
                 <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="40" stroke="#262626" strokeWidth="6" fill="none" />
                     <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke={color} 
                        strokeWidth="6" 
                        fill="none" 
                        strokeDasharray="251.2" 
                        strokeDashoffset={strokeDashoffset} 
                        strokeLinecap="round"
                        className="transition-all duration-700 ease-out"
                        style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
                     />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-3xl font-bold font-mono tracking-tighter transition-colors duration-300 text-white">
                        {score}
                     </span>
                     <span className="text-[10px] uppercase font-bold transition-colors duration-300 text-neutral-400">
                        {status}
                     </span>
                 </div>
            </div>
        </div>
    );
};

export const IntegrationLogos: React.FC = () => (
    <div className="grid grid-cols-2 gap-2 p-2">
        {['Python', 'Torch', 'React', 'Go'].map((lang) => (
            <div key={lang} className="flex h-16 items-center justify-center rounded border border-white/10 bg-neutral-900/80 text-xs font-mono font-bold uppercase text-neutral-400 shadow-sm transition-colors hover:bg-neutral-800 hover:text-white hover:border-white/20">
                {lang}
            </div>
        ))}
        <div className="col-span-2 flex h-16 items-center justify-center rounded border border-dashed border-neutral-700 bg-transparent text-xs font-mono text-neutral-600 hover:text-neutral-400 hover:border-neutral-500 transition-colors">
            + MORE
        </div>
    </div>
);

export const EntropyGraph: React.FC = () => (
    <div className="relative h-full w-full min-h-[120px] bg-black/50 p-4 rounded-md overflow-hidden flex flex-col border border-white/5">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="h-full w-full" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>
        
        {/* Line - High Start (Context), Low Middle (Reasoning), Chaos Spike End */}
        <div className="flex-1 relative w-full">
            <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
                 {/* Gradient definition */}
                 <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="50%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                 </defs>
                 <path 
                    d="M0,10 C20,80 50,90 100,90 C140,90 160,20 200,5" 
                    fill="none" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    style={{ filter: 'drop-shadow(0 0 2px rgba(139, 92, 246, 0.5))' }}
                 />
                 {/* Current position indicator - Spiking at the end */}
                 <circle cx="195" cy="6" r="3" fill="#ef4444" className="animate-pulse shadow-[0_0_8px_red]" />
            </svg>
        </div>

        <div className="flex justify-between items-end mt-2">
            <div className="font-mono text-[10px] text-neutral-600">
                L0
            </div>
             <div className="font-mono text-[10px] text-neutral-500 italic">
                H = -∑ p log(p)
            </div>
            <div className="font-mono text-[10px] text-neutral-600">
                L32
            </div>
        </div>
    </div>
);