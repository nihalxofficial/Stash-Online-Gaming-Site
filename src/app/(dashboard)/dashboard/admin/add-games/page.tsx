import React from "react";
import { FiGrid } from "react-icons/fi";
import AddGameForm from "./AddGameForm";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Deploy Game Node | Admin Dashboard",
  description: "Initialize and configure arena games matrix system",
};

export default async function AddGamePage() {
  const user = await getUserSession();
  return (
    <div className="w-full max-w-4xl mx-auto font-mono select-none pb-12">
      
      {/* HEADER INDEX CONTEXT */}
      <div className="mb-6 border-b border-white/5 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 uppercase">
            DEPLOY NEW GAME TERMINAL
          </h1>
          <p className="text-[11px] text-gray-500 mt-1">INITIALIZE GAME OBJECT CONFIGURATIONS INTO ARENA CENTRAL NODE</p>
        </div>
        <FiGrid className="w-5 h-5 text-indigo-500/50 hidden sm:block" />
      </div>

      {/* CORE INTERACTIVE MATRIX CONTROLLER */}
      <AddGameForm userId={user?.id ?? ""} />

    </div>
  );
}