import { useParallaxLayer } from "@/hooks/useParallax";

/**
 * Multi-layer parallax background. Renders independent layers
 * that move at different scroll speeds for true depth.
 * Uses direct-DOM refs for zero re-renders.
 */
export function ParallaxBackground() {
  const layer1 = useParallaxLayer(0.06);
  const layer2 = useParallaxLayer(0.12);
  const layer3 = useParallaxLayer(0.2);
  const layer4 = useParallaxLayer(0.35);
  const layer5 = useParallaxLayer(-0.1, "translateX(-50%)");

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Layer 1 - deepest, slowest */}
      <div
        ref={layer1 as React.RefObject<HTMLDivElement>}
        className="parallax-layer absolute -top-40 -left-40 w-[24rem] md:w-[42rem] h-[24rem] md:h-[42rem] rounded-full bg-accent/20 blur-[100px] md:blur-[140px]"
      />

      {/* Layer 2 - mid-back */}
      <div
        ref={layer2 as React.RefObject<HTMLDivElement>}
        className="parallax-layer absolute top-1/3 -right-32 w-[22rem] md:w-[36rem] h-[22rem] md:h-[36rem] rounded-full bg-primary/20 blur-[90px] md:blur-[120px]"
      />

      {/* Layer 3 - grid pattern */}
      <div
        ref={layer3 as React.RefObject<HTMLDivElement>}
        className="parallax-layer absolute inset-0 grid-pattern opacity-40"
      />

      {/* Layer 4 - small accent (fastest) */}
      <div
        ref={layer4 as React.RefObject<HTMLDivElement>}
        className="parallax-layer absolute top-2/3 left-1/4 w-48 md:w-72 h-48 md:h-72 rounded-full bg-violet-glow/15 blur-[50px] md:blur-[80px]"
      />

      {/* Layer 5 - floor wash (moves up) */}
      <div
        ref={layer5 as React.RefObject<HTMLDivElement>}
        className="parallax-layer absolute bottom-0 left-1/2 w-[36rem] md:w-[60rem] h-[16rem] md:h-[24rem] rounded-full bg-primary/10 blur-[100px] md:blur-[150px]"
      />
    </div>
  );
}
