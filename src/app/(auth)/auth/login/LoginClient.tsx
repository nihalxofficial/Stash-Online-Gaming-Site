"use client";

import React, { useState } from "react";
import { Link, Button } from "@heroui/react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import stash from "@/assets/Stash.png";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    console.log("Redirecting to Google Auth Protocol...");
  };

  // Shared geometric matrix for the unified central container edges
  const cyberPolygon = "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)";

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 select-none overflow-hidden bg-[#05060c]">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Outer Border Layer for the Unified Container */}
      <div 
        className="w-full max-w-5xl p-[1.5px] bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-[0_0_50px_rgba(99,102,241,0.15)]"
        style={{ clipPath: cyberPolygon }}
      >
        {/* Inner Flex Container holding both left and right sides */}
        <div 
          className="w-full bg-[#0d0f1a] flex flex-col md:flex-row min-h-[550px]"
          style={{ clipPath: cyberPolygon }}
        >
          
          {/* LEFT PANEL: Integrated Artwork & Motivation Content */}
          <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 lg:p-12 overflow-hidden min-h-[300px] md:min-h-full">
            {/* Background Layer Asset */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${stash.src})` }}
            />
            {/* FIXED: Heavy high-density dark tech overlay to ensure absolute text isolation */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0d0f1a] via-[#0d0f1a]/90 to-[#0d0f1a]/40" />
            
            {/* Overlaid Context */}
            <div className="relative z-10 space-y-4 max-w-sm mr-auto">
              <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 text-[9px] font-mono tracking-widest text-indigo-400 uppercase rounded">
                Secure Channel
              </div>
              <h1 className="text-2xl lg:text-3xl font-black font-mono tracking-wider text-white uppercase leading-none">
                Unlock Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Inventory Vault</span>
              </h1>
              <p className="text-[11px] font-mono text-gray-300 leading-relaxed tracking-wide">
                Welcome back to STASH. Access your secure node to manage decentralized player assets, sync custom configurations and orchestrate live drops instantly.
              </p>
              <div className="pt-2 border-t border-white/5 flex gap-4 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                <div>Node: Core_Alpha</div>
                <div>Status: Online</div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: The Form Field System */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12 bg-[#090b14]/50 border-t md:border-t-0 md:border-l border-white/[0.04]">
            
            {/* Header Title */}
            <div className="flex flex-col mb-6">
              <h2 className="text-sm font-black font-mono tracking-[0.25em] uppercase text-white">
                Access Portal
              </h2>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] mt-1">
                Stash Cybernetics Division
              </p>
            </div>

            {/* Google Authentication */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full cursor-pointer flex items-center justify-center gap-3 bg-[#05060c] border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-white font-mono text-xs font-bold tracking-widest h-11 mb-5 transition-all duration-300 uppercase rounded-lg"
            >
              <FaGoogle className="text-indigo-400 text-sm" />
              Sign in with Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.06]" /></div>
              <span className="bg-[#090b14] md:bg-[#0d0f1a] px-3 text-[10px] text-gray-500 font-mono uppercase tracking-[0.15em] relative z-10">
                Or Secure Login
              </span>
            </div>

            {/* Credential Setup */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase pl-1">Identity Email</label>
                <div className="relative flex items-center bg-[#05060c] border border-white/10 focus-within:border-indigo-500/60 rounded-lg px-4 h-11 transition-all duration-300">
                  <FaEnvelope className="text-gray-500 text-xs mr-3 shrink-0" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter identity link..." className="w-full bg-transparent text-xs font-mono focus:outline-none text-white placeholder-gray-600 tracking-wide" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">Access Key</label>
                  <Link href="#" className="text-[10px] font-mono tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</Link>
                </div>
                <div className="relative flex items-center bg-[#05060c] border border-white/10 focus-within:border-indigo-500/60 rounded-lg px-4 h-11 transition-all duration-300">
                  <FaLock className="text-gray-500 text-xs mr-3 shrink-0" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••••••" className="w-full bg-transparent text-xs font-mono focus:outline-none text-white placeholder-gray-600 tracking-widest" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-white transition-colors ml-2 cursor-pointer focus:outline-none shrink-0">
                    {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black font-mono text-xs tracking-[0.15em] h-11 mt-4 hover:brightness-110 active:scale-[0.99] transition-all duration-300 rounded-lg"
              >
                {isLoading ? "INITIALIZING..." : "INITIALIZE SESSION"}
              </Button>
            </form>

            {/* Registration Anchor */}
            <div className="mt-6 text-center pt-4 border-t border-white/[0.04]">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Not joined yet?{" "}
                <Link href="/auth/register" className="text-indigo-400 hover:text-white font-bold ml-1 transition-colors underline-offset-4 hover:underline">
                  Join now
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}