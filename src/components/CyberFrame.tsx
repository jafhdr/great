import React, { useRef, useState, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { playHoverSound } from '../utils/audio';

interface CyberFrameProps {
  children: React.ReactNode;
  className?: string;
  onNavigateNext?: () => void;
  interactiveTilt?: boolean;
}

export const CyberFrame: React.FC<CyberFrameProps> = ({
  children,
  className = '',
  onNavigateNext,
  interactiveTilt = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt physics using spring
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setMousePos({ x: mouseX, y: mouseY });

    if (interactiveTilt) {
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverSound(380);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative group/frame perspective-[1200px] w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: interactiveTilt ? rotateX : 0,
          rotateY: interactiveTilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full rounded-[24px] sm:rounded-[32px] p-[2px] transition-shadow duration-500 bg-gradient-to-b from-[#2a244d] via-[#1a1733] to-[#0e0c1f] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_-5px_rgba(147,51,234,0.18)] hover:shadow-[0_25px_80px_-10px_rgba(0,0,0,0.9),0_0_60px_0px_rgba(168,85,247,0.32)] ${className}`}
      >
        {/* Dynamic cursor spotlight glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.22), transparent 45%)`,
          }}
        />

        {/* Chassis border bezel with precision futuristic notches */}
        <div className="relative w-full h-full rounded-[22px] sm:rounded-[30px] bg-[#0c0b1a] overflow-hidden">
          
          {/* Ambient geometric background grid & constellation canvas */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(67,34,115,0.45),rgba(12,11,26,0.95))]" />
          
          {/* Subtle tactical grid lines */}
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />

          {/* Chamfered inner cyber bezel with notches (recreating the exact framing from the images) */}
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full stroke-[#403567] group-hover/frame:stroke-[#7c56b8] transition-colors duration-500 fill-none"
            preserveAspectRatio="none"
            viewBox="0 0 1000 600"
          >
            {/* Outer border track */}
            <rect
              x="8"
              y="8"
              width="984"
              height="584"
              rx="22"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Top chamfer cutout step */}
            <path
              d="M 28 8 L 320 8 L 332 20 L 668 20 L 680 8 L 972 8"
              strokeWidth="2"
              strokeOpacity="0.7"
            />
            {/* Bottom notch step */}
            <path
              d="M 28 592 L 340 592 L 352 580 L 648 580 L 660 592 L 972 592"
              strokeWidth="2"
              strokeOpacity="0.7"
            />
            {/* Left and right tactical tick marks */}
            <line x1="8" y1="280" x2="16" y2="280" strokeWidth="2" strokeOpacity="0.8" />
            <line x1="8" y1="320" x2="16" y2="320" strokeWidth="2" strokeOpacity="0.8" />
            <line x1="992" y1="280" x2="984" y2="280" strokeWidth="2" strokeOpacity="0.8" />
            <line x1="992" y1="320" x2="984" y2="320" strokeWidth="2" strokeOpacity="0.8" />
          </svg>

          {/* Corner rivets */}
          <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-purple-500/40 border border-purple-400/50" />
          <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-purple-500/40 border border-purple-400/50" />
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-purple-500/40 border border-purple-400/50" />
          <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-purple-500/40 border border-purple-400/50" />

          {/* Card main content wrapper */}
          <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:p-12 min-h-[540px] flex flex-col justify-between">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
