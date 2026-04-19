import { useEffect, useRef, useCallback } from "react";

/**
 * Shared scroll state — one rAF loop drives all parallax layers.
 * No React state, no re-renders.
 */
let scrollY = 0;
let currentY = 0;
let rafId = 0;
let running = false;
const LERP = 0.08; // interpolation factor — lower = smoother

type Subscriber = (y: number) => void;
const subscribers = new Set<Subscriber>();

function tick() {
  currentY += (scrollY - currentY) * LERP;
  // Stop looping once close enough (save battery)
  if (Math.abs(scrollY - currentY) < 0.5) {
    currentY = scrollY;
    running = false;
  }
  subscribers.forEach((fn) => fn(currentY));
  if (running) {
    rafId = requestAnimationFrame(tick);
  }
}

function onScroll() {
  scrollY = window.scrollY;
  if (!running) {
    running = true;
    rafId = requestAnimationFrame(tick);
  }
}

function subscribe(fn: Subscriber) {
  if (subscribers.size === 0) {
    scrollY = window.scrollY;
    currentY = scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  subscribers.add(fn);
  // Immediately call with current value so position is correct on mount
  fn(currentY);
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      running = false;
    }
  };
}

/**
 * Returns current scroll offset (for legacy usage).
 * Uses requestAnimationFrame + lerp but still triggers re-renders.
 */
export function useParallax() {
  const ref = useRef(0);
  const forceUpdate = useRef<() => void>(undefined);
  const [, setTick] = [0, () => {}]; // dummy to keep old API shape

  useEffect(() => {
    let frameVal = 0;
    const unsub = subscribe((y) => {
      frameVal = y;
      forceUpdate.current?.();
    });
    return unsub;
  }, []);

  return ref.current;
}

/**
 * Attaches a parallax transform directly to a DOM element via ref.
 * Zero re-renders — writes transform in rAF loop.
 *
 * @param speed  Multiplier for scroll offset (e.g. 0.1 = slow, 0.5 = fast).
 *               Negative = moves opposite direction.
 * @param extraTransform  Optional additional CSS transform to prepend
 *                        (e.g. "translateX(-50%)" for centered elements).
 */
export function useParallaxLayer(
  speed: number,
  extraTransform?: string,
) {
  const ref = useRef<HTMLDivElement | SVGSVGElement | null>(null);

  const updateTransform = useCallback(
    (y: number) => {
      const el = ref.current;
      if (!el) return;
      const offset = y * speed;
      const base = extraTransform ? `${extraTransform} ` : "";
      (el as HTMLElement).style.transform = `${base}translate3d(0, ${offset}px, 0)`;
    },
    [speed, extraTransform],
  );

  useEffect(() => {
    return subscribe(updateTransform);
  }, [updateTransform]);

  return ref;
}
