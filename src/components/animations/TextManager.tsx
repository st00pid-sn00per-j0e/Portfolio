import { type ReactNode } from "react";

/**
 * Declarative registry marker for text effects. It keeps effect selection explicit
 * in the DOM and provides a stable selector for future orchestration.
 */
export function TextManager({
  effect,
  children,
}: {
  effect: "reveal" | "scramble";
  children: ReactNode;
}) {
  return <span data-text-effect={effect}>{children}</span>;
}
