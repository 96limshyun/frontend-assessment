import { type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twc } from "@/libs/utils";

const nextButtonVariants = cva(
  "text-base font-semibold leading-[140%] tracking-[-0.02em] text-white transition-colors",
  {
    variants: {
      variant: {
        header: "h-[38px] w-[120px] rounded-[4px] px-3 py-2",
        bottom: "w-full h-[53px] rounded-[8px]",
      },
      enabled: {
        true: "bg-[#03C124] hover:bg-[#02891A] cursor-pointer",
        false: "bg-[#D7D7D7] cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "header",
      enabled: true,
    },
  }
);

interface NextButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof nextButtonVariants> {
  isEnabled: boolean;
}

export default function NextButton({
  isEnabled,
  variant,
  className,
  ...props
}: NextButtonProps) {
  return (
    <button
      className={twc(
        nextButtonVariants({ variant, enabled: isEnabled }),
        className
      )}
      disabled={!isEnabled}
      {...props}
    >
      다음으로
    </button>
  );
}
