import React from 'react';
import { Layers, Activity, ShieldAlert, Cpu, Terminal, Eye, Code2, Network, Zap, Aperture, Clock, Lock, FileText } from 'lucide-react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8 w-8" }) => (
  <div className={`relative flex items-center justify-center border border-white/20 bg-gradient-to-br from-neutral-800 to-black text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] ${className}`}>
    <Aperture size={18} strokeWidth={2} className="text-cyan-400" />
  </div>
);

export { Layers, Activity, ShieldAlert, Cpu, Terminal, Eye, Code2, Network, Zap, Clock, Lock, FileText };