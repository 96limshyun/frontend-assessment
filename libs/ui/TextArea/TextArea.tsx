"use client";

import {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { twx } from "@/libs/utils";

const TextAreaRoot = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
};

interface TextAreaInputProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  minLength?: number;
  maxLength?: number;
  error?: boolean;
  onValidationChange?: (isValid: boolean) => void;
  counterLabel?: string;
  showCounter?: boolean;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    {
      value,
      onChange,
      minLength = 0,
      maxLength = Infinity,
      error: externalError,
      onValidationChange,
      counterLabel = "필수",
      showCounter = true,
      className,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [touched, setTouched] = useState(false);

    const internalError =
      touched && minLength > 0 && value.length > 0 && value.length < minLength;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      let newValue = e.target.value;

      newValue = newValue.replace(/\s{2,}/g, " ");

      if (newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      onChange(newValue);

      if (!touched && newValue.length > 0) {
        setTouched(true);
      }
      onValidationChange?.(
        newValue.length >= minLength && newValue.length <= maxLength
      );
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setTouched(true);
      onBlur?.(e);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const sanitized = pastedText.replace(/\s{2,}/g, " ");
      const limited = sanitized.slice(0, maxLength - value.length);
      const newValue = (value + limited).slice(0, maxLength);
      onChange(newValue);
    };

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onPaste={handlePaste}
          className={twx(
            "w-full h-[138px] resize-none rounded-[8px] border bg-white px-5 py-4 text-base leading-[150%] tracking-[-0.02em] text-[#121212] placeholder:text-[#8F8F8F] focus:outline-none focus:ring-2 transition-colors",
            showCounter && "pb-10",
            internalError || externalError
              ? "border-[#E82920] focus:ring-[#E82920]"
              : "border-[#E5E5E5] focus:ring-[#03C124]",
            className
          )}
          {...props}
        />
        {showCounter && (
          <span className="absolute bottom-4 right-5 text-sm leading-[150%] tracking-[-0.02em] text-[#8F8F8F]">
            {value.length} / {maxLength}자 ({counterLabel})
          </span>
        )}
      </div>
    );
  }
);

TextAreaInput.displayName = "TextAreaInput";

const TextAreaError = ({
  children,
  minLength,
}: {
  children?: React.ReactNode;
  minLength?: number;
}) => {
  return (
    <span className="text-sm leading-[150%] tracking-[-0.02em] text-[#E82920]">
      {children || `${minLength}자 이상 입력해주세요.`}
    </span>
  );
};

interface TextAreaCounterProps {
  current: number;
  max: number;
  label?: string;
  error?: boolean;
}

const TextAreaCounter = ({
  current,
  max,
  label = "필수",
}: TextAreaCounterProps) => {
  return (
    <span className="ml-auto text-sm leading-[150%] tracking-[-0.02em] text-[#8F8F8F]">
      {current} / {max}자 ({label})
    </span>
  );
};

const TextAreaFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-between">{children}</div>;
};

const TextArea = {
  Root: TextAreaRoot,
  Input: TextAreaInput,
  Error: TextAreaError,
  Counter: TextAreaCounter,
  Footer: TextAreaFooter,
};

export default TextArea;
