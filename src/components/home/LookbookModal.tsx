import React, { useState } from 'react';
import { X, Play, Pause, Sparkles, Volume2, VolumeX, ArrowRight } from 'lucide-react';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExplore: () => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  onExplore
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  if (!isOpen) return null;

  const chapters = [
    {
      title: 'Chapter I: The Anatomy of Raw Calfskin',
      desc: 'Selected in Florence and Leeds. We test hide density, fiber uniformity, and elasticity before cutting.',
      image: '/src/assets/images/tannery_workshop_craft_real_1793989163039.jpg',
      timestamp: '00:45'
    },
    {
      title: 'Chapter II: Hand-Patterning & Biker Roll',
      desc: 'Every panel is hand-skived and hammer-peened to guarantee fluid shoulder rotation on and off the road.',
      image: '/src/assets/images/leather_biker_jacket_real_1793989042539.jpg',
      timestamp: '01:30'
    },
    {
      title: 'Chapter III: The Goodyear & Crust Patina',
      desc: 'Channel-cut veg-tan leather soles stitched with lock-tensioned waxed linen cords for multi-decade life.',
      image: '/src/assets/images/leather_monk_strap_shoes_real_1793989042490.jpg',
      timestamp: '02:15'
    }
  ];

  const currentChapter = chapters[activeChapter];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#111111] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-xs uppercase tracking-[0.25em] text-white font-semibold">
              Stride London Atelier Film
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white text-neutral-300 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video / Visual Viewport */}
        <div className="relative aspect-16/9 bg-black overflow-hidden flex items-center justify-center">
          <img
            key={currentChapter.image}
            src={currentChapter.image}
            alt={currentChapter.title}
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Center Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute p-4 rounded-full bg-black/60 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 transition-all transform hover:scale-110 cursor-pointer shadow-2xl"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 hover:bg-white/20 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>

          {/* Progress Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className={`h-full bg-white transition-all duration-300 ${
                activeChapter === 0 ? 'w-1/3' : activeChapter === 1 ? 'w-2/3' : 'w-full'
              }`}
            />
          </div>
        </div>

        {/* Bottom Chapter Switcher */}
        <div className="p-6 bg-[#0E0E0E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 max-w-lg">
            <p className="text-[10px] uppercase tracking-widest text-white font-mono">
              {currentChapter.timestamp} · Documentary Lookbook
            </p>
            <h3 className="text-base font-bold text-white">{currentChapter.title}</h3>
            <p className="text-xs text-neutral-400 font-light">{currentChapter.desc}</p>
          </div>

          <div className="flex items-center gap-2">
            {chapters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  activeChapter === idx
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                Part {idx + 1}
              </button>
            ))}

            <button
              onClick={() => {
                onClose();
                onExplore();
              }}
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black hover:bg-white font-semibold text-xs tracking-wider transition-colors cursor-pointer"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
