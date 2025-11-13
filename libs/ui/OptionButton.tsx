import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { twx } from "@/libs/utils";

interface OptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: ReactNode;
}

const OptionButton = forwardRef<HTMLButtonElement, OptionButtonProps>(
  ({ selected, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twx(
          "h-[58px] rounded-[8px] border px-5 py-4",
          "text-base font-medium leading-[140%] tracking-[-0.02em]",
          "transition-colors cursor-pointer",
          selected
            ? "bg-[#E6F9E9] border-[#03C124] text-[#03C124]"
            : "bg-[#F7F7F8] border-[#E5E5E5] text-[#121212] hover:bg-[#E5E5E5] hover:border-[#BABABA]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

OptionButton.displayName = "OptionButton";

export default OptionButton;
