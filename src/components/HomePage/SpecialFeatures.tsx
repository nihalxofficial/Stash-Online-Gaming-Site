"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiZap } from "react-icons/fi";

interface FeatureNode {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

const featuresData: FeatureNode[] = [
  {
    id: "feat_1",
    title: "Survive At All Costs",
    description: "You have 30 minutes to find a historic relic, signal for emergency extraction and secure one of three highly contested deployment spots on the rogue chopper.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    tag: "TACTICAL EXTRACTION",
  },
  {
    id: "feat_2",
    title: "Create Allies and Enemies",
    description: "Form immediate operational diplomatic pacts or betray local squads in real-time. Dynamic faction algorithms trace every round fired and contract broken.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    tag: "FACTION ECOSYSTEM",
  },
  {
    id: "feat_3",
    title: "Impress the Audience",
    description: "Execute technical combo combinations and high-tier map placements to generate network hype points, instantly unlocking special orbit support capabilities.",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800",
    tag: "BROADCAST ENGINES",
  },
];

export default function SpecialFeatures() {
  const [activeTab, setActiveTab] = useState<string>("feat_1");

  const currentFeature = featuresData.find((f) => f.id === activeTab) || featuresData[0];

  return (
    <section className="w-full bg-[#05060c] py-20 sm:py-28 relative overflow-hidden font-mono">
      {/* Structural Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293704_1px,transparent_1px),linear-gradient(to_bottom,#1f293704_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: INTERACTIVE STEPPING STEP INDEX */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Tagline Indicator Capsule */}
          <div className="inline-flex items-center gap-1.5 self-start bg-[#0d0f1a] border border-blue-500/20 rounded px-3 py-1 mb-3 text-[11px] font-black tracking-widest uppercase text-blue-400">
            <FiZap className="w-3 h-3 text-blue-400 animate-pulse" />
            <span>Why So Special?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-wider mb-10">
            Our Gaming <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Special Features
            </span>
          </h2>

          {/* Interactive Stepper Navigation Stack */}
          <div className="relative border-l-2 border-white/[0.04] pl-6 ml-2 flex flex-col gap-6">
            {featuresData.map((feature) => {
              const isActive = feature.id === activeTab;

              return (
                <div
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className="relative cursor-pointer group select-none py-1 rounded"
                >
                  {/* Shared Layout Active Tab Glow Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFeatureGlow"
                      className="absolute inset-0 -left-6 bg-gradient-to-r from-blue-500/5 via-indigo-500/[0.02] to-transparent pointer-events-none z-0 border-l-2 border-indigo-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Dynamic Glowing Step Timeline Indicator Node */}
                  <div className="absolute -left-[32px] top-2 z-20 transition-all duration-300">
                    {isActive ? (
                      <motion.div 
                        layoutId="activeNodeGlow"
                        className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center ring-4 ring-indigo-500/20"
                      >
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </motion.div>
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-[#111422] border-2 border-gray-700 group-hover:border-blue-500 transition-colors" />
                    )}
                  </div>

                  {/* Header Title Accent */}
                  <h3
                    className={`text-sm sm:text-base font-black uppercase tracking-wider transition-all duration-300 relative z-10 ${
                      isActive
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 scale-[1.01]"
                        : "text-gray-400 group-hover:text-gray-200"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  {/* Collapsible Content Panel */}
                  <div className="overflow-hidden">
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {/* Inner container to apply slide text movement directionally */}
                          <motion.p 
                            initial={{ x: -8, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.05, duration: 0.2 }}
                            className="text-xs sm:text-[13px] text-gray-400 font-sans tracking-wide leading-relaxed max-w-md relative z-10"
                          >
                            {feature.description}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: CYBER ROUNDED CUT-OUT MEDIA CONTAINER */}
        <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
          <div className="relative w-full max-w-[580px] aspect-[4/3] bg-[#0d0f1a] border border-white/5 p-3 shadow-2xl [clip-path:polygon(32px_0,calc(100%-32px)_0,100%_32px,100%_calc(100%-32px),calc(100%-32px)_100%,32px_100%,0_calc(100%-32px),0_32px)] group">
            
            {/* Visual Horizon Mesh Outline Accent */}
            <div className="absolute inset-0 border border-indigo-500/0 group-hover:border-indigo-500/20 transition-colors duration-300 pointer-events-none [clip-path:polygon(32px_0,calc(100%-32px)_0,100%_32px,100%_calc(100%-32px),calc(100%-32px)_100%,32px_100%,0_calc(100%-32px),0_32px)]" />
            
            {/* Inner Clipped Image Node Frame Wrapper */}
            <div className="relative w-full h-full bg-gray-950 overflow-hidden [clip-path:polygon(24px_0,calc(100%-24px)_0,100%_24px,100%_calc(100%-24px),calc(100%-24px)_100%,24px_100%,0_calc(100%-24px),0_24px)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.id}
                  initial={{ opacity: 0, scale: 1.04, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentFeature.image}
                    alt={currentFeature.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                </motion.div>
              </AnimatePresence>

              {/* Central Floating Play Controller Node */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.button
                  type="button"
                  aria-label="Launch Module Content"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 transition-all duration-300 cursor-pointer group/btn"
                >
                  <FiPlay className="w-6 h-6 fill-white ml-1 group-hover/btn:scale-105 transition-transform" />
                </motion.button>
              </div>

              {/* Bottom Metadata Label Overlay */}
              <div className="absolute bottom-4 left-6 z-20 hidden sm:block overflow-hidden rounded">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature.tag}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-black/60 backdrop-blur-md border border-white/5 px-3 py-1"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                      {currentFeature.tag}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}