"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiShield,
  FiActivity,
  FiCalendar,
  FiCpu,
  FiLogOut,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

interface ProfileViewProps {
  initialUser: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    emailVerified: boolean;
    role: string;
    plan: string;
    status: string;
    createdAt: string | null;
  };
}

export default function ProfileView({ initialUser }: ProfileViewProps) {
  const router = useRouter();
  const isAdmin = initialUser.role === "admin";

  const joinDate = initialUser.createdAt
    ? new Date(initialUser.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "NOT_SYNCED";

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Killed current session authorization.");
      router.push("/");
    } catch (error) {
      toast.error("Failed to safely terminate session.");
    }
  };

  return (
    <div className="min-h-screen bg-[#08090f] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/10 via-[#08090f] to-[#08090f] text-gray-200 p-4 md:p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* BREADCRUMB */}
        <div className="text-xs text-gray-500 uppercase tracking-wider">
          <Link href="/games" className="hover:text-cyan-400 transition-colors">
            Core Grid
          </Link>
          <span className="mx-2 text-gray-700">/</span>
          <span className="text-white font-bold">Profile Identity</span>
        </div>

        {/* PROFILE HEADER PANEL */}
        <div className="relative bg-[#0d0f1a]/60 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-xl overflow-hidden group hover:border-indigo-500/20 transition-all duration-300 [clip-path:polygon(24px_0,100%_0,100%_calc(100%-24px),calc(100%-24px)_100%,0_100%,0_24px)]">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-40 group-hover:opacity-100 transition-opacity z-30" />

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Avatar block with scan line */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-cyan-400/50 transition-colors">
              {initialUser.image ? (
                <Image
                  src={initialUser.image}
                  alt={initialUser.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <span className="font-black text-indigo-400 uppercase text-3xl">
                  {initialUser.name.substring(0, 2)}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[200%] -translate-y-1/2 animate-[pulse_3s_infinite] pointer-events-none" />
            </div>

            {/* Operator Core Info */}
            <div className="space-y-3 text-center md:text-left flex-1 min-w-0 w-full">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl font-black text-white uppercase tracking-tight truncate">
                    {initialUser.name}
                  </h1>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      initialUser.status === "active"
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                    }`}
                  >
                    {initialUser.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-mono tracking-wider break-all">
                  UUID: #{initialUser.id}
                </p>
              </div>

              {/* Tag Row */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {!isAdmin && (
                  <span className="px-2 py-0.5 bg-indigo-500/5 border border-indigo-500/20 rounded text-[10px] font-bold text-indigo-400 uppercase">
                    PLAN: {initialUser.plan}
                  </span>
                )}
                <span className="px-2 py-0.5 bg-purple-500/5 border border-purple-500/20 rounded text-[10px] font-bold text-purple-400 uppercase">
                  ROLE: {initialUser.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS & CONFIGURATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* USER SYSTEM TELEMETRY */}
          <div className="md:col-span-7 bg-[#0d0f1a]/40 border border-white/5 p-6 rounded-2xl space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
              <FiCpu className="text-cyan-400" /> System Telemetry
            </h3>

            <div className="space-y-4">
              {/* Email Record */}
              <div className="flex items-center justify-between gap-4 p-3 bg-[#06070c]/50 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3 min-w-0">
                  <FiMail className="text-gray-500 shrink-0" />
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-[10px] text-gray-500 uppercase tracking-tight">
                      Comms Frequency
                    </p>
                    <p className="text-xs text-white font-sans truncate">
                      {initialUser.email}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 ${
                    initialUser.emailVerified
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {initialUser.emailVerified ? "Verified" : "Unverified"}
                </span>
              </div>

              {/* Join Date Record */}
              <div className="flex items-center justify-between gap-4 p-3 bg-[#06070c]/50 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-gray-500" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-tight">
                      Access Logged
                    </p>
                    <p className="text-xs text-white font-sans">{joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Clearance Tier */}
              <div className="flex items-center justify-between gap-4 p-3 bg-[#06070c]/50 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <FiShield className="text-gray-500" />
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-tight">
                      Clearance Tier
                    </p>
                    <p className="text-xs text-white font-sans capitalize">
                      {initialUser.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS PANEL */}
          <div className="md:col-span-5 bg-[#0d0f1a]/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
                <FiActivity className="text-purple-400" /> Actions Panel
              </h3>

              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                {isAdmin
                  ? "Access internal root configurations, monitor active terminal clusters, or maintain platform matrices."
                  : "Customize network configurations, verify active deployments, or cycle matrix operations directly."}
              </p>

              <div className="space-y-2">
                {isAdmin ? (
                  <Link
                    href="/dashboard/admin"
                    className="w-full flex items-center justify-center py-2.5 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 rounded-lg text-xs font-bold text-red-400 transition-colors uppercase tracking-wider"
                  >
                    Root Operations
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/user"
                    className="w-full flex items-center justify-center py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 rounded-lg text-xs font-bold text-indigo-400 transition-colors uppercase tracking-wider"
                  >
                    Configure Registry
                  </Link>
                )}
                <Link
                  href="/games"
                  className="w-full flex items-center justify-center py-2.5 bg-cyan-600/10 hover:bg-cyan-600/20 border border-cyan-500/20 rounded-lg text-xs font-bold text-cyan-400 transition-colors uppercase tracking-wider"
                >
                  Spectate Games
                </Link>
              </div>
            </div>

            {/* Logout Trigger */}
            <div className="pt-6 border-t border-white/5 mt-6">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer uppercase tracking-widest [clip-path:polygon(6px_0,100%_0,100%_100%,0_100%,0_6px)]"
              >
                <FiLogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}