"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiGrid, 
  FiTv, 
  FiUser, 
  FiSettings, 
  FiMenu, 
  FiX,
  FiTerminal,
  FiActivity,
  FiCpu
} from "react-icons/fi";

// SIDEBAR CONFIGURATION SCHEMA
interface SidebarLinkNode {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accentClass: string;
}

const userNavigationNodes: SidebarLinkNode[] = [
  {
    label: "Overview",
    href: "/dashboard/user",
    icon: FiCpu,
    accentClass: "group-hover:text-blue-400",
  },
  {
    label: "Downloads",
    href: "/dashboard/user/downloads",
    icon: FiGrid,
    accentClass: "group-hover:text-indigo-400",
  },
  // {
  //   label: "Live Streams",
  //   href: "/dashboard/user/streams",
  //   icon: FiTv,
  //   accentClass: "group-hover:text-purple-400",
  // },
  // {
  //   label: "Match Logs",
  //   href: "/dashboard/user/history",
  //   icon: FiActivity,
  //   accentClass: "group-hover:text-emerald-400",
  // },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: FiUser,
    accentClass: "group-hover:text-blue-400",
  },
  {
    label: "Settings",
    href: "/dashboard/user/settings",
    icon: FiSettings,
    accentClass: "group-hover:text-purple-400",
  },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* MOBILE TRIGGER ACTION BAR */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 cursor-pointer"
        >
          {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>

      {/* BACKGROUND UNDERLAY MASK FOR MOBILE VIEWPORTS */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-[#05060c]/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ASIDE CORE DRAWER GRID */}
      <aside className={`fixed top-16 left-0 bottom-0 w-64 bg-[#0d0f1a] border-r border-white/5 pt-6 z-40 transition-transform duration-300 font-mono select-none flex flex-col justify-between
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        {/* TOP SECTION: MENU ROUTER LINKS */}
        <div className="flex flex-col gap-1 px-3">
          
          {/* User Identity Header Block */}
          <div className="px-3 mb-4 flex items-center gap-2 bg-[#05060c]/60 border border-emerald-500/20 rounded py-1.5 shadow-inner">
            <FiTerminal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400 tracking-widest uppercase block">
              OPERATOR CONTROL
            </span>
          </div>

          {userNavigationNodes.map((node) => {
            const Icon = node.icon;
            const isActive = pathname === node.href;

            return (
              <Link
                key={node.href}
                href={node.href}
                onClick={() => setIsOpen(false)}
                className={`group relative flex items-center gap-3 px-4 py-3 text-xs font-bold rounded tracking-wide transition-all overflow-hidden [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,0_100%)]
                  ${isActive 
                    ? "bg-[#05060c] border-l-2 border-indigo-500 text-white shadow-inner" 
                    : "text-gray-400 hover:text-white hover:bg-[#05060c]/50 border-l-2 border-transparent"
                  }
                `}
              >
                {/* Active Backdrop Highlight Line Glow */}
                {isActive && (
                  <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-linear-to-b from-blue-500 via-indigo-500 to-purple-500 opacity-80" />
                )}

                <Icon className={`w-4 h-4 transition-colors duration-200
                  ${isActive ? "text-blue-400" : "text-gray-500 " + node.accentClass}
                `} />
                
                <span>{node.label}</span>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM SECTION: HARDWARE MATRIX STACK STATUS */}
        <div className="p-4 border-t border-white/5 bg-[#05060c]/30 mx-3 mb-4 rounded border border-white/5">
          <div className="flex items-center justify-between text-[10px] text-gray-500 font-black tracking-widest mb-1.5">
            <span className="text-gray-500">SECURE SHELL</span>
            <span className="text-emerald-400 animate-pulse">● PLAYER_NODE</span>
          </div>
          <div className="w-full bg-[#0d0f1a] h-1.5 border border-white/5 rounded-full overflow-hidden">
            <div className="w-[42%] h-full bg-linear-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-full" />
          </div>
          <div className="flex justify-between text-[9px] text-gray-600 font-bold tracking-tight mt-1">
            <span>USR_NODE_V4</span>
            <span>MEM: 42%</span>
          </div>
        </div>

      </aside>
    </>
  );
}