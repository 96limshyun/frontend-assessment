"use client";

import { useEffect, type ReactNode } from "react";
import { twx } from "@/libs/utils";

interface ToastProps {
  message: ReactNode;
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  message,
  duration = 2000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-9999 min-h-[48px] w-[328px] md:w-[528px]">
      <div
        className={twx(
          "rounded-[8px] bg-[#121212] px-6 py-4",
          "text-white text-base font-medium",
          "shadow-lg text-center min-h-full flex flex-col items-center justify-center gap-1"
        )}
      >
        {message}
      </div>
    </div>
  );
}
