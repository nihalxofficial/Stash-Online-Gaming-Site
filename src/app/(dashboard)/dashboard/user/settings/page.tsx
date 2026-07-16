// src/app/dashboard/user/settings/page.tsx
"use client";

import { FiUser, FiSliders, FiShield, FiSave, FiRefreshCw, FiTv } from "react-icons/fi";

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-[#05060c] text-white font-mono selection:bg-indigo-500/30">
      
      {/* 1. TOP HEADER AREA */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-6 relative">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-widest flex items-center gap-3">
            <FiSliders className="text-indigo-400" />
            <span>Terminal Settings</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 max-w-xl leading-relaxed">
            Configure local nodes, account details, stream outputs and node authentication rules.
          </p>
        </div>

        <button 
          type="button" 
          className="inline-flex cursor-pointer items-center gap-2 text-[10px] font-black tracking-widest uppercase border border-indigo-500/30 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white px-4 py-2 rounded transition-all [clip-path:polygon(4px_0,100%_0,100%_calc(100%-4px),calc(100%-4px)_100%,0_100%)] shadow-sm"
        >
          <FiSave className="w-3 h-3" />
          <span>Commit Changes</span>
        </button>
      </div>

      {/* 2. CORE CONFIGURATION FORM GROUPS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Account & Profile Configuration */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section: Profile Info */}
          <div className="bg-[#0d0f1a]/70 border border-white/5 p-4 sm:p-6 rounded-xl shadow-2xl [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
            <h2 className="text-xs font-black uppercase tracking-widest mb-6 text-indigo-400 flex items-center gap-2">
              <FiUser className="shrink-0" />
              Identity Profiles
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">Display Name</label>
                <input 
                  type="text" 
                  defaultValue="User" 
                  className="w-full bg-[#05060c] border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">Email Handle</label>
                <input 
                  type="email" 
                  defaultValue="user@example.com" 
                  className="w-full bg-[#05060c] border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">Bio / Manifest</label>
                <textarea 
                  rows={3}
                  defaultValue="Software developer and active live-stream broadcaster parsing telemetry configurations inside the main repository framework." 
                  className="w-full bg-[#05060c] border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 transition-colors font-mono resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Streaming Outputs */}
          <div className="bg-[#0d0f1a]/70 border border-white/5 p-4 sm:p-6 rounded-xl shadow-2xl [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
            <h2 className="text-xs font-black uppercase tracking-widest mb-6 text-indigo-400 flex items-center gap-2">
              <FiTv className="shrink-0" />
              Broadcast Configs
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">Primary Ingest Server</label>
                <select className="w-full bg-[#05060c] border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 transition-colors font-mono text-gray-300">
                  <option>RTMP://live-sin.twitch.tv/app/ (Singapore Main)</option>
                  <option>RTMP://a.rtmp.youtube.com/live2 (YouTube Variable)</option>
                  <option>RTMP://live.kick.com/app/ (Kick Edge Ingest)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">Stream Ingest Key</label>
                <div className="relative flex items-center">
                  <input 
                    type="password" 
                    defaultValue="live_764920194_xYZbhd839adKkLpqOw194" 
                    disabled
                    className="w-full bg-[#05060c] border border-white/10 rounded px-3 py-2 pr-10 text-xs font-mono text-gray-500 select-all"
                  />
                  <button type="button" className="absolute right-3 text-gray-400 hover:text-white transition-colors">
                    <FiRefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[9px] text-gray-600 mt-1">Keep this private. Regenerating this signature breaks active encoder configurations.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Security Controls & Meta Options */}
        <div className="space-y-6">
          
          {/* Section: Credentials / Passwords */}
          <div className="bg-[#0d0f1a]/70 border border-white/5 p-4 sm:p-6 rounded-xl shadow-2xl [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
            <h2 className="text-xs font-black uppercase tracking-widest mb-6 text-indigo-400 flex items-center gap-2">
              <FiShield className="shrink-0" />
              Security Node
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">Current Hash Signature</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="w-full bg-[#05060c] border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">New Password Key</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="w-full bg-[#05060c] border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>
              
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="mt-0.5 rounded border-white/10 bg-[#05060c] text-indigo-600 focus:ring-0 focus:ring-offset-0 focus:outline-none w-3.5 h-3.5 accent-indigo-500"
                  />
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">
                    Enforce 2FA Checks
                    <p className="text-[9px] text-gray-600 normal-case font-medium tracking-normal mt-1">Request authentication token updates on new device login footprints.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Section: Workspace Preferences */}
          <div className="bg-[#0d0f1a]/70 border border-white/5 p-4 sm:p-6 rounded-xl shadow-2xl [clip-path:polygon(12px_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
            <h2 className="text-xs font-black uppercase tracking-widest mb-4 text-gray-400">Preferences</h2>
            
            <div className="space-y-3">
              {[
                { label: "Hardware Accel Rendering", active: true },
                { label: "Public Broadcast Visibility", active: true },
                { label: "Save Output Session Backups", active: false }
              ].map((pref, index) => (
                <div key={index} className="flex items-center justify-between py-1 border-b border-white/[0.02] last:border-none">
                  <span className="text-[10px] uppercase tracking-wide text-gray-400 font-bold">{pref.label}</span>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${pref.active ? "bg-indigo-600 flex justify-end" : "bg-gray-800 flex justify-start"}`}>
                    <span className="w-3 h-3 rounded-full bg-white shadow-md"></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}