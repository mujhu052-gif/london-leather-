import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowUpRight, Sparkles, Feather } from 'lucide-react';
import { Logo } from '../common/Logo';
import { TypewriterText } from '../common/TypewriterText';

interface SplitStorySectionProps {
  onNavigateToCategory: (category: string) => void;
  onOpenProduct: (productId: string) => void;
}

export const SplitStorySection: React.FC<SplitStorySectionProps> = ({
  onNavigateToCategory,
  onOpenProduct
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedFinish, setSelectedFinish] = useState('Full-Grain');

  // Parallax scroll on the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  // Parallax transform for the footwear image and decorative layers
  const shoeImageY = useTransform(smoothProgress, [0, 1], ['-10%', '12%']);
  const shoeImageScale = useTransform(smoothProgress, [0, 1], [1.08, 1]);
  const leftCardY = useTransform(smoothProgress, [0, 1], ['0%', '4%']);
  const rightStackY = useTransform(smoothProgress, [0, 1], ['4%', '-4%']);

  const leatherFinishes = [
    { name: 'Full-Grain', desc: 'Uncompromised top layer of hide; natural pores and lifetime durability.' },
    { name: 'Veg-Tanned', desc: 'Aged with organic chestnut and mimosa bark tannins for deep individual patina.' },
    { name: 'Bridle', desc: 'Heavyweight waxed leather renowned for indestructible tensile strength.' },
    { name: 'Nappa', desc: 'Supple, butter-soft tumbled calfskin tailored for all-day luxury wear.' },
    { name: 'Suede', desc: 'Velvety reverse nap split calf for seasonal textures and understated depth.' },
    { name: 'Cordovan', desc: 'Rare equine hide known for glass-like luster and zero micro-creasing.' }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative px-2.5 sm:px-6 lg:px-8 py-6 sm:py-16 lg:py-24 max-w-[1520px] mx-auto overflow-hidden"
    >
      {/* Outer Container with Split-Screen Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        
        {/* Left Side: Dark Neumorphic Editorial Box with Motion Reveals */}
        <motion.div
          style={{ y: leftCardY }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 rounded-[1.75rem] sm:rounded-[3rem] neu-dark-raised-lg p-4 sm:p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-[90px] pointer-events-none" />

          {/* Top Mission Statement with Emblem inside Inset Well */}
          <div className="relative z-10 flex items-start gap-3 sm:gap-4 mb-4 sm:mb-8">
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl neu-dark-inset-sm shrink-0">
              <Logo variant="monogram" size="sm" tone="silver" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-slate-300 font-semibold">
                Haute Curation Directive
              </p>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
                We reject seasonal obsolescence. Every hide is tanned slowly, inspected by touch, and shaped to celebrate raw natural nobility.
              </p>
            </div>
          </div>

          {/* Big Editorial Headline with Styled Non-Robotic Copy */}
          <div className="relative z-10 my-auto py-2 sm:py-8 space-y-2.5 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full neu-dark-inset-sm text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-300 font-semibold">
              <Feather className="w-3.5 h-3.5 text-slate-300" />
              <span>Bespoke Wardrobe Architecture</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] font-heading neu-text-deboss">
              Find your signature <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                leather silhouette.
              </span>
            </h2>

            <div className="min-h-[1.6em]">
              <TypewriterText
                text="From timeless aviators to sculptured cafe racers."
                delay={300}
                speed={24}
                as="p"
                className="text-base sm:text-xl text-neutral-300 font-serif-luxury italic font-light pt-0.5"
              />
            </div>

            <div className="min-h-[2.4em]">
              <TypewriterText
                text="Crafted with intention. Designed for individuals who understand that true luxury speaks in whispers of heavy brass and honest grain."
                delay={850}
                speed={16}
                as="p"
                className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed font-light"
              />
            </div>
          </div>

          {/* Bottom Action Row with Circular Neumorphic Button */}
          <div className="relative z-10 pt-4 sm:pt-8 border-t border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-widest text-white font-medium">Explore Outwear & Accessories</p>
              <p className="text-[9px] sm:text-[10px] text-neutral-500 mt-0.5">Custom sizing & concierge consultations available</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigateToCategory('jackets')}
              className="group p-3 sm:p-4 rounded-full neu-dark-button text-white hover:text-slate-200 transition-all cursor-pointer"
              aria-label="Explore leather styles"
            >
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side: 3-Stack Editorial Grid with Neumorphic Relief */}
        <motion.div
          style={{ y: rightStackY }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          
          {/* Item 1: Top Leather Footwear Card with Inset Bevel and Parallax Depth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onOpenProduct('prod-2')}
            className="group relative h-48 sm:h-76 rounded-2xl sm:rounded-[2.5rem] overflow-hidden neu-dark-raised cursor-pointer p-2"
          >
            <div className="relative w-full h-full rounded-xl sm:rounded-[2rem] overflow-hidden neu-dark-inset">
              {/* Parallax Moving Image inside container */}
              <motion.img
                style={{
                  y: shoeImageY,
                  scale: shoeImageScale
                }}
                src="/src/assets/images/leather_monk_strap_shoes_real_1793989042490.jpg"
                alt="Savile Double Monk Strap Footwear"
                className="absolute inset-0 w-full h-[125%] object-cover object-center filter contrast-[1.05]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 neu-dark-inset-sm px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-200 font-medium">
                Goodyear Welted
              </div>

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between z-10">
                <div>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-300 font-semibold">Benchmade Last</p>
                  <h3 className="text-lg sm:text-2xl font-bold text-white mt-0.5">Savile Double-Monk Strap</h3>
                  <p className="text-[11px] sm:text-xs text-neutral-300 font-light mt-0.5">Hand-burnished cognac crust leather</p>
                </div>
                <span className="text-xs text-white font-mono font-bold neu-dark-inset-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl">
                  PKR 31,500
                </span>
              </div>
            </div>
          </motion.div>

          {/* Item 2: Middle Soft Rose Accent Banner with Neumorphic Drop Shadow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-2xl sm:rounded-[2.5rem] bg-[#dfd6d4] text-[#1c1d22] p-4 sm:p-8 flex flex-col justify-between shadow-[-5px_-5px_14px_rgba(255,255,255,0.7),6px_8px_20px_rgba(150,140,140,0.3)]"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#1c1d22]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] font-bold text-[#1c1d22]">
                Heritage Tannery Standard
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1c1d22] font-heading">
              Aged Slowly in Vegetable Pits
            </h3>
            <p className="text-xs sm:text-sm text-neutral-800 mt-1 sm:mt-2 leading-relaxed font-light">
              We select exclusively the prime top 5% density cuts. Each jacket and pair of shoes is hand-finished with organic wax and oil balms, resulting in a rich luster that softens with every wear.
            </p>
          </motion.div>

          {/* Item 3: Bottom Pill Cloud of Materials with Neumorphic Light Raised Finish */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl sm:rounded-[2.5rem] neu-light-raised text-[#1e2229] p-4 sm:p-8 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#202530]">
                  Prime Hide Classifications
                </span>
                <p className="text-[10px] text-neutral-500 mt-0.5">Select a hide grade to inspect properties</p>
              </div>
              <span className="text-[11px] text-[#202530] font-mono font-bold neu-light-inset-sm px-3 py-1 rounded-full">
                100% Certified
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {leatherFinishes.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setSelectedFinish(item.name)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedFinish === item.name
                      ? 'bg-[#15171c] text-white shadow-[-2px_-2px_6px_rgba(255,255,255,0.08),3px_4px_10px_rgba(0,0,0,0.5)] scale-105'
                      : 'neu-light-button text-[#404a58] hover:text-[#111317]'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Selected finish explanation in recessed Neumorphic well */}
            <div className="mt-4 pt-3 neu-light-inset-sm p-3 rounded-xl">
              <p className="text-xs text-[#455060] italic">
                {leatherFinishes.find(f => f.name === selectedFinish)?.desc}
              </p>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};
