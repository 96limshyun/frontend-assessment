import { twc } from "react-twc";

const Field = twc.div`
  flex items-center justify-around w-full gap-[24px]
`;

const Label = twc.span`
  text-[18px] leading-[130%] tracking-[-0.02em] text-[#121212]
`;

const TimeGroup = twc.div`
  flex flex-1 justify-around items-center
  rounded-[8px] border border-[#E5E5E5] bg-white py-[8px]
`;

const PeriodButton = twc.button`
  h-[38px] py-[8px] px-[12px]
  rounded-[4px] bg-[#F7F7F8] border border-[#E5E5E5]
  cursor-pointer hover:bg-[#E5E5E5] transition-colors
`;

const TimeInput = twc.input.attrs({
  type: "number",
  inputMode: "numeric",
  pattern: "[0-9]*",
})`
  h-[44px] w-[60px]
  text-center text-base text-[#121212] font-normal
  outline-none focus:border-[#BABABA] transition-colors
  [appearance:textfield]
  [&::-webkit-outer-spin-button]:appearance-none
  [&::-webkit-inner-spin-button]:appearance-none
`;

const TimeSeparator = twc.span`
  text-[#121212] text-base font-normal
`;

export default Object.assign(
  {},
  {
    Field,
    Label,
    TimeGroup,
    PeriodButton,
    TimeInput,
    TimeSeparator,
  }
);
