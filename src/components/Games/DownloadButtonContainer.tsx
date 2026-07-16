// src/components/Games/DownloadButtonContainer.tsx
"use client";

import React, { useState } from "react";
import {
  FiDownload,
  FiCreditCard,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import { Button, Modal } from "@heroui/react";
import { getToken } from "@/lib/core/session";

interface DownloadButtonContainerProps {
  gameId: string;
  price: number;
  gameTitle: string;
  variant?: "card" | "details";
}

export default function DownloadButtonContainer({
  gameId,
  price,
  gameTitle,
  variant = "details",
}: DownloadButtonContainerProps) {
  const [step, setStep] = useState<"checkout" | "success">("checkout");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isFree = price === 0;
  const isCard = variant === "card";

  const triggerDownloadAction = async() => {
    const token = await getToken();
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/games/${gameId}/download?token=${token}`, '_blank');
  };

  const simulatePaymentProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 1500);
  };

  const resetModalFlow = () => {
    setStep("checkout");
  };

  // Button layout matching your card cuts perfectly
  const triggerButtonStyle = isCard
    ? "w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-[11px] font-black tracking-widest uppercase py-3 px-4 rounded transition-all duration-300 cursor-pointer shadow-lg shadow-indigo-600/10 active:scale-[0.98] [clip-path:polygon(12px_0,100%_0,100%_100%,0_100%,0_12px)]"
    : "h-12 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl flex items-center gap-2 font-black shadow-lg shadow-indigo-600/30 text-xs uppercase tracking-widest transition-all active:scale-95";

  if (isFree) {
    return (
      <button
        onClick={triggerDownloadAction}
        className={triggerButtonStyle}
        type="button"
      >
        <FiDownload className="w-3 h-3 stroke-[3]" />
        <span>Get Now</span>
      </button>
    );
  }

  return (
    <Modal>
      {/* 1. INTERACTION TRIGGER */}
      <Button className={triggerButtonStyle} type="button">
        <FiDownload className="w-3 h-3 stroke-[3]" />
        <span>{isCard ? "Get Now" : "Get Now: Buy Access"}</span>
      </Button>

      {/* 2. OVERLAY BACKDROP FRAME */}
      <Modal.Backdrop className="fixed inset-0 bg-black/60 ">
        {/* items-start pushes down, flex justify-center ensures it stays exactly centered horizontally */}
        <Modal.Container className="w-full h-full overflow-y-auto flex justify-center items-start pt-24 pb-12 px-4">
          {/* mx-auto locks it to horizontal grid center, mt-6 ensures a clean top offset from navbars */}
          <Modal.Dialog className="w-full sm:max-w-[440px] mx-auto mt-6 bg-[#0d0f1a] border border-white/10 text-gray-200 font-mono rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden focus:outline-none">
            <Modal.CloseTrigger
              onClick={resetModalFlow}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors cursor-pointer"
            />

            {/* STEP A: SECURE ACCESS TERMINAL */}
            {step === "checkout" && (
              <div className="space-y-6 w-full">
                <Modal.Header className="flex flex-col gap-2 items-start p-0">
                  <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl shadow-inner">
                    <FiCreditCard className="size-6" />
                  </div>
                  <div className="space-y-1 mt-1">
                    <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest block">
                      Secure Access Terminal
                    </span>
                    <Modal.Heading className="text-lg font-black text-white uppercase tracking-wide text-left leading-snug truncate max-w-[320px]">
                      {gameTitle}
                    </Modal.Heading>
                  </div>
                </Modal.Header>

                <Modal.Body className="p-0 space-y-4">
                  <div className="p-4 bg-[#06070c] border border-white/5 rounded-xl flex items-center justify-between text-xs shadow-md">
                    <span className="text-gray-500 tracking-wider">
                      Access Token Weight:
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-black text-base">
                      ${price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 text-[11px] text-gray-400 leading-relaxed bg-white/[0.02] border border-white/[0.04] p-3.5 rounded-xl shadow-inner">
                    <FiShield className="text-cyan-400 w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Sandbox interface routing active. Authorization clearance
                      protocols bypass production networks.
                    </span>
                  </div>
                </Modal.Body>

                <Modal.Footer className="p-0 pt-2">
                  {/* FIXED: Swapped disabled for isDisabled to match HeroUI specification */}
                  <Button
                    isDisabled={isProcessing}
                    onClick={simulatePaymentProcess}
                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-widest rounded-xl py-6 shadow-lg shadow-indigo-600/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      "Confirm Payment"
                    )}
                  </Button>
                </Modal.Footer>
              </div>
            )}

            {/* STEP B: CLEARANCE SUCCESS HUB */}
            {step === "success" && (
              <div className="space-y-6 text-center w-full">
                <Modal.Header className="flex flex-col gap-3 items-center p-0">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/5">
                    <FiCheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-emerald-400 font-black tracking-widest block uppercase">
                      Transaction Confirmed
                    </span>
                    <Modal.Heading className="text-lg font-black text-white uppercase tracking-wide">
                      Access Key Cleared
                    </Modal.Heading>
                  </div>
                </Modal.Header>

                <Modal.Body className="p-0">
                  <p className="text-xs text-gray-400 leading-relaxed px-1">
                    Verification matrix check successful. The direct system
                    execution download link token is fully bound to your client
                    profile context.
                  </p>
                </Modal.Body>

                <Modal.Footer className="p-0 pt-2 flex gap-3">
                  <Button
                    slot="close"
                    onClick={resetModalFlow}
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white text-xs font-bold uppercase rounded-xl py-6 transition-all"
                  >
                    Dismiss
                  </Button>
                  <Button
                    slot="close"
                    onClick={() => {
                      triggerDownloadAction();
                      resetModalFlow();
                    }}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider rounded-xl py-6 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    <FiDownload className="w-4 h-4 stroke-[2.5]" />
                    <span>Run Fetch</span>
                  </Button>
                </Modal.Footer>
              </div>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}