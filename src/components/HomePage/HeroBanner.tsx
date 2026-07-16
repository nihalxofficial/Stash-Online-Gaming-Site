"use client";

import { useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { HeroCardItem } from "@/types";
import HeroBg from "@/assets/HeroBg.png";

interface HeroBannerProps {
  backgroundImageUrl?: string | unknown;
  tagline?: string;
  titleTop?: string;
  titleBottom?: string;
  ctaText?: string;
  ctaHref?: string;
  cards?: HeroCardItem[];
}

const defaultCards: HeroCardItem[] = [
  {
    id: "fleet-game",
    title: "FLEET GAME",
    description: "It has also influenced game design reaching a broader demographic.",
    imageUrl: "https://i.ibb.co.com/DPS3QCpJ/Chat-GPT-Image-Jul-16-2026-02-43-27-PM.png",
    href: "/games/fleet-game"
  },
  {
    id: "air-fight",
    title: "AIR FIGHT",
    description: "Successful esports teams exhibit strong communication, strategic.",
    imageUrl: "https://i.ibb.co.com/WpG6Chn8/Chat-GPT-Image-Jul-16-2026-02-47-00-PM.png",
    href: "/games/air-fight"
  },
  {
    id: "capture-base",
    title: "CAPTURE THE BASE",
    description: "The rise of mobile gaming has significantly expanded the gaming.",
    imageUrl: "https://i.ibb.co.com/MxcYw8C6/Chat-GPT-Image-Jul-16-2026-02-33-05-PM.png",
    href: "/games/capture-base"
  },
  {
    id: "shadow-hunter",
    title: "SHADOW HUNTER",
    description: "Immersive tactical missions requiring extreme focus and rapid reflexes.",
    imageUrl: "https://i.ibb.co.com/HpDc0cy5/Chat-GPT-Image-Jul-16-2026-02-35-49-PM.png",
    href: "/games/shadow-hunter"
  },
  {
    id: "nexus-breach",
    title: "NEXUS BREACH",
    description: "Coordinate with your faction to penetrate heavily guarded cyber barriers.",
    imageUrl: "https://i.ibb.co.com/4RQrWkdK/Chat-GPT-Image-Jul-16-2026-02-39-26-PM.png",
    href: "/games/nexus-breach"
  },
  {
    id: "alpha-squad",
    title: "ALPHA SQUAD",
    description: "Compete against global elite operators in high-stakes warfront environments.",
    imageUrl: "https://i.ibb.co.com/Xf0DrfZb/828df9af-9ca2-486b-9cd0-6eab383f5b1a.png",
    href: "/games/alpha-squad"
  }
];

export default function HeroBanner({
  backgroundImageUrl = HeroBg,
  tagline = "PLAY, IMPROVE & WIN",
  titleTop = "ONLINE FANTASY",
  titleBottom = "VIDEO GAME",
  ctaText = "EXPLORE MORE",
  ctaHref = "/games",
  cards = defaultCards
}: HeroBannerProps) {
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: true })
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // FIXED: Cast static import objects through 'any' to cleanly pull out the .src value 
  const rawBgSrc = backgroundImageUrl as any;
  const resolvedBgSrc = rawBgSrc && typeof rawBgSrc === "object"
    ? rawBgSrc.src
    : backgroundImageUrl;

  return (
    <div className="relative w-full min-h-screen bg-[#05060c] flex flex-col justify-between overflow-hidden">
      
      {/* ==========================================
           1. CINEMATIC BACKGROUND LAYERS (LIGHTER OVERLAY)
           ========================================== */}
      {resolvedBgSrc && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.65] pointer-events-none"
          style={{ backgroundImage: `url(${resolvedBgSrc})` }}
        />
      )}
      {/* Subdued soft radial drop-shadows instead of heavy linear blocks */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#05060c]/80 pointer-events-none" />

      {/* Tighter, Lower Slanted Bottom Accent Frame */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[32%] bg-[#080a14]/90 border-t border-white/5 z-10 pointer-events-none hidden md:block"
        style={{ clipPath: "polygon(0 15%, 12% 0, 88% 0, 100% 15%, 100% 100%, 0% 100%)" }}
      />

      {/* ==========================================
           2. TIGHTENED COMPACT CENTRAL TYPOGRAPHY
           ========================================== */}
      <div className="relative z-20 max-w-5xl mx-auto w-full px-4 pt-28 pb-6 md:pt-36 flex-1 flex flex-col justify-center items-center text-center">
        <span className="text-xs font-black font-mono tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">
          {tagline}
        </span>

        {/* Scaled down text sizing to show more background space */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-mono tracking-tight text-white uppercase leading-none select-none max-w-4xl">
          <span className="block mb-2">{titleTop}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 filter drop-shadow-[0_0_12px_rgba(99,102,241,0.3)]">
            {titleBottom}
          </span>
        </h1>

        {/* More compact action button */}
        <div className="mt-6">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black font-mono text-[10px] tracking-widest px-8 h-10 relative overflow-hidden group shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:scale-105 transition-all duration-300"
            style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
          >
            <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform skew-x-12 transition-all duration-1000 group-hover:left-[200%]" />
            <span>{ctaText} +</span>
          </Link>
        </div>
      </div>

      {/* ==========================================
           3. DYNAMIC HUD CARDS CAROUSEL DOCK
           ========================================== */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
        
        <div className="relative w-full px-4 md:px-8">
          
          {/* Compact Left Arrow */}
          <button 
            onClick={scrollPrev}
            aria-label="Previous Slide"
            className="absolute left-0 top-[90px] md:top-[100px] -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-[#131926]/90 border border-blue-500/30 text-blue-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:border-blue-400 active:scale-90 cursor-pointer"
          >
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Compact Right Arrow */}
          <button 
            onClick={scrollNext}
            aria-label="Next Slide"
            className="absolute right-0 top-[90px] md:top-[100px] -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-[#131926]/90 border border-purple-500/30 text-purple-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:border-purple-400 active:scale-90 cursor-pointer"
          >
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Embla Slider Frame Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-6">
              {cards.map((card) => (
                <div 
                  key={card.id} 
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] min-w-0 pl-6 group flex flex-col relative"
                >
                  
                  {/* A. CARD IMAGE FRAME CONTAINER */}
                  <div 
                    className="relative p-[1.5px] transition-all duration-300"
                    style={{ 
                      background: "linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(168,85,247,0.2) 100%)",
                      clipPath: "polygon(5% 0, 95% 0, 100% 8%, 100% 92%, 95% 100%, 5% 100%, 0 92%, 0 8%)"
                    }}
                  >
                    {/* Lowered heights for a shorter HUD dock */}
                    <div 
                      className="relative h-44 md:h-48 overflow-hidden bg-slate-950"
                      style={{ 
                        clipPath: "polygon(5% 0, 95% 0, 100% 8%, 100% 92%, 95% 100%, 5% 100%, 0 92%, 0 8%)" 
                      }}
                    >
                      <img 
                        src={card.imageUrl} 
                        alt={card.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out brightness-[0.9]"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 via-blue-500/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 mix-blend-screen" />

                      {/* Hover Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 z-30">
                        <Link
                          href={card.href}
                          className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black font-mono text-[9px] tracking-widest px-5 h-8 relative overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                          style={{ clipPath: "polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)" }}
                        >
                          <span>PLAY NOW</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* B. BASE CONTENT METADATA CONTAINER */}
                  <div className="mt-3 text-center flex flex-col items-center space-y-1 px-4">
                    <Link 
                      href={card.href}
                      className="text-sm md:text-base font-black font-mono tracking-widest text-white transition-colors duration-300 group-hover:text-blue-400 uppercase"
                    >
                      {card.title}
                    </Link>
                    
                    <p className="text-[11px] md:text-xs font-sans text-gray-400 font-normal leading-normal max-w-[280px]">
                      {card.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}