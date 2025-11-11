import { type ButtonHTMLAttributes } from "react";
import { twc } from "@/libs/utils";

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
}

export default function ToggleButton({
  isSelected,
  className,
  children,
  ...props
}: ToggleButtonProps) {
  return (
    <button
      className={twc(
        "flex h-[58px] w-[251px] items-center justify-center rounded-[8px] border px-5 py-4 text-base font-semibold leading-[140%] tracking-[-0.02em] transition-colors",
        isSelected
          ? "border-[#03C124] bg-[#E6F9E9] text-[#121212]"
          : "border-[#E5E5E5] bg-white text-[#121212] hover:border-[#BABABA]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
