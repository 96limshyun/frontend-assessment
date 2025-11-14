import { overlay } from "overlay-kit";
import { Toast } from "@/libs/ui/Toast";
import type { ReactNode } from "react";

export const showToast = (message: ReactNode, duration = 2000) => {
  return new Promise<void>((resolve) => {
    overlay.open(({ isOpen, close }) => {
      if (!isOpen) return null;

      return (
        <Toast
          message={message}
          duration={duration}
          onClose={() => {
            close();
            resolve();
          }}
        />
      );
    });
  });
};
