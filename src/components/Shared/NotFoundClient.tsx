// src/components/NotFoundClient.tsx
"use client";

import Link from "next/link";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFoundClient() {
  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs sm:max-w-md justify-center">
      
      {/* Home Route Hyperlink (Safe for server context natively but rendered inside the wrapper) */}
      <Link
        href="/"
        className="w-full sm:w-auto px-6 h-11 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-bold text-xs uppercase tracking-wider text-white rounded shadow-[0_4px_20px_rgba(6,182,212,0.15)] transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <FiHome className="w-4 h-4 transition-transform group-hover:scale-110" />
        Return to Base
      </Link>

      {/* Interactive Back Button with Event Handler */}
      <button
        onClick={handleGoBack}
        type="button"
        className="w-full sm:w-auto px-6 h-11 bg-white/5 hover:bg-white/10 border border-white/5 font-bold text-xs uppercase tracking-wider text-gray-300 hover:text-white rounded transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Previous Sector
      </button>

    </div>
  );
}