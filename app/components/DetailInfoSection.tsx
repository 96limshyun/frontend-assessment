"use client";

import { useState } from "react";
import { SectionCard } from "@/libs/design-system";

export default function DetailInfoSection() {
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState({
    period: "오전",
    hour: "10",
    minute: "00",
  });
  const [endTime, setEndTime] = useState({
    period: "오전",
    hour: "11",
    minute: "00",
  });

  return (
    <SectionCard title="상세 정보">
      <div className="flex flex-col gap-6 rounded-[12px] bg-[#F7F7F8] p-6">
        {/* 회차 정보 */}
        <div className="flex items-center gap-4">
          <label className="w-20 text-base font-medium leading-[150%] tracking-[-0.02em] text-[#121212]">
            날짜 선택
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="날짜를 선택해주세요"
            className="flex-1 rounded-[8px] border border-[#E5E5E5] bg-white px-4 py-3 text-base leading-[150%] tracking-[-0.02em] text-[#121212] placeholder:text-[#8F8F8F] focus:outline-none focus:ring-2 focus:ring-[#121212]"
          />
        </div>

        {/* 시작 시간 */}
        <div className="flex items-center gap-4">
          <label className="w-20 text-base font-medium leading-[150%] tracking-[-0.02em] text-[#121212]">
            시작 시간
          </label>
          <div className="flex flex-1 gap-2">
            <select
              value={startTime.period}
              onChange={(e) =>
                setStartTime({ ...startTime, period: e.target.value })
              }
              className="rounded-[8px] border border-[#E5E5E5] bg-white px-4 py-3 text-base leading-[150%] tracking-[-0.02em] text-[#121212] focus:outline-none focus:ring-2 focus:ring-[#121212]"
            >
              <option>오전</option>
              <option>오후</option>
            </select>
            <input
              type="number"
              value={startTime.hour}
              onChange={(e) =>
                setStartTime({ ...startTime, hour: e.target.value })
              }
              className="w-20 rounded-[8px] border border-[#E5E5E5] bg-white px-4 py-3 text-center text-base leading-[150%] tracking-[-0.02em] text-[#121212] focus:outline-none focus:ring-2 focus:ring-[#121212]"
            />
            <span className="flex items-center text-base text-[#121212]">
              :
            </span>
            <input
              type="number"
              value={startTime.minute}
              onChange={(e) =>
                setStartTime({ ...startTime, minute: e.target.value })
              }
              className="w-20 rounded-[8px] border border-[#E5E5E5] bg-white px-4 py-3 text-center text-base leading-[150%] tracking-[-0.02em] text-[#121212] focus:outline-none focus:ring-2 focus:ring-[#121212]"
            />
          </div>
        </div>

        {/* 종료 시간 */}
        <div className="flex items-center gap-4">
          <label className="w-20 text-base font-medium leading-[150%] tracking-[-0.02em] text-[#121212]">
            종료 시간
          </label>
          <div className="flex flex-1 gap-2">
            <select
              value={endTime.period}
              onChange={(e) =>
                setEndTime({ ...endTime, period: e.target.value })
              }
              className="rounded-[8px] border border-[#E5E5E5] bg-white px-4 py-3 text-base leading-[150%] tracking-[-0.02em] text-[#121212] focus:outline-none focus:ring-2 focus:ring-[#121212]"
            >
              <option>오전</option>
              <option>오후</option>
            </select>
            <input
              type="number"
              value={endTime.hour}
              onChange={(e) => setEndTime({ ...endTime, hour: e.target.value })}
              className="w-20 rounded-[8px] border border-[#E5E5E5] bg-white px-4 py-3 text-center text-base leading-[150%] tracking-[-0.02em] text-[#121212] focus:outline-none focus:ring-2 focus:ring-[#121212]"
            />
            <span className="flex items-center text-base text-[#121212]">
              :
            </span>
            <input
              type="number"
              value={endTime.minute}
              onChange={(e) =>
                setEndTime({ ...endTime, minute: e.target.value })
              }
              className="w-20 rounded-[8px] border border-[#E5E5E5] bg-white px-4 py-3 text-center text-base leading-[150%] tracking-[-0.02em] text-[#121212] focus:outline-none focus:ring-2 focus:ring-[#121212]"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
