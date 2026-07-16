// src/app/blogs/page.tsx
import React from "react";
import Link from "next/link";
import { FiClock, FiTag, FiArrowRight, FiTerminal, FiShield, FiTv, FiLayers, FiAward } from "react-icons/fi";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  readingTime: string;
  createdAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

const STATIC_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Anti-Cheat Integration & Bracket Seeding Logic in Community Tournaments",
    slug: "anti-cheat-bracket-seeding-logic-tournaments",
    excerpt: "An architectural breakdown of how we prevent match manipulation, automate double-elimination brackets, and verify client-side game files before lobby deployment.",
    content: "Full content log here...",
    coverImage: "https://gamespace.com/wp-content/uploads/2021/04/Tournaments-780x420.jpg",
    category: "Tournaments",
    tags: ["Esports", "Brackets", "Anti-Cheat"],
    readingTime: "6 min read",
    createdAt: "2026-07-16",
    author: {
      name: "Sys_Admin",
      role: "Tournament Director",
      avatar: "https://i.pravatar.cc/150?img=33"
    }
  },
  {
    id: "blog-2",
    title: "Sub-Second Latency: Optimizing Live RTMP Streams for Competitive Matches",
    slug: "sub-second-latency-rtmp-stream-optimization",
    excerpt: "How our backend video pipelines compress raw high-framerate data layouts to let viewers watch tournament streams with near-zero delay relative to the lobby state.",
    content: "Full content log here...",
    coverImage: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600&auto=format&fit=crop",
    category: "Streaming",
    tags: ["Live Video", "RTMP", "WebSockets"],
    readingTime: "5 min read",
    createdAt: "2026-07-12",
    author: {
      name: "Core_Dev",
      role: "Streaming Engineer",
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  },
  {
    id: "blog-3",
    title: "Building Real-Time Matchmaking Filters for Cross-Platform Lobbies",
    slug: "real-time-matchmaking-filters-cross-platform",
    excerpt: "Behind the scenes of our updated indexing queries that let players filter active game rooms by specific platforms (PC, Xbox, PS5) without dropped network packets.",
    content: "Full content log here...",
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
    category: "Matchmaking",
    tags: ["MongoDB", "Gaming", "Platform Sync"],
    readingTime: "4 min read",
    createdAt: "2026-07-09",
    author: {
      name: "Nihal_Uddin",
      role: "Lead Platform Engineer",
      avatar: "https://i.pravatar.cc/150?img=68"
    }
  },
  {
    id: "blog-4",
    title: "The Rise of High-Stakes Pro-Am Circuit Leagues: What to Expect Next Season",
    slug: "rise-of-high-stakes-pro-am-circuit-leagues",
    excerpt: "A strategic overview of upcoming competitive tiers, point-allocation metrics, team registration guidelines, and the platform prize pool distribution updates.",
    content: "Full content log here...",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop",
    category: "Competition",
    tags: ["Esports", "Leagues", "Prize Pools"],
    readingTime: "7 min read",
    createdAt: "2026-07-02",
    author: {
      name: "Sys_Admin",
      role: "Esports Lead",
      avatar: "https://i.pravatar.cc/150?img=33"
    }
  },
  {
    id: "blog-5",
    title: "Designing Hyper-Responsive Game Cards with CSS Cyber-Glow Aesthetics",
    slug: "designing-game-cards-css-cyber-glow",
    excerpt: "Polishing the frontend card components of our central database directory using interactive hardware-accelerated filters, clean fonts, and smooth state updates.",
    content: "Full content log here...",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    category: "UI Design",
    tags: ["Tailwind", "Frontend", "UX"],
    readingTime: "3 min read",
    createdAt: "2026-06-25",
    author: {
      name: "Core_Dev",
      role: "UI Architect",
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  },
  {
    id: "blog-6",
    title: "Handling Mass Traffic Surges During Live Grand Finale Broadcasts",
    slug: "handling-mass-traffic-surges-live-grand-final",
    excerpt: "How we distribute network requests across multiple caching layers when tens of thousands of simultaneous users join to watch live streams and claim drop rewards.",
    content: "Full content log here...",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    category: "Infrastructure",
    tags: ["Scaling", "Caching", "Performance"],
    readingTime: "8 min read",
    createdAt: "2026-06-18",
    author: {
      name: "Nihal_Uddin",
      role: "Lead Platform Engineer",
      avatar: "https://i.pravatar.cc/150?img=68"
    }
  },
  {
    id: "blog-7",
    title: "New Match Overlay Framework: Broadcast Overlays via Dynamic WebSockets",
    slug: "new-match-overlay-framework-websockets",
    excerpt: "Deploying lightweight realtime display canvases to fetch player stats live and render instant head-to-head performance graphs directly inside streaming layouts.",
    content: "Full content log here...",
    coverImage: "https://i.pcmag.com/imagery/lineups/06dxdkd5h3MmSKAaMczRpbQ-1..v1569492889.jpg",
    category: "Streaming",
    tags: ["Overlays", "WebSockets", "Broadcast"],
    readingTime: "5 min read",
    createdAt: "2026-06-11",
    author: {
      name: "Core_Dev",
      role: "UI Architect",
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  }
];

export default async function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#06070a] text-gray-200 p-4 md:p-8 font-mono tracking-tight">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-indigo-500/20 pb-6 relative">
          <div className="absolute bottom-0 left-0 w-16 h-[2px] bg-cyan-400"></div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 text-xs uppercase tracking-widest font-black">
              <FiTerminal className="w-3.5 h-3.5 animate-pulse" /> CENTRAL SYSTEM INTEL
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
              COMPETITIVE LOGS
            </h1>
          </div>
          <div className="text-xs font-mono bg-[#0d0f1a] border border-white/10 px-4 py-2 rounded-md shadow-inner flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            LOG ENTRIES LOCKED: <span className="text-cyan-400 font-black">{STATIC_BLOGS.length}</span>
          </div>
        </div>

        {/* FEATURED LOG HERO BAR */}
        {STATIC_BLOGS.length > 0 && (
          <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#0c0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-indigo-500/40">
            <div className="lg:col-span-7 aspect-video lg:aspect-auto relative min-h-[260px] lg:min-h-[400px] overflow-hidden bg-black">
              <img 
                src={STATIC_BLOGS[0].coverImage} 
                alt={STATIC_BLOGS[0].title}
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-indigo-600 text-white font-black px-3 py-1 text-[10px] uppercase tracking-widest rounded shadow-md border border-indigo-400/30">
                LATEST BROADCAST
              </div>
            </div>
            
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 bg-gradient-to-br from-[#0d0f1a] to-[#08090f]">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400 text-[10px] font-bold">
                  <span className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                    {STATIC_BLOGS[0].category}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1"><FiClock className="w-3 h-3 text-indigo-400" /> {STATIC_BLOGS[0].readingTime}</div>
                </div>
                
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight group-hover:text-cyan-400 transition-colors">
                  <Link href={`/blogs/${STATIC_BLOGS[0].slug}`}>{STATIC_BLOGS[0].title}</Link>
                </h2>
                
                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  {STATIC_BLOGS[0].excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={STATIC_BLOGS[0].author.avatar} className="w-8 h-8 rounded-md border border-white/10" alt="" />
                  <div>
                    <p className="text-white font-black text-xs">{STATIC_BLOGS[0].author.name}</p>
                    <p className="text-gray-500 text-[9px] uppercase tracking-widest font-bold">{STATIC_BLOGS[0].author.role}</p>
                  </div>
                </div>
                
                <Link 
                  href={`/blogs/${STATIC_BLOGS[0].slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black text-white bg-indigo-600/80 border border-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded transition-all group-hover:px-5"
                >
                  DECRYPT LOG <FiArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* STREAMLINED TOURNAMENT GRID ARCHIVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATIC_BLOGS.slice(1).map((post) => (
            <article 
              key={post.id}
              className="group bg-[#0d0f1a] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-4">
                <div className="aspect-video w-full relative overflow-hidden bg-black border-b border-white/10">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 right-3 bg-[#06070a]/90 text-cyan-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border border-white/10 backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                <div className="px-5 space-y-3">
                  <div className="flex items-center gap-3 text-gray-500 text-[10px] font-bold">
                    <span>{post.createdAt}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1"><FiClock /> {post.readingTime}</div>
                  </div>
                  
                  <h3 className="text-sm font-black text-white tracking-tight line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 font-sans">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 mt-6 pt-4 border-t border-white/5 flex items-center justify-between bg-[#0a0b12]">
                <div className="flex items-center gap-1.5 overflow-hidden max-w-[65%]">
                  <FiTag className="text-indigo-400 shrink-0 w-3 h-3" />
                  <span className="text-gray-500 text-[10px] font-bold truncate uppercase tracking-tight">
                    {post.tags.join(" | ")}
                  </span>
                </div>

                <Link 
                  href={`/blogs/${post.slug}`}
                  className="text-xs font-black text-indigo-400 hover:text-cyan-400 flex items-center gap-1 transition-colors group-hover:gap-2"
                >
                  VIEW DATA <FiArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}