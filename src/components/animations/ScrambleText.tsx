import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { useIntersection } from "@/hooks/useIntersection";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>";

type ScrambleTextProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  text: string;
  speed?: number;
  trigger?: boolean;
  once?: boolean;
};

/** Decodes a string from glyph noise once it enters the viewport. */
export function ScrambleText({
  text,
  speed = 36,
  trigger = true,
  once = true,
  className,
  ...props
}: ScrambleTextProps) {
  const [output, setOutput] = useState(text);
  const [state, setState] = useState<"idle" | "animating" | "finished">("idle");
  const started = useRef(false);
  const { ref, isIntersecting } = useIntersection<HTMLSpanElement>({
    threshold: 0.35,
    rootMargin: "0px 0px -10%",
    once,
  });

  useEffect(() => {
    if (!trigger || !isIntersecting || started.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      setState("finished");
      return;
    }

    started.current = true;
    setState("animating");
    let iteration = 0;

    const interval = window.setInterval(() => {
      setOutput(
        Array.from(text, (char, index) => {
          if (/\s/.test(char) || index < iteration) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)] ?? char;
        }).join(""),
      );

      iteration += 0.45;
      if (iteration >= text.length) {
        window.clearInterval(interval);
        setOutput(text);
        setState("finished");
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [isIntersecting, speed, text, trigger]);

  return (
    <span
      ref={ref}
      className={`scramble-text scramble-text--${state} ${className ?? ""}`}
      aria-label={text}
      {...props}
    >
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
