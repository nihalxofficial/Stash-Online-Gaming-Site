import { getGameById } from "@/lib/api/games";
import Link from "next/link";
import {
  FiStar,
  FiLayers,
  FiCpu,
  FiUser,
  FiCalendar,
  FiHardDrive,
  FiAlertTriangle,
  FiDownload,
} from "react-icons/fi";
import { GameData } from "@/types";
import GameGalleryContainer from "@/components/Games/GameGalleryContainer";
import DownloadButtonContainer from "@/components/Games/DownloadButtonContainer";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Extend GameData if necessary to include downloadCount
type ExtendedGameData = GameData & { downloadCount?: number };

export default async function GameDetailsPage({ params }: PageProps) {
  const { id } = await params;

  let game: ExtendedGameData | null = null;
  try {
    game = (await getGameById(id)) as ExtendedGameData;
  } catch (error) {
    console.error("Failed to retrieve game database trace:", error);
  }

  // NO RECORD FOUND FALLBACK UI
  if (!game || !game?.title) {
    return (
      <div className="min-h-screen bg-[#08090f] flex items-center justify-center font-mono text-gray-400 p-4">
        <div className="w-full max-w-md border border-dashed border-white/10 bg-[#0d0f1a]/40 p-8 rounded-2xl text-center backdrop-blur-md shadow-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
            <FiAlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Deployment Matrix Missing
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              The game parameter trace hash key{" "}
              <span className="text-cyan-400 font-bold break-all">#{id}</span>{" "}
              could not be discovered or verified in the server cache.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/games"
              className="inline-block px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs font-bold text-white transition-colors uppercase tracking-wider"
            >
              Return to Core Registry
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ownerName: string = game?.owner?.name || "System Core Operator";
  const ownerEmail: string = game?.owner?.email || "internal@system.node";
  
  // FIXED ID LOOKUP: Always resolves down to a strict, clean string
  const targetId: string = typeof game?._id === "object" && game?._id && "$oid" in game._id
    ? (game._id as any).$oid
    : String(game?._id || id);

  const mediaGallery: string[] = [
    ...(game?.thumbnail ? [game.thumbnail] : []),
    ...(game?.images || []),
  ];

  // DETERMINISTIC SEED MATRIX BASED ON TARGET ID STRING
  const displaySize = (() => {
    const idString = typeof targetId === "string" 
      ? targetId 
      : targetId && typeof targetId === "object" && "$oid" in targetId 
        ? (targetId as any).$oid 
        : String(targetId || id);

    let hash = 0;
    for (let i = 0; i < idString.length; i++) {
      hash = idString.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const min = 10;
    const max = 100;
    const sizeVal = min + (Math.abs(hash) % (max - min + 1));
    return `${sizeVal} GB`;
  })();

  const downloadCount = game?.downloadCount ?? 0;

  return (
    <div className="min-h-screen bg-[#08090f] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/10 via-[#08090f] to-[#08090f] text-gray-200 p-4 md:p-8 font-mono">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* BREADCRUMB NAVIGATION */}
        <div className="text-xs text-gray-500 uppercase tracking-wider">
          <Link href="/games" className="hover:text-cyan-400 transition-colors">
            Registry Index
          </Link>
          <span className="mx-2 text-gray-700">/</span>
          <span className="text-white font-bold">{game?.title}</span>
        </div>

        {/* MAIN INTERACTIVE DISPLAY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: PRIMARY VISUAL MATRIX SLIDER */}
          <div className="lg:col-span-7">
            <GameGalleryContainer
              mediaItems={mediaGallery}
              gameTitle={game?.title}
              gameStatus={game?.status}
            />
          </div>

          {/* RIGHT COLUMN: DISPATCH CONTROLS & CAPACITY METRICS */}
          <div className="lg:col-span-5 space-y-6 bg-[#0d0f1a]/60 border border-white/5 p-6 rounded-2xl backdrop-blur-md shadow-xl">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                {game?.title}
              </h1>
              <p className="text-xs text-gray-500 font-mono tracking-tighter">
                SLUG: {game?.slug}
              </p>
            </div>

            {/* PRICING & DOWNLOAD DIRECT CONNECTIONS */}
            <div className="p-4 bg-[#06070c] border border-white/5 rounded-xl flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase text-gray-600 tracking-widest">
                  ACCESS COST
                </p>
                <p className="text-2xl font-black text-white uppercase">
                  {game?.price === 0 ? (
                    <span className="text-emerald-400">FREE</span>
                  ) : (
                    `$${game?.price?.toFixed(2)}`
                  )}
                </p>
              </div>

              <div className="flex-1 max-w-[200px]">
                <DownloadButtonContainer
                  gameId={targetId}
                  price={game?.price ?? 0}
                  gameTitle={game?.title || "Asset"}
                  variant="details"
                />
              </div>
            </div>

            {/* METRICS & RUNTIME SPEC DATA-GRID */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#06070c]/50 border border-white/5 rounded-lg space-y-1">
                <div className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase tracking-wider">
                  <FiStar className="text-amber-400" /> System Rating
                </div>
                <p className="text-white font-bold">
                  {game?.rating ? game.rating.toFixed(1) : "0.0"} / 5.0
                </p>
              </div>

              <div className="p-3 bg-[#06070c]/50 border border-white/5 rounded-lg space-y-1">
                <div className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase tracking-wider">
                  <FiHardDrive className="text-cyan-400" /> Package Size
                </div>
                <p className="text-white font-bold">
                  {displaySize}
                </p>
              </div>

              <div className="p-3 bg-[#06070c]/50 border border-white/5 rounded-lg space-y-1">
                <div className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase tracking-wider">
                  <FiCalendar className="text-indigo-400" /> Launch Vector
                </div>
                <p className="text-white font-bold">
                  {game?.releaseDate || "Pending Log"}
                </p>
              </div>

              <div className="p-3 bg-[#06070c]/50 border border-white/5 rounded-lg space-y-1">
                <div className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase tracking-wider">
                  <FiCpu className="text-purple-400" /> File Source
                </div>
                <p
                  className="text-white font-bold truncate max-w-[150px]"
                  title={game?.originalName}
                >
                  {game?.originalName || "manifest.bin"}
                </p>
              </div>

              {/* DOWNLOAD COUNT METRIC CARD */}
              <div className="p-3 bg-[#06070c]/50 border border-white/5 rounded-lg space-y-1 col-span-2">
                <div className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase tracking-wider">
                  <FiDownload className="text-emerald-400" /> Transfer Deployments
                </div>
                <p className="text-white font-bold">
                  {downloadCount.toLocaleString()} downloads
                </p>
              </div>
            </div>

            {/* POPULATED SECURE PUBLISHER META-BLOCK */}
            <div className="border-t border-white/5 pt-4 space-y-3">
              <div className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase tracking-wider">
                <FiUser className="text-cyan-400" /> Operations Owner Manifest
              </div>
              <div className="flex items-center gap-3 bg-[#06070c] p-3 border border-white/5 rounded-xl">
                <div className="relative w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center overflow-hidden shrink-0">
                  {game?.owner?.image ? (
                    <Image
                      src={game?.owner?.image}
                      alt={ownerName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-bold text-indigo-400 uppercase text-sm">
                      {ownerName.substring(0, 2)}
                    </span>
                  )}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {ownerName}
                  </p>
                  <p className="text-[10px] text-gray-600 font-mono truncate">
                    {ownerEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: GENERAL DESCRIPTION CONTENT */}
        <div className="bg-[#0d0f1a]/40 border border-white/5 p-6 rounded-2xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Operational Summary Description
            </h3>
            <p className="text-xs leading-relaxed text-gray-400 max-w-4xl font-sans">
              {game?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
            <div className="space-y-2">
              <p className="text-[10px] uppercase text-gray-500 tracking-wider flex items-center gap-1">
                <FiLayers className="w-3 h-3" /> Core Genres
              </p>
              <div className="flex flex-wrap gap-1.5">
                {game?.genre?.map((tag: string) => (
                  <span
                    key={`genre-${tag}`}
                    className="px-2 py-0.5 bg-indigo-500/5 border border-indigo-500/20 rounded text-[10px] font-bold text-indigo-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase text-gray-500 tracking-wider flex items-center gap-1">
                <FiCpu className="w-3 h-3" /> Platform Deployments
              </p>
              <div className="flex flex-wrap gap-1.5">
                {game?.platform?.map((plat: string) => (
                  <span
                    key={`platform-${plat}`}
                    className="px-2 py-0.5 bg-cyan-500/5 border border-cyan-500/20 rounded text-[10px] font-bold text-cyan-400"
                  >
                    {plat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}