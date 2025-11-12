import { type ReactNode, forwardRef, type HTMLAttributes } from "react";
import { twc } from "@/libs/utils";
import Image from "next/image";

interface SelectTriggerProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  value?: string;
  children?: ReactNode;
}

const SelectTrigger = forwardRef<HTMLDivElement, SelectTriggerProps>(
  ({ placeholder, value, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twc(
          "flex h-[60px] items-center justify-between rounded-[8px] border border-[#E5E5E5] bg-white px-5 cursor-pointer hover:border-[#BABABA] transition-colors",
          className
        )}
        {...props}
      >
        {children || (
          <>
            <span
              className={twc(
                "text-base",
                value ? "text-[#121212]" : "text-[#8F8F8F]"
              )}
            >
              {value || placeholder}
            </span>
            <Image src="/chevron-right.svg" alt="선택" width={28} height={28} />
          </>
        )}
      </div>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";

export default SelectTrigger;
