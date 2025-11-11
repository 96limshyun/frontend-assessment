import { type PropsWithChildren } from "react";

import { twc } from "@/libs/utils";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionCard({
  title,
  subtitle,
  className,
  children,
}: PropsWithChildren<SectionCardProps>) {
  return (
    <section className={twc("flex w-full flex-col gap-6 pt-[40px]", className)}>
      <header className="flex flex-col gap-2">
        <h2 className=" text-[28px] font-bold leading-[130%] tracking-[-0.02em] text-[#121212]">
          {title}
        </h2>
        {subtitle ? (
          <p className=" text-[20px] font-medium leading-[130%] tracking-[-0.02em] text-[#565656]">
            {subtitle}
          </p>
        ) : null}
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </section>
  );
}
