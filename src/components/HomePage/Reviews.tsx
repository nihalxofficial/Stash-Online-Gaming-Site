"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { FiMessageSquare, FiStar } from "react-icons/fi";

// IMPORT YOUR REVIEWS BACKGROUND IMAGE HERE
import reviewsBg from "@/assets/reviews-bg.png";

interface ReviewCardProps {
  name: string;
  role: string;
  comment: string;
  rating: number;
  daysAgo: number;
  avatar: string; // Placeholder or initials profile path
}

const reviewsData: ReviewCardProps[] = [
  {
    name: "Alex_Viper",
    role: "Competitive Player",
    comment: "The match countdown layout is incredibly sharp. Zero lag on the updates and the interface looks completely premium.",
    rating: 5,
    daysAgo: 2,
    avatar: "AV",
  },
  {
    name: "Matrix_Codex",
    role: "Arena Organizer",
    comment: "Brilliant UI styling! The custom cyber cutouts and background parallax features completely set this portal apart.",
    rating: 5,
    daysAgo: 4,
    avatar: "MC",
  },
  {
    name: "Zera_Tactical",
    role: "Community Moderator",
    comment: "Clean, responsive, and incredibly fast. The community section matches the aggressive tactical vibe perfectly.",
    rating: 5,
    daysAgo: 7,
    avatar: "ZT",
  },
  {
    name: "Neon_Spectre",
    role: "Streamer",
    comment: "The animations are buttery smooth! Fast marquee combined with the grid overlays looks absolutely top tier.",
    rating: 4,
    daysAgo: 12,
    avatar: "NS",
  },
];

export default function Reviews() {
  return (
    <section className="w-full min-h-[520px] relative flex flex-col items-center justify-center overflow-hidden py-24 bg-[#020306]">
      
      {/* 1. BACKGROUND IMAGE & MASK LAYER SETUP */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src={reviewsBg} 
          alt="Reviews Panel Background"
          fill
          priority
          placeholder="blur"
          className="object-cover object-center opacity-30 mix-blend-luminosity"
        />
        
        {/* Vignette Shading Masks */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060c] via-[#05060c]/40 to-[#05060c] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05060c] via-transparent to-[#05060c] z-10" />
        
        {/* Subtle Identity Grid Line */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:32px_32px] z-20" />
      </div>

      {/* 2. SECTION HEADER CONTAINER */}
      <div className="max-w-3xl mx-auto text-center relative z-30 flex flex-col items-center px-4 mb-14 font-mono">
        <div className="flex items-center gap-2 bg-[#0d0f1a]/95 border border-blue-500/20 rounded px-3 py-1 mb-3.5 shadow-md">
          <FiMessageSquare className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] font-black text-white tracking-widest uppercase">
            Operator Feedbacks
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-wider uppercase text-white mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          What Gamers Say <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            About Our Hub
          </span>
        </h2>
      </div>

      {/* 3. BOUNDED MARQUEE CONTAINER (Pulls away from screen edges) */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 py-4">
        
        {/* Intricate Left/Right fading edges within the layout limits */}
        <div className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-16 bg-gradient-to-r from-[#020306] via-[#020306]/70 to-transparent z-40 pointer-events-none" />
        <div className="absolute right-4 sm:right-6 lg:right-8 top-0 bottom-0 w-16 bg-gradient-to-l from-[#020306] via-[#020306]/70 to-transparent z-40 pointer-events-none" />

        <Marquee 
          gradient={false}
          speed={40} 
          pauseOnHover={true}
          className="overflow-hidden py-2"
        >
          {reviewsData.map((review, idx) => (
            <div 
              key={idx} 
              className="w-[310px] sm:w-[360px] mx-4 bg-[#0d0f1a]/90 border border-white/5 relative p-5 font-mono shadow-2xl [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)] group hover:border-indigo-500/30 transition-colors duration-300"
            >
              {/* Inner Cut Accent Line */}
              <div className="absolute inset-0 border border-indigo-500/0 group-hover:border-indigo-500/10 pointer-events-none [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]" />

              {/* CARD HEADER: Operator Profile & Timeline Track */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Cyber Profile Node Shape */}
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center rounded text-[11px] font-black text-blue-400 tracking-tighter">
                    {review.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      {review.name}
                    </span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                      {review.role}
                    </span>
                  </div>
                </div>

                {/* Live Timeline Data */}
                <span className="text-[9px] text-indigo-400/70 font-bold bg-[#05060c] border border-white/5 px-2 py-0.5 rounded tracking-wide">
                  {review.daysAgo} DAYS AGO
                </span>
              </div>

              {/* Review Description Prose */}
              <p className="text-xs text-gray-400 font-sans tracking-wide whitespace-normal leading-relaxed mb-4 min-h-[60px]">
                "{review.comment}"
              </p>

              {/* CARD FOOTER: Rating Performance Accent */}
              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < review.rating ? "text-blue-400 fill-blue-400/20" : "text-gray-700"}`} 
                    />
                  ))}
                </div>
                <span className="text-[9px] font-black text-gray-600 tracking-widest uppercase group-hover:text-purple-400 transition-colors">
                  SECURE_LOG //
                </span>
              </div>
              
              {/* Corner Cyber Underline */}
              <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </Marquee>

      </div>
    </section>
  );
}