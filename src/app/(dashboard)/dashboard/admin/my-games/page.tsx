import Image from "next/image";
import Link from "next/link";
import { FiGrid, FiSliders, FiEye, FiTrash2, FiAlertCircle, FiPlus } from "react-icons/fi";
import { getUserSession } from "@/lib/core/session";
import { getGamesByOwner } from "@/lib/api/games";

export const metadata = {
  title: "My Game Terminals | Admin Dashboard",
  description: "Monitor and manage deployed game node systems",
};

export default async function AdminGamesPage() {
  const user = await getUserSession();
  const id = user?.id;
  
  // Fetch raw response and extract inner games array
  const apiResponse = id ? await getGamesByOwner(id) : null;
  const ownerGames = apiResponse && typeof apiResponse === "object" && "games" in apiResponse
    ? (apiResponse.games as any[])
    : Array.isArray(apiResponse) ? apiResponse : [];

  return (
    <div className="w-full max-w-5xl mx-auto font-mono select-none pb-12 px-4">
      
      {/* HEADER */}
      <div className="mb-8 border-b border-white/5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 uppercase">
            Active Game Registry
          </h1>
          <p className="text-[11px] text-gray-500 mt-1">
            MANAGE AND AUDIT DEPLOYED OBJECT TERMINALS ASSIGNED TO YOUR OPERATOR LINK
          </p>
        </div>
        
        <Link
          href="/dashboard/admin/add-games" 
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded text-xs font-bold uppercase tracking-wider transition-colors [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>Deploy New Game</span>
        </Link>
      </div>

      {/* MATRIX TABLE */}
      {ownerGames.length === 0 ? (
        <div className="w-full border border-dashed border-white/10 bg-[#0d0f1a]/20 p-12 rounded-2xl text-center backdrop-blur-md space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
            <FiAlertCircle className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">No Deployments Detected</h3>
        </div>
      ) : (
        <div className="border border-white/5 bg-[#0d0f1a]/40 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-[#06070c]/60 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  <th className="py-4 px-5">Game Object / Title</th>
                  <th className="py-4 px-4 hidden md:table-cell">Genre Cluster</th>
                  <th className="py-4 px-4">Price Matrix</th>
                  <th className="py-4 px-4 hidden sm:table-cell">Status</th>
                  <th className="py-4 px-5 text-right">Overrides</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03] text-xs">
                {ownerGames.map((game: any) => {
                  const gameId = typeof game._id === "string" ? game._id : game._id?.$oid || game.id || "UNKNOWN";
                  
                  return (
                    <tr key={gameId} className="group hover:bg-white/[0.01] transition-colors">
                      <td className="py-4 px-5 flex items-center gap-4 min-w-[260px]">
                        <div className="relative w-12 h-12 rounded-lg border border-white/10 bg-indigo-950/20 overflow-hidden shrink-0">
                          {game.thumbnail ? (
                            <Image
                              src={game.thumbnail}
                              alt={game.title}
                              fill
                              sizes="100px" 
                              className="object-cover [image-rendering:high-quality]"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#06070c]"><FiGrid className="w-4 h-4 text-gray-600" /></div>
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-white font-bold truncate">{game.title}</div>
                          <div className="text-[10px] text-gray-600 font-mono">#{String(gameId).substring(0, 8)}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-400 hidden md:table-cell">{Array.isArray(game.genre) ? game.genre.join(" / ") : game.genre}</td>
                      <td className="py-4 px-4 font-bold text-gray-200">${game.price}</td>
                      <td className="py-4 px-4 hidden sm:table-cell">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 font-bold uppercase text-[10px]">
                          {game.status || "Live"}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/games/${gameId}`} className="p-1.5 bg-white/5 border border-white/5 rounded"><FiEye className="w-3.5 h-3.5" /></Link>
                          <Link href={`/dashboard/admin/my-games/edit/${gameId}`} className="p-1.5 bg-white/5 border border-white/5 rounded"><FiSliders className="w-3.5 h-3.5" /></Link>
                          <button className="p-1.5 bg-red-500/5 cursor-pointer border border-red-500/10 text-red-400 rounded"><FiTrash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}