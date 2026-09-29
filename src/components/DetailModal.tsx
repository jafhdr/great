import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Cpu, Globe, Key, FileText, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export interface ModalData {
  title: string;
  category: string;
  badge?: string;
  summary: string;
  details: { label: string; value: string; status?: 'active' | 'warning' | 'neutral' }[];
  actionLabel?: string;
  payloadSnippet?: string;
}

interface DetailModalProps {
  data: ModalData | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  const handleClose = () => {
    playClickSound(400);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-xl rounded-2xl border border-purple-500/30 bg-[#0e0c1f] p-6 shadow-[0_0_60px_rgba(147,51,234,0.35)] overflow-hidden"
        >
          {/* Subtle neon corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-400" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-400" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-400" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400" />

          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-purple-900/40">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono tracking-wider text-purple-400 font-semibold uppercase">
                  {data.category}
                </span>
                {data.badge && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-500/30">
                    {data.badge}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold font-display text-white tracking-wide">
                {data.title}
              </h3>
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-900/40 border border-transparent hover:border-purple-500/30 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="py-4 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              {data.summary}
            </p>

            {/* Spec details grid */}
            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-purple-950/20 border border-purple-800/30">
              {data.details.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-100 flex items-center gap-1.5 mt-0.5">
                    {item.status === 'active' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    )}
                    {item.status === 'warning' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                    )}
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Payload snippet if available */}
            {data.payloadSnippet && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-purple-300/80 mb-1 px-1">
                  <span>FORENSIC TELEMETRY STREAM</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>
                <pre className="p-3 text-xs font-mono bg-black/60 border border-purple-900/50 rounded-lg text-purple-200/90 overflow-x-auto">
                  <code>{data.payloadSnippet}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-900/40">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-all cursor-pointer"
            >
              Dismiss
            </button>
            <button
              onClick={() => {
                playClickSound(700);
                handleClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all cursor-pointer"
            >
              {data.actionLabel || 'Analyze in Threat Desk'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
