// src/components/GamesClientWrapper.tsx
"use client";

import GameCard from "@/components/Shared/GameCard";
import GameCardSkeleton from "@/components/Shared/GameCardSkeleton";
import { GameData } from "@/types";
import React, { useTransition, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSliders, FiGrid, FiMonitor } from "react-icons/fi";
import { Label, ListBox, Select, SearchField, Pagination } from "@heroui/react";

interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
}

interface GamesClientWrapperProps {
  games: GameData[];
  allGenres: string[];
  allPlatforms: string[]; // <-- Added Platform definitions array
  paginationMeta: PaginationMeta;
}

export default function GamesClientWrapper({ games, allGenres, allPlatforms, paginationMeta }: GamesClientWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { totalItems, totalPages, page, limit } = paginationMeta;

  // Sync controls straight from browser context location values
  const currentSearch = searchParams.get("q") || "";
  const currentGenre = searchParams.get("genre") || "All";
  const currentPlatform = searchParams.get("platform") || "All"; // <-- Sync platform from URL state
  const currentSort = searchParams.get("sortBy") || "default";

  const [localSearch, setLocalSearch] = useState(currentSearch);

  useEffect(() => {
    setLocalSearch(currentSearch);
  }, [currentSearch]);

  // Debounce text entry queries
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (localSearch !== currentSearch) {
        // Reset back to page 1 on a brand new text search entry
        updateParams([
          { key: "q", value: localSearch },
          { key: "page", value: "1" }
        ]);
      }
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [localSearch]);

  // URL State Mutator Engine supporting multiple updates per transition
  const updateParams = (updates: { key: string; value: string | number | null }[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    updates.forEach(({ key, value }) => {
      const stringValue = String(value);
      if (stringValue && stringValue !== "All" && stringValue !== "default") {
        params.set(key, stringValue);
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      router.push(`/games?${params.toString()}`);
    });
  };

  // Helper calculating custom ellipsis layout matrix blocks
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  return (
    <div className="space-y-8 font-mono text-xs">
      {/* CONTROLS INTERACTIVE PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#0d0f1a]/60 border border-white/5 p-4 rounded-xl backdrop-blur-md shadow-xl items-end">
        
        {/* SearchField (Re-allocated to 4 columns to create room) */}
        <div className="md:col-span-4">
          <SearchField name="search" value={localSearch} onChange={(val) => setLocalSearch(val)}>
            <Label className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Search Registry</Label>
            <SearchField.Group className="relative flex items-center bg-[#06070c] border border-white/5 h-10 px-3 rounded transition-colors focus-within:border-indigo-500/50 w-full">
              <SearchField.SearchIcon className="text-gray-500 w-4 h-4 mr-2 shrink-0" />
              <SearchField.Input placeholder="Search by title..." className="bg-transparent text-white outline-none w-full text-xs font-mono" />
              {localSearch && <SearchField.ClearButton className="text-gray-500 hover:text-white transition-colors cursor-pointer text-xs ml-2" />}
            </SearchField.Group>
          </SearchField>
        </div>

        {/* Genre Select (Changed span configuration from 4 to 3) */}
        <div className="md:col-span-3">
          <Select variant="secondary" className="w-full" placeholder="Select Genre" value={currentGenre} onChange={(val) => updateParams([{ key: "genre", value: val }, { key: "page", value: "1" }])}>
            <Label className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Genre</Label>
            <Select.Trigger className="w-full bg-[#06070c] border border-white/5 h-10 px-3 rounded text-gray-300 flex items-center justify-between text-xs hover:bg-[#0d0f1a] transition-colors focus:outline-none">
              <div className="flex items-center gap-2"><FiSliders className="text-gray-500 w-3.5 h-3.5" /><Select.Value /></div>
              <Select.Indicator className="border-gray-500" />
            </Select.Trigger>
            <Select.Popover className="bg-[#0d0f1a] border border-white/10 rounded-lg p-1 mt-1 z-50 shadow-2xl">
              <ListBox className="text-xs text-gray-300">
                <ListBox.Item id="All" textValue="All Genres" className="px-3 py-2 rounded hover:bg-white/5 cursor-pointer flex items-center justify-between data-[selected=true]:text-cyan-400">All Genres<ListBox.ItemIndicator /></ListBox.Item>
                {allGenres.map((g) => (
                  <ListBox.Item key={g} id={g} textValue={g} className="px-3 py-2 rounded hover:bg-white/5 cursor-pointer flex items-center justify-between data-[selected=true]:text-cyan-400">{g}<ListBox.ItemIndicator /></ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Platform Select (NEW Component inserted into the grid row) */}
        <div className="md:col-span-3">
          <Select variant="secondary" className="w-full" placeholder="Select Platform" value={currentPlatform} onChange={(val) => updateParams([{ key: "platform", value: val }, { key: "page", value: "1" }])}>
            <Label className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Platform Matrix</Label>
            <Select.Trigger className="w-full bg-[#06070c] border border-white/5 h-10 px-3 rounded text-gray-300 flex items-center justify-between text-xs hover:bg-[#0d0f1a] transition-colors focus:outline-none">
              <div className="flex items-center gap-2"><FiMonitor className="text-gray-500 w-3.5 h-3.5" /><Select.Value /></div>
              <Select.Indicator className="border-gray-500" />
            </Select.Trigger>
            <Select.Popover className="bg-[#0d0f1a] border border-white/10 rounded-lg p-1 mt-1 z-50 shadow-2xl">
              <ListBox className="text-xs text-gray-300">
                <ListBox.Item id="All" textValue="All Platforms" className="px-3 py-2 rounded hover:bg-white/5 cursor-pointer flex items-center justify-between data-[selected=true]:text-cyan-400">All Platforms<ListBox.ItemIndicator /></ListBox.Item>
                {allPlatforms.map((p) => (
                  <ListBox.Item key={p} id={p} textValue={p} className="px-3 py-2 rounded hover:bg-white/5 cursor-pointer flex items-center justify-between data-[selected=true]:text-cyan-400">{p}<ListBox.ItemIndicator /></ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Sort Select (Changed span configuration to 2 to complete 12 columns total) */}
        <div className="md:col-span-2">
          <Select variant="secondary" className="w-full" placeholder="Sort" value={currentSort} onChange={(val) => updateParams([{ key: "sortBy", value: val }, { key: "page", value: "1" }])}>
            <Label className="text-gray-500 text-[10px] uppercase tracking-wider block mb-1">Sort Matrix</Label>
            <Select.Trigger className="w-full bg-[#06070c] border border-white/5 h-10 px-3 rounded text-gray-300 flex items-center justify-between text-xs hover:bg-[#0d0f1a] transition-colors focus:outline-none">
              <div className="flex items-center gap-2"><FiGrid className="text-gray-500 w-3.5 h-3.5" /><Select.Value /></div>
              <Select.Indicator className="border-gray-500" />
            </Select.Trigger>
            <Select.Popover className="bg-[#0d0f1a] border border-white/10 rounded-lg p-1 mt-1 z-50 shadow-2xl">
              <ListBox className="text-xs text-gray-300">
                <ListBox.Item id="default" textValue="Sort: Default" className="px-3 py-2 rounded hover:bg-white/5 cursor-pointer flex items-center justify-between data-[selected=true]:text-cyan-400">Sort: Default<ListBox.ItemIndicator /></ListBox.Item>
                <ListBox.Item id="title" textValue="Alphabetical (A-Z)" className="px-3 py-2 rounded hover:bg-white/5 cursor-pointer flex items-center justify-between data-[selected=true]:text-cyan-400">Alphabetical (A-Z)<ListBox.ItemIndicator /></ListBox.Item>
                <ListBox.Item id="rating" textValue="Top Rated Metrics" className="px-3 py-2 rounded hover:bg-white/5 cursor-pointer flex items-center justify-between data-[selected=true]:text-cyan-400">Top Rated Metrics<ListBox.ItemIndicator /></ListBox.Item>
                <ListBox.Item id="price-low" textValue="Price: Low to High" className="px-3 py-2 rounded hover:bg-white/5 cursor-pointer flex items-center justify-between data-[selected=true]:text-cyan-400">Price: Low to High<ListBox.ItemIndicator /></ListBox.Item>
                <ListBox.Item id="price-high" textValue="Price: High to Low" className="px-3 py-2 rounded hover:bg-white/5 cursor-pointer flex items-center justify-between data-[selected=true]:text-cyan-400">Price: High to Low<ListBox.ItemIndicator /></ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

      </div>

      {/* RENDER DATA MATRIX */}
      {isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, idx) => <GameCardSkeleton key={`skeleton-${idx}`} />)}
        </div>
      ) : games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map((game) => (
            <div key={game.id || game.slug} className="h-full animate-[fadeIn_0.2s_ease-out]">
              <GameCard game={game} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full border border-dashed border-white/5 rounded-2xl py-20 flex flex-col items-center justify-center text-center space-y-2">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">No Records Retrieved</p>
        </div>
      )}

      {/* HEROUI COMPOSED BACKEND PAGINATION COMPONENT */}
      {totalPages > 1 && (
        <div className="pt-4 border-t border-white/5 flex justify-center">
          <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
            <Pagination.Summary className="text-xs text-gray-500">
              Showing <span className="text-white font-bold">{startItem}</span>-
              <span className="text-white font-bold">{endItem}</span> of{" "}
              <span className="text-cyan-400 font-bold">{totalItems}</span> results
            </Pagination.Summary>
            <Pagination.Content className="flex items-center gap-1 bg-[#0d0f1a]/60 border border-white/5 p-1 rounded-lg">
              <Pagination.Item>
                <button 
                  disabled={page === 1 || isPending}
                  onClick={() => updateParams([{ key: "page", value: page - 1 }])}
                  className="px-3 h-8 rounded hover:bg-white/5 transition-colors text-xs disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-1 cursor-pointer"
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </button>
              </Pagination.Item>

              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <span className="px-2 text-gray-600 select-none">...</span>
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <button
                      disabled={isPending}
                      onClick={() => updateParams([{ key: "page", value: p }])}
                      className={`w-8 h-8 rounded text-xs transition-colors cursor-pointer font-bold ${
                        p === page 
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                          : "hover:bg-white/5 text-gray-400"
                      }`}
                    >
                      {p}
                    </button>
                  </Pagination.Item>
                )
              )}

              <Pagination.Item>
                <button 
                  disabled={page === totalPages || isPending}
                  onClick={() => updateParams([{ key: "page", value: page + 1 }])}
                  className="px-3 h-8 rounded hover:bg-white/5 transition-colors text-xs disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </button>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
}