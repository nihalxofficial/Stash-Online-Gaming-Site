// src/components/Shared/GameCard.tsx
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiStar, FiEye } from "react-icons/fi";
import { GameData } from "@/types";
import DownloadButtonContainer from "../Games/DownloadButtonContainer";

interface GameCardProps {
  game: GameData;
}

export default function GameCard({ game }: GameCardProps) {
  const isFree = game?.price === 0;
  const releaseYear =
    game?.releaseDate?.split("-")[0] || game?.releaseDate || "TBA";

  // FIXED: Handled non-overlapping union structures safely using an initial generic reference
  const targetId = typeof game?._id === "object" && game?._id && "$oid" in game._id
    ? (game._id as { $oid: string }).$oid
    : (game?._id as any) || "";

  // 1. RANDOM SIZE GENERATOR (10 GB to 100 GB)
  const randomSize = useMemo(() => {
    const min = 10;
    const max = 100;
    const sizeVal = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${sizeVal} GB`;
  }, []);

  return (
    <div className="relative bg-[#0d0f1a]/90 border border-white/5 p-3 flex flex-col h-full shadow-2xl font-mono [clip-path:polygon(16px_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%,0_16px)] transition-all duration-300 hover:border-indigo-500/30 group">
      {/* WRAPPER LINK */}
      <Link href={`/games/${targetId}`} className="absolute inset-0 z-20" />

      {/* Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-40 group-hover:opacity-100 transition-opacity duration-300 z-30" />

      {/* 1. IMAGE CONTAINER */}
      <div className="relative aspect-[16/9] w-full bg-gray-950 [clip-path:polygon(12px_0,calc(100%-12px)_0,100%_12px,100%_100%,0_100%,0_12px)] overflow-hidden">
        {game?.thumbnail && (
          <Image
            src={game.thumbnail}
            alt={game?.title || "Game Asset"}
            fill
            sizes="(max-w-7xl) 25vw, 33vw, 50vw, 100vw"
            unoptimized={
              game.thumbnail.endsWith(".webp") ||
              game.thumbnail.includes("ibb.co")
            }
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-transparent to-black/40 pointer-events-none" />

        {/* Top Left: Platform Overlay */}
        <div className="absolute top-2 left-2 z-10 bg-black/75 backdrop-blur-sm border border-white/10 px-1.5 py-0.5 rounded text-cyan-400 text-[10px] font-bold shadow-md uppercase tracking-wider max-w-[120px] truncate">
          {game?.platform?.[0] || "PC"}
        </div>

        {/* Top Right: Rating Overlay */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-0.5 bg-black/75 backdrop-blur-sm border border-white/10 px-1.5 py-0.5 rounded text-amber-400 text-[10px] font-bold shadow-md">
          <FiStar className="fill-amber-400 w-2.5 h-2.5" />
          <span>{game?.rating ? game.rating.toFixed(1) : "0.0"}</span>
        </div>
      </div>

      {/* 2. META DATA INVENTORY */}
      <div className="pt-3 pb-2 flex flex-col flex-grow items-center text-center px-2">
        <h3 className="text-sm font-black text-white tracking-wide uppercase px-1 mb-1 truncate w-full group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
          {game?.title}
        </h3>

        <p className="text-[10px] text-gray-500 mb-2 line-clamp-2 leading-tight">
          {game?.description ||
            "An immersive gaming experience. Explore expansive worlds and master the gameplay mechanics in this unique title."}
        </p>

        {/* META ROW: SHOWING GENRE & PRICE */}
        <div className="w-full flex items-center justify-between border-t border-white/[0.04] pt-2 text-[10px] text-gray-400 font-mono">
          <span className="truncate max-w-[35%] text-indigo-400 text-left uppercase font-bold tracking-tight">
            {game?.genre?.[0] || "General"}
          </span>

          {/* Price shifted right inside this row naturally */}
          <span
            className={`text-[10px] font-black tracking-wider ml-auto mr-3 ${isFree ? "text-emerald-400 uppercase" : "text-indigo-400"}`}
          >
            {isFree ? "Free" : `$${game?.price?.toFixed(2)}`}
          </span>

          <div className="flex items-center gap-2 shrink-0 text-right text-gray-500">
            <span>{randomSize}</span>
            <span className="text-white/[0.04]">•</span>
            <span>{releaseYear}</span>
          </div>
        </div>
      </div>

      {/* 3. FOOTER: DETAILS BUTTON (LEFT) | DOWNLOAD BUTTON (RIGHT) */}
      <div className="mt-auto grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.04] z-30 relative">
        {/* View Details Outlined Trigger */}
        <Link
          href={`/games/${targetId}`}
          className="flex items-center justify-center gap-1 bg-[#121420]/60 hover:bg-[#121420] border border-white/5 text-gray-300 hover:text-white text-[10px] font-bold tracking-widest uppercase py-2 rounded transition-all duration-200 no-underline [clip-path:polygon(0_0,calc(100%-6px)_0,100%_6px,100%_100%,0_100%)]"
        >
          <FiEye className="w-3 h-3" />
          <span>Details</span>
        </Link>

        {/* Action Download Hub */}
        <div
          className="[clip-path:polygon(0_0,calc(100%-6px)_0,100%_6px,100%_100%,0_100%)] w-full flex"
          onClick={(e) => e.stopPropagation()}
        >
          <DownloadButtonContainer
            gameId={targetId}
            price={game?.price ?? 0}
            gameTitle={game?.title || "Asset"}
            variant="card"
          />
        </div>
      </div>
    </div>
  );
}