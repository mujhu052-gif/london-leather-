import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Feather, Clock } from 'lucide-react';
import { Logo } from '../common/Logo';
import { TypewriterText } from '../common/TypewriterText';

interface BrandStorySectionProps {
  onExplore: () => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onExplore }) => {
  return (
    <section id="brand-story" className="relative px-2.5 sm:px-6 lg:px-8 py-6 sm:py-16 lg:py-24 max-w-[1520px] mx-auto">
      {/* Editorial Neumorphic White/Soft Slate Storytelling Card */}
      <div className="relative rounded-[1.75rem] sm:rounded-[3.5rem] neu-light-raised-lg text-[#1e2229] p-4 sm:p-12 lg:p-20 overflow-hidden">
        
        {/* Large Subtle Watermark Geometric Emblem in Center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <Logo variant="monogram" size="xl" tone="dark" className="w-[300px] h-[300px] sm:w-[520px] sm:h-[520px]" />
        </div>

        {/* Hand-Drawn Squiggle Doodles */}
        <div className="absolute top-10 left-12 text-[#9aa7b9] hidden sm:block pointer-events-none">
          <svg className="w-16 h-12" viewBox="0 0 100 60" fill="none">
            <path d="M10 30 Q 30 10, 50 30 T 90 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M70 20 Q 80 15, 85 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute bottom-10 right-14 text-[#9aa7b9] hidden sm:block pointer-events-none">
          <svg className="w-14 h-12" viewBox="0 0 100 60" fill="none">
            <path d="M15 35 Q 35 55, 55 35 T 95 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Story Text Container with Staggered Scroll Animations */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 sm:space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-1.5 rounded-full neu-light-inset-sm text-[#404a58] text-[10px] sm:text-xs uppercase tracking-widest font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#303846]" />
            <span>Our Philosophy</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-[#161a22] font-heading leading-tight neu-light-text-deboss"
          >
            More than just leather. <br className="hidden sm:inline" />
            It’s a <span className="underline decoration-[#303846] decoration-wavy decoration-2">statement</span>.
          </motion.h2>

          {/* Reference Video Interactive Editorial Quote with Inline Media Pill */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-2xl lg:text-3xl text-[#353f4e] font-light leading-relaxed font-serif-luxury text-balance"
          >
            The world’s first circular care philosophy for bespoke leather. We believe in keeping honest hides{' '}
            <span className="font-semibold text-[#111317] underline decoration-[#8090a5]">on shoulders</span> and out of landfills. Send us back any genuine leather garment or footwear from any house, and our master bench will responsibly restore it{' '}
            <span className="inline-flex items-center align-middle mx-1 px-2.5 py-1 rounded-full neu-light-inset-sm">
              <img
                src="/src/assets/images/tannery_workshop_craft_real_1793989163039.jpg"
                alt="Artisan restoration"
                className="w-5 h-4 sm:w-7 sm:h-5 object-cover rounded-full mr-1.5 inline-block shadow-sm"
              />
              <span className="text-[10px] sm:text-xs font-mono text-[#111317] font-semibold">Bespoke Atelier</span>
            </span>{' '}
            and keep its timeless legacy thriving for the next generation.
          </motion.p>

          {/* 4 Pillars Grid in Neumorphic Inset Wells */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-5 sm:pt-10 text-left border-t border-[#c0cad8]/50"
          >
            <div className="space-y-1.5 neu-light-inset-sm p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#161a22]">
                <Feather className="w-4 h-4 text-[#303846]" />
                <span>Full-Grain Only</span>
              </div>
              <p className="text-xs text-[#505c70] font-light leading-snug">
                Zero corrected-grain or bonded substitutes. 100% natural grain hides.
              </p>
            </div>

            <div className="space-y-1.5 neu-light-inset-sm p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#161a22]">
                <Clock className="w-4 h-4 text-[#303846]" />
                <span>Lifetime Patina</span>
              </div>
              <p className="text-xs text-[#505c70] font-light leading-snug">
                Gains warmth, comfort and richer depth with every single season.
              </p>
            </div>

            <div className="space-y-1.5 neu-light-inset-sm p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#161a22]">
                <Shield className="w-4 h-4 text-[#303846]" />
                <span>Goodyear Welts</span>
              </div>
              <p className="text-xs text-[#505c70] font-light leading-snug">
                Fully resolable footwear and heavy-gauge locked stitching on coats.
              </p>
            </div>

            <div className="space-y-1.5 neu-light-inset-sm p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#161a22]">
                <Sparkles className="w-4 h-4 text-[#303846]" />
                <span>London Heritage</span>
              </div>
              <p className="text-xs text-[#505c70] font-light leading-snug">
                Savile Row tailoring precision fused with master tannery craftsmanship.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-6"
          >
            <button
              onClick={onExplore}
              className="px-8 py-3.5 rounded-full bg-[#15171c] hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest shadow-[-3px_-3px_8px_rgba(255,255,255,0.8),4px_6px_14px_rgba(0,0,0,0.4)] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
            >
              Shop The Heritage Catalog
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
