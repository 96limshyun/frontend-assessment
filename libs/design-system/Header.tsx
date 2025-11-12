import NextButton from "./NextButton";

interface HeaderProps {
  selectedCategories: string[];
  onClick: () => void;
}

export default function Header({ selectedCategories, onClick }: HeaderProps) {
  return (
    <header className="flex h-[64px] w-full items-center justify-center border-b border-[#D7D7D7] relative z-[200]">
      <div className="relative flex h-full w-[360px] items-center justify-between px-5 md:w-[1100px]">
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl leading-[130%] tracking-[-0.02em]">
          과제
        </h1>
        <NextButton
          isEnabled={selectedCategories.length > 0}
          onClick={onClick}
          variant="header"
          className="hidden md:flex ml-auto items-center justify-center"
        />
      </div>
    </header>
  );
}
