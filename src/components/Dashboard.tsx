import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Cpu, 
  Workflow, 
  FileCheck, 
  BrainCircuit,
  Search,
  Zap,
  Clock,
  IndianRupee,
  ChevronRight,
  Loader2,
  AlertCircle,
  ArrowRight,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Card, Button, Badge } from './UI';
import { cn } from '@/src/lib/utils';
import { INDIAN_CASE_STUDIES } from '../types';
import { generateBPAReport } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

const MOCK_TRANS_DATA = [
  { name: 'Manual', value: 75, color: '#1B4332' },
  { name: 'Semi-Auto', value: 20, color: '#B7E4C7' },
  { name: 'Automated', value: 5, color: '#F8F9FA' },
];

const MOCK_ROI_DATA = [
  { month: 'M1', current: 120, projected: 120 },
  { month: 'M2', current: 120, projected: 100 },
  { month: 'M3', current: 120, projected: 60 },
  { month: 'M4', current: 120, projected: 30 },
  { month: 'M5', current: 120, projected: 15 },
  { month: 'M6', current: 120, projected: 5 },
];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'report'>('overview');
  const [processInput, setProcessInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);

  const startAnalysis = async () => {
    if (!processInput) return;
    setIsAnalyzing(true);
    setAnalysisStep(1);

    // Simulate agent pipeline
    const steps = [1, 2, 3, 4];
    for(const step of steps) {
        setAnalysisStep(step);
        await new Promise(r => setTimeout(r, 1500));
    }

    const res = await generateBPAReport(processInput);
    setReport(res);
    setIsAnalyzing(false);
    setActiveTab('report');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-apex-bg p-6 gap-6">
      {/* Sidebar - Agentic Pipeline Column (3/12 equivalent) */}
      <aside className="w-full lg:w-80 flex flex-col gap-6">
        <header className="flex items-center justify-between bg-white/90 backdrop-blur-md px-8 py-5 rounded-4xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-apex-forest text-apex-mint rounded-xl flex items-center justify-center font-display text-xl">
              <Zap size={20} fill="currentColor" />
            </div>
            <h2 className="text-xl font-display uppercase tracking-tighter">PILOT</h2>
          </div>
        </header>

        <Card className="flex-1 flex flex-col p-8">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-apex-text-muted mb-8">Navigation</h2>
          <nav className="space-y-3 mb-12">
            {[
              { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Diagnostics' },
              { id: 'analysis', icon: <Cpu size={18} />, label: 'Agent Forge' },
              { id: 'report', icon: <FileCheck size={18} />, label: 'ROI Ledger' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-[32px] font-semibold transition-all text-sm",
                  activeTab === item.id 
                    ? "bg-apex-forest text-white shadow-xl translate-x-2" 
                    : "text-apex-text-muted hover:bg-apex-mint-light/50"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <h2 className="text-[10px] font-bold uppercase tracking-widest text-apex-text-muted mb-4">Agentic Pipeline</h2>
          <div className="space-y-3">
            {[
              { name: 'ProcessIntelAgent', sub: 'Mapping Nodes', id: 1 },
              { name: 'InefficiencyHunter', sub: 'Pattern Scoping', id: 2 },
              { name: 'ROIForecaster', sub: 'Value Mapping', id: 3 },
              { name: 'ReportSynthesis', sub: 'GCP Cloud Run', id: 4 },
            ].map((agent) => (
              <div 
                key={agent.id}
                className={cn(
                  "p-4 rounded-[28px] flex items-center gap-4 transition-all border border-transparent",
                  analysisStep === agent.id ? "agent-active border-apex-mint shadow-sm" : "bg-apex-bg opacity-60"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full", analysisStep >= agent.id ? "pulse-dot" : "bg-gray-400")} />
                <div>
                  <p className="text-sm font-bold">{agent.name}</p>
                  <p className="text-[10px] opacity-70 uppercase tracking-tighter">{analysisStep === agent.id ? 'Working...' : agent.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-black/5">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-apex-mint border-2 border-apex-forest"></div>
                <div>
                  <p className="text-[10px] font-bold text-apex-text-muted uppercase tracking-widest leading-none mb-1">Consultant</p>
                  <p className="text-sm font-bold">Mandla Reddy</p>
                </div>
             </div>
          </div>
        </Card>
      </aside>

      {/* Main Bento Grid Area (9/12 equivalent) */}
      <div className="flex-1 grid grid-cols-12 gap-6 overflow-y-auto">
        {/* Top Header Bar */}
        <div className="col-span-12">
          <header className="flex justify-between items-center bg-white/90 backdrop-blur-md px-10 py-6 rounded-4xl border border-black/5 shadow-sm">
             <div>
                <h1 className="text-2xl font-display">
                  {activeTab === 'overview' ? 'Operational ROI Ledger' : activeTab === 'analysis' ? 'Agent Forge Diagnostic' : 'BPA Value Finder Report'}
                </h1>
                <p className="text-xs text-apex-text-muted uppercase tracking-widest font-bold">Techolution BPA 4.0 Framework</p>
             </div>
             <div className="flex gap-4">
                <button className="bg-apex-bg p-3 rounded-2xl hover:bg-apex-mint-light transition-colors text-apex-forest">
                  <Search size={20} />
                </button>
                <button className="bg-apex-forest text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:shadow-lg transition-all">
                  New Diagnostic
                </button>
             </div>
          </header>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <React.Fragment>
              {/* Main Visualization Card */}
              <div className="col-span-12 lg:col-span-8">
                <Card className="h-full min-h-[400px] flex flex-col" title="Live ROI Yield Stream" subtitle="Cumulative efficiency gains across active workflows">
                   <div className="flex-1 w-full pt-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_ROI_DATA}>
                        <defs>
                          <linearGradient id="colorROI" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1B4332" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#1B4332" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" hide />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        />
                        <Area type="monotone" dataKey="projected" stroke="#1B4332" strokeWidth={4} fillOpacity={1} fill="url(#colorROI)" />
                      </AreaChart>
                    </ResponsiveContainer>
                   </div>
                   <div className="flex gap-8 mt-6 pt-6 border-t border-black/5">
                      <div>
                        <p className="text-[10px] font-bold text-apex-text-muted uppercase mb-1">Peak Yield</p>
                        <p className="text-3xl font-display text-emerald-500">420%</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-apex-text-muted uppercase mb-1">Efficiency Delta</p>
                        <p className="text-3xl font-display text-apex-forest">₹14.5Cr</p>
                      </div>
                   </div>
                </Card>
              </div>

              {/* Smaller Cards Stack */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                 <Card className="flex-1 bg-apex-forest text-white group overflow-hidden relative">
                    <div className="relative z-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-8">Throughput Target</p>
                      <div className="text-7xl font-display leading-none mb-4">42<span className="text-3xl opacity-50">x</span></div>
                      <p className="text-sm opacity-80 leading-relaxed font-medium">Efficiency gain predicted via automated pattern recognition vs consultant baseline.</p>
                    </div>
                    <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity">
                       <Zap size={200} />
                    </div>
                 </Card>
                 <Card className="flex-1 border-2 border-apex-mint bg-white">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-apex-text-muted mb-8">Cycle Time Reduction</p>
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-3xl font-bold text-gray-300">120s</span>
                      <ArrowRight size={24} className="mb-2 text-apex-mint" />
                      <span className="text-7xl font-display leading-none">5<span className="text-3xl">s</span></span>
                    </div>
                    <p className="text-sm text-apex-text-muted font-medium">BPA 4.0 optimization for production-grade life science audits.</p>
                 </Card>
              </div>

              {/* Bottom Row Benchmarks */}
              <div className="col-span-12 lg:col-span-12">
                 <Card title="Direct Proof Points" subtitle="Verified outcomes across Techolution vertical clusters">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {INDIAN_CASE_STUDIES.map((study, i) => (
                        <div key={i} className="p-8 rounded-[40px] bg-apex-bg border border-black/5 hover:bg-apex-mint-light/20 transition-all cursor-pointer">
                           <p className="text-[10px] font-bold uppercase tracking-widest text-apex-text-muted mb-4">{study.client}</p>
                           <h4 className="text-xl font-display mb-4 leading-tight">{study.process}</h4>
                           <div className="flex items-center justify-between mt-auto">
                              <Badge variant={i === 0 ? 'critical' : 'info'}>{study.outcome}</Badge>
                              <ChevronRight className="text-apex-forest/30" />
                           </div>
                        </div>
                      ))}
                    </div>
                 </Card>
              </div>
            </React.Fragment>
          )}

          {activeTab === 'analysis' && (
            <div className="col-span-12 grid grid-cols-12 gap-6 pb-12">
              <div className="col-span-12 lg:col-span-7">
                <Card className="h-full p-10 flex flex-col justify-between">
                   <div>
                    <h2 className="text-3xl font-display mb-8">Agent Forge Diagnostic</h2>
                    <textarea 
                        value={processInput}
                        onChange={(e) => setProcessInput(e.target.value)}
                        placeholder="Describe the clinical trial documentation workflow or mortgage appraisal manual touchpoints..."
                        className="w-full h-64 bg-apex-bg rounded-[32px] p-8 border border-black/5 focus:outline-none focus:ring-2 ring-apex-forest/5 transition-all text-xl leading-relaxed font-medium"
                      />
                   </div>
                   <div className="flex flex-col gap-4 mt-8">
                     <div className="grid grid-cols-3 gap-4">
                        <button className="p-6 bg-apex-bg rounded-[28px] border border-black/5 flex flex-col items-center gap-2 hover:bg-apex-mint-light transition-all">
                           <FileCheck size={20} className="text-apex-text-muted" />
                           <span className="text-[9px] font-bold uppercase tracking-widest">Add SOPs</span>
                        </button>
                        <button className="p-6 bg-apex-bg rounded-[28px] border border-black/5 flex flex-col items-center gap-2 hover:bg-apex-mint-light transition-all">
                           <Workflow size={20} className="text-apex-text-muted" />
                           <span className="text-[9px] font-bold uppercase tracking-widest">ERP Export</span>
                        </button>
                        <button className="p-6 bg-apex-bg rounded-[28px] border border-black/5 flex flex-col items-center gap-2 hover:bg-apex-mint-light transition-all">
                           <Activity size={20} className="text-apex-text-muted" />
                           <span className="text-[9px] font-bold uppercase tracking-widest">Connect Data</span>
                        </button>
                     </div>
                     <Button 
                        onClick={startAnalysis} 
                        disabled={isAnalyzing || !processInput}
                        className="w-full h-20 text-xl font-display"
                      >
                        {isAnalyzing ? <div className="flex items-center gap-3"><Loader2 className="animate-spin" /> Ingesting Data...</div> : 'Initialize BPA Pilot'}
                      </Button>
                   </div>
                </Card>
              </div>

              <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                 <Card className="flex-1 overflow-hidden relative" title="Live Visual Process Map" subtitle="Real-time node extraction and ARS scoring">
                    <div className="absolute inset-0 flex items-center justify-center p-8 mt-12">
                       <svg className="w-full h-full max-h-[300px]" viewBox="0 0 400 200">
                          <motion.path 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            d="M50 100 Q 125 50 200 100 T 350 100" 
                            fill="none" 
                            stroke="#B7E4C7" 
                            strokeWidth="4" 
                            strokeDasharray="10"
                          />
                          <circle cx="50" cy="100" r="10" fill="#1B4332" />
                          <circle cx="125" cy="75" r="14" fill="#EF4444" className="animate-pulse" />
                          <circle cx="200" cy="100" r="10" fill="#1B4332" />
                          <circle cx="275" cy="125" r="14" fill="#EF4444" className="animate-pulse" />
                          <circle cx="350" cy="100" r="10" fill="#1B4332" />
                       </svg>
                    </div>
                    <div className="mt-auto space-y-3 relative z-10">
                       <div className="flex items-center justify-between p-4 bg-apex-bg rounded-[24px] border border-black/5">
                          <p className="text-xs font-bold text-red-500">Manual Verification Gate</p>
                          <Badge variant="critical">ARS: 0.92</Badge>
                       </div>
                       <div className="flex items-center justify-between p-4 bg-apex-bg rounded-[24px] border border-black/5">
                          <p className="text-xs font-bold text-red-500">Duplicate Data Entry</p>
                          <Badge variant="critical">ARS: 0.88</Badge>
                       </div>
                    </div>
                 </Card>
                 
                 <Card className="bg-apex-mint-light">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-apex-forest mb-4">Agent Bench Insights</p>
                    <p className="text-sm font-semibold text-apex-forest mb-2 italic">"Current process shows rule-based decisioning patterns that are 100% automatable under BPA 4.0 standards."</p>
                    <div className="flex items-center justify-between mt-4">
                       <p className="text-xs font-bold text-apex-forest/60 underline">View Baseline Comparison</p>
                       <p className="text-xs font-bold text-apex-forest">94% Confidence</p>
                    </div>
                 </Card>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="col-span-12 pb-12">
              <Card className="p-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-apex-mint-light/20 rounded-full -mr-48 -mt-48 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12 mb-20 pb-12 border-b border-black/5">
                    <div className="max-w-2xl">
                      <Badge>BPA Value Finder Deliverable</Badge>
                      <h2 className="text-6xl font-display mt-6 tracking-tight">Executive Efficiency Roadmap</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="p-6 bg-apex-bg rounded-[32px] text-center border border-black/5">
                          <p className="text-3xl font-display text-apex-forest">₹14.5 Cr</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-apex-text-muted">Direct Savings</p>
                        </div>
                        <div className="p-6 bg-apex-bg rounded-[32px] text-center border border-black/5">
                          <p className="text-3xl font-display text-apex-forest">30 Days</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-apex-text-muted">Target Deploy</p>
                        </div>
                    </div>
                </div>

                <div className="prose prose-xl max-w-none prose-headings:font-display prose-headings:text-apex-forest prose-p:text-apex-text-muted prose-li:text-apex-text-muted prose-strong:text-apex-forest leading-relaxed">
                   <ReactMarkdown>{report || ''}</ReactMarkdown>
                </div>

                <div className="mt-20 pt-10 border-t-4 border-apex-forest flex flex-col md:flex-row justify-between items-center gap-12 bg-apex-bg -mx-20 -mb-20 p-20">
                   <div className="max-w-md">
                      <p className="text-xl font-display mb-2 italic">"ROI or it's Free guarantee applies incrementally."</p>
                      <p className="text-sm font-bold uppercase tracking-widest text-apex-text-muted">BPA 4.0 Contractual Commitment</p>
                   </div>
                   <div className="flex gap-4">
                      <Button variant="outline" className="h-20 px-8 text-lg font-bold">Share Report</Button>
                      <Button className="h-20 px-12 text-lg font-bold shadow-2xl">Confirm Implementation</Button>
                   </div>
                </div>
              </Card>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
