import React, { useState, useEffect, useRef } from 'react';
import { 
    Layers, 
    Cpu, 
    Code2, 
    Terminal,
    Logo,
    Activity,
    Network,
    Eye,
    Zap,
    FileText
} from './components/Icons';
import { GridPattern, SpectralBackground } from './components/Decorations';
import { BentoCard } from './components/BentoCard';
import { LayerDiagram, HealthScoreGauge, IntegrationLogos, EntropyGraph } from './components/Diagrams';

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [healthScore, setHealthScore] = useState(98);
  const [healthStatus, setHealthStatus] = useState("Stable");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    // navigator.clipboard.writeText('pip install spectra-llm'); // Disabled for now
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Live Console Simulation - REAL Logit Lens Workflow
  useEffect(() => {
    const sequence = [
        { text: "> spectra load --model qwen-7b-chat --quantize int8", delay: 800, score: 98, status: "Ready" },
        { text: "[INFO] Model loaded. VRAM usage: 8.4GB", delay: 1800, score: 98, status: "Ready" },
        { text: "> spectra analyze 'Why is the sky blue?'", delay: 2800, score: 98, status: "Processing" },
        { text: "L0-L5: Token Embeddings processed.", delay: 3500, score: 98, status: "Stable" },
        { text: "L12: Top-1 Logit: 'Rayleigh' (Conf: 42%)", delay: 4500, score: 85, status: "Diverging" },
        { text: "L18: Top-1 Logit: 'Scattering' (Conf: 78%)", delay: 5500, score: 92, status: "Converging" },
        { text: "L24: Entropy drop (H=0.2). Concept locked.", delay: 6500, score: 99, status: "Confident" },
        { text: "[RESULT] Analysis complete. Report generated at ./report.html", delay: 7500, score: 99, status: "Done" },
    ];

    let currentIndex = 0;
    
    const interval = setInterval(() => {
        if (currentIndex < sequence.length) {
            const step = sequence[currentIndex];
            setLogs(prev => [...prev, step.text]);
            setHealthScore(step.score);
            setHealthStatus(step.status);
            currentIndex++;
        } else {
            // Reset loop
            setTimeout(() => {
                setLogs([]);
                currentIndex = 0;
                setHealthScore(98);
                setHealthStatus("Ready");
            }, 5000);
        }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-neutral-200 selection:bg-cyan-500 selection:text-white font-sans overflow-x-hidden">
      <div className="fixed inset-0 z-0 bg-black">
          <SpectralBackground />
          <GridPattern className="opacity-[0.2]" />
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Logo className="h-7 w-7" />
            <span className="font-mono text-lg font-bold tracking-tight text-white">SPECTRA</span>
          </div>
          
          <div className="flex items-center gap-6">
             <a 
               href="https://github.com" 
               target="_blank" 
               rel="noreferrer" 
               className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
             >
               <Code2 size={14} />
               <span>GITHUB</span>
             </a>
             <a 
               href="#" 
               className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
             >
               <Terminal size={14} />
               <span>DOCS</span>
             </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6">
        
        {/* Hero Section */}
        <section className="mb-20 flex flex-col items-start gap-10 md:mb-32 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl relative">
            <div className="absolute -left-20 -top-20 h-64 w-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="mb-8 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-950/10 backdrop-blur-md px-4 py-1.5 text-xs font-mono font-medium text-cyan-400">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_cyan]"></span>
              v1.0 Open Source
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.05]">
              X-Ray Vision for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">AI Models.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-neutral-400 leading-relaxed font-light">
              Spectra makes the "black box" transparent. Visualize predictions at every layer, 
              debug hallucinations, and understand model cognition in real-time.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
                 <button className="flex items-center gap-2 rounded bg-white px-6 py-3 text-sm font-bold text-black hover:bg-neutral-200 transition-colors">
                    <FileText size={16} />
                    View Result: "2+2=5"
                 </button>
                 <button className="flex items-center gap-2 rounded border border-white/20 bg-transparent px-6 py-3 text-sm font-bold text-white hover:bg-white/5 transition-colors">
                    <FileText size={16} />
                    View Result: "Loop"
                 </button>
            </div>
          </div>
          
          <div className="flex w-full max-w-md flex-col gap-4">
             <div className="group relative overflow-hidden rounded border border-white/10 bg-black/50 backdrop-blur shadow-xl transition-all hover:border-white/20">
                <div className="flex items-center justify-between bg-white/5 px-4 py-3 font-mono text-sm text-neutral-300">
                    <div className="flex items-center gap-2">
                        <span className="text-neutral-500">$</span>
                        <span className="text-neutral-500">pip install spectra ...</span>
                    </div>
                    <button 
                        disabled
                        className="ml-4 rounded-sm border border-white/5 bg-white/5 px-2 py-1 text-[10px] uppercase text-neutral-500 cursor-not-allowed"
                    >
                        Soon
                    </button>
                </div>
                {/* Status Bar */}
                <div className="h-0.5 w-full bg-neutral-800">
                     {/* No progress bar, just static background */}
                </div>
                
                <div className="p-4 text-center">
                    <p className="text-sm text-cyan-400 font-mono">Coming soon to PyPI</p>
                    <p className="text-xs text-neutral-500 mt-1">Join the community for early access.</p>
                </div>
             </div>
             <p className="text-xs text-neutral-500 text-right font-mono">
                Supports Llama 3, Qwen, & Mistral
             </p>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:grid-rows-3 auto-rows-[minmax(280px,auto)]">
            
            {/* Card 1: Main Feature - Logit Lens */}
            <BentoCard 
                title="Logit Lens Engine" 
                description="Intercept hidden states. Watch the model 'think' before it speaks."
                className="md:col-span-2 md:row-span-2"
            >
                <div className="relative h-full min-h-[200px] w-full rounded-lg bg-black/40 border border-white/5 p-6 flex flex-col gap-4 shadow-inner">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_green]"></div>
                            <span className="text-xs font-mono text-green-400">ACTIVE SESSION</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-neutral-500">Qwen-7B-Chat (Int8)</span>
                    </div>
                    
                    {/* Live Code/Log Output */}
                    <div ref={scrollRef} className="flex-1 space-y-2 font-mono text-[10px] md:text-xs overflow-y-auto max-h-[160px] scroll-smooth custom-scrollbar">
                         {logs.length === 0 && <span className="text-neutral-600 animate-pulse">Initializing Logit Lens...</span>}
                         {logs.map((log, i) => (
                             <div key={i} className={`flex items-start gap-2 animate-in fade-in slide-in-from-bottom-1 duration-300`}>
                                <span className={
                                    log.includes("Conf: 42") ? "text-amber-500" :
                                    log.includes("Conf: 78") ? "text-cyan-400" :
                                    log.includes("Locked") ? "text-green-400 font-bold" :
                                    log.startsWith(">") ? "text-neutral-300" :
                                    "text-neutral-500"
                                }>
                                    {log}
                                </span>
                             </div>
                         ))}
                    </div>
                    <LayerDiagram />
                </div>
            </BentoCard>

            {/* Card 2: Entropy */}
            <BentoCard 
                title="Entropy Analysis" 
                description="Measure model uncertainty ($H$) to detect hallucinations or confusion."
                className="md:col-span-1 lg:col-span-1"
            >
               <EntropyGraph />
            </BentoCard>

            {/* Card 3: Model Support (Replacing Fake Enterprise Card) */}
            <BentoCard 
                title="Model Agnostic" 
                description="Works with any HuggingFace model. Optimized for Qwen, Llama 3, and Mistral."
                className="md:col-span-1 lg:col-span-1 border-neutral-800"
            >
                <div className="flex h-full flex-col justify-center gap-3">
                    <div className="flex items-center gap-3 rounded border border-white/5 bg-white/5 p-2 transition-colors hover:bg-white/10">
                        <Cpu size={16} className="text-cyan-500" />
                        <span className="font-mono text-xs text-neutral-300">Qwen 2.5 (7B/72B)</span>
                    </div>
                    <div className="flex items-center gap-3 rounded border border-white/5 bg-white/5 p-2 transition-colors hover:bg-white/10">
                        <Cpu size={16} className="text-indigo-500" />
                        <span className="font-mono text-xs text-neutral-300">Llama 3 (8B/70B)</span>
                    </div>
                    <div className="flex items-center gap-3 rounded border border-white/5 bg-white/5 p-2 transition-colors hover:bg-white/10">
                        <Cpu size={16} className="text-purple-500" />
                        <span className="font-mono text-xs text-neutral-300">Mistral / Mixtral</span>
                    </div>
                </div>
            </BentoCard>

            {/* Card 4: Languages */}
            <BentoCard 
                title="Dev Ecosystem" 
                description="Python core. CLI included. HTML Reports."
                className="md:col-span-1 lg:col-span-1"
            >
                <IntegrationLogos />
            </BentoCard>

            {/* Card 5: Health Score */}
            <BentoCard 
                title="Confidence Score" 
                description="Aggregated stability metric based on token probability distribution."
                className="md:col-span-1 md:col-start-3 lg:col-span-1 lg:row-start-2"
            >
                 <HealthScoreGauge score={healthScore} status={healthStatus} />
            </BentoCard>

            {/* Card 6: Open Source */}
            <BentoCard 
                title="100% Open Source" 
                description="MIT Licensed. Built for researchers, by researchers. No hidden enterprise features."
                className="md:col-span-2 lg:col-span-2"
            >
                <div className="flex h-full w-full flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 flex items-center justify-center rounded bg-white/5 border border-white/10 shadow-sm">
                            <Code2 className="text-neutral-400" />
                        </div>
                        <div className="h-12 w-12 flex items-center justify-center rounded bg-white/5 border border-white/10 shadow-sm">
                            <Network className="text-neutral-400" />
                        </div>
                        <div className="h-12 w-12 flex items-center justify-center rounded bg-white/5 border border-white/10 shadow-sm">
                            <Eye className="text-neutral-400" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 rounded border border-white/10 bg-black/40 p-4">
                             <h4 className="font-mono text-xs font-bold text-cyan-400 mb-1">MIT LICENSE</h4>
                             <p className="text-xs text-neutral-500">Free for commercial and research use.</p>
                        </div>
                         <div className="flex-1 rounded border border-white/10 bg-black/40 p-4">
                             <h4 className="font-mono text-xs font-bold text-cyan-400 mb-1">PRIVACY FIRST</h4>
                             <p className="text-xs text-neutral-500">Runs locally. No data leaves your GPU.</p>
                        </div>
                    </div>
                </div>
            </BentoCard>
            
             {/* Card 7: Report Generation (Replacing Vaporware Desktop App) */}
             <BentoCard
                title="Instant Reports"
                description="Generate interactive HTML reports to share your findings with your team."
                className="md:col-span-1 lg:col-span-1"
             >
                <div className="relative h-full w-full flex items-center justify-center">
                    <div className="absolute inset-x-4 top-4 h-32 rounded border border-white/10 bg-neutral-900 shadow-lg p-2 flex flex-col gap-2 opacity-80">
                        <div className="h-2 w-1/3 bg-neutral-700 rounded"></div>
                        <div className="h-20 w-full bg-black/50 rounded border border-white/5 grid grid-cols-6 gap-1 p-1">
                             {[...Array(18)].map((_, i) => (
                                <div key={i} className="bg-cyan-500/20 rounded-sm"></div>
                             ))}
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                         <div className="rounded bg-cyan-900/40 border border-cyan-500/30 px-2 py-1 text-[10px] font-mono text-cyan-300">
                            report.html generated
                         </div>
                    </div>
                </div>
             </BentoCard>

        </div>

        {/* Footer */}
        <footer className="mt-32 border-t border-white/10 pt-12 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Logo className="h-5 w-5 border-white/10" />
                        <span className="font-bold text-white tracking-wide">SPECTRA</span>
                    </div>
                    <p className="text-sm text-neutral-500 max-w-xs">
                        Visualizing the hidden spectrum of LLM cognition.
                    </p>
                </div>
                <div className="flex gap-8 text-sm text-neutral-500">
                    <a href="#" className="hover:text-white transition-colors">GitHub</a>
                    <a href="#" className="hover:text-white transition-colors">Documentation</a>
                    <a href="#" className="hover:text-white transition-colors">PyPI</a>
                    <a href="#" className="hover:text-white transition-colors">License</a>
                </div>
            </div>
            <div className="mt-12 text-center md:text-left text-xs text-neutral-600">
                © {new Date().getFullYear()} Spectra AI. Open Source under MIT License.
            </div>
        </footer>

      </main>
      
      {/* Animation Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #262626;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #050505;
        }
      `}</style>
    </div>
  );
};

export default App;