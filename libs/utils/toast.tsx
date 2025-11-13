import { overlay } from "overlay-kit";
import { Toast } from "@/libs/ui/Toast";

export const showToast = (message: string, duration = 2000) => {
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
