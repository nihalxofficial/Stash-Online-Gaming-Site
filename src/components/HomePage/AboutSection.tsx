"use client";

import React from "react";
import { Link } from "@heroui/react";
import { AboutSectionProps } from "@/types";
import aboutBg from "@/assets/about-bg.png";
import aboutCharacter from "@/assets/about-character.jpg";

export default function AboutSection({
  sectionTagline = "About Our Gaming Site",
  title = "Beyond Gaming It's An Odyssey.",
  description = "Emerging trends in the esports industry include the growth of mobile esports, the integration of virtual reality in gaming experiences, and the increasing involvement of traditional sports.",
  leftFeaturedImage = aboutCharacter, 
  backgroundImageUrl = aboutBg, 
  ctaText = "EXPLORE MORE",
  ctaHref = "/explore",
  stats = [
    { value: "1.6K+", label: "Our Daily Game Users" },
    { value: "50M", label: "Game Downloads" },
    { value: "200+", label: "Game Launched" },
    { value: "3.6M", label: "Gaming Project Delivered" },
  ],
}: AboutSectionProps) {

  // Unpack static import objects safely
  const resolvedFeatureImg = leftFeaturedImage && typeof leftFeaturedImage === "object"
    ? leftFeaturedImage.src
    : leftFeaturedImage;

  const resolvedBgSrc = backgroundImageUrl && typeof backgroundImageUrl === "object"
    ? backgroundImageUrl.src
    : backgroundImageUrl;

  return (
    <section className="relative w-full bg-[#05060c] text-white py-16 md:py-24 overflow-hidden select-none">
      
      {/* ==========================================
           1. FULL-WIDTH CORE BACKGROUND LAYER (SHARPER VISIBILITY)
           ========================================== */}
      {resolvedBgSrc && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none opacity-[0.35] mix-blend-luminosity filter brightness-[0.45] z-0"
          style={{ backgroundImage: `url(${resolvedBgSrc})` }}
        />
      )}
      
      {/* Absolute Ambient Background UI Glows */}
      <div className="absolute right-[-5%] top-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute left-[10%] bottom-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* ==========================================
             LEFT SIDE: FEATURED IMAGE PORT
             ========================================== */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          
          {/* Angular backdrop HUD accent lines frame */}
          <div 
            className="absolute -inset-3 border border-blue-500/15 pointer-events-none hidden md:block" 
            style={{ clipPath: "polygon(0 0, 88% 0, 100% 12%, 100% 100%, 0 100%)" }} 
          />
          
          <div 
            className="p-[1.5px] transition-all duration-500 relative group w-full max-w-[380px] aspect-square shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            style={{ 
              background: "linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(168,85,247,0.15) 100%)",
              clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0 100%)"
            }}
          >
            {/* Main Picture Mask Container */}
            <div 
              className="w-full h-full bg-slate-950 overflow-hidden relative"
              style={{ clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0 100%)" }}
            >
              {resolvedFeatureImg ? (
                <img 
                  src={resolvedFeatureImg} 
                  alt="Odyssey Experience Profile" 
                  className="w-full h-full object-cover transform scale-[1.01] transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.95]"
                />
              ) : (
                <div className="w-full h-full bg-[#0a0c16] flex items-center justify-center text-xs text-blue-400 font-mono">
                  [Place leftFeaturedImage Asset]
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#05060c]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen" />
            </div>
          </div>
        </div>

        {/* ==========================================
             RIGHT SIDE: HUD PARALLEL METRICS & TEXT
             ========================================== */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-5">
          
          {/* Cyber Title Tagline */}
          <div>
            <span className="inline-block bg-blue-950/40 border border-blue-500/25 rounded px-3 py-1 text-[10px] sm:text-[11px] font-black font-mono tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 uppercase">
              {sectionTagline}
            </span>
          </div>

          {/* Section Header */}
          <h2 className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-white uppercase leading-tight max-w-2xl">
            {title}
          </h2>

          {/* Context Paragraph */}
          <p className="text-xs sm:text-sm font-sans text-gray-400 font-normal leading-relaxed max-w-xl">
            {description}
          </p>

          {/* ==========================================
               MATRIX DATA STATS PANEL (BLUE / PURPLE GRADIENT DESIGN)
               ========================================== */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 pt-4 max-w-lg">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col space-y-1 group">
                <div className="flex items-baseline space-x-0.5">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors duration-300">
                    {stat.value.replace(/[^0-9.]/g, "")}
                  </span>
                  <span className="text-lg sm:text-xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-wide leading-none">
                    {stat.value.replace(/[0-9.]/g, "")}
                  </span>
                </div>
                <span className="text-[11px] font-mono tracking-wider text-gray-400 group-hover:text-gray-300 transition-colors duration-300 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* ==========================================
               TACTICAL ACTION NODE BUTTON
               ========================================== */}
          <div className="pt-5">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black font-mono text-[11px] tracking-widest px-9 h-11 relative overflow-hidden group shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_35px_rgba(99,102,241,0.55)] hover:scale-105 transition-all duration-300"
              style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
            >
              {/* Shimmer reflection element */}
              <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform skew-x-12 transition-all duration-1000 group-hover:left-[200%]" />
              <span className="relative z-10">{ctaText} →</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}