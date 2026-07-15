// src/components/LoadingClient.tsx
"use client";

import React, { useState, useEffect } from "react";

const LOADING_PHRASES = [
  "Synchronizing data protocols...",
  "Mapping cloud architecture matrices...",
  "Authorizing security keys...",
  "Decrypting network assets...",
  "Building system layout elements..."
];

export default function LoadingClient() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // Cycle target text indexes sequentially every 1.8 seconds
    const interval = setInterval(() => {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % LOADING_PHRASES.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 flex flex-col items-center space-y-1 text-center">
      {/* Big Action Label */}
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-300 drop-shadow-sm">
        Initializing Sector
      </h3>
      
      {/* Dynamic Status Log Output */}
      <p className="text-[10px] font-mono text-cyan-400/80 tracking-wide transition-all duration-300 animate-pulse h-4">
        {LOADING_PHRASES[phraseIndex]}
      </p>
    </div>
  );
}