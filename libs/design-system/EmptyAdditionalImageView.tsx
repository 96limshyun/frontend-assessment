import Image from "next/image";

export default function EmptyAdditionalImageView() {
  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-[12px]">
      <Image src="/image-add.svg" alt="이미지 추가" width={24} height={24} />
    </div>
  );
}
