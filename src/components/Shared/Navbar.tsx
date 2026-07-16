// src/components/Shared/Navbar.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NavLinkItem } from "@/types";
import { authClient } from "@/lib/auth-client";

// Import icons from React Icons
import {
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { IoGridOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/games" },
  { label: "About Us", href: "/about-us" },
  // { label: "Tournament", href: "/tournament" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function RepositoryNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // FIXED: Inline intersection casting to extend the user object interface signature with an optional role field safely
  const userRole = (user as typeof user & { role?: string })?.role || "user";

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close user dropdown if clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsDropdownOpen(false);
    router.push("/");
    toast.success("Killed current session authorization.");
  };

  return (
    <>
      {/* ==========================================
            MAIN NAVBAR CONTAINER WITH CYBER PANEL BACKGROUND
            ========================================== */}
      <header className="w-full bg-[#05060c] border-b border-gray-900 sticky top-0 z-[9999]">
        {/* Subtle Tech Grid / Scanline Mesh Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Premium Linear Blue/Purple Top Horizon Accent Line */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 shadow-[0_1px_10px_rgba(99,102,241,0.5)]" />

        {/* Outer Spacing Wrapper */}
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 relative z-20">
          {/* Main Structural row (overflow hidden removed to protect dropdown layout) */}
          <div className="flex items-center justify-between h-16 md:h-20 bg-[#0d0f1a]/80 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl relative z-30">
            {/* LOGO BLOCK */}
            <div className="h-full flex items-center pl-6 pr-14 md:pl-8 md:pr-20 bg-[#121420] border-r border-gray-800/60 shadow-xl shrink-0 group relative cursor-pointer rounded-l-xl [clip-path:polygon(0_0,100%_0,82%_100%,0%_100%)]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-indigo-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:via-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-500 pointer-events-none" />

              <Link
                href="/"
                className="font-sans tracking-wider uppercase select-none relative z-10 no-underline"
              >
                <span className="text-xl md:text-2xl font-black text-white font-mono tracking-widest transition-transform duration-300 inline-block group-hover:-translate-y-[1px]">
                  ST
                </span>
                <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 font-mono tracking-widest transition-all duration-300 inline-block group-hover:scale-105 filter group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
                  ASH
                </span>
              </Link>
            </div>

            {/* DESKTOP CONTENT & RIGHT MENU BLOCK */}
            <div className="flex-1 h-full bg-[#090b14]/90 flex items-center justify-between px-6 md:px-12 border-l border-gray-800/40 relative z-40 rounded-r-xl">
              {/* Desktop Link Routing Navigation */}
              <nav
                className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs font-bold font-mono tracking-widest"
                onMouseLeave={() => setHoveredLink(null)}
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      className={`text-xs font-bold font-mono tracking-widest uppercase relative py-2 transition-colors duration-300 no-underline ${
                        isActive
                          ? "text-indigo-400 font-black"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>

                      {/* Shared Floating Underline Animation */}
                      {hoveredLink === link.href && (
                        <motion.span
                          layoutId="navHoverUnderline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Static Active State Line */}
                      {isActive && !hoveredLink && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-100" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* UTILITY ACTION ITEMS CONTROLS */}
              <div className="ml-auto flex items-center space-x-4 md:space-x-6 relative z-50">
                {/* Search Trigger */}
                <button
                  aria-label="Search Vault"
                  className="text-gray-400 hover:text-indigo-400 transition-all duration-300 cursor-pointer py-2 hover:scale-110 transform"
                >
                  <FiSearch className="w-4 h-4 transition-transform duration-300 hover:rotate-6" />
                </button>

                {/* SESSION CONTEXT RENDERING */}
                {isPending ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-950/40 border border-indigo-500/20 rounded font-mono text-[10px] tracking-widest text-indigo-400 uppercase select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                    Syncing Node...
                  </div>
                ) : user ? (
                  /* User Dropdown Active */
                  <div className="relative order-2 z-[10000]" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={handleDropdownToggle}
                      className={`
                        flex items-center gap-2 p-1.5 pr-3 rounded-xl transition-all duration-200 cursor-pointer text-left focus:outline-none group/user
                        ${
                          isDropdownOpen
                            ? "bg-indigo-950/40 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.25)] text-white"
                            : "hover:bg-white/[0.03] border border-transparent hover:border-gray-800/60 text-gray-300 hover:text-white"
                        }
                      `}
                    >
                      <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                        <div className="w-full h-full bg-[#0d0f1a] rounded flex items-center justify-center text-white font-mono text-[11px] font-black uppercase">
                          {user?.name ? user.name.slice(0, 2) : "OP"}
                        </div>
                      </div>

                      <div className="text-left hidden sm:block font-mono">
                        <p className="text-xs font-bold tracking-wider truncate max-w-24">
                          {user?.name || "Operator"}
                        </p>
                      </div>

                      <FiChevronDown
                        className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${
                          isDropdownOpen
                            ? "rotate-180 text-indigo-400"
                            : "group-hover/user:text-indigo-400"
                        }`}
                        style={{ strokeWidth: 3 }}
                      />
                    </button>

                    {/* Animated Dropdown Menu Panel via Framer Motion */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute right-0 top-full mt-2 w-60 bg-[#0d0f1a] border border-white/10 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono py-1.5 z-[100000] origin-top-right"
                        >
                          <div className="px-5 py-3.5 border-b border-white/5 mb-1 bg-gradient-to-r from-indigo-950/20 to-transparent">
                            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">
                              Active Node
                            </p>
                            <p className="text-xs font-bold text-gray-300 truncate max-w-[200px]">
                              {user?.name || "Operator"}
                            </p>
                            <p className="text-[11px] text-gray-500 truncate font-medium max-w-[200px]">
                              {user?.email}
                            </p>
                          </div>

                          <Link
                            href="/profile"
                            className="flex items-center gap-3.5 px-5 py-2.5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors no-underline uppercase tracking-wider"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <FiUser
                              className="w-4 h-4 text-gray-500"
                              style={{ strokeWidth: 2.2 }}
                            />
                            <span>Profile</span>
                          </Link>

                          <Link
                            href={`/dashboard/${userRole}`}
                            className="flex items-center gap-3.5 px-5 py-2.5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors no-underline uppercase tracking-wider"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <IoGridOutline className="w-4 h-4 text-gray-500" />
                            <span>Dashboard</span>
                          </Link>

                          <Link
                            href={`/dashboard/${userRole}/settings`}
                            className="flex items-center gap-3.5 px-5 py-2.5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/[0.03] transition-colors no-underline uppercase tracking-wider"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <FiSettings
                              className="w-4 h-4 text-gray-500"
                              style={{ strokeWidth: 2.2 }}
                            />
                            <span>Settings</span>
                          </Link>

                          <div className="border-t border-white/5 mt-1.5 pt-1.5">
                            <button
                              type="button"
                              onClick={handleSignOut}
                              className="flex items-center gap-3.5 px-5 py-2.5 w-full text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-colors cursor-pointer focus:outline-none uppercase tracking-wider text-left"
                            >
                              <FiLogOut
                                className="w-4 h-4"
                                style={{ strokeWidth: 2.2 }}
                              />
                              <span>Disconnect</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  /* Authentication Trigger Links */
                  <>
                    <Link
                      href="/auth/login"
                      className="text-xs font-bold font-mono tracking-widest uppercase text-gray-300 hover:text-white transition-all duration-300 hidden sm:inline-flex relative py-1 group no-underline"
                    >
                      <span>Login</span>
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>

                    <Link
                      href="/auth/register"
                      className="inline-flex items-center justify-center bg-transparent border border-indigo-500/80 text-indigo-400 hover:text-white transition-all duration-300 text-[11px] font-bold font-mono tracking-widest px-4 md:px-5 h-9 min-w-0 relative overflow-hidden group/btn shadow-[0_0_15px_rgba(99,102,241,0)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] no-underline [clip-path:polygon(6px_0%,100%_0%,calc(100%-6px)_100%,0%_100%)]"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-500 transform -translate-x-full slope-clip group-hover/btn:translate-x-0 ease-out z-0" />
                      <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform skew-x-12 transition-all duration-1000 group-hover/btn:left-[200%]" />
                      <span className="relative z-10 transition-transform duration-300 group-hover/btn:scale-105">
                        JOIN NOW
                      </span>
                    </Link>
                  </>
                )}

                {/* Mobile Menu Button Trigger */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer z-50 relative"
                  aria-label="Toggle Navigation Drawer"
                >
                  {isMobileMenuOpen ? (
                    <FiX className="w-6 h-6" />
                  ) : (
                    <FiMenu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==========================================
            MOBILE FULL-SCREEN REPOSITORY OVERLAY DRAWER
            ========================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#05060c]/98 z-40 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-900 pt-24">
              <span className="text-xl font-black text-white font-mono tracking-widest">
                ST
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  ASH
                </span>
              </span>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 space-y-6 text-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-bold font-mono tracking-widest uppercase transition-colors duration-200 no-underline ${
                      isActive
                        ? "text-indigo-400 font-black"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Mobile Auth Drawer Content Context Wrapper */}
              <div className="w-full px-12 pt-8 flex flex-col items-center gap-4 border-t border-gray-900/60 font-mono">
                {isPending ? (
                  <p className="text-xs text-indigo-400 uppercase tracking-widest animate-pulse">
                    Syncing Connection...
                  </p>
                ) : user ? (
                  <div className="w-full space-y-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Node:{" "}
                      <span className="text-white font-bold">
                        {user.name || "Operator"}
                      </span>
                    </p>
                    <div className="grid grid-cols-1 gap-2 w-full max-w-xs mx-auto">
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-2.5 text-xs bg-[#0d0f1a] border border-white/5 text-gray-300 rounded uppercase tracking-wider no-underline"
                      >
                        Profile
                      </Link>
                      <Link
                        href={`/dashboard/${userRole}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-2.5 text-xs bg-[#0d0f1a] border border-white/5 text-gray-300 rounded uppercase tracking-wider no-underline"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href={`/dashboard/${userRole}/settings`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-2.5 text-xs bg-[#0d0f1a] border border-white/5 text-gray-300 rounded uppercase tracking-wider no-underline"
                      >
                        Settings
                      </Link>
                    </div>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-xs text-rose-400 uppercase tracking-widest py-2 hover:text-rose-300 transition-colors cursor-pointer"
                    >
                      Disconnect Node
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-bold tracking-widest uppercase text-gray-300 py-2 hover:text-white transition-colors no-underline"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-bold tracking-widest uppercase text-indigo-400 py-2 hover:text-indigo-300 transition-colors no-underline"
                    >
                      Join Now
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
