import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Settings, Building2, Users2, ShieldAlert, KeyRound, Activity, CheckCircle2 } from 'lucide-react';
import { DigitalLed } from '../DigitalLed';
import { playHoverSound, playClickSound } from '../../utils/audio';
import { ModalData } from '../DetailModal';

interface AdministrationCardProps {
  onSelectDetail?: (data: ModalData) => void;
  onNext?: () => void;
}

export const AdministrationCard: React.FC<AdministrationCardProps> = ({
  onSelectDetail,
  onNext,
}) => {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [hoveredCoreNode, setHoveredCoreNode] = useState<string | null>(null);

  const handleModuleHover = (name: string) => {
    setHoveredModule(name);
    playHoverSound(460);
  };

  const handleModuleLeave = () => {
    setHoveredModule(null);
  };

  const handleInspect = (type: 'tenants' | 'users' | 'audit' | 'config' | 'health') => {
    playClickSound(680);
    if (!onSelectDetail) return;

    if (type === 'tenants') {
      onSelectDetail({
        title: 'Multi-Tenant Enterprise Organizations',
        category: 'Tenant Governance',
        badge: 'Zero Data Cross-Talk',
        summary: 'Hardware-isolated logical tenants with dedicated schema encryption keys, customized compliance frameworks, and SAML/SCIM provisioning.',
        details: [
          { label: 'Primary Tenant', value: 'Apex Solutions (Active / 2,400 Users)', status: 'active' },
          { label: 'Partner Tenant', value: 'Omega Corp (Active / 1,120 Users)', status: 'active' },
          { label: 'Trial Onboarding', value: 'Beta Partners (Compliance Review)', status: 'warning' },
          { label: 'KMS Vault Status', value: 'AWS KMS HSM Dedicated', status: 'active' },
        ],
        payloadSnippet: `TENANT_UUID: 8a4c0-tenant-apex\nISOLATION_MODE: DEDICATED_SCHEMA\nRETENTION_DAYS: 365 (HIPAA/SOC2)\nSCIM_SYNC: ACTIVE (Okta)`,
      });
    } else if (type === 'users') {
      onSelectDetail({
        title: 'Role-Based Access Control (RBAC) Directory',
        category: 'Identity & Access',
        badge: 'Hardware MFA Enforced',
        summary: 'Granular least-privilege role matrix enforcing FIDO2 WebAuthn keys, automated session termination, and just-in-time privilege elevation.',
        details: [
          { label: 'Global Admin', value: 'A. Chen (Platform Owner)', status: 'active' },
          { label: 'Security Analyst', value: 'K. Smith (Tier 2 SOC)', status: 'active' },
          { label: 'Security Engineer', value: 'R. Davis (Detection Eng)', status: 'active' },
          { label: 'MFA Compliance', value: '100% FIDO2 Hardware Keys', status: 'active' },
        ],
        payloadSnippet: `USER: a.chen@apex.sec\nROLE: SUPER_ADMIN\nPRIVILEGES: [TENANT_MANAGE, HSM_KEY_ROTATE, AUDIT_EXPORT]\nLAST_AUTH: 2026-09-28 10:28:14 via YubiKey 5C`,
      });
    } else if (type === 'audit') {
      onSelectDetail({
        title: 'Immutable Security Audit Event Ledger',
        category: 'Compliance Telemetry',
        badge: 'Cryptographically Chained',
        summary: 'WORM-compliant append-only audit trail logging every administrative configuration change, role modification, and credential usage.',
        details: [
          { label: 'Event 10:30', value: 'Admin Chen created role "Level_II_Analyst"', status: 'active' },
          { label: 'Event 09:15', value: 'System config "API_KEY" rotated', status: 'active' },
          { label: 'Hash Verification', value: 'Block #418,920 Validated', status: 'active' },
          { label: 'Export Targets', value: 'Splunk, Snowflake, AWS S3', status: 'active' },
        ],
        payloadSnippet: `AUDIT_BLOCK_ID: #418920\nTIMESTAMP: 2026-09-28T10:30:12.441Z\nACTOR: a.chen (10.14.2.1)\nACTION: IAM_ROLE_CREATE\nPARAMS: { "role": "Level_II_Analyst", "ttl": "30d" }\nBLOCK_HASH: 0x9bf84e2a...`,
      });
    } else if (type === 'config') {
      onSelectDetail({
        title: 'Encrypted Configuration & Secret Vault',
        category: 'Infrastructure Secrets',
        badge: 'AES-256-GCM',
        summary: 'Declarative GitOps configuration files managing dynamic API tokens, database connection pools, and micro-segmentation firewall rules.',
        details: [
          { label: 'API Keys Vault', value: 'api_keys.yml (Encrypted via SOPS)', status: 'active' },
          { label: 'Database Parameters', value: 'db_settings.conf (TLS Enforced)', status: 'active' },
          { label: 'Zero-Trust Policies', value: 'network_policy.json (Cilium eBPF)', status: 'active' },
          { label: 'Key Rotation Cycle', value: 'Every 30 Days (Automated)', status: 'active' },
        ],
        payloadSnippet: `--- # network_policy.json\napiVersion: "cilium.io/v2"\nkind: CiliumNetworkPolicy\nmetadata:\n  name: "enforce-mtls-tenants"\nspec:\n  endpointSelector: { matchLabels: { role: "backend" } }`,
      });
    } else {
      onSelectDetail({
        title: 'System Real-Time Health & Capacity',
        category: 'Cluster Telemetry',
        badge: 'All Systems Operational',
        summary: 'Distributed microservice heartbeat metrics tracking kernel load, memory pressure, edge latency, and API throughput.',
        details: [
          { label: 'CPU Cluster Load', value: '18% Avg (Nominal)', status: 'active' },
          { label: 'Memory Allocation', value: '26% / 128 GB Used', status: 'active' },
          { label: 'Network Ingress/Egress', value: '1.4 Gbps / 840 Mbps', status: 'active' },
          { label: 'Overall Status', value: 'SYSTEM HEALTH: OPTIMAL', status: 'active' },
        ],
        payloadSnippet: `NODE_METRICS:\n  CPU_USER: 14.2% | CPU_SYS: 3.8% | IDLE: 82.0%\n  MEM_FREE: 94.6 GB / 128.0 GB\n  P99_API_LATENCY: 8.4 ms\n  CLUSTER_PODS: 148/148 Running`,
      });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      
      {/* Top bar: LED Matrix number "04" */}
      <div className="flex items-center justify-between">
        <DigitalLed number="04" />
        <div className="text-[11px] font-mono text-purple-400/50 flex items-center gap-2">
          <span>ADMIN_CORE::ONLINE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
        </div>
      </div>

      {/* Main Grid: Left side Title & Hexagonal Core, Right side Stacked modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 items-center">
        
        {/* Left Column (5 cols): Title, Subtitle, and Central Hexagonal Core */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-wide">
              Administration
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Manage tenants, users, roles, system configuration, and audit logs.
            </p>
          </div>

          {/* Central Hexagonal Core Graphic */}
          <div className="relative flex items-center justify-center py-2 sm:py-4">
            
            {/* Gear settings icon floating on left */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              onClick={() => handleInspect('config')}
              className="absolute -left-6 top-1/2 -translate-y-1/2 cursor-pointer z-20"
              title="System Configuration"
            >
              <div className="w-11 h-11 rounded-full bg-purple-950/80 border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-200" />
              </div>
            </motion.div>

            {/* Glowing Hexagonal Orchestration Hub */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              
              {/* Outer orbital rings */}
              <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-purple-500/25 animate-[spin_30s_linear_infinite_reverse]" />

              {/* Center Hexagonal Server Core */}
              <motion.div
                whileHover={{ scale: 1.06 }}
                onClick={() => handleInspect('health')}
                onMouseEnter={() => playHoverSound(500)}
                className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-b from-[#241a4a] to-[#120c26] border-2 border-purple-400/80 shadow-[0_0_35px_rgba(168,85,247,0.6)] flex flex-col items-center justify-center cursor-pointer group/core"
              >
                {/* Server Stack graphic */}
                <div className="space-y-1">
                  <div className="w-9 h-2.5 rounded-xs bg-purple-900/80 border border-purple-400/70 flex items-center justify-between px-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="w-3 h-0.5 bg-purple-300" />
                  </div>
                  <div className="w-9 h-2.5 rounded-xs bg-purple-900/80 border border-purple-400/70 flex items-center justify-between px-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="w-3 h-0.5 bg-purple-300" />
                  </div>
                  <div className="w-9 h-2.5 rounded-xs bg-purple-900/80 border border-purple-400/70 flex items-center justify-between px-1">
                    <span className="w-1 h-1 rounded-full bg-purple-400" />
                    <span className="w-3 h-0.5 bg-purple-300" />
                  </div>
                </div>
              </motion.div>

              {/* 4 Satellite Circular Orbital Nodes (API, DB, Auth, UI) */}
              
              {/* Node 1: Top (API) */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                onMouseEnter={() => {
                  setHoveredCoreNode('api');
                  playHoverSound(540);
                }}
                onMouseLeave={() => setHoveredCoreNode(null)}
                onClick={() => handleInspect('config')}
                className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1b143b] border border-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.5)] flex items-center justify-center cursor-pointer text-[10px] font-mono font-bold text-purple-200 hover:text-white hover:border-purple-300 transition-colors z-20"
              >
                API
              </motion.div>

              {/* Node 2: Left (DB) */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                onMouseEnter={() => {
                  setHoveredCoreNode('db');
                  playHoverSound(520);
                }}
                onMouseLeave={() => setHoveredCoreNode(null)}
                onClick={() => handleInspect('health')}
                className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1b143b] border border-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.5)] flex items-center justify-center cursor-pointer text-[10px] font-mono font-bold text-purple-200 hover:text-white hover:border-purple-300 transition-colors z-20"
              >
                DB
              </motion.div>

              {/* Node 3: Bottom (UI) */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                onMouseEnter={() => {
                  setHoveredCoreNode('ui');
                  playHoverSound(560);
                }}
                onMouseLeave={() => setHoveredCoreNode(null)}
                onClick={() => handleInspect('users')}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1b143b] border border-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.5)] flex items-center justify-center cursor-pointer text-[10px] font-mono font-bold text-purple-200 hover:text-white hover:border-purple-300 transition-colors z-20"
              >
                UI
              </motion.div>

              {/* Node 4: Bottom-Left (Auth) */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                onMouseEnter={() => {
                  setHoveredCoreNode('auth');
                  playHoverSound(580);
                }}
                onMouseLeave={() => setHoveredCoreNode(null)}
                onClick={() => handleInspect('tenants')}
                className="absolute bottom-6 left-5 w-8 h-8 rounded-full bg-[#1b143b] border border-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.5)] flex items-center justify-center cursor-pointer text-[10px] font-mono font-bold text-purple-200 hover:text-white hover:border-purple-300 transition-colors z-20"
              >
                Auth
              </motion.div>

              {/* Interconnecting orbital SVG lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
                <line x1="100" y1="36" x2="100" y2="70" stroke="#a855f7" strokeWidth="1.2" strokeOpacity="0.6" />
                <line x1="36" y1="100" x2="70" y2="100" stroke="#a855f7" strokeWidth="1.2" strokeOpacity="0.6" />
                <line x1="100" y1="164" x2="100" y2="130" stroke="#a855f7" strokeWidth="1.2" strokeOpacity="0.6" />
                <line x1="50" y1="145" x2="75" y2="125" stroke="#a855f7" strokeWidth="1.2" strokeOpacity="0.6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Center Connecting Circuit Bus lines (hidden on mobile, shown on lg) */}
        <div className="hidden lg:block lg:col-span-2 relative h-full">
          <svg className="w-full h-[400px]" preserveAspectRatio="none" viewBox="0 0 120 400">
            {/* Trace 1: To Tenants */}
            <path
              d="M 10 200 C 40 200, 60 50, 110 50"
              fill="none"
              stroke={hoveredModule === 'tenants' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'tenants' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'tenants' ? '1' : '0.6'}
              className={hoveredModule === 'tenants' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 2: To User Management */}
            <path
              d="M 10 200 C 45 200, 65 125, 110 125"
              fill="none"
              stroke={hoveredModule === 'users' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'users' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'users' ? '1' : '0.6'}
              className={hoveredModule === 'users' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 3: To Audit Logs */}
            <path
              d="M 10 200 L 110 200"
              fill="none"
              stroke={hoveredModule === 'audit' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'audit' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'audit' ? '1' : '0.6'}
              className={hoveredModule === 'audit' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 4: To Configurations */}
            <path
              d="M 10 200 C 45 200, 65 275, 110 275"
              fill="none"
              stroke={hoveredModule === 'config' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'config' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'config' ? '1' : '0.6'}
              className={hoveredModule === 'config' ? 'animate-dash-flow' : ''}
            />
            {/* Trace 5: To System Health */}
            <path
              d="M 10 200 C 40 200, 60 350, 110 350"
              fill="none"
              stroke={hoveredModule === 'health' ? '#d8b4fe' : '#7c3aed'}
              strokeWidth={hoveredModule === 'health' ? '2.5' : '1.5'}
              strokeOpacity={hoveredModule === 'health' ? '1' : '0.6'}
              className={hoveredModule === 'health' ? 'animate-dash-flow' : ''}
            />
          </svg>
        </div>

        {/* Right Column (5 cols): 5 Stacked Administration Modules (exact match to Image 4) */}
        <div className="lg:col-span-5 space-y-2.5">
          
          {/* 1. Tenants/Orgs Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('tenants')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('tenants')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'tenants'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Tenants/Orgs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex items-center justify-between">
              <Building2 className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="text-right text-[11px] font-mono space-y-0.5">
                <div>
                  Apex Solutions <span className="text-emerald-400">(Active)</span>
                </div>
                <div>
                  Omega Corp <span className="text-emerald-400">(Active)</span>
                </div>
                <div>
                  Beta Partners <span className="text-amber-400">(Review)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. User Management Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('users')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('users')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'users'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">User Management</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex items-center justify-between">
              <Users2 className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="text-right text-[11px] font-mono space-y-0.5">
                <div>
                  A. Chen <span className="text-emerald-400">(Admin)</span>
                </div>
                <div>
                  K. Smith <span className="text-emerald-400">(Analyst)</span>
                </div>
                <div>
                  R. Davis <span className="text-emerald-400">(SecEng)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Audit Logs Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('audit')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('audit')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'audit'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Audit Logs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="space-y-1 text-[10px] font-mono text-slate-300">
              <div>[2024-05-18 10:30] Admin Chen created role 'Level_II_Analyst'.</div>
              <div>[2024-05-18 09:15] System config 'API_KEY' updated.</div>
            </div>
          </motion.div>

          {/* 4. Configurations Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('config')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('config')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'config'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">Configurations</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <KeyRound className="w-5 h-5 text-purple-400" />
                <div className="w-6 h-6 border border-purple-400/40 rounded flex items-center justify-center bg-purple-950/60 text-xs">
                  📄
                </div>
              </div>
              <div className="text-right text-[11px] font-mono text-slate-300 space-y-0.5">
                <div>api_keys.yml</div>
                <div>db_settings.conf</div>
                <div>network_policy.json</div>
              </div>
            </div>
          </motion.div>

          {/* 5. System Health Module */}
          <motion.div
            whileHover={{ x: -4, scale: 1.02 }}
            onMouseEnter={() => handleModuleHover('health')}
            onMouseLeave={handleModuleLeave}
            onClick={() => handleInspect('health')}
            className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer bg-[#14122b]/85 backdrop-blur-sm group ${
              hoveredModule === 'health'
                ? 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-[#1c183d]'
                : 'border-purple-500/25 hover:border-purple-400/50'
            }`}
          >
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-purple-900/40">
              <span className="text-xs font-mono font-semibold text-purple-200">System Health</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            </div>
            
            {/* Metric Bars & Status */}
            <div className="space-y-1.5 text-[10px] font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">CPU</span>
                <div className="w-20 h-1.5 bg-purple-950 rounded-full overflow-hidden border border-purple-800/40">
                  <div className="w-1/3 h-full bg-purple-400 rounded-full" />
                </div>
                <span className="text-slate-400">Network</span>
                <div className="w-20 h-1.5 bg-purple-950 rounded-full overflow-hidden border border-purple-800/40">
                  <div className="w-2/3 h-full bg-fuchsia-400 rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Memory</span>
                <div className="w-20 h-1.5 bg-purple-950 rounded-full overflow-hidden border border-purple-800/40">
                  <div className="w-1/2 h-full bg-purple-400 rounded-full" />
                </div>
                <span className="text-slate-400">API</span>
                {/* Mini sparkline */}
                <div className="w-20 h-3 flex items-end gap-0.5">
                  <div className="w-1 h-1 bg-purple-400 rounded-xs" />
                  <div className="w-1 h-2 bg-purple-400 rounded-xs" />
                  <div className="w-1 h-1.5 bg-purple-400 rounded-xs" />
                  <div className="w-1 h-3 bg-fuchsia-400 rounded-xs" />
                  <div className="w-1 h-2 bg-purple-400 rounded-xs" />
                </div>
              </div>

              <div className="text-center pt-1 border-t border-purple-900/30 text-[10.5px] font-semibold tracking-wider text-emerald-400 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SYSTEM HEALTH: OPTIMAL</span>
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
          title="Cycle back to Card 01: Threat Intelligence"
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
