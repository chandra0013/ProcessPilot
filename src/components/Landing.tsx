import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  ShieldCheck, 
  BarChart3, 
  FileText, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from './UI';

export const Landing = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-apex-forest text-white px-6">
        {/* Animated Background Simulation */}
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-apex-mint/20 via-transparent to-transparent animate-pulse" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="z-10 text-center max-w-5xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20">
            <span className="w-2 h-2 rounded-full bg-apex-mint animate-ping" />
            <span className="text-xs font-mono tracking-widest uppercase">BPA 4.0 Accelerator</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-display tracking-tighter leading-none mb-8">
            PROCESS<span className="text-apex-mint">PILOT</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-apex-mint-light/80 max-w-2xl mx-auto mb-12 font-medium">
            Compress 10-day BPA diagnostics into 4 hours. 
            Production-grade agentic workflows that deliver Techolution's 2x efficiency guarantee.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button onClick={onGetStarted} className="bg-white text-apex-forest hover:bg-apex-mint px-12 text-lg lg:text-xl h-20">
              Launch Diagnostic
            </Button>
            <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium">
              View Methodology <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Abstract Floating Stats */}
        <div className="absolute bottom-12 left-12 hidden lg:block">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-4xl font-display">42X</p>
              <p className="text-xs text-white/50 uppercase tracking-widest">Efficiency Bench Recall</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-4xl font-display">4HR</p>
              <p className="text-xs text-white/50 uppercase tracking-widest">Speed to Insight</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-apex-bg px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-display mb-6">The Agentic Engine room of BPA 4.0</h2>
              <p className="text-xl text-apex-text-muted">
                ProcessPilot deploys four specialized agents in a hierarchical LangGraph workflow, 
                benchmarking every process node against Techolution's historical case study database.
              </p>
            </div>
            <div className="hidden lg:block">
               <div className="bg-apex-forest text-apex-mint rounded-full p-4">
                  <Activity size={32} />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Activity size={24} />, 
                title: "ProcessIntel", 
                desc: "Unstructured doc ingestion (SOPs, ERP dumps) mapped to process graphs." 
              },
              { 
                icon: <ShieldCheck size={24} />, 
                title: "InefficiencyHunter", 
                desc: "Anti-pattern classifier trained on 200+ known BPA bottlenecks." 
              },
              { 
                icon: <BarChart3 size={24} />, 
                title: "ROIForecaster", 
                desc: "Quantitative mapping for P10/P50/P90 ROI risk adjustment." 
              },
              { 
                icon: <FileText size={24} />, 
                title: "ReportSynthesis", 
                desc: "Executive-ready BPA Value Finder deliverables in minutes." 
              },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-4xl card-shadow border border-black/5"
              >
                <div className="w-12 h-12 rounded-2xl bg-apex-mint-light flex items-center justify-center text-apex-forest mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display mb-4">{feature.title}</h3>
                <p className="text-apex-text-muted leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
