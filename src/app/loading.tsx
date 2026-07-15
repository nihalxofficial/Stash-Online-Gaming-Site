import LoadingClient from "@/components/Shared/LoadingClient";

// src/app/loading.tsx
export default function GlobalLoading() {
  return (
    <div className="min-h-screen w-full bg-[#08090f] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#08090f] to-[#08090f] flex flex-col items-center justify-center p-4 select-none pointer-events-none">
      
      {/* Visual Loader Core Animation */}
      <div className="relative flex items-center justify-center h-28 w-28">
        
        {/* Outer glowing particle aura */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping opacity-25 duration-1000" />
        
        {/* Outer rotating dashboard segment */}
        <div className="absolute inset-0 rounded-full border-2 border-t-cyan-500 border-r-transparent border-b-transparent border-l-cyan-500/30 animate-spin" />
        
        {/* Inner reverse-rotating matrix accent segment */}
        <div className="absolute inset-3 rounded-full border-2 border-b-purple-500 border-l-transparent border-t-transparent border-r-purple-500/30 animate-[spin_1.5s_linear_infinite_reverse]" />
        
        {/* Deep core static anchor dot */}
        <div className="h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] animate-pulse" />
      </div>

      {/* Mounting the Interactive Status Array Client Component */}
      <LoadingClient />

      {/* Micro Metrics Structural Footer */}
      <div className="absolute bottom-6 font-mono text-[9px] text-gray-700 uppercase tracking-widest">
        Establishing Secure Pipeline Data Stream...
      </div>
      
    </div>
  );
}