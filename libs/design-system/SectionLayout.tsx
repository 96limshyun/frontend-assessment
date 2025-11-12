import { type ReactNode } from "react";

import { twx } from "@/libs/utils";

interface SectionLayoutProps {
  leftTop: ReactNode;
  leftBottom: ReactNode;
  right: ReactNode;
  className?: string;
}

export default function SectionLayout({
  leftTop,
  leftBottom,
  right,
  className,
}: SectionLayoutProps) {
  return (
    <section className={twx("flex w-full justify-center", className)}>
      <div className="grid w-full max-w-[360px] grid-cols-1 gap-10 px-5 pb-[160px] md:max-w-[1100px] md:grid-cols-[repeat(2,510px)] md:justify-between">
        <div className="grid grid-cols-1 gap-10 md:w-[510px]">
          {leftTop}
          {leftBottom}
        </div>
        <div className="flex w-full flex-col gap-10 md:w-[510px]">{right}</div>
      </div>
    </section>
  );
}
