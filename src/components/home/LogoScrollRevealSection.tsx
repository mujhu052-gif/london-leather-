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
      {/* Outer Rounded Architectural Portal Frame in Neumorphic Raised Elevation */}
      <div className="relative w-full h-full min-h-[440px] sm:min-h-[640px] lg:min-h-[720px] rounded-[1.75rem] sm:rounded-[3rem] neu-dark-raised-lg overflow-hidden flex flex-col items-center justify-between p-4 sm:p-14 text-center">
        
        {/* Animated Radial Glow that responds to scroll */}
        <motion.div
          style={{ opacity: bgGlowOpacity }}
          className="absolute inset-0 bg-radial from-white/10 via-[#15161a]/60 to-[#111215] pointer-events-none"
        />

        {/* Ambient Concentric Neumorphic Orbit Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] sm:w-[720px] sm:h-[720px] rounded-full border border-white/5 opacity-40 [border-dasharray:4_8]" />
          <div className="w-[200px] h-[200px] sm:w-[500px] sm:h-[500px] rounded-full neu-dark-inset opacity-40" />
        </div>

        {/* Top Kicker in Inset Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-1 sm:space-y-2 pt-2 sm:pt-4"
        >
          <span className="inline-flex px-4 py-1.5 rounded-full neu-dark-inset-sm text-[10px] sm:text-xs uppercase tracking-[0.35em] text-slate-300 font-semibold">
            The Stride London Emblem
          </span>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mx-auto">
            A symbol of enduring British craftsmanship and timeless individuality.
          </p>
        </motion.div>

        {/* Center: Full-Page 360-Degree Rotating & Scaling Logo Disk in Concentric Neumorphic Rings */}
        <div className="relative z-10 my-auto py-4 sm:py-8 flex flex-col items-center justify-center">
          <motion.div
            style={{
              rotate: logoRotation,
              scale: logoScale
            }}
            className="relative cursor-pointer"
          >
            {/* Soft Ambient Luminous Specular Halo */}
            <div className="absolute inset-0 bg-white/15 rounded-full blur-3xl transform scale-125 pointer-events-none" />

            {/* Concentric Double-Tier Neumorphic Ring System */}
            <div className="p-3 sm:p-5 rounded-full neu-dark-inset shadow-[-4px_-4px_12px_rgba(255,255,255,0.06),6px_8px_20px_rgba(0,0,0,0.8)]">
              <div className="p-5 sm:p-12 rounded-full neu-dark-raised flex items-center justify-center">
                <Logo variant="monogram" size="xl" tone="silver" className="w-20 h-20 sm:w-44 sm:h-44" />
              </div>
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
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading neu-text-deboss">
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

        {/* Bottom Guide to Shop All Products with Neumorphic Action Button */}
        <div className="relative z-10 pb-4 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">
            Scroll to Discover The Catalog
          </p>
          <button
            onClick={onScrollToShop}
            className="inline-flex items-center justify-center p-3.5 rounded-full neu-dark-button text-white hover:text-slate-200 transition-all cursor-pointer"
            title="Proceed to Shop All Products"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
