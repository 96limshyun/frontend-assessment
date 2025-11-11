import { createElement, type ReactNode } from "react";

export function splitTextIntoParagraphs(
  source: string,
  separator: "\n" | " ",
  paragraphClassName?: string
): ReactNode[] {
  return source.split(separator).map((segment, index) =>
    createElement(
      "p",
      {
        key: `${segment}-${index}`,
        className: paragraphClassName,
      },
      segment
    )
  );
}
