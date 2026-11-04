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
      {/* Outer Rounded Architectural Frame (Responsive & compressed on mobile) */}
      <div className="relative rounded-[1.75rem] sm:rounded-[3.5rem] bg-[#0E0E0E] border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden min-h-0 sm:min-h-[670px] lg:min-h-[820px] flex flex-col justify-between p-4 sm:p-10 lg:p-14">
        
        {/* MASSIVE BACKGROUND BRAND TEXT */}
        <motion.div
          style={{ x: bigTextX }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        >
          <span className="text-[17vw] font-black uppercase tracking-tighter text-white/[0.04] leading-none whitespace-nowrap font-heading">
            STRIDE LONDON
          </span>
        </motion.div>

        {/* Ambient Subtle Gradients */}
        <div className="absolute inset-0 bg-radial from-[#1A1A1A]/70 via-[#0B0B0B]/80 to-[#080808] pointer-events-none z-0" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />

        {/* Top Header Badge Row */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex items-center justify-between border-b border-white/5 pb-3 sm:pb-4"
        >
          <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-neutral-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Savile Row London · Est. 2026</span>
          </div>

          {/* Central Platinum Monogram */}
          <div className="mx-auto sm:mx-0 flex items-center justify-center">
            <Logo variant="monogram" size="md" tone="silver" />
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hello Stride London! I would like to inquire about leather jacket availability and bespoke fitting.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-white border border-white/10 rounded-full px-4 py-1.5 hover:border-white/40 transition-colors"
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
            {/* Season Kicker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.35em] uppercase text-neutral-300 font-semibold"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
              <span>Autumn / Winter Collection</span>
            </motion.div>

            {/* Clean Punchy Luxury Headline with Staggered Entrance */}
            <div className="space-y-1 sm:space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] font-heading"
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

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1"
            >
              <button
                onClick={onExplore}
                className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-8 sm:py-4 bg-white text-[#0B0B0B] hover:bg-neutral-200 font-semibold text-[11px] sm:text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_10px_35px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_45px_rgba(255,255,255,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onOpenLookbook}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 text-[11px] sm:text-xs uppercase tracking-widest text-neutral-200 hover:text-white border border-white/20 rounded-full hover:border-white transition-colors cursor-pointer"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white fill-white ml-0.5" />
                </div>
                <span>Watch Lookbook</span>
              </button>
            </motion.div>

            {/* Mini Lookbook Card (Compact on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              onClick={onOpenLookbook}
              className="mt-1 p-2 sm:p-3 bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 flex items-center gap-3 sm:gap-4 hover:border-white/30 transition-all cursor-pointer group shadow-lg"
            >
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-white/10">
                <img
                  src="/src/assets/images/craft_leather_tannery_macro_1793808351301.jpg"
                  alt="Leather Tannery Craft"
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
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

            {/* 3D Animated Model Container: Entrance Animation & Mouse 3D Tilt */}
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
              className="relative w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[500px] aspect-4/3 sm:aspect-1/1 rounded-2xl sm:rounded-[2.25rem] overflow-hidden border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)] group"
            >
              {/* Continuous Breathing / Cinematic Subtle Movement on the Sitting Model */}
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
                src="/src/assets/images/hero_model_sitting_wall_1793810739363.jpg"
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
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/15 text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-200">
                <span>The Mayfair Cut · 1.2mm Calfskin</span>
              </div>

              {/* Floating Product Tag at Bottom of Model */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex items-center justify-between text-xs text-white">
                <div className="bg-black/85 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl border border-white/15 shadow-xl">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400">Featured Silhoutte</p>
                  <p className="text-white font-semibold text-xs sm:text-sm">The Mayfair Asymmetric Biker</p>
                  <p className="text-slate-300 font-mono text-[11px] sm:text-xs">PKR 42,000</p>
                </div>

                <button
                  onClick={() => onOpenProduct('prod-1')}
                  className="bg-white hover:bg-neutral-200 text-black font-semibold px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl transition-all shadow-lg hover:scale-105 cursor-pointer text-[10px] sm:text-xs uppercase tracking-wider"
                >
                  Quick View
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Mini Preview Card with Doodle */}
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
              className="w-48 p-3 rounded-2xl bg-[#171717] border border-white/15 hover:border-white/50 transition-all cursor-pointer shadow-2xl group"
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-black/40 mb-2.5">
                <img
                  src="/src/assets/images/product_leather_jacket_biker_1793808348824.jpg"
                  alt="Mayfair Asymmetric Biker"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-1.5 right-1.5 bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
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
