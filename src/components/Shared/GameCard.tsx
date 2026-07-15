// src/components/Games/GameCard.tsx
"use client";

import React, { useMemo } from "react"; 
import Image from "next/image";
import Link from "next/link";
import { FiStar, FiEye } from "react-icons/fi";
import { GameData } from "@/types"; // Adjust this path import to point to your types definition folder
import DownloadButtonContainer from "../Games/DownloadButtonContainer";

interface GameCardProps {
  game: GameData;
}

export default function GameCard({ game }: GameCardProps) {
  const isFree = game?.price === 0;
  const releaseYear = game?.releaseDate?.split("-")[0] || game?.releaseDate || "TBA";
  
  // Safe identifier trace check extraction loop
  const targetId = game?.id || game?._id?.$oid || "";

  // GENERATE RANDOM SIZE BETWEEN 10 and 100 GB
  // Wrapped in useMemo so the number stays stable for this card instance during page usage
  const randomSize = useMemo(() => {
    const min = 10;
    const max = 100;
    const sizeVal = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${sizeVal} GB`;
  }, []);

  return (
    <div className="relative bg-[#0d0f1a]/90 border border-white/5 p-3 flex flex-col h-full shadow-2xl font-mono [clip-path:polygon(16px_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%,0_16px)] transition-all duration-300 hover:border-indigo-500/30 group">
      
      {/* Premium Linear Horizon Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-40 group-hover:opacity-100 transition-opacity duration-300 z-30" />

      {/* 1. IMAGE CONTAINER WITH CYBER SLANTS */}
      <div className="relative aspect-[16/9] w-full bg-gray-950 [clip-path:polygon(12px_0,calc(100%-12px)_0,100%_12px,100%_100%,0_100%,0_12px)] overflow-hidden">
        {game?.thumbnail && (
          <Image
            src={game.thumbnail}
            alt={game?.title || "Game Asset"}
            fill
            sizes="(max-w-7xl) 25vw, 33vw, 50vw, 100vw"
            unoptimized={game.thumbnail.endsWith('.webp') || game.thumbnail.includes('ibb.co')}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-transparent to-black/40 pointer-events-none" />

        {/* Platform Badge */}
        {game?.platform?.[0] && (
          <div className="absolute top-2 left-2 z-10">
            <span className="text-[9px] font-black tracking-widest bg-black/75 backdrop-blur-sm border border-white/10 text-indigo-400 px-2 py-0.5 rounded uppercase shadow-md">
              {game.platform[0]}
            </span>
          </div>
        )}

        {/* Rating Overlay */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-0.5 bg-black/75 backdrop-blur-sm border border-white/10 px-1.5 py-0.5 rounded text-amber-400 text-[10px] font-bold shadow-md">
          <FiStar className="fill-amber-400 w-2.5 h-2.5" />
          <span>{game?.rating ? game.rating.toFixed(1) : "0.0"}</span>
        </div>
        
        {/* Dynamic Status Badge (High Contrast Visibility Alignment) */}
        {game?.status && (
          <div className="absolute bottom-2 left-2 z-10 bg-[#08090f]/90 border border-emerald-500/30 text-emerald-400 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm">
            {game.status}
          </div>
        )}
      </div>

      {/* 2. META DATA INVENTORY */}
      <div className="pt-3 pb-2 flex flex-col flex-grow items-center text-center">
        {/* Core Title */}
        <h3 className="text-sm font-black text-white tracking-wide uppercase px-1 mb-0.5 truncate w-full group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
          {game?.title}
        </h3>

        {/* Dynamic Pricing Text Accent */}
        <p className={`text-[11px] tracking-wider font-bold mb-2 ${isFree ? "text-emerald-400 uppercase font-black" : "text-gray-400"}`}>
          {isFree ? "Free to play" : `$${game?.price?.toFixed(2)}`}
        </p>

        {/* Mini Inline Technical Specification Matrix */}
        <div className="w-full flex items-center justify-between border-t border-white/[0.04] pt-2 text-[10px] text-gray-400 font-mono">
          <span className="truncate max-w-[55%] text-gray-300 text-left">
            {game?.genre?.[0] || "General"}
          </span>
          <div className="flex items-center gap-2 shrink-0 text-right text-gray-500">
            <span>{game?.size || randomSize}</span>
            <span className="text-white/[0.04]">•</span>
            <span>{releaseYear}</span>
          </div>
        </div>
      </div>

      {/* 3. DISTINCT ACTION MATRIX WITH EXTRACTED INTERACTION COMPONENT */}
      <div className="mt-auto grid grid-cols-2 gap-1.5 pt-2 border-t border-white/[0.04]">
        
        {/* SHARED EXTRACTED COMPONENT HUB WITH GRADIENT INTEGRATION */}
        <div className="[clip-path:polygon(0_0,calc(100%-6px)_0,100%_6px,100%_100%,0_100%)] w-full flex">
          <DownloadButtonContainer
            gameId={targetId}
            price={game?.price ?? 0}
            gameTitle={game?.title || "Manifest Trace Asset"}
            variant="card"
          />
        </div>

        {/* Outlined Details Action Link Trigger */}
        <Link 
          href={`/games/${targetId}`}
          className="flex items-center justify-center gap-1 bg-[#121420]/60 hover:bg-[#121420] border border-white/5 text-gray-300 hover:text-white text-[10px] font-bold tracking-widest uppercase py-2 rounded transition-all duration-200 no-underline [clip-path:polygon(6px_0,100%_0,100%_100%,0_100%,0_6px)]"
        >
          <FiEye className="w-3 h-3" />
          <span>Details</span>
        </Link>
      </div>

    </div>
  );
}