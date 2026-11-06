import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown, Play, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Logo } from '../common/Logo';
import { TypewriterText } from '../common/TypewriterText';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenLookbook: () => void;
  onOpenProduct: (productId: string) => void;
  whatsappNumber: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onOpenLookbook,
  onOpenProduct,
  whatsappNumber
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

  // Layered parallax transforms
  const bigTextX = useTransform(smoothProgress, [0, 1], ['0%', '-8%']);
  const heroImageY = useTransform(smoothProgress, [0, 1], ['0%', '14%']);
  const heroImageScale = useTransform(smoothProgress, [0, 1], [1, 1.06]);
  const textColumnY = useTransform(smoothProgress, [0, 1], ['0%', '6%']);
  const previewCardY = useTransform(smoothProgress, [0, 1], ['0%', '-10%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const scrollToCollection = () => {
    document.getElementById('showcase-carousel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative px-2.5 sm:px-6 lg:px-8 pt-1 sm:pt-2 pb-6 sm:pb-10 max-w-[1520px] mx-auto overflow-hidden"
    >
      {/* Outer Rounded Architectural Frame (Neumorphic Raised Soft UI) */}
      <div className="relative rounded-[1.75rem] sm:rounded-[3.5rem] neu-dark-raised-lg border border-white/[0.05] overflow-hidden min-h-0 sm:min-h-[670px] lg:min-h-[820px] flex flex-col justify-between p-4 sm:p-10 lg:p-14">
        
        {/* MASSIVE BACKGROUND BRAND TEXT */}
        <motion.div
          style={{ x: bigTextX }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        >
          <span className="text-[17vw] font-black uppercase tracking-tighter text-white/[0.03] neu-text-deboss leading-none whitespace-nowrap font-heading">
            STRIDE LONDON
          </span>
        </motion.div>

        {/* Ambient Subtle Gradients */}
        <div className="absolute inset-0 bg-radial from-[#1A1B20]/60 via-[#131417]/80 to-[#101114] pointer-events-none z-0" />
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />

        {/* Top Header Badge Row */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-3 sm:pb-4"
        >
          <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-medium px-3.5 py-1 rounded-full neu-dark-inset-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span>Savile Row London · Est. 2026</span>
          </div>

          {/* Central Platinum Monogram inside Neumorphic Concave Well */}
          <div className="mx-auto sm:mx-0 flex items-center justify-center p-2 rounded-2xl neu-dark-inset-sm">
            <Logo variant="monogram" size="md" tone="silver" />
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hello Stride London! I would like to inquire about leather jacket availability and bespoke fitting.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-white neu-dark-button rounded-full px-4 py-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </motion.div>

        {/* Center Editorial Hero Composition */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center my-auto py-2 sm:py-8">
          
          {/* Left Column: Clean, Non-Robotic Luxury Typography with Motion */}
          <motion.div
            style={{ y: textColumnY }}
            className="lg:col-span-5 flex flex-col items-start space-y-3.5 sm:space-y-6"
          >
            {/* Season Kicker inside Neumorphic Inset Pill */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.35em] uppercase text-neutral-300 font-semibold px-3 py-1 rounded-full neu-dark-inset-sm border border-white/[0.04]"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-200 animate-pulse" />
              <span>Autumn / Winter Collection</span>
            </motion.div>

            {/* Clean Punchy Luxury Headline with Staggered Entrance */}
            <div className="space-y-1 sm:space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] font-heading neu-text-deboss"
              >
                STRIDE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  LONDON
                </span>
              </motion.h1>

              {/* Tagline with Typewriter Animation */}
              <div className="min-h-[1.6em] sm:min-h-[1.9em]">
                <TypewriterText
                  text="Step Bold. Live Stylish."
                  delay={450}
                  speed={32}
                  as="p"
                  className="text-lg sm:text-2xl lg:text-3xl text-neutral-200 font-light italic font-serif-luxury tracking-wide"
                />
              </div>
            </div>

            {/* Description Copy with Typewriter Animation */}
            <div className="min-h-[2.8em] sm:min-h-[3.6em]">
              <TypewriterText
                text="Pure full-grain calfskin and benchmade footwear. Crafted by master artisans in small limited batches—built to endure decades and age with rich character."
                delay={1200}
                speed={16}
                as="p"
                className="text-xs sm:text-base text-neutral-300 max-w-md leading-relaxed font-light"
              />
            </div>

            {/* Tactile Neumorphic CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
            >
              <button
                onClick={onExplore}
                className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-8 sm:py-4 neu-dark-button-convex text-white font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] rounded-full border border-white/10 hover:border-white/30 cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-300" />
              </button>

              <button
                onClick={onOpenLookbook}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 text-[11px] sm:text-xs uppercase tracking-widest text-neutral-300 hover:text-white neu-dark-button rounded-full border border-white/5 cursor-pointer"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full neu-dark-inset-sm flex items-center justify-center">
                  <Play className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white fill-white ml-0.5" />
                </div>
                <span>Watch Lookbook</span>
              </button>
            </motion.div>

            {/* Mini Lookbook Card (Neumorphic Inset Well) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              onClick={onOpenLookbook}
              className="mt-1 p-2 sm:p-2.5 neu-dark-inset rounded-xl sm:rounded-2xl border border-white/[0.04] flex items-center gap-3 sm:gap-4 hover:border-white/20 transition-all cursor-pointer group"
            >
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden shrink-0 neu-dark-raised-sm p-0.5">
                <img
                  src="/src/assets/images/tannery_workshop_craft_real_1793989163039.jpg"
                  alt="Leather Tannery Craft"
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl group-hover:scale-115 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white animate-ping absolute" />
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white relative z-10" />
                </div>
              </div>
              <div className="pr-2 sm:pr-3">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-bold">Atelier Cinema</p>
                <p className="text-xs text-white font-medium group-hover:text-slate-200 transition-colors">
                  The Art of British Leather
                </p>
                <p className="text-[10px] text-neutral-400 hidden sm:block">Hand-cut & saddle-stitched</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Center Column: 3D Animated Model Sitting Leaning on Wall with Smooth Entrance */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Atmospheric Glow */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.28, 0.15]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-64 sm:w-[420px] h-64 sm:h-[420px] rounded-full bg-white/10 blur-[90px] pointer-events-none"
            />

            {/* 3D Animated Model Container: Neumorphic Raised Frame */}
            <motion.div
              style={{
                y: heroImageY,
                scale: heroImageScale,
                rotateX: mousePos.y * -8,
                rotateY: mousePos.x * 8,
                transformPerspective: 1000
              }}
              initial={{ opacity: 0, scale: 1.12, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[500px] aspect-4/3 sm:aspect-1/1 rounded-2xl sm:rounded-[2.25rem] overflow-hidden neu-dark-raised border border-white/[0.08] p-1.5 group"
            >
              {/* Continuous Breathing / Cinematic Subtle Movement on the Sitting Model */}
              <div className="relative w-full h-full rounded-xl sm:rounded-[2rem] overflow-hidden">
                <motion.img
                  animate={{
                    scale: [1, 1.04, 1],
                    y: [0, -6, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  src="/src/assets/images/hero_model_sitting_wall_real_1793989059137.jpg"
                  alt="Stride London Model Wearing Biker Leather Jacket Leaning on Wall"
                  className="w-full h-full object-cover object-center filter contrast-[1.05]"
                />

                {/* Shimmering Specular Light Sweep Effect across the Leather Jacket */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%']
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
                />

                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 neu-dark-inset-sm backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/10 text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-200">
                  <span>The Mayfair Cut · 1.2mm Calfskin</span>
                </div>

                {/* Floating Product Tag at Bottom of Model */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex items-center justify-between text-xs text-white">
                  <div className="neu-dark-raised-sm backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/10 shadow-xl">
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400">Featured Silhouette</p>
                    <p className="text-white font-semibold text-xs sm:text-sm">The Mayfair Asymmetric Biker</p>
                    <p className="text-slate-300 font-mono text-[11px] sm:text-xs">PKR 42,000</p>
                  </div>

                  <button
                    onClick={() => onOpenProduct('prod-1')}
                    className="neu-dark-button text-white font-semibold px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-white/10 hover:border-white/30 transition-all cursor-pointer text-[10px] sm:text-xs uppercase tracking-wider"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Mini Preview Card with Neumorphic Raised Surface */}
          <motion.div
            style={{ y: previewCardY }}
            className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center space-y-4"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-1 text-slate-400 text-xs tracking-wider font-medium"
            >
              <span>Featured Piece</span>
              <svg className="w-8 h-8 text-white" viewBox="0 0 40 40" fill="none">
                <path d="M10 10 C 25 10, 30 25, 20 30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
                <path d="M18 25 L 20 30 L 25 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => onOpenProduct('prod-1')}
              className="w-48 p-3 rounded-2xl neu-dark-raised border border-white/[0.06] hover:neu-dark-button transition-all cursor-pointer group"
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden neu-dark-inset p-1 mb-2.5">
                <img
                  src="/src/assets/images/leather_biker_jacket_real_1793989042539.jpg"
                  alt="Mayfair Asymmetric Biker"
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white text-black text-[9px] font-bold px-2 py-0.5 rounded shadow">
                  BESTSELLER
                </div>
              </div>
              <p className="text-xs font-semibold text-white line-clamp-1 group-hover:text-slate-200 transition-colors">
                The Mayfair Biker
              </p>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="text-white font-mono font-bold">PKR 42,000</span>
                <span className="text-neutral-400 group-hover:text-white transition-colors">Inspect &rarr;</span>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Bar: Stats Counters & Scroll-Down Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative z-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Stats Bar */}
          <div className="flex items-center gap-8 sm:gap-12">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono">100%</p>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Full-Grain Leather</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono">15+</p>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Master Artisans</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight font-mono">12,000+</p>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Bespoke Clients</p>
            </div>
          </div>

          {/* Reference Video Scroll-Down Capsule Button with Arrow */}
          <button
            onClick={scrollToCollection}
            className="group flex flex-col items-center justify-center p-3.5 bg-white/5 hover:bg-white border border-white/15 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
            aria-label="Scroll to discover collection"
            title="Scroll to discover collection"
          >
            <ArrowDown className="w-4 h-4 text-white group-hover:text-[#0B0B0B] transition-colors animate-bounce" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
