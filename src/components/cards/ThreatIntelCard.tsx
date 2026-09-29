import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Crosshair, BarChart3, Users, Globe2, FileText, Sparkles } from 'lucide-react';
import { DigitalLed } from '../DigitalLed';
import { playHoverSound, playClickSound } from '../../utils/audio';
import { ModalData } from '../DetailModal';

interface ThreatIntelCardProps {
  onSelectDetail?: (data: ModalData) => void;
  onNext?: () => void;
}

export const ThreatIntelCard: React.FC<ThreatIntelCardProps> = ({
  onSelectDetail,
  onNext,
}) => {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const handleCardHover = (key: string) => {
    setActiveElement(key);
    playHoverSound(420);
  };

  const handleCardLeave = () => {
    setActiveElement(null);
  };

  const handleInspect = (type: 'indicators' | 'actors' | 'campaigns' | 'reports') => {
    playClickSound(650);
    if (!onSelectDetail) return;

    if (type === 'indicators') {
      onSelectDetail({
        title: 'High-Fidelity IOC Indicators',
        category: 'Threat Intelligence',
        badge: '84,290 Actives',
        summary: 'Aggregated Indicators of Compromise (IOCs) correlated from 40+ global commercial and opensource telemetry feeds.',
        details: [
          { label: 'Observed Hashes', value: '42,120 SHA256', status: 'active' },
          { label: 'Malicious C2 IPs', value: '18,490 IPv4', status: 'warning' },
          { label: 'Phishing FQDNs', value: '23,680 Domains', status: 'neutral' },
          { label: 'Confidence Score', value: '98.4% Confidence', status: 'active' },
        ],
        payloadSnippet: `IOC_RECORD: 3a9f7... SHA256\nSTATUS: ACTIVE_C2_BEACON\nFIRST_SEEN: 2026-09-24T08:12:00Z\nATTRIBUTION: TA505 / CLOP\nCONFIDENCE: 99.2%`,
      });
    } else if (type === 'actors') {
      onSelectDetail({
        title: 'Nation-State & Fin-Threat Actor Matrix',
        category: 'Actor Profiling',
        badge: 'Tier-1 Threat',
        summary: 'Deep adversary mapping linking tactical TTPs to MITRE ATT&CK enterprise matrices, targeting sectors, and malware toolsets.',
        details: [
          { label: 'Active Group', value: 'APT29 / Cozy Bear', status: 'warning' },
          { label: 'Primary Vector', value: 'Cloud Token Hijack', status: 'active' },
          { label: 'Observed Targets', value: 'Gov & Defense NATO', status: 'warning' },
          { label: 'Threat Level', value: 'CRITICAL SEV-1', status: 'warning' },
        ],
        payloadSnippet: `ACTOR_ID: APT-29-NOBELIUM\nMOTIVATION: Espionage / Intelligence\nTOOLING: CobaltStrike, MagicWeb, EnvyScout\nTARGET_SECTORS: Energy, Foreign Affairs`,
      });
    } else if (type === 'campaigns') {
      onSelectDetail({
        title: 'Global Threat Geolocation & Campaigns',
        category: 'Campaign Tracking',
        badge: 'Global Coverage',
        summary: 'Real-time telemetry pings identifying active infrastructure clusters, command-and-control servers, and coordinated spear-phishing waves.',
        details: [
          { label: 'Hotspot Cluster 1', value: 'Eastern Europe (1,482 nodes)', status: 'warning' },
          { label: 'Hotspot Cluster 2', value: 'East Asia (940 nodes)', status: 'warning' },
          { label: 'Hotspot Cluster 3', value: 'Middle East (610 nodes)', status: 'active' },
          { label: 'Active Campaigns', value: '14 Simultaneous Operations', status: 'active' },
        ],
        payloadSnippet: `CAMPAIGN: OPERATION_SHADOW_DAGGER\nINFRASTRUCTURE: 212 Fast-Flux Nodes\nGEOLOCATIONS: [55.7558, 37.6173], [39.9042, 116.4074]\nSTATUS: ACTIVE_INTERCEPTION`,
      });
    } else {
      onSelectDetail({
        title: 'Classified Intelligence Briefings & Dossiers',
        category: 'Intelligence Reports',
        badge: 'TLP:AMBER',
        summary: 'Analyst-curated strategic threat advisories, reverse-engineered malware disassembly reports, and automated countermeasure rules.',
        details: [
          { label: 'Latest Briefing', value: 'IR-2026-0928: Kernel Zero-Day', status: 'warning' },
          { label: 'YARA Signatures', value: '18 Verified Detection Rules', status: 'active' },
          { label: 'Suricata Rules', value: '34 Network Signatures', status: 'active' },
          { label: 'Dissemination', value: 'Executive & SOC Tier 3', status: 'neutral' },
        ],
        payloadSnippet: `REPORT_ID: RPT-2026-0928-01\nTITLE: Rapid Exploitation of vSphere Hypervisors\nREMEDIATION: Patch KB-994182\nSEVERITY: 9.8 CVSSv3`,
      });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      
      {/* Top bar: LED Matrix number + Active status */}
      <div className="flex items-center justify-between">
        <DigitalLed number="01" active={true} />
        
        {/* Subtle HUD micro-code */}
        <div className="text-[11px] font-mono text-purple-400/50 flex items-center gap-2">
          <span className="hidden sm:inline">SYS_FEED::LIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60 animate-pulse" />
        </div>
      </div>

      {/* Main Hero row: Crosshair Icon + Circuit traces */}
      <div className="my-5 sm:my-7 flex items-start gap-4 sm:gap-6">
        {/* Glowing Target Crosshair with interactive reticle */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          onMouseEnter={() => playHoverSound(520)}
          onClick={() => handleInspect('indicators')}
          className="relative group/reticle cursor-pointer flex-shrink-0"
          title="Threat Radar Scanner"
        >
          {/* Outer glowing ambient halo */}
          <div className="absolute -inset-2 rounded-full bg-purple-600/30 blur-md group-hover/reticle:bg-purple-500/50 transition-all duration-300" />
          
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1b1535] border-2 border-purple-400/70 shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center transition-all duration-300 group-hover/reticle:border-purple-300 group-hover/reticle:shadow-[0_0_30px_rgba(192,132,252,0.8)]">
            {/* Concentric rotating reticle ring */}
            <div className="absolute inset-1.5 rounded-full border border-dashed border-purple-300/40 animate-[spin_12s_linear_infinite]" />
            <div className="absolute inset-3 rounded-full border border-purple-400/30" />
            <Crosshair className="w-7 h-7 sm:w-8 sm:h-8 text-purple-200 transition-transform duration-300 group-hover/reticle:rotate-45" />
          </div>
        </motion.div>

        {/* Integrated Circuit Graphic branching to nodes */}
        <div className="hidden md:flex flex-col justify-center pt-2">
          <svg className="w-48 h-10 overflow-visible" viewBox="0 0 200 40">
            <path
              d="M 0 20 L 40 20 L 60 8 L 120 8 L 140 20 L 190 20"
              fill="none"
              stroke={activeElement ? '#c084fc' : '#7e57c2'}
              strokeWidth="2"
              className={activeElement ? 'animate-dash-flow' : ''}
              strokeOpacity={activeElement ? '1' : '0.7'}
            />
            <circle cx="40" cy="20" r="3" fill="#c084fc" />
            <circle cx="60" cy="8" r="3" fill="#a855f7" />
            <circle cx="120" cy="8" r="4" fill="#d8b4fe" />
            <circle cx="140" cy="20" r="3" fill="#c084fc" />
            <circle cx="190" cy="20" r="4" fill="#a855f7" />
            {/* Mini bar pulses */}
            <rect x="145" y="4" width="2" height="10" fill="#a855f7" />
            <rect x="150" y="2" width="2" height="12" fill="#c084fc" />
            <rect x="155" y="6" width="2" height="8" fill="#d8b4fe" />
          </svg>
        </div>
      </div>

      {/* Typography: Title & Subtitle with connecting words */}
      <div className="space-y-2 mb-6 sm:mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-wide">
          Threat intelligence
        </h2>
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">
          Connect{' '}
          <span
            onMouseEnter={() => handleCardHover('indicators')}
            onMouseLeave={handleCardLeave}
            onClick={() => handleInspect('indicators')}
            className={`font-semibold cursor-pointer border-b transition-all duration-200 ${
              activeElement === 'indicators'
                ? 'text-purple-300 border-purple-400 shadow-[0_2px_8px_rgba(168,85,247,0.4)]'
                : 'text-purple-200/90 border-purple-500/40 hover:border-purple-300'
            }`}
          >
            indicators
          </span>
          ,{' '}
          <span
            onMouseEnter={() => handleCardHover('actors')}
            onMouseLeave={handleCardLeave}
            onClick={() => handleInspect('actors')}
            className={`font-semibold cursor-pointer border-b transition-all duration-200 ${
              activeElement === 'actors'
                ? 'text-purple-300 border-purple-400 shadow-[0_2px_8px_rgba(168,85,247,0.4)]'
                : 'text-purple-200/90 border-purple-500/40 hover:border-purple-300'
            }`}
          >
            actors
          </span>
          ,{' '}
          <span
            onMouseEnter={() => handleCardHover('campaigns')}
            onMouseLeave={handleCardLeave}
            onClick={() => handleInspect('campaigns')}
            className={`font-semibold cursor-pointer border-b transition-all duration-200 ${
              activeElement === 'campaigns'
                ? 'text-purple-300 border-purple-400 shadow-[0_2px_8px_rgba(168,85,247,0.4)]'
                : 'text-purple-200/90 border-purple-500/40 hover:border-purple-300'
            }`}
          >
            campaigns
          </span>
          ,{' '}
          <span
            onMouseEnter={() => handleCardHover('reports')}
            onMouseLeave={handleCardLeave}
            onClick={() => handleInspect('reports')}
            className={`font-semibold cursor-pointer border-b transition-all duration-200 ${
              activeElement === 'reports'
                ? 'text-purple-300 border-purple-400 shadow-[0_2px_8px_rgba(168,85,247,0.4)]'
                : 'text-purple-200/90 border-purple-500/40 hover:border-purple-300'
            }`}
          >
            reports
          </span>
          , and intelligence sources.
        </p>
      </div>

      {/* SVG Circuit traces leading down to the 4 sub-cards */}
      <div className="hidden sm:block w-full h-8 overflow-visible relative">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 30">
          {/* Stem 1: Indicators */}
          <path
            d="M 90 0 L 90 15 L 100 28"
            fill="none"
            stroke={activeElement === 'indicators' ? '#d8b4fe' : '#6b46c1'}
            strokeWidth={activeElement === 'indicators' ? '2.5' : '1.5'}
            className={activeElement === 'indicators' ? 'animate-dash-flow' : ''}
          />
          <circle cx="100" cy="28" r="3" fill="#c084fc" />

          {/* Stem 2: Actors */}
          <path
            d="M 230 0 L 230 15 L 245 28"
            fill="none"
            stroke={activeElement === 'actors' ? '#d8b4fe' : '#6b46c1'}
            strokeWidth={activeElement === 'actors' ? '2.5' : '1.5'}
            className={activeElement === 'actors' ? 'animate-dash-flow' : ''}
          />
          <circle cx="245" cy="28" r="3" fill="#c084fc" />

          {/* Stem 3: Campaigns */}
          <path
            d="M 380 0 L 380 15 L 400 28"
            fill="none"
            stroke={activeElement === 'campaigns' ? '#d8b4fe' : '#6b46c1'}
            strokeWidth={activeElement === 'campaigns' ? '2.5' : '1.5'}
            className={activeElement === 'campaigns' ? 'animate-dash-flow' : ''}
          />
          <circle cx="400" cy="28" r="3" fill="#c084fc" />

          {/* Stem 4: Reports */}
          <path
            d="M 540 0 L 540 15 L 560 28"
            fill="none"
            stroke={activeElement === 'reports' ? '#d8b4fe' : '#6b46c1'}
            strokeWidth={activeElement === 'reports' ? '2.5' : '1.5'}
            className={activeElement === 'reports' ? 'animate-dash-flow' : ''}
          />
          <circle cx="560" cy="28" r="3" fill="#c084fc" />
        </svg>
      </div>

      {/* 4 Interactive Feature Sub-Cards (matching the visual layout in Image 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1 pb-4">
        
        {/* 1. Indicators Sub-card: Bar Chart */}
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => handleCardHover('indicators')}
          onMouseLeave={handleCardLeave}
          onClick={() => handleInspect('indicators')}
          className={`relative p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/80 backdrop-blur-sm flex flex-col items-center justify-center min-h-[90px] sm:min-h-[105px] group ${
            activeElement === 'indicators'
              ? 'border-purple-400/90 shadow-[0_0_20px_rgba(168,85,247,0.45)] bg-[#1a1738]'
              : 'border-purple-500/20 hover:border-purple-400/50'
          }`}
        >
          {/* Mini Bar Chart Graphic */}
          <div className="flex items-end gap-1.5 h-10 px-2">
            {[45, 70, 95, 30, 85, 60, 40].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: `${h}%` }}
                animate={{
                  height: activeElement === 'indicators' ? [`${h}%`, `${(h + 30) % 100}%`, `${h}%`] : `${h}%`,
                }}
                transition={{ duration: 1.2, repeat: activeElement === 'indicators' ? Infinity : 0, delay: i * 0.1 }}
                className="w-1.5 sm:w-2 rounded-t-[1px] bg-gradient-to-t from-purple-700 to-purple-300 group-hover:from-purple-500 group-hover:to-white transition-all shadow-[0_0_4px_rgba(168,85,247,0.5)]"
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-purple-300 mt-2 font-medium tracking-wide">
            Indicators
          </span>
        </motion.div>

        {/* 2. Actors Sub-card: Avatar Grid with purple highlighted actor */}
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => handleCardHover('actors')}
          onMouseLeave={handleCardLeave}
          onClick={() => handleInspect('actors')}
          className={`relative p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/80 backdrop-blur-sm flex flex-col items-center justify-center min-h-[90px] sm:min-h-[105px] group ${
            activeElement === 'actors'
              ? 'border-purple-400/90 shadow-[0_0_20px_rgba(168,85,247,0.45)] bg-[#1a1738]'
              : 'border-purple-500/20 hover:border-purple-400/50'
          }`}
        >
          {/* 5x2 grid of actor silhouettes */}
          <div className="grid grid-cols-5 gap-1.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-[2px] flex items-center justify-center transition-all duration-300 ${
                  i === 7
                    ? 'bg-purple-500 shadow-[0_0_8px_rgba(192,132,252,1)] scale-110'
                    : 'bg-purple-950/60 border border-purple-800/40 group-hover:border-purple-600/50'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === 7 ? 'bg-white' : 'bg-purple-400/40'
                  }`}
                />
              </div>
            ))}
          </div>
          <span className="text-[11px] font-mono text-purple-300 mt-2 font-medium tracking-wide">
            Threat Actors
          </span>
        </motion.div>

        {/* 3. Campaigns Sub-card: World Map with pulsing red hotspots */}
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => handleCardHover('campaigns')}
          onMouseLeave={handleCardLeave}
          onClick={() => handleInspect('campaigns')}
          className={`relative p-2.5 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/80 backdrop-blur-sm flex flex-col items-center justify-center min-h-[90px] sm:min-h-[105px] group overflow-hidden ${
            activeElement === 'campaigns'
              ? 'border-purple-400/90 shadow-[0_0_20px_rgba(168,85,247,0.45)] bg-[#1a1738]'
              : 'border-purple-500/20 hover:border-purple-400/50'
          }`}
        >
          {/* Stylized vector map graphic with red pings */}
          <div className="relative w-full h-11 flex items-center justify-center">
            <svg viewBox="0 0 100 50" className="w-full h-full opacity-45 fill-purple-400">
              <path d="M15,12 Q20,10 25,18 Q22,25 15,22 Z M45,15 Q55,10 65,18 Q60,30 45,28 Z M70,14 Q85,12 88,22 Q80,28 72,25 Z M20,32 Q28,30 30,42 Q22,44 18,38 Z M75,34 Q82,32 86,40 Q80,44 74,40 Z" />
            </svg>
            {/* Red Pulsing Hotspots */}
            <div className="absolute top-3 left-[28%]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,1)]" />
              </span>
            </div>
            <div className="absolute top-2 left-[58%]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,1)]" />
              </span>
            </div>
            <div className="absolute bottom-2 left-[48%]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,1)]" />
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-purple-300 mt-1 font-medium tracking-wide">
            Campaigns
          </span>
        </motion.div>

        {/* 4. Reports Sub-card: Stacked Intelligence Brief Documents */}
        <motion.div
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => handleCardHover('reports')}
          onMouseLeave={handleCardLeave}
          onClick={() => handleInspect('reports')}
          className={`relative p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/80 backdrop-blur-sm flex flex-col items-center justify-center min-h-[90px] sm:min-h-[105px] group ${
            activeElement === 'reports'
              ? 'border-purple-400/90 shadow-[0_0_20px_rgba(168,85,247,0.45)] bg-[#1a1738]'
              : 'border-purple-500/20 hover:border-purple-400/50'
          }`}
        >
          {/* Stacked document lines */}
          <div className="w-8 h-9 border border-purple-400/60 rounded-[3px] bg-purple-950/40 p-1 flex flex-col justify-between group-hover:border-purple-300 transition-colors shadow-[0_0_8px_rgba(168,85,247,0.3)]">
            <div className="w-4 h-1 bg-purple-400 rounded-[1px]" />
            <div className="w-full h-0.5 bg-purple-300/60 rounded-[1px]" />
            <div className="w-5 h-0.5 bg-purple-300/60 rounded-[1px]" />
            <div className="w-full h-0.5 bg-purple-300/60 rounded-[1px]" />
            <div className="w-3 h-0.5 bg-purple-400/80 rounded-[1px]" />
          </div>
          <span className="text-[11px] font-mono text-purple-300 mt-2 font-medium tracking-wide">
            Brief Reports
          </span>
        </motion.div>
      </div>

      {/* Bottom right: Navigation arrow with particle tail */}
      <div className="flex items-center justify-end mt-2">
        <motion.button
          whileHover={{ x: 6, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playClickSound(720);
            if (onNext) onNext();
          }}
          className="group/arrow flex items-center gap-2 cursor-pointer focus:outline-none"
          title="Proceed to Card 02: Attack Surface"
        >
          {/* Particle stream tail */}
          <div className="hidden sm:flex items-center gap-1 opacity-70 group-hover/arrow:opacity-100 transition-opacity">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="w-1 h-1 rounded-full bg-purple-400/80" />
            <span className="w-0.5 h-0.5 rounded-full bg-purple-300/60" />
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-purple-400" />
          </div>

          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-purple-800 to-fuchsia-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)] group-hover/arrow:shadow-[0_0_30px_rgba(216,180,254,0.9)] border border-purple-300/50 transition-all">
            <ArrowRight className="w-5 h-5 text-white group-hover/arrow:translate-x-0.5 transition-transform" />
          </div>
        </motion.button>
      </div>
    </div>
  );
};
