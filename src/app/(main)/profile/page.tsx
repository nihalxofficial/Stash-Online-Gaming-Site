import React from "react";
import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";
import { getUserSession } from "@/lib/core/session";
import ProfileView from "./ProfileView";

export default async function ProfilePage() {
  const user = await getUserSession();

  // NO SESSION FALLBACK UI (Rendered on Server)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#08090f] flex items-center justify-center font-mono text-gray-400 p-4">
        <div className="w-full max-w-md border border-dashed border-white/10 bg-[#0d0f1a]/40 p-8 rounded-2xl text-center backdrop-blur-md shadow-2xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
            <FiAlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Unauthorized Access
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              No active session identity detected. Please authenticate to map
              your database node.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-block px-4 py-2 bg-white text-black hover:bg-cyan-400 hover:text-black rounded-lg text-xs font-bold transition-all duration-200 uppercase tracking-wider"
            >
              Establish Connection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Safe parsing of MongoDB data fields to pass down as clean primitives
  const serializableUser = {
    id: user.id || "ID_UNKNOWN",
    name: user.name || "Operator",
    email: user.email || "",
    image: user.image || null,
    emailVerified: user.emailVerified === true || String(user.emailVerified) === "true",
    role: user.role || "user",
    plan: user.plan || "free",
    status: user.status || "offline",
    createdAt: typeof user.createdAt === "string" ? user.createdAt : user.createdAt?.$date || user.createdAt || null,
  };

  return <ProfileView initialUser={serializableUser} />;
}