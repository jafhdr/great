import React from 'react';

interface DigitalLedProps {
  number: '01' | '02' | '03' | '04' | string;
  active?: boolean;
}

// 5x7 dot matrix representations for 0, 1, 2, 3, 4
const DIGIT_MATRICES: Record<string, number[][]> = {
  '0': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '1': [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ],
  '2': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  '3': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  '4': [
    [0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
};

export const DigitalLed: React.FC<DigitalLedProps> = ({ number, active = false }) => {
  const chars = number.split('');

  return (
    <div className="flex items-center gap-1.5 select-none group cursor-pointer" title={`Node Index ${number}`}>
      {chars.map((char, charIdx) => {
        const matrix = DIGIT_MATRICES[char] || DIGIT_MATRICES['0'];
        return (
          <div key={charIdx} className="grid grid-cols-5 gap-[2px] p-0.5 bg-black/40 rounded border border-purple-500/20 backdrop-blur-xs transition-all duration-300 group-hover:border-purple-400/60 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.4)]">
            {matrix.map((row, r) =>
              row.map((val, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`w-[2.5px] h-[2.5px] sm:w-[3px] sm:h-[3px] rounded-[0.5px] transition-all duration-300 ${
                    val === 1
                      ? 'bg-purple-300 shadow-[0_0_4px_rgba(216,180,254,0.9)] group-hover:bg-white group-hover:shadow-[0_0_6px_rgba(255,255,255,1)]'
                      : 'bg-purple-950/40'
                  }`}
                />
              ))
            )}
          </div>
        );
      })}
      
      {active && (
        <div className="flex items-center gap-1.5 ml-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"></span>
          </span>
          <span className="text-[11px] font-mono tracking-wider text-emerald-400 font-semibold group-hover:text-emerald-300 transition-colors">
            Active
          </span>
        </div>
      )}
    </div>
  );
};
