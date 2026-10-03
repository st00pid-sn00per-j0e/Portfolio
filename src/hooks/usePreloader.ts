import { useEffect, useMemo, useState } from "react";

export function usePreloader(assets: string[] = [], minimumDelay = 750) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const assetList = useMemo(() => [...new Set(assets.filter(Boolean))], [assets]);

  useEffect(() => {
    let cancelled = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setProgress(1);
      setIsLoaded(true);
      return undefined;
    }

    const total = Math.max(assetList.length || 1, 1);
    const startedAt = performance.now();

    async function preload() {
      try {
        if (!assetList.length) {
          setProgress(1);
          setIsLoaded(true);
          return;
        }

        let loaded = 0;

        await Promise.all(
          assetList.map(
            (src) =>
              new Promise<void>((resolve) => {
                const resource = new Image();
                resource.decoding = "async";
                resource.onload = () => {
                  loaded += 1;
                  if (!cancelled) {
                    setProgress((prev) => Math.max(prev, loaded / total));
                  }
                  resolve();
                };
                resource.onerror = () => {
                  loaded += 1;
                  if (!cancelled) {
                    setProgress((prev) => Math.max(prev, loaded / total));
                  }
                  resolve();
                };
                resource.src = src;
              }),
          ),
        );

        if (document.fonts) {
          await document.fonts.ready;
        }

        if (document.readyState !== "complete") {
          await new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });
        }

        if (cancelled) return;

        const elapsed = performance.now() - startedAt;
        const remaining = Math.max(0, minimumDelay - elapsed);

        if (remaining > 0) {
          await new Promise<void>((resolve) => {
            window.setTimeout(resolve, remaining);
          });
        }

        if (!cancelled) {
          setProgress(1);
          setIsLoaded(true);
        }
      } catch {
        if (!cancelled) {
          setProgress(1);
          setIsLoaded(true);
        }
      }
    }

    void preload();

    return () => {
      cancelled = true;
    };
  }, [assetList, minimumDelay]);

  return { progress, isLoaded };
}
