import Image from "next/image";
import { ReactNode } from "react";
interface DialogProps {
  title: ReactNode;
  description: string;
  onDelete: () => void;
  onCancel: () => void;
}
export default function Dialog({
  title,
  description,
  onDelete,
  onCancel,
}: DialogProps) {
  return (
    <div className=" fixed inset-0 top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
      <div className="w-[430px] rounded-[16px] bg-white">
        <div className="w-full h-[56px] p-4 flex justify-end">
          <Image
            src="/close.svg"
            alt="닫기"
            width={32}
            height={32}
            onClick={onCancel}
          />
        </div>
        <div className="w-full p-6 flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-[24px] font-bold text-center">{title}</h2>
            <p className="text-center text-[18px] font-medium leading-[130%] tracking-[-0.02em] text-[#565656]">
              {description}
            </p>
          </div>
          <div className="w-full h-[58px] gap-[8px] flex justify-center">
            <button
              className="w-full h-full rounded-[8px] border border-[#E5E5E5] bg-[#F7F7F8] text-[#121212] cursor-pointer"
              onClick={onCancel}
            >
              취소
            </button>
            <button
              className="w-full h-full rounded-[8px] border border-[#323232] bg-[#323232] text-white cursor-pointer"
              onClick={() => {
                onDelete();
                onCancel();
              }}
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
