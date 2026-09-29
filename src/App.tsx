import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Volume2,
  VolumeX,
  Layers,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Play,
  Pause,
  ExternalLink,
  Lock,
  Cpu,
  Zap,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CyberFrame } from './components/CyberFrame';
import { ThreatIntelCard } from './components/cards/ThreatIntelCard';
import { AttackSurfaceCard } from './components/cards/AttackSurfaceCard';
import { CaseManagementCard } from './components/cards/CaseManagementCard';
import { AdministrationCard } from './components/cards/AdministrationCard';
import { DetailModal, ModalData } from './components/DetailModal';
import { toggleSound, isSoundEnabled, playClickSound, playHoverSound } from './utils/audio';

type CardIndex = 0 | 1 | 2 | 3;
type ViewMode = 'spotlight' | 'grid';

const CARD_TITLES = [
  '01 Threat Intelligence',
  '02 Attack Surface',
  '03 Case Management',
  '04 Administration',
];

export default function App() {
  const [activeCard, setActiveCard] = useState<CardIndex>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('spotlight');
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [consoleOpen, setConsoleOpen] = useState<boolean>(false);
  const [liveEvents, setLiveEvents] = useState<string[]>([
    '[21:26:04] TA505 C2 Beacon detected on IP 192.188.1.42 -> BLOCKED',
    '[21:26:18] Subdomain discovery crawler indexed 3 new edge endpoints',
    '[21:26:35] Case #8891 assigned to Det. A. Smith (Chain of Custody verified)',
    '[21:26:52] RBAC Token rotated for User A. Chen (YubiKey 5C MFA Validated)',
  ]);

  // Audio toggle
  const handleToggleSound = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
    if (nextState) playClickSound(600);
  };

  // Keyboard navigation (1, 2, 3, 4, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') setActiveCard(0);
      else if (e.key === '2') setActiveCard(1);
      else if (e.key === '3') setActiveCard(2);
      else if (e.key === '4') setActiveCard(3);
      else if (e.key === 'ArrowRight') {
        setActiveCard((prev) => ((prev + 1) % 4) as CardIndex);
      } else if (e.key === 'ArrowLeft') {
        setActiveCard((prev) => ((prev - 1 + 4) % 4) as CardIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-play presentation timer
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => ((prev + 1) % 4) as CardIndex);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  // Live security event simulator stream
  useEffect(() => {
    const interval = setInterval(() => {
      const sampleEvents = [
        `[${new Date().toLocaleTimeString()}] SYN Flood mitigated on Port 80 (Cloudflare Magic Transit)`,
        `[${new Date().toLocaleTimeString()}] IOC Cluster 492 updated: 18 SHA256 hashes synchronized`,
        `[${new Date().toLocaleTimeString()}] Disk image.iso integrity check: SHA-256 match verified`,
        `[${new Date().toLocaleTimeString()}] Tenant Apex Solutions initiated compliance export (SOC2 Type II)`,
        `[${new Date().toLocaleTimeString()}] Automated DNSSEC signature validation completed for 124 zones`,
      ];
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      setLiveEvents((prev) => [randomEvent, ...prev.slice(0, 5)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setActiveCard((prev) => ((prev + 1) % 4) as CardIndex);
  };

  const handlePrev = () => {
    setActiveCard((prev) => ((prev - 1 + 4) % 4) as CardIndex);
  };

  return (
    <div className="relative min-h-screen bg-[#070712] text-slate-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Interactive Background Particle Mesh */}
      <ParticleCanvas />

      {/* Subtle Ambient Glow Orbs */}
      <div className="pointer-events-none fixed top-1/4 -left-48 w-96 h-96 rounded-full bg-purple-900/20 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-1/4 -right-48 w-96 h-96 rounded-full bg-fuchsia-900/15 blur-[160px]" />

      {/* ========================================================================= */}
      {/* 1. TOP BAR (Following Top Bar Contract strictly: 3 Zones)                 */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full border-b border-purple-900/30 bg-[#080715]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveCard(0);
              playClickSound(500);
            }}
            className="flex items-center gap-2 text-xl font-bold font-display tracking-wider text-white hover:text-purple-300 transition-colors cursor-pointer"
          >
            <Shield className="w-5 h-5 text-purple-400" />
            <span>SPECTRA CYBER</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => {
                setActiveCard(0);
                setViewMode('spotlight');
                playClickSound(450);
              }}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeCard === 0 && viewMode === 'spotlight' ? 'text-purple-300 underline underline-offset-8' : ''
              }`}
            >
              Threat Intel
            </button>
            <button
              onClick={() => {
                setActiveCard(1);
                setViewMode('spotlight');
                playClickSound(450);
              }}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeCard === 1 && viewMode === 'spotlight' ? 'text-purple-300 underline underline-offset-8' : ''
              }`}
            >
              Attack Surface
            </button>
            <button
              onClick={() => {
                setActiveCard(2);
                setViewMode('spotlight');
                playClickSound(450);
              }}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeCard === 2 && viewMode === 'spotlight' ? 'text-purple-300 underline underline-offset-8' : ''
              }`}
            >
              Case Management
            </button>
            <button
              onClick={() => {
                setActiveCard(3);
                setViewMode('spotlight');
                playClickSound(450);
              }}
              className={`hover:text-white transition-colors cursor-pointer ${
                activeCard === 3 && viewMode === 'spotlight' ? 'text-purple-300 underline underline-offset-8' : ''
              }`}
            >
              Administration
            </button>
            <button
              onClick={() => {
                setViewMode(viewMode === 'spotlight' ? 'grid' : 'spotlight');
                playClickSound(550);
              }}
              className={`hover:text-white transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'text-purple-300 underline underline-offset-8' : ''
              }`}
            >
              Matrix View
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Audio Feedback Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                soundOn
                  ? 'border-purple-400 bg-purple-950/60 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
              title={soundOn ? 'Mute Interface Audio' : 'Enable Sci-Fi Audio Synthesizer'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden lg:inline font-mono">{soundOn ? 'AUDIO ON' : 'AUDIO OFF'}</span>
            </button>

            {/* Launch Console primary button */}
            <button
              onClick={() => {
                playClickSound(700);
                setConsoleOpen(true);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-700 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-500 rounded-lg shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all cursor-pointer whitespace-nowrap"
            >
              Launch Console
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO HEADLINE & UNBOXED METADATA                                      */}
      {/* ========================================================================= */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        
        {/* Unboxed Metadata (strict adherence to Zero-Pill discipline) */}
        <div className="flex items-center gap-2 text-xs font-mono text-purple-300/80 mb-3 tracking-wider">
          <span>OPERATIONAL CYBER ARCHITECTURE</span>
          <span aria-hidden="true">·</span>
          <span>4 INTEGRATED MODULES</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400">SOC TIER-1 COMPLIANT</span>
        </div>

        {/* Hero Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white text-balance max-w-3xl leading-tight">
              Next-Generation Cyber Threat Operations
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              Explore the four tactical surfaces of our security suite. Every card module features real-time interactive telemetry and micro-animated inspection vectors.
            </p>
          </div>

          {/* View Mode & Presentation Toolbar */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            {/* View Mode Segmented Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-purple-950/40 border border-purple-800/40 backdrop-blur-md">
              <button
                onClick={() => {
                  setViewMode('spotlight');
                  playClickSound(500);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'spotlight'
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Card Deck</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('grid');
                  playClickSound(500);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'grid'
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All 4 Cards</span>
              </button>
            </div>

            {/* Auto-advance presentation toggle */}
            {viewMode === 'spotlight' && (
              <button
                onClick={() => {
                  setAutoPlay(!autoPlay);
                  playClickSound(480);
                }}
                className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                  autoPlay
                    ? 'border-purple-400 bg-purple-950/80 text-purple-200'
                    : 'border-purple-900/40 bg-purple-950/20 text-slate-400 hover:text-white'
                }`}
                title={autoPlay ? 'Pause Auto-Rotation' : 'Auto-Rotate Card Deck'}
              >
                {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Tab Selector Buttons for the 4 Cards (in Spotlight mode) */}
        {viewMode === 'spotlight' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
            {CARD_TITLES.map((title, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCard(idx as CardIndex);
                  playClickSound(500 + idx * 40);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-mono tracking-wider rounded-xl border transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeCard === idx
                    ? 'bg-purple-900/50 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-[#100e24]/70 border-purple-900/30 text-slate-400 hover:text-slate-200 hover:border-purple-600/40'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeCard === idx ? 'bg-emerald-400 animate-pulse' : 'bg-purple-500/50'}`} />
                <span>{title}</span>
              </button>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. PRIMARY CARD CANVAS / SHOWCASE                                         */}
        {/* ========================================================================= */}
        {viewMode === 'spotlight' ? (
          <div className="relative w-full my-2">
            
            {/* Spotlight Single Deck Card with 3D Tilt */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <CyberFrame interactiveTilt={true} onNavigateNext={handleNext}>
                  {activeCard === 0 && (
                    <ThreatIntelCard
                      onSelectDetail={setModalData}
                      onNext={handleNext}
                    />
                  )}
                  {activeCard === 1 && (
                    <AttackSurfaceCard
                      onSelectDetail={setModalData}
                      onNext={handleNext}
                    />
                  )}
                  {activeCard === 2 && (
                    <CaseManagementCard
                      onSelectDetail={setModalData}
                      onNext={handleNext}
                    />
                  )}
                  {activeCard === 3 && (
                    <AdministrationCard
                      onSelectDetail={setModalData}
                      onNext={() => setActiveCard(0)}
                    />
                  )}
                </CyberFrame>
              </motion.div>
            </AnimatePresence>

            {/* Quick Navigation Floating Chevrons */}
            <div className="flex items-center justify-between mt-4 px-2">
              <button
                onClick={() => {
                  handlePrev();
                  playClickSound(450);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-purple-900/40 bg-purple-950/20 text-xs font-mono text-slate-300 hover:text-white hover:border-purple-500/40 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous Surface</span>
              </button>

              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => {
                      setActiveCard(dot as CardIndex);
                      playClickSound(520);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeCard === dot
                        ? 'w-6 bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.9)]'
                        : 'w-2 bg-purple-950 border border-purple-800/60 hover:bg-purple-800'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  handleNext();
                  playClickSound(450);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-purple-900/40 bg-purple-950/20 text-xs font-mono text-slate-300 hover:text-white hover:border-purple-500/40 transition-all cursor-pointer"
              >
                <span className="hidden sm:inline">Next Surface</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* 2x2 Bento Matrix View: ALL 4 CARDS AT ONCE                                */
          /* ========================================================================= */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 my-4">
            <CyberFrame interactiveTilt={false}>
              <ThreatIntelCard
                onSelectDetail={setModalData}
                onNext={() => setActiveCard(1)}
              />
            </CyberFrame>

            <CyberFrame interactiveTilt={false}>
              <AttackSurfaceCard
                onSelectDetail={setModalData}
                onNext={() => setActiveCard(2)}
              />
            </CyberFrame>

            <CyberFrame interactiveTilt={false}>
              <CaseManagementCard
                onSelectDetail={setModalData}
                onNext={() => setActiveCard(3)}
              />
            </CyberFrame>

            <CyberFrame interactiveTilt={false}>
              <AdministrationCard
                onSelectDetail={setModalData}
                onNext={() => setActiveCard(0)}
              />
            </CyberFrame>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. REAL-TIME TELEMETRY FEED (Adjacency & Quantitative Rigor)              */}
        {/* ========================================================================= */}
        <div className="mt-12 p-5 rounded-2xl border border-purple-900/40 bg-[#0d0c1c]/90 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-purple-900/30">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-mono font-semibold text-purple-200">
                LIVE KERNEL SECURITY TELEMETRY
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                STREAMING
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 tabular-nums">
              <span>LATENCY: 12ms</span>
              <span>BUFFER: 4,096 B</span>
            </div>
          </div>

          <div className="mt-3 space-y-1.5 font-mono text-xs text-purple-300/80">
            {liveEvents.map((evt, idx) => (
              <div key={idx} className="flex items-start gap-2 hover:text-white transition-colors">
                <span className="text-purple-500 select-none">&gt;</span>
                <span>{evt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. QUANTITATIVE PROOF & ARCHITECTURAL SPECS                               */}
        {/* ========================================================================= */}
        <section className="mt-16 pt-8 border-t border-purple-950/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30">
              <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                &lt; 14ms
              </div>
              <div className="text-xs font-mono text-purple-300/80 mt-1">
                Global Query Latency
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Sub-millisecond IOC lookup across 32 distributed edge regions.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30">
              <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                12,000+
              </div>
              <div className="text-xs font-mono text-purple-300/80 mt-1">
                Attributed Threat Actors
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Nation-state APT profiles correlated with MITRE ATT&CK enterprise tactics.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30">
              <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                100%
              </div>
              <div className="text-xs font-mono text-purple-300/80 mt-1">
                Cryptographic Audit Chain
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Append-only WORM logs with SHA-256 block hashing and tamper seals.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30">
              <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                99.999%
              </div>
              <div className="text-xs font-mono text-purple-300/80 mt-1">
                Sovereign Core Uptime
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Multi-region fault tolerance with zero cross-tenant memory leakage.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CALL TO ACTION / ENTERPRISE TRIAL MODAL TRIGGER                       */}
        {/* ========================================================================= */}
        <section className="mt-16 text-center py-12 px-6 rounded-2xl bg-gradient-to-b from-purple-950/30 via-[#100d25] to-[#070712] border border-purple-500/20 shadow-[0_0_50px_rgba(147,51,234,0.15)]">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-wide">
            Deploy Spectra Threat Operations
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Integrate continuous attack surface discovery, autonomous threat intelligence, and immutable case custody into your security operations center.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                playClickSound(750);
                setConsoleOpen(true);
              }}
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all cursor-pointer whitespace-nowrap"
            >
              Initialize Production Pilot
            </button>
            <button
              onClick={() => {
                playClickSound(500);
                setViewMode('grid');
              }}
              className="px-6 py-3 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Explore Full Matrix View
            </button>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 7. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="border-t border-purple-950/40 bg-[#06060f] py-8 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-display font-semibold">SPECTRA CYBER</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Trust Threat Telemetry</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-purple-300 transition-colors">Privacy Shield</a>
            <a href="#compliance" className="hover:text-purple-300 transition-colors">SOC2 / ISO27001</a>
            <a href="#docs" className="hover:text-purple-300 transition-colors">API Architecture</a>
          </div>

          <div>
            © 2026 Spectra Security Labs Inc.
          </div>
        </div>
      </footer>

      {/* Interactive Detail Modal for clicked sub-cards */}
      <DetailModal
        data={modalData}
        onClose={() => setModalData(null)}
      />

      {/* Console Simulation Drawer */}
      <AnimatePresence>
        {consoleOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConsoleOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl bg-[#0c0a1c] border border-purple-500/40 rounded-2xl p-6 shadow-[0_0_60px_rgba(168,85,247,0.3)]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <h3 className="font-display font-bold text-lg text-white">
                    Spectra Defense Console // Sandbox
                  </h3>
                </div>
                <button
                  onClick={() => setConsoleOpen(false)}
                  className="text-slate-400 hover:text-white font-mono text-sm px-2 py-1 rounded bg-purple-950/40 border border-purple-800/40"
                >
                  ESC
                </button>
              </div>

              <div className="py-4 space-y-3 font-mono text-xs text-slate-300">
                <p className="text-purple-300">
                  Ready to test threat queries or ingest a new telemetry indicator into the active node cluster:
                </p>
                <div className="p-3 rounded-lg bg-black/60 border border-purple-900/50 space-y-1">
                  <div className="text-emerald-400">$ spectra-cli query --indicator "192.188.1.42"</div>
                  <div className="text-slate-400">&gt; Resolving BGP origin... AS13335 verified</div>
                  <div className="text-slate-400">&gt; Cross-matching MITRE ATT&CK: TA505 C2 Infrastructure</div>
                  <div className="text-rose-400">&gt; Automated remediation: Egress rule added to Cilium eBPF</div>
                </div>
                <p className="text-xs text-slate-400">
                  All 4 modules (Threat Intelligence, Attack Surface, Case Management, and Administration) are operational in live evaluation sandbox.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-900/40">
                <button
                  onClick={() => setConsoleOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer"
                >
                  Close Console
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
