import { twc } from "@/libs/utils";

interface HeaderProps {
  selectedCategories: string[];
  setOpen: (open: boolean) => void;
}

export default function Header({ selectedCategories, setOpen }: HeaderProps) {
  const isCategoriesSelected = selectedCategories.length > 0;

  const handleNextClick = () => {
    if (isCategoriesSelected) {
      setOpen(false);
    }
  };
  return (
    <header className="flex h-[64px] w-full items-center justify-center border-b border-[#D7D7D7]">
      <div className="relative flex h-full w-[360px] items-center justify-between px-5 md:w-[1100px]">
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl leading-[130%] tracking-[-0.02em]">
          과제
        </h1>
        <div
          className={twc(
            "ml-auto flex h-[38px] w-[120px] items-center justify-center rounded-[4px] hover:bg-[#02891A] px-3 py-2 text-center cursor-pointer",
            isCategoriesSelected ? "bg-[#03C124]" : "bg-[#D7D7D7]"
          )}
        >
          <button
            className="text-base font-semibold leading-[140%] tracking-[-0.02em] text-white "
            onClick={handleNextClick}
          >
            다음으로
          </button>
        </div>
      </div>
    </header>
  );
}
