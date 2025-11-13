import { twc } from "react-twc";

export const SessionsWrapper = twc.div`flex flex-col gap-[20px]`;

export const SessionInfoContainer = twc.div`
  md:w-[510px] w-[328px] rounded-[8px] bg-[#F7F7F8] px-[20px] py-[28px] gap-[32px] flex flex-col
`;

export const SessionHeader = twc.div`flex items-center justify-between w-full`;

export const CloseButton = twc.button`
  w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity
`;

export const SessionContent = twc.div`flex flex-col gap-[12px] md:gap-[16px] w-full`;

export const ActivityContent = twc.div`flex flex-col gap-[12px] md:gap-[16px] w-full`;

export const SessionTitle = twc.h1`
  font-bold text-[20px] md:text-[24px] leading-[130%] tracking-[-0.02em] text-[#121212]
`;

export const SubTitle = twc.h2`
  font-medium text-[16px] md:text-[18px] leading-[130%] tracking-[-0.02em] text-[#565656]
`;

export const AddSessionButton = twc.button`
  w-full h-[60px] md:w-[510px] rounded-[8px] bg-[#121212]
  text-white text-[18px] md:text-[20px] font-semibold
  leading-[130%] tracking-[-0.02em]
  cursor-pointer hover:bg-[#2a2a2a] transition-colors
  mt-[24px]
`;

export const DatePickerField = twc.div`flex items-center justify-between w-full gap-[24px]`;
