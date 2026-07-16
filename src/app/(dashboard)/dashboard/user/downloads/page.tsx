// src/app/dashboard/user/downloads/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDownloads } from "@/lib/api/downloads";
import { getUserSession } from "@/lib/core/session";
import { FiDownloadCloud, FiClock, FiArrowUpRight, FiDollarSign } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";

// Updated type reflecting the data structure
interface DownloadRecord {
  _id: string;
  user: string;
  game: {
    _id: string | { $oid: string };
    title: string;
    thumbnail: string;
    price?: number | string; // Added optional price field inside game object
  };
  price?: number | string; // Added optional top-level price field just in case
  downloadedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default async function DownloadsPage() {
  const user = await getUserSession();
  
  const downloadsData = await getDownloads(user?.id);
  const downloads: DownloadRecord[] = Array.isArray(downloadsData) ? downloadsData : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-[#05060c] text-white font-mono selection:bg-indigo-500/30">
      
      {/* 1. SECTION HEADER AREA */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-6 relative">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest flex items-center gap-3">
            <FiDownloadCloud className="text-indigo-400 animate-pulse" />
            <span>Vault Downloads</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-xl leading-relaxed">
            History log of all acquired terminal nodes and local asset configurations loaded on this account profile.
          </p>
        </div>
        
        <div className="self-start sm:self-center px-3 py-1.5 bg-indigo-950/30 border border-indigo-500/20 rounded font-bold text-[10px] tracking-widest text-indigo-400 uppercase">
          Total Nodes: {downloads.length}
        </div>
      </div>

      {/* 2. CORE INVENTORY DISPLAY ELEMENT */}
      {downloads.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-white/5 bg-[#0d0f1a]/40 p-16 text-center rounded-xl [clip-path:polygon(16px_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%)]">
          <IoGameControllerOutline className="w-10 h-10 text-gray-700 mb-3" />
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">No Logged Data Records</h3>
          <p className="text-xs text-gray-600 mt-1 max-w-xs">You have not initialized any downloads for assets inside this repository yet.</p>
          <Link href="/games" className="mt-4 text-[10px] font-bold text-indigo-400 border border-indigo-500/30 px-4 py-2 hover:bg-indigo-500/10 transition-colors uppercase tracking-widest rounded">
            Browse Main Vault
          </Link>
        </div>
      ) : (
        /* Cyberpunk Data Grid Table Wrapper */
        <div className="w-full overflow-x-auto border border-white/5 bg-[#0d0f1a]/70 rounded-xl shadow-2xl [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
          <table className="w-full text-left border-collapse min-w-[700px]">
            
            {/* Table Header Fields */}
            <thead>
              <tr className="border-b border-white/[0.06] bg-[#121420]/80 text-[10px] uppercase font-black tracking-widest text-gray-400">
                <th className="py-4 px-6 font-bold">Asset Overview</th>
                <th className="py-4 px-6 font-bold">Price Status</th> {/* CHANGED: Column title */}
                <th className="py-4 px-6 font-bold">Timestamp Hash</th>
                <th className="py-4 px-6 text-right font-bold pr-8">Actions</th>
              </tr>
            </thead>
            
            {/* Table Body Records */}
            <tbody className="divide-y divide-white/[0.03] text-xs font-medium">
              {downloads.map((row) => {
                const targetGameId = 
                  typeof row.game?._id === "object" && row.game?._id && "$oid" in row.game._id
                    ? (row.game._id as { $oid: string }).$oid
                    : (row.game?._id as string) || "";

                const downloadTime = new Date(row.downloadedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });

                // Safely resolve the price value from payload variables
                const rawPrice = row.game?.price ?? row.price;
                const displayPrice = rawPrice !== undefined && rawPrice !== null && rawPrice !== 0 && rawPrice !== "0"
                  ? typeof rawPrice === "number" ? `$${rawPrice.toFixed(2)}` : rawPrice
                  : "FREE";

                return (
                  <tr 
                    key={row._id} 
                    className="hover:bg-white/[0.02] transition-colors group duration-150"
                  >
                    {/* Game Cover Thumb & Title */}
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 aspect-[16/9] bg-gray-950 rounded border border-white/10 overflow-hidden shrink-0 shadow-md">
                          {row.game?.thumbnail ? (
                            <Image
                              src={row.game.thumbnail}
                              alt={row.game?.title || "Asset"}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#121420] flex items-center justify-center">
                              <IoGameControllerOutline className="w-4 h-4 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <span className="font-black uppercase text-white tracking-wide truncate max-w-[220px] group-hover:text-indigo-400 transition-colors">
                          {row.game?.title || "Unknown Terminal Asset"}
                        </span>
                      </div>
                    </td>

                    {/* CHANGED: Price Column Layout Cell */}
                    <td className="py-3 px-6 font-mono text-[11px]">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold ${
                        displayPrice === "FREE" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      }`}>
                        {displayPrice !== "FREE" && <FiDollarSign className="w-3 h-3 shrink-0" />}
                        <span>{displayPrice === "FREE" ? "FREE" : displayPrice.replace("$", "")}</span>
                      </span>
                    </td>

                    {/* Pretty Date Triggers */}
                    <td className="py-3 px-6 text-gray-400">
                      <div className="flex items-center gap-2 text-[11px]">
                        <FiClock className="text-gray-600 shrink-0" />
                        <span>{downloadTime}</span>
                      </div>
                    </td>

                    {/* Routing Links Actions */}
                    <td className="py-3 px-6 text-right pr-8">
                      <Link
                        href={`/games/${targetGameId}`}
                        className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase border border-white/10 hover:border-indigo-500/50 bg-[#121420]/60 hover:bg-indigo-600 text-gray-300 hover:text-white px-3 py-1.5 rounded transition-all duration-200 no-underline shadow-sm [clip-path:polygon(4px_0,100%_0,100%_calc(100%-4px),calc(100%-4px)_100%,0_100%)]"
                      >
                        <span>Launch</span>
                        <FiArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}