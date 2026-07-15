"use client";

import React from "react";
import GameCard from "../Shared/GameCard";
import { GameData } from "@/types";

interface LatestGamesProps {
  initialGames: GameData[];
}

export default function LatestGames({ initialGames }: LatestGamesProps) {
  
  // Array type confirmation check running before execution slicing
  const gamesToShow = Array.isArray(initialGames) ? initialGames.slice(0, 6) : [];

  return (
    <section className="w-full bg-[#05060c] py-16 sm:py-24 relative">
      {/* Subtle Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Cyber Block Title Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between min-h-16 bg-[#0d0f1a]/80 backdrop-blur-md rounded-xl border border-white/5 shadow-xl mb-12 font-mono overflow-hidden">
          
          <div 
            className="h-full bg-[#121420] border-r border-gray-800/60 py-4 px-6 sm:px-8 flex items-center gap-3 shrink-0 [clip-path:polygon(0_0,100%_0,90%_100%,0%_100%)] pr-12 md:pr-16"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-widest">
              ST<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">ASH</span> LATEST DEPLOYMENTS
            </h2>
          </div>

          <div className="flex-1 py-4 px-6 lg:px-8 text-left text-xs text-gray-400 font-sans tracking-wide leading-relaxed">
            Reviewing active gaming nodes and live database indices configured inside the global stash repository architecture.
          </div>
        </div>

        {/* Reusable Grid Array - Limited up to 6 data metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {gamesToShow.map((game) => {
            const gameKey = game.id || (typeof game._id === "string" ? game._id : game._id?.$oid) || Math.random().toString();
            return <GameCard key={gameKey} game={game} />;
          })}
        </div>
        
        {gamesToShow.length === 0 && (
          <div className="text-center text-xs text-gray-600 font-mono py-12 border border-dashed border-white/5 rounded-xl">
            NO ACTIVE RUNTIME NODES TRACED IN SYSTEM REGISTRY
          </div>
        )}
      </div>
    </section>
  );
}