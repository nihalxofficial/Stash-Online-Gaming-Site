"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";
import stash from "@/assets/Stash.png";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const { email, password } = userData as Record<string, string>;

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        toast.error(
          error.message || "Authentication handshake terminal failure.",
        );
        return;
      }

      if (data) {
        toast.success("Session Initialized. Access Granted.");
        router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected infrastructure exception occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Redirecting to Google Auth Protocol...");
  };

  const cyberPolygon =
    "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)";

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 select-none overflow-hidden bg-[#05060c]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none duration-[6000ms]" />

      <div
        className={`w-full max-w-5xl p-[1.5px] bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-lg shadow-[0_0_50px_rgba(99,102,241,0.15)] group/container transition-all duration-[1000ms] cubic-bezier(0.16,1,0.3,1) ${
          isMounted
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        style={{ clipPath: cyberPolygon }}
      >
        <div
          className="w-full bg-[#0d0f1a] flex flex-col md:flex-row min-h-[550px]"
          style={{ clipPath: cyberPolygon }}
        >
          {/* LEFT PANEL */}
          <div className="w-full md:w-1/2 relative flex items-center justify-center p-8 lg:p-12 overflow-hidden min-h-[320px] md:min-h-full">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out scale-110 group-hover/container:scale-105"
              style={{ backgroundImage: `url(${stash.src})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0d0f1a] via-[#0d0f1a]/75 to-[#0d0f1a]/20" />
            <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent top-0 animate-[bounce_5s_infinite] pointer-events-none" />

            <div
              className={`relative z-10 space-y-4 max-w-sm mr-auto transition-all duration-1000 delay-300 ease-out ${
                isMounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 text-[9px] font-mono tracking-widest text-indigo-400 uppercase rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Secure Channel
              </div>
              <h1 className="text-2xl lg:text-3xl font-black font-mono tracking-wider text-white uppercase leading-none">
                Unlock Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                  Inventory Vault
                </span>
              </h1>
              <p className="text-[11px] font-mono text-gray-200 backdrop-blur-[2px] bg-black/10 p-2 rounded border border-white/5 leading-relaxed tracking-wide">
                Welcome back to STASH. Access your secure node to manage
                decentralized player assets, sync custom configurations, and
                orcheate live drops instantly.
              </p>
              <div className="pt-2 border-t border-white/5 flex gap-4 text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                <div>
                  Node: <span className="text-white">Core_Alpha</span>
                </div>
                <div>
                  Status:{" "}
                  <span className="text-indigo-400 animate-pulse">Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12 bg-[#090b14]/50 border-t md:border-t-0 md:border-l border-white/[0.04]">
            <div
              className={`space-y-5 transition-all duration-[1000ms] delay-500 ease-out ${
                isMounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <div className="flex flex-col mb-1">
                <h2 className="text-sm font-black font-mono tracking-[0.25em] uppercase text-white">
                  Access Portal
                </h2>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] mt-1">
                  Stash Cybernetics Division
                </p>
              </div>

              <button
                type="button"
                disabled={isLoading}
                onClick={handleGoogleLogin}
                className="w-full cursor-pointer flex items-center justify-center gap-3 bg-[#05060c] border border-white/10 hover:border-indigo-500/50 hover:bg-[#090b14] text-gray-300 hover:text-white font-mono text-xs font-bold tracking-widest h-11 transition-all duration-300 uppercase rounded-lg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                <FaGoogle className="text-indigo-400 text-sm" />
                Sign in with Google
              </button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.06]" />
                </div>
                <span className="bg-[#090b14] md:bg-[#0d0f1a] px-3 text-[10px] text-gray-500 font-mono uppercase tracking-[0.15em] relative z-10">
                  Or Secure Login
                </span>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5 group/input">
                  <label className="text-[10px] font-mono font-bold tracking-widest text-gray-400 group-focus-within/input:text-indigo-400 uppercase pl-1 transition-colors duration-300">
                    Identity Email
                  </label>
                  <div className="relative flex items-center bg-[#05060c] border border-white/10 focus-within:border-indigo-500/60 rounded-lg px-4 h-11 transition-all duration-300">
                    <FaEnvelope className="text-gray-500 text-xs mr-3 shrink-0 group-focus-within/input:text-indigo-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      disabled={isLoading}
                      placeholder="Enter identity link..."
                      className="w-full bg-transparent text-xs font-mono focus:outline-none text-white placeholder-gray-600 tracking-wide disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 group/input">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-mono font-bold tracking-widest text-gray-400 group-focus-within/input:text-indigo-400 uppercase transition-colors duration-300">
                      Access Key
                    </label>
                    <Link
                      href="#"
                      className="text-[10px] font-mono tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative flex items-center bg-[#05060c] border border-white/10 focus-within:border-indigo-500/60 rounded-lg px-4 h-11 transition-all duration-300">
                    <FaLock className="text-gray-500 text-xs mr-3 shrink-0 group-focus-within/input:text-indigo-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      disabled={isLoading}
                      placeholder="••••••••••••"
                      className="w-full bg-transparent text-xs font-mono focus:outline-none text-white placeholder-gray-600 tracking-widest disabled:opacity-50"
                    />
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-white transition-colors ml-2 cursor-pointer focus:outline-none shrink-0 disabled:opacity-30"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-xs" />
                      ) : (
                        <FaEye className="text-xs" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  isDisabled={isLoading} // 👈 Changed from disabled to isDisabled
                  className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black font-mono text-xs tracking-[0.15em] h-11 mt-4 hover:brightness-110 active:scale-[0.99] transition-all duration-300 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading && (
                    <svg
                      className="animate-spin h-4 w-4 text-white shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  {isLoading ? "INITIALIZING..." : "INITIALIZE SESSION"}
                </Button>
              </form>

              <div className="text-center pt-4 border-t border-white/5">
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  Not joined yet?{" "}
                  <Link
                    href="/auth/register"
                    className="text-indigo-400 hover:text-white font-bold ml-1 transition-colors underline-offset-4 hover:underline"
                  >
                    Register Instance
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
