import { useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

type RevealTextProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  children: ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
};

/** Character reveal with individual clipping masks and deterministic cleanup. */
export function RevealText({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
  duration = 1,
  stagger = 0.02,
  once = true,
  ...props
}: RevealTextProps) {
  const textRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const split = new SplitType(element, { types: "chars", charClass: "reveal-text__char" });
    const chars = split.chars;
    if (!chars.length) return () => split.revert();

    const masks = chars.map((char) => {
      const mask = document.createElement("span");
      mask.className = "reveal-text__mask";
      char.before(mask);
      mask.append(char);
      return mask;
    });

    const context = gsap.context(() => {
      const animation = gsap
        .timeline({ paused: true })
        .set(chars, {
          yPercent: 110,
          autoAlpha: 0,
          filter: "blur(8px)",
          rotation: 2,
        })
        .to(chars, {
          yPercent: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          rotation: 0,
          duration,
          delay,
          stagger,
          ease: "power4.out",
          onComplete: () => gsap.set(chars, { clearProps: "transform,filter,opacity,visibility" }),
        });

      ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        once,
        onEnter: () => animation.play(),
        onEnterBack: () => {
          if (!once) animation.restart();
        },
        invalidateOnRefresh: true,
      });
      ScrollTrigger.refresh();
    }, element);

    return () => {
      context.revert();
      masks.forEach((mask) => mask.replaceWith(...Array.from(mask.childNodes)));
      split.revert();
    };
  }, [delay, duration, once, stagger]);

  return (
    <Tag ref={textRef as never} className={`reveal-text ${className ?? ""}`} {...props}>
      {children}
    </Tag>
  );
}
