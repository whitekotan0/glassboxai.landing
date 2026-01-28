import React from 'react';
import { NoiseTexture } from './Decorations';

interface BentoCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  light?: boolean;
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  title, 
  description, 
  children, 
  className = "",
  headerClassName = "",
  light = false
}) => {
  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-md shadow-lg transition-all hover:border-white/20 hover:shadow-cyan-900/20 ${className}`}>
       
       {/* Spectral Glow on Hover */}
       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

       {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-6 z-10">
         <div className="flex-1 w-full h-full">
             {children}
         </div>
         
         <div className={`mt-6 ${headerClassName}`}>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">{title}</h3>
            {description && <p className="mt-2 text-sm text-neutral-500 leading-relaxed font-medium group-hover:text-neutral-400 transition-colors">{description}</p>}
         </div>
      </div>
      
      <NoiseTexture />
    </div>
  );
};