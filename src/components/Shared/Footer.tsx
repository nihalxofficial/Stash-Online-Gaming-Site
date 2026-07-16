"use client";

import React, { useState } from "react";
import { Link, Button } from "@heroui/react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaArrowUp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

const defaultGallery = [
  { id: 1, src: "https://i.ibb.co.com/Xf0DrfZb/828df9af-9ca2-486b-9cd0-6eab383f5b1a.png" },
  { id: 2, src: "https://i.ibb.co.com/DPS3QCpJ/Chat-GPT-Image-Jul-16-2026-02-43-27-PM.png" },
  { id: 3, src: "https://i.ibb.co.com/S4thYQ3r/Chat-GPT-Image-Jul-16-2026-02-33-05-PM.png" },
  { id: 4, src: "https://i.ibb.co.com/WpG6Chn8/Chat-GPT-Image-Jul-16-2026-02-47-00-PM.png" },
  { id: 5, src: "https://i.ibb.co.com/LdG7SK5Y/Chat-GPT-Image-Jul-16-2026-02-39-26-PM.png" },
  { id: 6, src: "https://i.ibb.co.com/prvHgHTY/Chat-GPT-Image-Jul-16-2026-02-35-49-PM.png" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#05060c] text-white pt-24 select-none overflow-hidden border-t border-gray-900">
      
      {/* Tech Grid Mesh Overlay matching Navbar */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute left-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute right-[10%] top-[20%] w-[400px] h-[400px] bg-purple-600/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==========================================
             1. UPPER FLOATING NEWSLETTER DOCK
             ========================================== */}
        <div 
          className="w-full p-[1.5px] mb-16 shadow-[0_4px_30px_rgba(99,102,241,0.15)]"
          style={{ 
            background: "linear-gradient(to right, #2563eb, #6366f1, #9333ea)",
            clipPath: "polygon(0 0, 96% 0, 100% 30%, 100% 100%, 4% 100%, 0 70%)" 
          }}
        >
          <div 
            className="w-full h-full bg-[#0d0f1a]/95 p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 relative"
            style={{ clipPath: "polygon(0 0, 96% 0, 100% 30%, 100% 100%, 4% 100%, 0 70%)" }}
          >
            <div className="text-center lg:text-left space-y-2 pl-2">
              <h3 className="text-xl md:text-3xl font-black font-mono tracking-widest uppercase">
                Subscribe For Our Newsletter
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-mono tracking-wider">
                Connect With Us For Gaming Updates.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex items-center bg-[#05060c] border border-white/5 rounded-xl p-1.5 max-w-xl lg:min-w-[460px]">
              <input
                type="email"
                placeholder="Enter Email Address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent pl-4 pr-2 py-2 text-xs md:text-sm font-mono focus:outline-none text-white placeholder-gray-500"
              />
              <Button
                type="submit"
                className="bg-transparent border cursor-pointer border-indigo-500/80 text-indigo-400 hover:text-white font-bold font-mono text-[11px] tracking-widest px-6 h-10 shrink-0 relative overflow-hidden group/btn shadow-[0_0_15px_rgba(99,102,241,0)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
                style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-500 transform -translate-x-full group-hover/btn:translate-x-0 ease-out z-0" />
                <span className="relative z-10 transition-transform duration-300 group-hover/btn:scale-105">SUBSCRIBE NOW</span>
              </Button>
            </form>
          </div>
        </div>

        {/* ==========================================
             2. MAIN FOOTER CONTENT GRID
             ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16">
          
          {/* Column A: Identical Brand Logo Profile & Socials */}
          <div className="lg:col-span-3 space-y-6">
            {/* EXACT SYNC WITH NAVBAR LOGO BRANDING PATTERN */}
            <div className="flex items-center group cursor-pointer w-fit">
              <div 
                className="bg-[#121420] border border-gray-800/60 py-2.5 pl-4 pr-10 shadow-xl relative"
                style={{ clipPath: "polygon(0 0, 100% 0, 82% 100%, 0% 100%)" }}
              >
                <Link href="/" className="font-sans tracking-wider uppercase select-none relative z-10">
                  <span className="text-xl font-black text-white font-mono tracking-widest transition-transform duration-300 inline-block group-hover:-translate-y-[1px]">ST</span>
                  <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 font-mono tracking-widest transition-all duration-300 inline-block group-hover:scale-105 filter group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">ASH</span>
                </Link>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 font-mono tracking-wide leading-relaxed max-w-sm">
              Beyond esports tournaments, include a broader calendar of gaming events, conferences, and conventions.
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-black font-mono tracking-widest text-gray-400 uppercase">
                Follow <span className="text-indigo-400">With Us:</span>
              </h4>
              <div className="flex items-center space-x-2.5">
                {[
                  { icon: <FaFacebookF />, href: "#" },
                  { icon: <FaTwitter />, href: "#" },
                  { icon: <FaInstagram />, href: "#" },
                  { icon: <FaLinkedinIn />, href: "#" }
                ].map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    className="w-8 h-8 rounded-full bg-[#0d0f1a] border border-white/5 flex items-center justify-center text-xs text-gray-400 hover:text-white hover:border-indigo-500/50 hover:shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all duration-300"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column B: Contact Information */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-black font-mono tracking-widest uppercase text-white">Contact Info</h4>
              <div className="w-10 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            </div>
            <ul className="space-y-4 text-xs font-mono tracking-wider text-gray-400">
              <li className="flex items-start gap-3 group">
                <span className="text-indigo-400 mt-0.5 group-hover:text-white transition-colors duration-200"><FaMapMarkerAlt /></span>
                <span>Chittagong, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-indigo-400 group-hover:text-white transition-colors duration-200"><FaPhoneAlt /></span>
                <Link href="tel:+8801234567890" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  +880 1234-567890
                </Link>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="text-indigo-400 group-hover:text-white transition-colors duration-200"><FaEnvelope /></span>
                <Link href="mailto:support@stash.com" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  support@stash.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Column C: Useful Links */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-black font-mono tracking-widest uppercase text-white">Useful Link</h4>
              <div className="w-10 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            </div>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider">
              {["Gaming", "Latest News", "Our GALLERY", "Tournaments", "All Players", "About Me"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column D: Supports */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-black font-mono tracking-widest uppercase text-white">Supports</h4>
              <div className="w-10 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            </div>
            <ul className="space-y-2.5 text-xs font-mono tracking-wider">
              {["Help & Support", "About Us", "Contact", "Our Blog", "Stash My Account", "Support"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column E: Visual Gallery Dock */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-black font-mono tracking-widest uppercase text-white">Our Gallery</h4>
              <div className="w-10 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            </div>
            <div className="grid grid-cols-3 gap-2 max-w-[180px] lg:max-w-none">
              {defaultGallery.map((img) => (
                <div 
                  key={img.id} 
                  className="aspect-square bg-[#0d0f1a] border border-white/5 rounded-md overflow-hidden relative group cursor-pointer"
                >
                  <img 
                    src={img.src} 
                    alt="Gallery item" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2 brightness-[0.75] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ==========================================
           3. LOWER FOOTER BAR WITH CONNECTED NOTCH
           ========================================== */}
      <div className="w-full bg-[#030408] border-t border-gray-900/60 relative">
        
        {/* Horizon Top Accent Line from Navbar layout */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 shadow-[0_1px_10px_rgba(99,102,241,0.5)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative z-10">
          
          {/* Asymmetrical Panel Framing Copyright - Clean Left, Bottom, Right alignment */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 p-[1px] pt-0 hidden md:block"
            style={{ 
              background: "linear-gradient(to bottom, transparent 0%, rgba(99,102,241,0.5) 100%)",
              clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)" 
            }}
          >
            <div 
              className="bg-[#030408] px-14 py-2 border-x border-b border-indigo-500/30 flex items-center justify-center"
              style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)" }}
            >
              <p className="text-[11px] font-mono tracking-widest text-gray-400 whitespace-nowrap uppercase">
                © Copyright 2026 <span className="text-white font-black">ST</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-black">ASH</span>. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Mobile Fallback Viewport Text */}
          <p className="text-[10px] font-mono tracking-widest text-gray-400 block md:hidden uppercase">
            © 2026 <span className="text-white font-bold">ST</span><span className="text-indigo-400 font-bold">ASH</span>.
          </p>
          <div className="hidden md:block w-1" />

          {/* Floating Back to Top Button */}
          <button 
            onClick={scrollToTop}
            className="w-8 h-8 cursor-pointer bg-transparent border border-indigo-500/80 text-indigo-400 flex items-center justify-center text-xs hover:text-white shadow-[0_0_15px_rgba(99,102,241,0)] hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300 relative overflow-hidden group/top"
            style={{ clipPath: "polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)" }}
            aria-label="Scroll to top"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-500 transform -translate-x-full group-hover/top:translate-x-0 ease-out z-0" />
            <span className="relative z-10 transition-transform duration-300 group-hover/top:-translate-y-0.5"><FaArrowUp /></span>
          </button>
        </div>
      </div>
    </footer>
  );
}