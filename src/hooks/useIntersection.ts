import { useCallback, useEffect, useState, type RefCallback } from "react";

type UseIntersectionOptions = IntersectionObserverInit & {
  once?: boolean;
};

/** A ref-driven viewport observer for animation triggers. */
export function useIntersection<T extends Element>({
  once = true,
  threshold = 0.2,
  root = null,
  rootMargin = "0px",
}: UseIntersectionOptions = {}) {
  const [node, setNode] = useState<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useCallback<RefCallback<T>>((element) => setNode(element), []);

  useEffect(() => {
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, once, root, rootMargin, threshold]);

  return { ref, isIntersecting };
}
