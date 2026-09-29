import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Server, Network, ShieldCheck, Database, HardDrive, Cpu } from 'lucide-react';
import { DigitalLed } from '../DigitalLed';
import { playHoverSound, playClickSound } from '../../utils/audio';
import { ModalData } from '../DetailModal';

interface AttackSurfaceCardProps {
  onSelectDetail?: (data: ModalData) => void;
  onNext?: () => void;
}

export const AttackSurfaceCard: React.FC<AttackSurfaceCardProps> = ({
  onSelectDetail,
  onNext,
}) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const handleModuleHover = (name: string) => {
    setHoveredModule(name);
    playHoverSound(440);
  };

  const handleModuleLeave = () => {
    setHoveredModule(null);
  };

  const handleInspect = (type: 'domains' | 'dns' | 'addresses' | 'ports' | 'services') => {
    playClickSound(660);
    if (!onSelectDetail) return;

    if (type === 'domains') {
      onSelectDetail({
        title: 'Discovered Domain Portfolio',
        category: 'Attack Surface Management',
        badge: '124 Monitored',
        summary: 'Continuous subdomain discovery, certificate expiration monitoring, and dangling CNAME takeover prevention.',
        details: [
          { label: 'Apex Domain', value: 'example.com (Valid SSL)', status: 'active' },
          { label: 'Staging Subdomain', value: 'sub.test.co (Internal)', status: 'active' },
          { label: 'API Endpoint', value: 'api.test.co (Cloudflare)', status: 'active' },
          { label: 'Takeover Risk', value: '0 Vulnerable CNAMEs', status: 'active' },
        ],
        payloadSnippet: `DOMAIN: sub.test.co\nREGISTRAR: Cloudflare Inc.\nDNSSEC: ENABLED / VALID\nCERT_EXPIRY: 2027-02-14\nTLS_CIPHER: TLS_AES_256_GCM_SHA384`,
      });
    } else if (type === 'dns') {
      onSelectDetail({
        title: 'DNS Zone Hierarchy & Resolver Graph',
        category: 'DNS Infrastructure',
        badge: 'Zero-Drift',
        summary: 'Authoritative nameserver graph mapping A, AAAA, MX, TXT, and CAA records across global edge networks.',
        details: [
          { label: 'Root Nameservers', value: 'ns1.threatguard.net', status: 'active' },
          { label: 'A Records Mapped', value: '38 Active Hosts', status: 'active' },
          { label: 'SPF & DMARC', value: 'Strict Enforce (p=reject)', status: 'active' },
          { label: 'DNS Propagation', value: '100% Global Sync', status: 'active' },
        ],
        payloadSnippet: `ZONE_ID: ZONE_8820\nROOT_RECORD: @ IN SOA ns1.threatguard.net admin.example.com\nMX_RECORD: 10 mail.example.com\nTXT_DMARC: "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"`,
      });
    } else if (type === 'addresses') {
      onSelectDetail({
        title: 'IPv4 / IPv6 Public & Private Addresses',
        category: 'IP Topology',
        badge: 'BGP Mapped',
        summary: 'Autonomous System Number (ASN) tracking, CIDR block allocation, and rogue IP lease anomaly detection.',
        details: [
          { label: 'Internal Gateway', value: '192.168.1.1 (VLAN 10)', status: 'active' },
          { label: 'Public Edge IP', value: '192.188.1.42 (BGP AS13335)', status: 'active' },
          { label: 'Upstream Anycast', value: '8.8.8.8 / 1.1.1.1 (DNS)', status: 'active' },
          { label: 'Blacklist Status', value: 'Clean (0/108 RBLs)', status: 'active' },
        ],
        payloadSnippet: `IP_RANGE: 192.188.1.0/24\nASN: AS13335 (Cloudflare Fast Route)\nREVERSE_PTR: gw-edge.example.com\nLOCATION: Ashburn, VA (US-EAST)`,
      });
    } else if (type === 'ports') {
      onSelectDetail({
        title: 'Open Listening Ports & Protocols',
        category: 'Port Fingerprinting',
        badge: 'Continuous SYN Scan',
        summary: 'SYN/ACK port interrogation inspecting exposed listening sockets across perimeter routers and cloud VPCs.',
        details: [
          { label: 'Port 80 (HTTP)', value: 'Open (Redirect to 443)', status: 'active' },
          { label: 'Port 22 (SSH)', value: 'MFA Bastion Required', status: 'active' },
          { label: 'Port 23 (Telnet)', value: 'BLOCKED (Firewall Drop)', status: 'warning' },
          { label: 'Port 443 (HTTPS)', value: 'Open (HSTS Enforced)', status: 'active' },
        ],
        payloadSnippet: `PORT_MAP:\n  80/tcp  OPEN  http (nginx/1.24)\n  22/tcp  OPEN  ssh (OpenSSH 9.6p1)\n  23/tcp  FILTERED telnet\n  443/tcp OPEN  ssl/https`,
      });
    } else {
      onSelectDetail({
        title: 'Discovered Services & Daemons',
        category: 'Service Fingerprinting',
        badge: 'Zero Unpatched CVEs',
        summary: 'Banner grabbing and protocol handshake verification identifying web daemons, databases, and microservices.',
        details: [
          { label: 'HTTP Web Daemon', value: 'Nginx 1.24.0 (Hardened)', status: 'active' },
          { label: 'MySQL Database', value: 'MySQL 8.0.36 (Private VPC)', status: 'active' },
          { label: 'PostgreSQL Store', value: 'PG 16.2 (SSL Enforced)', status: 'active' },
          { label: 'Auth Middleware', value: 'OAuth2 / OIDC Gateway', status: 'active' },
        ],
        payloadSnippet: `SERVICE: MySQL Database\nPORT: 3306 (Internal WireGuard Only)\nENCRYPTION: TLS_v1_3\nUPTIME: 184 Days 06:12:44`,
      });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      
      {/* Top bar: LED Matrix number "02" */}
      <div className="flex items-center justify-between">
        <DigitalLed number="02" />
        <div className="text-[11px] font-mono text-purple-400/50 flex items-center gap-2">
          <span>SURFACE_SCANNER::READY</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
        </div>
      </div>

      {/* Main Grid: Left side Title/Radar, Right side Stacked modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 items-center">
        
        {/* Left Column (5 cols): Title, Subtitle, and Central Radar Globe */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-wide">
              Attack surface
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Trace discovered assets through domains, DNS, addresses, ports, and services.
            </p>
          </div>

          {/* Holographic Radar Globe Scanner */}
          <div className="relative flex items-center justify-center py-2 sm:py-4">
            {/* Particle wave flow towards globe */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-purple-400" />
            </div>

            {/* Glowing Globe Chassis */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleInspect('addresses')}
              onMouseEnter={() => playHoverSound(480)}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#120f26] border-2 border-purple-400/60 shadow-[0_0_40px_rgba(147,51,234,0.4)] flex items-center justify-center cursor-pointer group/globe"
              title="Click to view IP Geo telemetry"
            >
              {/* Outer orbit rings */}
              <div className="absolute -inset-3 rounded-full border border-purple-500/20 group-hover/globe:border-purple-400/50 transition-colors animate-[spin_30s_linear_infinite]" />
              <div className="absolute -inset-6 rounded-full border border-dashed border-purple-500/15 animate-[spin_45s_linear_infinite_reverse]" />

              {/* Rotating radar sweep beam */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="w-full h-full origin-center animate-radar"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(168, 85, 247, 0.45) 0deg, rgba(168, 85, 247, 0.1) 45deg, transparent 75deg)',
                  }}
                />
              </div>

              {/* Center globe mesh & world dots */}
              <div className="relative z-10 w-28 h-28 sm:w-34 sm:h-34 rounded-full bg-[#191438] border border-purple-400/40 flex items-center justify-center overflow-hidden">
                {/* Globe latitude/longitude wireframe */}
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#a855f7" strokeWidth="0.8" />
                  <ellipse cx="50" cy="50" rx="44" ry="20" fill="none" stroke="#a855f7" strokeWidth="0.8" />
                  <ellipse cx="50" cy="50" rx="44" ry="34" fill="none" stroke="#a855f7" strokeWidth="0.8" />
                  <line x1="50" y1="6" x2="50" y2="94" stroke="#a855f7" strokeWidth="0.8" />
                  <line x1="6" y1="50" x2="94" y2="50" stroke="#a855f7" strokeWidth="0.8" />
                </svg>

                {/* Tactical red threat pings */}
                <div className="absolute top-[35%] left-[45%]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,1)]" />
                  </span>
                </div>
                <div className="absolute bottom-[40%] right-[32%]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,1)]" />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Center Connecting Circuit Bus lines (hidden on mobile, shown on lg) */}
        <div className="hidden lg:block lg:col-span-2 relative h-full">
          <svg className="w-full h-[400px]" preserveAspectRatio="none" viewBox="0 0 120 400">
            {/* Trace 1: To Domains */}
            <path
              d="M 10 200 C 40 200, 60 50, 110 50"
              fill="none"
              stroke={hoveredModule === 'domains' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'domains' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'domains' ? '1' : '0.6'}
              className={hoveredModule === 'domains' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 2: To DNS */}
            <path
              d="M 10 200 C 45 200, 65 125, 110 125"
              fill="none"
              stroke={hoveredModule === 'dns' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'dns' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'dns' ? '1' : '0.6'}
              className={hoveredModule === 'dns' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 3: To Addresses */}
            <path
              d="M 10 200 L 110 200"
              fill="none"
              stroke={hoveredModule === 'addresses' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'addresses' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'addresses' ? '1' : '0.6'}
              className={hoveredModule === 'addresses' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 4: To Ports */}
            <path
              d="M 10 200 C 45 200, 65 275, 110 275"
              fill="none"
              stroke={hoveredModule === 'ports' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'ports' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'ports' ? '1' : '0.6'}
              className={hoveredModule === 'ports' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 5: To Services */}
            <path
              d="M 10 200 C 40 200, 60 350, 110 350"
              fill="none"
              stroke={hoveredModule === 'services' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'services' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'services' ? '1' : '0.6'}
              className={hoveredModule === 'services' ? 'animate-dash-flow' : ''}
            />
          </svg>
        </div>

        {/* Right Column (5 cols): 5 Stacked Telemetry Cards (exact match to Image 2) */}
        <div className="lg:col-span-5 space-y-2.5">
          
          {/* 1. Domains Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('domains')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('domains')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'domains'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Domains</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="space-y-1 text-[11px] font-mono">
              {['example.com', 'sub.test.co', 'sub.test.co', 'sub.test.co'].map((domain, i) => (
                <div key={i} className="flex items-center justify-between text-slate-300 group-hover:text-purple-100 transition-colors">
                  <span>{domain}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400/70" />
                    <span className="w-1 h-1 rounded-full bg-emerald-400/70" />
                    <span className="w-1 h-1 rounded-full bg-emerald-400/70" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 2. DNS Module: Tree Diagram */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('dns')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('dns')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'dns'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">DNS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            {/* DNS Tree SVG Graphic */}
            <div className="h-10 flex items-center justify-center">
              <svg viewBox="0 0 160 50" className="w-full h-full stroke-purple-400 group-hover:stroke-purple-300 transition-colors">
                <rect x="72" y="2" width="16" height="10" rx="2" fill="#2d1f4e" strokeWidth="1" />
                <line x1="80" y1="12" x2="80" y2="22" strokeWidth="1" />
                <line x1="40" y1="22" x2="120" y2="22" strokeWidth="1" />
                <line x1="40" y1="22" x2="40" y2="28" strokeWidth="1" />
                <line x1="120" y1="22" x2="120" y2="28" strokeWidth="1" />
                <rect x="32" y="28" width="16" height="10" rx="2" fill="#2d1f4e" strokeWidth="1" />
                <rect x="112" y="28" width="16" height="10" rx="2" fill="#2d1f4e" strokeWidth="1" />
                <line x1="40" y1="38" x2="25" y2="44" strokeWidth="1" />
                <line x1="40" y1="38" x2="55" y2="44" strokeWidth="1" />
                <circle cx="25" cy="44" r="2" fill="#c084fc" />
                <circle cx="55" cy="44" r="2" fill="#c084fc" />
                <circle cx="105" cy="44" r="2" fill="#c084fc" />
                <circle cx="135" cy="44" r="2" fill="#c084fc" />
              </svg>
            </div>
          </motion.div>

          {/* 3. Addresses Module: World Map + IPs */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('addresses')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('addresses')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'addresses'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Addresses</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center">
              {/* World map snippet */}
              <div className="relative h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 50" className="w-full h-full opacity-40 fill-purple-400">
                  <path d="M15,10 Q25,8 30,18 Q20,25 12,18 Z M50,12 Q65,8 75,20 Q65,28 48,25 Z M75,12 Q88,10 92,20 Q82,26 74,24 Z" />
                </svg>
                <span className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_4px_rgba(244,63,94,1)] animate-ping" />
              </div>
              <div className="space-y-0.5 text-[10px] font-mono text-purple-200 text-right">
                <div>192.168.1.1</div>
                <div>192.188.1</div>
                <div>192.168.1.1</div>
                <div>8.8.8.8</div>
                <div>8.8.8.8</div>
              </div>
            </div>
          </motion.div>

          {/* 4. Ports Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('ports')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('ports')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'ports'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Ports</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-center">
              <div className="p-1 rounded bg-purple-950/60 border border-purple-800/40 text-purple-200 group-hover:border-purple-500/60">
                🌐 80
              </div>
              <div className="p-1 rounded bg-purple-950/60 border border-purple-800/40 text-purple-200 group-hover:border-purple-500/60">
                🔒 22
              </div>
              <div className="p-1 rounded bg-purple-950/60 border border-purple-800/40 text-purple-200 group-hover:border-purple-500/60">
                ⚠️ 23
              </div>
              <div className="p-1 rounded bg-purple-950/60 border border-purple-800/40 text-purple-200 group-hover:border-purple-500/60">
                🌐 80
              </div>
              <div className="p-1 rounded bg-purple-950/60 border border-purple-800/40 text-purple-200 group-hover:border-purple-500/60">
                🔒 22
              </div>
              <div className="p-1 rounded bg-purple-950/60 border border-purple-800/40 text-purple-200 group-hover:border-purple-500/60">
                SSH
              </div>
            </div>
          </motion.div>

          {/* 5. Services Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('services')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('services')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'services'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Services</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-purple-200">
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-purple-400" />
                <span>HTTP</span>
              </div>
              <div className="flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-purple-400" />
                <span>MySQL</span>
              </div>
              <div className="flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-purple-400" />
                <span>SSH</span>
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
          title="Proceed to Card 03: Case Management"
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
