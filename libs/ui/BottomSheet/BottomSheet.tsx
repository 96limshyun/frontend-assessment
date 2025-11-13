"use client";

import { type PropsWithChildren } from "react";
import { Drawer } from "vaul";
import { twx } from "@/libs/utils";
import Image from "next/image";

interface BottomSheetRootProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

function BottomSheetRoot({
  children,
  open,
  onOpenChange,
  defaultOpen,
}: PropsWithChildren<BottomSheetRootProps>) {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      {children}
    </Drawer.Root>
  );
}

interface BottomSheetTriggerProps {
  asChild?: boolean;
  className?: string;
}

function BottomSheetTrigger({
  children,
  asChild,
  className,
}: PropsWithChildren<BottomSheetTriggerProps>) {
  return (
    <Drawer.Trigger asChild={asChild} className={className}>
      {children}
    </Drawer.Trigger>
  );
}

interface BottomSheetOverlayProps {
  className?: string;
}

function BottomSheetOverlay({ className }: BottomSheetOverlayProps) {
  return (
    <Drawer.Overlay
      className={twx("fixed inset-0 pointer-events-none", className)}
    />
  );
}

interface BottomSheetHeaderProps {
  title?: string;
  onClose?: () => void;
  className?: string;
}

function BottomSheetHeader({
  title,
  onClose,
  className,
}: BottomSheetHeaderProps) {
  return (
    <>
      <Drawer.Title className="sr-only">{title || "다이얼로그"}</Drawer.Title>
      <Drawer.Description className="sr-only">
        {title || "다이얼로그 내용"}
      </Drawer.Description>
      <div
        className={twx(
          "relative flex items-center justify-between border-b border-[#E5E5E5] px-4 py-4 md:hidden font-bold",
          className
        )}
      >
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          aria-label="닫기"
        >
          <Image src="/close.svg" alt="닫기" width={24} height={24} />
        </button>
        {title && (
          <span className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#121212]">
            {title}
          </span>
        )}
        <div className="w-10" />
      </div>
    </>
  );
}

interface BottomSheetContentProps {
  className?: string;
}

function BottomSheetContent({
  children,
  className,
}: PropsWithChildren<BottomSheetContentProps>) {
  return (
    <Drawer.Portal>
      <Drawer.Content
        className={twx(
          "fixed left-0 right-0 mt-24 flex flex-col rounded-t-[16px] bg-white z-50",
          "bottom-[73px] h-[calc(100vh-73px)] md:bottom-0 md:h-[90vh]",
          className
        )}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
      </Drawer.Content>
    </Drawer.Portal>
  );
}

export const BottomSheet = {
  Root: BottomSheetRoot,
  Trigger: BottomSheetTrigger,
  Overlay: BottomSheetOverlay,
  Header: BottomSheetHeader,
  Content: BottomSheetContent,
};
