"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiUsers, FiArrowRight } from "react-icons/fi";

import communityBanner from "@/assets/community-banner.png"; 

export default function CommunityCTA() {
  return (
    <section className="w-full bg-[#05060c] py-16 px-4 sm:px-6 lg:px-8 font-mono relative overflow-hidden">
      {/* Structural Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293704_1px,transparent_1px),linear-gradient(to_bottom,#1f293704_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* MAIN CONTAINER: Angled Cyber Panel Profile Matching Your App Style */}
      <div className="max-w-6xl mx-auto bg-[#0d0f1a]/60 border border-white/5 relative z-10 min-h-[380px] [clip-path:polygon(40px_0,100%_0,100%_calc(100%-40px),calc(100%-40px)_100%,0_100%,0_40px)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center overflow-hidden">
        
        {/* Subtle inner accent border for the clipped shape */}
        <div className="absolute inset-0 border border-indigo-500/10 pointer-events-none z-30 [clip-path:polygon(40px_0,100%_0,100%_calc(100%-40px),calc(100%-40px)_100%,0_100%,0_40px)]" />

        {/* RIGHT SIDE: THE POSITIONED IMAGE ASSET */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] h-full z-0 select-none pointer-events-none group">
          <Image 
            src={communityBanner} 
            alt="Community Heroes Frame" 
            fill
            priority
            placeholder="blur"
            className="object-cover object-right lg:object-center transition-transform duration-[6000ms] ease-out group-hover:scale-[1.03]"
          />
          
          {/* HORIZONTAL GRADIENT MASK: Blends the image into the dark container background on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f1a] via-[#0d0f1a]/40 to-transparent hidden lg:block z-10" />
          
          {/* VERTICAL GRADIENT MASK: For clean stacking on mobile views */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f1a] via-transparent to-[#0d0f1a] lg:hidden z-10" />
        </div>

        {/* LEFT COLUMN: TEXT CONTENT STACK (Forced on top of the background layout via z-20) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col relative z-20 p-6 sm:p-10 lg:p-14 bg-gradient-to-r from-[#0d0f1a] via-[#0d0f1a]/90 to-transparent lg:bg-none">
          
          {/* Subtitle Accent Tag */}
          <div className="inline-flex items-center gap-1.5 self-start bg-[#05060c] border border-blue-500/20 rounded px-3 py-1 mb-4 text-[10px] font-black tracking-widest uppercase text-blue-400 shadow-md">
            <FiUsers className="w-3 h-3 text-blue-400 animate-pulse" />
            <span>Join The Frontline</span>
          </div>

          {/* Core Header Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-wider mb-4 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Ready To Unlock Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Potentials In A World Of Fun
            </span>
          </h2>

          {/* Description Prose */}
          <p className="text-xs sm:text-[13px] text-gray-400 font-sans tracking-wide leading-relaxed max-w-md mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            Connect with thousands of global operatives. Coordinate tactical deployment windows, share community-driven arena configurations, and cement your legacy on our global leaderboards.
          </p>

          {/* CYBER-ANGLED CTA BUTTON */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-black tracking-widest uppercase px-7 py-3.5 self-start shadow-xl shadow-indigo-950/50 cursor-pointer [clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,0_100%)]"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span>Join Community</span>
            <FiArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}