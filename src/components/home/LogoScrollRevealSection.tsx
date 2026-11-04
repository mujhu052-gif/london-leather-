import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Logo } from '../common/Logo';
import { ArrowDown } from 'lucide-react';
import { TypewriterText } from '../common/TypewriterText';

interface LogoScrollRevealSectionProps {
  onScrollToShop: () => void;
}

export const LogoScrollRevealSection: React.FC<LogoScrollRevealSectionProps> = ({
  onScrollToShop
}) => {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress as the user enters and moves through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // 360 degree rotation on scroll + scaling across screen
  const logoRotation = useTransform(smoothProgress, [0, 1], [0, 360]);
  const logoScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.35, 1]);
  const textOpacity = useTransform(smoothProgress, [0.1, 0.5, 0.9], [0, 1, 0.8]);
  const textY = useTransform(smoothProgress, [0.1, 0.5, 0.9], [40, 0, -30]);
  const bgGlowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.4, 0.15]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-0 sm:min-h-[85vh] flex flex-col items-center justify-center px-2.5 sm:px-6 max-w-[1520px] mx-auto overflow-hidden py-8 sm:py-16 lg:py-20"
    >
      {/* Outer Rounded Architectural Portal Frame (Responsive for mobile) */}
      <div className="relative w-full h-full min-h-[440px] sm:min-h-[640px] lg:min-h-[720px] rounded-[1.75rem] sm:rounded-[3rem] bg-[#0A0A0A] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col items-center justify-between p-4 sm:p-14 text-center">
        
        {/* Animated Radial Glow that responds to scroll */}
        <motion.div
          style={{ opacity: bgGlowOpacity }}
          className="absolute inset-0 bg-radial from-white/20 via-[#141414]/70 to-[#0A0A0A] pointer-events-none"
        />

        {/* Ambient Geometric Orbit Ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[280px] h-[280px] sm:w-[700px] sm:h-[700px] rounded-full border border-white/5 opacity-50 [border-dasharray:4_8]" />
          <div className="w-[180px] h-[180px] sm:w-[480px] sm:h-[480px] rounded-full border border-white/10 opacity-60" />
        </div>

        {/* Top Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-1 sm:space-y-2 pt-2 sm:pt-4"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-slate-400 font-semibold">
            The Stride London Emblem
          </span>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mx-auto">
            A symbol of enduring British craftsmanship and timeless individuality.
          </p>
        </motion.div>

        {/* Center: Full-Page 360-Degree Rotating & Scaling Logo */}
        <div className="relative z-10 my-auto py-4 sm:py-8 flex flex-col items-center justify-center">
          <motion.div
            style={{
              rotate: logoRotation,
              scale: logoScale
            }}
            className="relative cursor-pointer"
          >
            {/* Luminous Core Glow */}
            <div className="absolute inset-0 bg-white/25 rounded-full blur-2xl transform scale-110 pointer-events-none" />

            <div className="p-5 sm:p-12 rounded-full bg-[#121212]/90 border border-white/20 shadow-2xl backdrop-blur-xl">
              <Logo variant="monogram" size="xl" tone="silver" className="w-20 h-20 sm:w-44 sm:h-44" />
            </div>
          </motion.div>

          {/* Scrolling Animated Typographic Statement */}
          <motion.div
            style={{
              opacity: textOpacity,
              y: textY
            }}
            className="mt-5 sm:mt-8 space-y-2 sm:space-y-3"
          >
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading">
              Every Piece Tells A Story
            </h2>
            <div className="min-h-[1.6em]">
              <TypewriterText
                text="Step Bold. Live Stylish."
                delay={300}
                speed={30}
                as="p"
                className="text-lg sm:text-2xl text-neutral-300 font-serif-luxury italic font-light"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Guide to Shop All Products */}
        <div className="relative z-10 pb-4 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">
            Scroll to Discover The Catalog
          </p>
          <button
            onClick={onScrollToShop}
            className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
            title="Proceed to Shop All Products"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
