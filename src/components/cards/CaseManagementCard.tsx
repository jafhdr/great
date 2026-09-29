import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Crosshair, UserCheck, FolderSearch, FileEdit, FileLock2, Clock4, CheckCircle } from 'lucide-react';
import { DigitalLed } from '../DigitalLed';
import { playHoverSound, playClickSound } from '../../utils/audio';
import { ModalData } from '../DetailModal';

interface CaseManagementCardProps {
  onSelectDetail?: (data: ModalData) => void;
  onNext?: () => void;
}

export const CaseManagementCard: React.FC<CaseManagementCardProps> = ({
  onSelectDetail,
  onNext,
}) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const handleModuleHover = (name: string) => {
    setHoveredModule(name);
    playHoverSound(450);
  };

  const handleModuleLeave = () => {
    setHoveredModule(null);
  };

  const handleInspect = (type: 'owners' | 'intel' | 'notes' | 'evidence' | 'timeline') => {
    playClickSound(670);
    if (!onSelectDetail) return;

    if (type === 'owners') {
      onSelectDetail({
        title: 'Case Investigators & Chain of Custody',
        category: 'Forensic Assignment',
        badge: 'Cleared TS/SCI',
        summary: 'Designated lead investigators handling privileged security incident data, evidence preservation, and stakeholder communication.',
        details: [
          { label: 'Lead Detective', value: 'Det. A. Smith (Badge #4012)', status: 'active' },
          { label: 'Forensic Sergeant', value: 'Sgt. K. Lee (CIR-Team)', status: 'active' },
          { label: 'Threat Analyst', value: 'Anal. C. Davis (Tier 3)', status: 'active' },
          { label: 'Escalation Level', value: 'Tier 3 Incident Response', status: 'warning' },
        ],
        payloadSnippet: `ASSIGNMENT_HASH: 0x4f88e1a\nLEAD_ANALYST: A. Smith\nJURISDICTION: Federal Cyber Taskforce\nHANDOFF_TIMESTAMP: 2026-09-28T14:32:00Z`,
      });
    } else if (type === 'intel') {
      onSelectDetail({
        title: 'Linked Threat Intelligence Dossiers',
        category: 'Correlated Intelligence',
        badge: 'TLP:RED RESTRICTED',
        summary: 'Direct correlation of active case artifacts to global adversary campaigns and classified national cyber advisories.',
        details: [
          { label: 'Advisory File', value: 'Intel Rpt #452 (Zero-Day Exploitation)', status: 'warning' },
          { label: 'Attributed Group', value: 'Threat Actor #X (APT-41 Derivative)', status: 'warning' },
          { label: 'Sharing Protocol', value: 'TLP:RED (Strict Need-to-Know)', status: 'warning' },
          { label: 'Correlated Cases', value: '3 Global Incidents Matched', status: 'active' },
        ],
        payloadSnippet: `CORRELATION_MATRIX:\n  MATCH_1: RPT-452 (Confidence 97%)\n  MATCH_2: IOC-CLUSTER-09\n  HASH_OVERLAP: 14 SHA256 Match`,
      });
    } else if (type === 'notes') {
      onSelectDetail({
        title: 'Forensic Case Chronology & Notes',
        category: 'Investigation Log',
        badge: 'Tamper-Evident',
        summary: 'Immutable chronological ledger tracking detective field observations, witness interviews, and vendor escalation notes.',
        details: [
          { label: 'Entry 1 [05-15]', value: 'Reviewing initial perimeter firewall logs', status: 'active' },
          { label: 'Entry 2 [05-16]', value: 'Subpoena served to Tier-1 ISP for NetFlow', status: 'active' },
          { label: 'Entry 3 [05-17]', value: 'Volatile RAM dump acquired from host 10.4', status: 'active' },
          { label: 'Integrity Check', value: 'Signed with HSM Private Key', status: 'active' },
        ],
        payloadSnippet: `[2026-09-28 09:12] Anal. Davis: Ingress anomaly detected on Port 443.\n[2026-09-28 10:45] Det. Smith: Memory dump captured via LiME.\n[2026-09-28 11:30] ISP confirms anomalous egress stream to 192.188.1.42.`,
      });
    } else if (type === 'evidence') {
      onSelectDetail({
        title: 'Cryptographic Evidence Locker',
        category: 'Digital Forensics',
        badge: 'Chain-of-Custody Verified',
        summary: 'Forensically verified digital evidence packages with recorded cryptographic SHA-256 hashes and tamper-proof storage.',
        details: [
          { label: 'Packet Capture', value: 'Network Logs.txt (14.2 GB)', status: 'active' },
          { label: 'System Configuration', value: 'Firewall Config.pdf (Verified)', status: 'active' },
          { label: 'Raw Storage Image', value: 'Disk image.iso (E01 EnCase Raw)', status: 'active' },
          { label: 'SHA-256 Hash', value: 'e3b0c44298fc1c149afbf4c8996fb924', status: 'active' },
        ],
        payloadSnippet: `EVIDENCE_ID: EV-8891-B\nARTIFACT: Disk image.iso\nSTORAGE_CLASS: WORM (Write Once Read Many)\nHASH_MD5: 5d41402abc4b2a76b9719d911017c592\nHASH_SHA256: dffd6021bb2bd5b0af676290809ec3a5`,
      });
    } else {
      onSelectDetail({
        title: 'Incident Lifecycle & Triage Progress',
        category: 'Investigation Status',
        badge: 'Under Active Review',
        summary: 'Progress milestone tracking the investigation lifecycle from initial triage to remediation and post-incident briefing.',
        details: [
          { label: 'Current Phase', value: 'Phase 4: Under Review & Attribution', status: 'warning' },
          { label: 'Milestone 1', value: 'Case Created (Complete)', status: 'active' },
          { label: 'Milestone 2', value: 'Investigation Started (Complete)', status: 'active' },
          { label: 'Milestone 3', value: 'Evidence Logged (Complete)', status: 'active' },
        ],
        payloadSnippet: `LIFECYCLE_STAGE: UNDER_REVIEW\nTIME_TO_DETECT: 4 min 12 sec\nTIME_TO_CONTAIN: 28 min 45 sec\nSLA_STATUS: MET (Green)`,
      });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      
      {/* Top bar: LED Matrix number "03" */}
      <div className="flex items-center justify-between">
        <DigitalLed number="03" />
        <div className="text-[11px] font-mono text-purple-400/50 flex items-center gap-2">
          <span>CASE_VAULT::SECURE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
        </div>
      </div>

      {/* Main Grid: Left side Title & Radar, Right side Stacked modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 items-center">
        
        {/* Left Column (5 cols): Title, Subtitle, and Radar Globe */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-wide">
              Case management
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Give investigations ownership, related intelligence, notes, and evidence.
            </p>
          </div>

          {/* Central Case Investigation Scanner */}
          <div className="relative flex items-center justify-center py-2 sm:py-4">
            
            {/* Crosshair indicator floating on left */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => handleInspect('timeline')}
              className="absolute -left-6 top-1/2 -translate-y-1/2 cursor-pointer z-20"
              title="Forensic Reticle"
            >
              <div className="w-11 h-11 rounded-full bg-purple-950/80 border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center">
                <Crosshair className="w-6 h-6 text-purple-200" />
              </div>
            </motion.div>

            {/* Glowing Globe Chassis */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleInspect('intel')}
              onMouseEnter={() => playHoverSound(470)}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#120f26] border-2 border-purple-400/60 shadow-[0_0_40px_rgba(147,51,234,0.4)] flex items-center justify-center cursor-pointer group/globe"
              title="Click to view correlated intelligence"
            >
              <div className="absolute -inset-3 rounded-full border border-purple-500/20 group-hover/globe:border-purple-400/50 transition-colors animate-[spin_25s_linear_infinite]" />
              
              {/* Rotating radar sweep */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="w-full h-full origin-center animate-radar"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(192, 132, 252, 0.45) 0deg, rgba(168, 85, 247, 0.1) 45deg, transparent 75deg)',
                  }}
                />
              </div>

              {/* Center globe mesh */}
              <div className="relative z-10 w-28 h-28 sm:w-34 sm:h-34 rounded-full bg-[#191438] border border-purple-400/40 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#a855f7" strokeWidth="0.8" />
                  <ellipse cx="50" cy="50" rx="44" ry="22" fill="none" stroke="#a855f7" strokeWidth="0.8" />
                  <ellipse cx="50" cy="50" rx="22" ry="44" fill="none" stroke="#a855f7" strokeWidth="0.8" />
                  <line x1="50" y1="6" x2="50" y2="94" stroke="#a855f7" strokeWidth="0.8" />
                </svg>

                {/* Hotspot pings */}
                <div className="absolute top-[40%] left-[38%]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,1)]" />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Center Connecting Circuit Bus lines (hidden on mobile, shown on lg) */}
        <div className="hidden lg:block lg:col-span-2 relative h-full">
          <svg className="w-full h-[400px]" preserveAspectRatio="none" viewBox="0 0 120 400">
            {/* Trace 1: To Owners */}
            <path
              d="M 10 200 C 40 200, 60 50, 110 50"
              fill="none"
              stroke={hoveredModule === 'owners' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'owners' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'owners' ? '1' : '0.6'}
              className={hoveredModule === 'owners' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 2: To Related intel */}
            <path
              d="M 10 200 C 45 200, 65 125, 110 125"
              fill="none"
              stroke={hoveredModule === 'intel' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'intel' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'intel' ? '1' : '0.6'}
              className={hoveredModule === 'intel' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 3: To Notes */}
            <path
              d="M 10 200 L 110 200"
              fill="none"
              stroke={hoveredModule === 'notes' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'notes' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'notes' ? '1' : '0.6'}
              className={hoveredModule === 'notes' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 4: To Evidence */}
            <path
              d="M 10 200 C 45 200, 65 275, 110 275"
              fill="none"
              stroke={hoveredModule === 'evidence' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'evidence' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'evidence' ? '1' : '0.6'}
              className={hoveredModule === 'evidence' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 5: To Timeline/Status */}
            <path
              d="M 10 200 C 40 200, 60 350, 110 350"
              fill="none"
              stroke={hoveredModule === 'timeline' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'timeline' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'timeline' ? '1' : '0.6'}
              className={hoveredModule === 'timeline' ? 'animate-dash-flow' : ''}
            />
          </svg>
        </div>

        {/* Right Column (5 cols): 5 Stacked Forensic Modules (exact match to Image 3) */}
        <div className="lg:col-span-5 space-y-2.5">
          
          {/* 1. Owners Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('owners')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('owners')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'owners'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Owners</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex items-center justify-between">
              {/* ID Badge graphic */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-9 border border-purple-400/60 rounded bg-purple-950/50 p-1 flex flex-col items-center justify-between">
                  <div className="w-3 h-3 rounded-full bg-purple-400/70" />
                  <div className="w-full h-1 bg-purple-500/40 rounded-xs" />
                </div>
                <div className="w-7 h-9 border border-purple-400/60 rounded bg-purple-950/50 p-1 flex flex-col items-center justify-between">
                  <div className="w-3 h-3 rounded-full bg-purple-400/70" />
                  <div className="w-full h-1 bg-purple-500/40 rounded-xs" />
                </div>
              </div>
              <div className="text-right text-[11px] font-mono text-slate-300 space-y-0.5">
                <div>Det. A. Smith</div>
                <div>Sgt. K. Lee</div>
                <div>Anal. C. Davis</div>
              </div>
            </div>
          </motion.div>

          {/* 2. Related intel Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('intel')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('intel')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'intel'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Related intel</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderSearch className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <div className="w-6 h-6 border border-purple-400/50 rounded flex items-center justify-center bg-purple-950/60 text-purple-300 text-xs">
                  🔗
                </div>
              </div>
              <div className="text-right text-[11px] font-mono space-y-0.5">
                <div className="text-slate-200 font-medium">Intel Rpt #452</div>
                <div className="text-slate-300">Threat Actor #X</div>
                <div className="text-rose-400 font-semibold tracking-wide">TLP:RED indicators</div>
              </div>
            </div>
          </motion.div>

          {/* 3. Notes Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('notes')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('notes')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'notes'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Notes</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex items-start gap-2.5">
              <FileEdit className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-1 text-[10.5px] font-mono text-slate-300">
                <div>[2024-05-15] Reviewing initial logs.</div>
                <div>[2024-05-16] Contacted ISP for data.</div>
                <div>[2024-05-16] Contacted ISP for data.</div>
              </div>
            </div>
          </motion.div>

          {/* 4. Evidence Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('evidence')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('evidence')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'evidence'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Evidence</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileLock2 className="w-5 h-5 text-purple-400" />
                <div className="w-6 h-6 border border-purple-400/40 rounded flex items-center justify-center bg-purple-950/60 text-xs">
                  🔒
                </div>
              </div>
              <div className="text-right text-[11px] font-mono text-slate-300 space-y-0.5">
                <div>Network Logs.txt</div>
                <div>Firewall Config.pdf</div>
                <div>Disk image.iso</div>
              </div>
            </div>
          </motion.div>

          {/* 5. Timeline/Status Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('timeline')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('timeline')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'timeline'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Timeline/Status</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            
            {/* Timeline Stepper */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-1">
                <span>Case Created</span>
                <span>Investigation Started</span>
                <span>Evidence Logged</span>
                <span className="text-purple-300 font-semibold">Under Review</span>
              </div>
              
              {/* Stepper bar with active glowing segment */}
              <div className="relative w-full h-2 rounded-full bg-purple-950/80 border border-purple-800/40 overflow-hidden flex items-center">
                <div className="h-full w-3/4 bg-purple-700/60" />
                <div className="h-full w-1/4 bg-gradient-to-r from-purple-500 to-fuchsia-400 shadow-[0_0_8px_rgba(192,132,252,0.9)] animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom right: Navigation arrow */}
      <div className="flex items-center justify-end mt-2">
        <motion.button
          whileHover={{ x: 6, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playClickSound(720);
            if (onNext) onNext();
          }}
          className="group/arrow flex items-center gap-2 cursor-pointer focus:outline-none"
          title="Proceed to Card 04: Administration"
        >
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
