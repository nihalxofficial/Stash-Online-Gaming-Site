// src/app/not-found.tsx
import NotFoundClient from "@/components/Shared/NotFoundClient";
import { FiAlertTriangle } from "react-icons/fi";

export const metadata = {
  title: "404 - Protocol Offline",
  description: "The requested node segment could not be established.",
};

export default function NotFoundServerPage() {
  return (
    <div className="min-h-screen w-full bg-[#08090f] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#08090f] to-[#08090f] flex flex-col items-center justify-center p-4 text-gray-200 selection:bg-cyan-500 selection:text-black">
      
      {/* Structural Visual Frame */}
      <div className="relative flex flex-col items-center space-y-2">
        <div className="relative mb-4 flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-red-500/10 to-purple-500/10 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
          <FiAlertTriangle className="w-10 h-10 text-red-400 animate-pulse" />
        </div>

        <h1 className="text-8xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">
          404
        </h1>
        
        <h2 className="text-xl md:text-2xl font-bold tracking-wide uppercase text-gray-300">
          Protocol Node Offline
        </h2>
        
        <p className="text-xs md:text-sm text-gray-500 max-w-md text-center font-mono leading-relaxed px-4">
          The grid sector you are attempting to access does not exist or has been shifted to an alternate vector configuration.
        </p>
      </div>

      <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

      {/* Mounting the Interactive Client Element Handlers */}
      <NotFoundClient />

      <div className="absolute bottom-6 font-mono text-[9px] text-gray-700 uppercase tracking-widest pointer-events-none select-none">
        System Status: Operational • Error Code: 0x0002bc
      </div>
    </div>
  );
}