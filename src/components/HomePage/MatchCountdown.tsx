"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiTv, FiZap } from "react-icons/fi";
import countdownBg from "@/assets/countdown-bg.png";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function MatchCountdown() {
  const targetDate = "2026-08-15T18:00:00"; 

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) return;

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: d < 10 ? `0${d}` : `${d}`,
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        seconds: s < 10 ? `0${s}` : `${s}`,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="w-full min-h-[580px] relative flex items-center justify-center overflow-hidden py-24 px-4 font-mono group/section bg-[#020306]">
      
      {/* 1. ULTRA-VISIBLE BACKDROP LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src={countdownBg} 
          alt="Match Background Arena"
          fill
          priority
          placeholder="blur"
          // High opacity value so your custom artwork is completely clear
          className="object-cover object-center opacity-85 transition-transform duration-[6000ms] ease-out group-hover/section:scale-[1.02]"
        />
        
        {/* Vignette border shading to keep the outer edges blending with your site design */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060c] via-transparent to-[#05060c] z-10 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05060c] via-transparent to-[#05060c] z-10 opacity-60" />
        
        {/* Tech Grid Pattern Layer using screen blend so it adapts to the artwork highlight colors */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:32px_32px] z-20 mix-blend-screen" />
      </div>

      {/* 2. CENTERED SCALED CONTROLS COMPOSITION */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl mx-auto text-center relative z-30 flex flex-col items-center justify-center mix-blend-normal"
      >
        
        {/* Subtitle Accent Pill Container */}
        <div className="flex items-center gap-2 bg-[#05060c]/90 border border-blue-500/30 rounded px-3 py-1 mb-3.5 shadow-2xl backdrop-blur-sm">
          <FiZap className="w-3 h-3 text-blue-400 animate-pulse" />
          <span className="text-[10px] font-black text-white tracking-widest uppercase">
            Big Match Series
          </span>
        </div>

        {/* Scaled Crisp Typography Header */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Valorant Arena Cup
        </h2>

        {/* Structured Date Display Row */}
        <p className="text-[11px] sm:text-xs text-gray-300 tracking-widest uppercase font-bold mb-8 bg-[#05060c]/80 backdrop-blur-md border border-white/10 rounded px-3 py-1 shadow-xl">
          15 August, 2026 - 6:00 PM
        </p>

        {/* 3. TRANSITIONING TIMER MATRIX */}
        <div className="grid grid-cols-4 gap-3 max-w-lg w-full mb-10 mx-auto">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Mins" },
            { value: timeLeft.seconds, label: "Secs" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-full bg-[#05060c]/95 border border-white/10 relative flex items-center justify-center py-3.5 sm:py-4.5 rounded shadow-2xl backdrop-blur-md [clip-path:polygon(0_0,calc(100%-6px)_0,100%_6px,100%_100%,0_100%)] group-hover:border-indigo-500/40 transition-colors duration-300">
                
                <motion.span 
                  key={item.value}
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-xl sm:text-3xl font-black text-white tracking-wide font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                >
                  {item.value}
                </motion.span>

                {/* Identity Gradient Border Line */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* 4. BRAND CORE IDENTITY ACTIONS TABS */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-black tracking-widest uppercase px-7 py-3 shadow-2xl shadow-indigo-950/50 transition-all duration-300 cursor-pointer [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,0_100%)]"
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <FiTv className="w-3.5 h-3.5 text-white group-hover:rotate-6 transition-transform duration-200" />
          <span>Watch The Match</span>
        </motion.button>

      </motion.div>
    </section>
  );
}