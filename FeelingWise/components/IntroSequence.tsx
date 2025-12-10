
import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Zap, Play } from 'lucide-react';

interface IntroSequenceProps {
  onEnter: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onEnter }) => {
  const [frame, setFrame] = useState(0);
  const [transformState, setTransformState] = useState<'bad' | 'processing' | 'good'>('bad');

  useEffect(() => {
    // Frame timing logic
    let timer: ReturnType<typeof setTimeout>;

    const timings = [
      3000, // 0: Stats
      4000, // 1: Quote
      4000, // 2: Problem
      3000, // 3: What if
      4000, // 4: Transformation (Special handling)
      3000, // 5: Logo
      99999 // 6: CTA (Wait for user)
    ];

    if (frame < 6) {
      if (frame === 4) {
        // Special animation sequence for Frame 4
        setTransformState('bad');
        setTimeout(() => setTransformState('processing'), 1500);
        setTimeout(() => setTransformState('good'), 2500);
      }

      timer = setTimeout(() => {
        setFrame(prev => prev + 1);
      }, timings[frame]);
    }

    return () => clearTimeout(timer);
  }, [frame]);

  const skip = () => setFrame(6);

  return (
    <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center text-white cursor-pointer" onClick={frame < 6 ? skip : undefined}>
      
      {/* Skip Button */}
      {frame < 6 && (
        <button 
          onClick={(e) => { e.stopPropagation(); skip(); }}
          className="absolute top-8 right-8 text-zinc-600 text-xs hover:text-white transition-colors uppercase tracking-widest font-bold"
        >
          Skip Intro
        </button>
      )}

      {/* Frame Content */}
      <div className="max-w-4xl px-8 text-center w-full">
        
        {/* FRAME 0: Stat */}
        {frame === 0 && (
          <div className="animate-in fade-in zoom-in-95 duration-1000">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Every day, <span className="text-indigo-500">95%</span> of teens<br />use social media.
            </h1>
          </div>
        )}

        {/* FRAME 1: Quote */}
        {frame === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <blockquote className="text-3xl md:text-5xl font-serif italic text-zinc-200 leading-tight mb-8">
              "42% of teen girls say Instagram makes them feel worse about themselves."
            </blockquote>
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">— Internal Meta Research</p>
          </div>
        )}

        {/* FRAME 2: The Problem */}
        {frame === 2 && (
          <div className="animate-in fade-in duration-1000 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-red-500">Current solutions fail.</h2>
            <p className="text-xl text-zinc-400">Blocking creates "forbidden fruit".<br/>Warning labels are ignored.</p>
            <p className="text-2xl text-white font-bold">The problem persists.</p>
          </div>
        )}

        {/* FRAME 3: What If */}
        {frame === 3 && (
          <div className="animate-in fade-in zoom-in-50 duration-1000">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              What if we could...
            </h1>
          </div>
        )}

        {/* FRAME 4: Transformation */}
        {frame === 4 && (
          <div className="relative h-64 w-full max-w-2xl mx-auto flex items-center justify-center">
            
            {/* Bad State */}
            <div className={`absolute inset-0 transition-all duration-700 transform ${
              transformState === 'bad' ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'
            }`}>
               <div className="bg-[#1a1a1a] border border-red-500/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                  <div className="flex items-center gap-2 text-red-500 mb-4 uppercase tracking-widest font-bold text-xs">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Toxic Content
                  </div>
                  <p className="text-2xl font-medium text-red-100">
                    "You're DISGUSTING if you don't have a beach body by summer. NO EXCUSES."
                  </p>
               </div>
            </div>

            {/* Processing State */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              transformState === 'processing' ? 'opacity-100' : 'opacity-0'
            }`}>
               <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-indigo-500 animate-[shimmer_1s_infinite]"></div>
               </div>
               <div className="absolute text-indigo-400 font-mono text-sm font-bold bg-[#050505] px-4">NEUTRALIZING</div>
            </div>

            {/* Good State */}
            <div className={`absolute inset-0 transition-all duration-700 transform ${
              transformState === 'good' ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
            }`}>
               <div className="bg-[#1a1a1a] border border-emerald-500/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                  <div className="flex items-center gap-2 text-emerald-500 mb-4 uppercase tracking-widest font-bold text-xs">
                    <Shield size={14} fill="currentColor" /> Neutralized
                  </div>
                  <p className="text-2xl font-medium text-emerald-100">
                    "This account believes fitness goals are important. People have different timelines that work for them."
                  </p>
               </div>
            </div>

          </div>
        )}

        {/* FRAME 5: Logo Reveal */}
        {frame === 5 && (
          <div className="animate-in fade-in zoom-in-90 duration-1000">
             <div className="flex justify-center mb-6">
               <div className="relative">
                 <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-2xl blur-xl opacity-50 animate-pulse" />
                 <div className="relative w-24 h-24 bg-[#1a1a1a] rounded-2xl flex items-center justify-center text-white font-bold text-5xl ring-1 ring-white/20">
                   <span className="bg-gradient-to-br from-indigo-400 to-emerald-400 bg-clip-text text-transparent">F</span>
                 </div>
               </div>
             </div>
             <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-2">FeelingWise</h1>
             <p className="text-xl text-zinc-400 font-medium">Not a blocker. A neutralizer.</p>
          </div>
        )}

        {/* FRAME 6: CTA */}
        {frame === 6 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="flex justify-center mb-8">
               <div className="relative w-20 h-20 bg-[#1a1a1a] rounded-2xl flex items-center justify-center text-white font-bold text-4xl ring-1 ring-white/20">
                   <span className="bg-gradient-to-br from-indigo-400 to-emerald-400 bg-clip-text text-transparent">F</span>
               </div>
             </div>
             
             <h1 className="text-4xl md:text-5xl font-bold mb-12">Ready to see the future of safety?</h1>
             
             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); onEnter(); }}
                  className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-all active:scale-95 flex items-center gap-2"
                >
                  Enter Simulator <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute -inset-1 bg-white/20 rounded-full blur group-hover:blur-md transition-all"></div>
                </button>
                
                <button 
                   onClick={(e) => { e.stopPropagation(); onEnter(); }}
                   className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
                >
                   <Play size={20} fill="currentColor" /> Watch Demo Video
                </button>
             </div>

             <div className="mt-16 text-zinc-500 font-mono text-xs uppercase tracking-widest">
               Powered by Gemini 3 Pro • Built for DeepMind
             </div>
          </div>
        )}

      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 h-1 bg-indigo-600 transition-all duration-[3000ms] ease-linear" style={{ width: `${((frame + 1) / 7) * 100}%` }}></div>
    </div>
  );
};
