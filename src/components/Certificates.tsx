import React, { useEffect, useRef, useState } from 'react';

import cert1 from '@/assets/certificate 1.jpg';
import cert2 from '@/assets/certificate 2.jpg';
import cert3 from '@/assets/certificate 3.jpg';
import cert4 from '@/assets/certificate 4.jpg';
import cert5 from '@/assets/certificate 5.jpg';
import cert6 from '@/assets/certificate 6.jpg';
import cert7 from '@/assets/certificate 7.jpg';
import cert9 from '@/assets/certificate 9.jpg';
import { AnimatedText } from "@/components/AnimatedText";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { TextManager } from "@/components/animations/TextManager";

const certificates = [
  { 
    id: 1, 
    src: cert1, 
    title: 'Certificate of Attendance – How to Create Your First Lens (Snap AR)',
    description: " Awarded to Syed Bilal Hussain for attending a workshop on building AR lenses using Snap AR's Lens Studio. The workshop was conducted by iXL Consulting on June 24th, 2025, offering hands-on experience and practical insights into AR lens creation."
  },
  { 
    id: 2, 
    src: cert2, 
    title: "Certificate of Appreciation – YOUNG TECNO FEST'23", 
    description: "Awarded to Syed Bilal Hussain for remarkable volunteer service at YOUNG TECNO FEST'23 organized by IEEE WIE. Signed by the Branch Counsellor and Advisor." 
  },
  { 
    id: 3, 
    src: cert3, 
    title: "Google Cybersecurity Certificate (Coursera)", 
    description: "Issued to Syed Bilal Hussain on 12 December 2023 by Coursera for completing Google's Cybersecurity program. Includes a verification link." 
  },
  { 
    id: 4, 
    src: cert4, 
    title: "Certificate of Completion – C for Beginners", 
    description: "Completed a free online course titled C for Beginners provided by Great Learning Academy in January 2021." 
  },
  { 
    id: 5, 
    src: cert5, 
    title: "Certificate of Appreciation – Dramatic Reading 2023", 
    description: "Awarded to Syed Bilal Hussain for active participation in Dramatic Reading 2023 held at Jinnah University for Women on 4th November 2023." 
  },
  { 
    id: 6, 
    src: cert6, 
    title: "Certificate of Participation – Python Launchpad", 
    description: "Presented to Syed Bilal Hussain for participation in Python Launchpad organized by GDSC-SSUET on 10th & 12th November 2023 via Bevy Virtual platform." 
  },
  { 
    id: 7, 
    src: cert7, 
    title: "Certificate of Completion – Soft Skills Program", 
    description: "Recognizes Syed Bilal Hussain for completing Google's Soft Skills Program, covering communication, personal branding, critical thinking, and time management. Issued by TechValley." 
  },
  { 
    id: 9, 
    src: cert9, 
    title: "Certificate of Completion – ReactJs Course", 
    description: "Completed on 5 April 2025 via Udemy. Course length: 3.5 total hours. Instructors: EdYoda for Business, Qaifi Khan, Mavludin Abdulkadirov." 
  },
];

export const Certificates: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [useNativeScroll, setUseNativeScroll] = useState(false);
  const [sectionHeight, setSectionHeight] = useState("300vh");
  // Per-card refs for 3D tilt
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Horizontal scroll-progress ──────────────────────────────────────────
  useEffect(() => {
    let currentX = 0;
    let targetX = 0;
    let rafId: number;
    let resizeObserver: ResizeObserver | undefined;

    const nativeScrollQuery = window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)");

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const syncMode = () => {
      const shouldUseNativeScroll = nativeScrollQuery.matches;
      setUseNativeScroll(shouldUseNativeScroll);

      if (shouldUseNativeScroll) {
        setSectionHeight("auto");
        targetX = 0;
        currentX = 0;
        if (scrollRef.current) {
          scrollRef.current.style.transform = "translate3d(0, 0, 0)";
        }
      }
    };

    const updateSectionHeight = () => {
      if (!containerRef.current || !scrollRef.current || nativeScrollQuery.matches) return;

      const scrollDistance = Math.max(0, scrollRef.current.scrollWidth - window.innerWidth);
      const verticalTravel = Math.max(window.innerHeight * 1.35, scrollDistance * 1.05);
      setSectionHeight(`${Math.ceil(window.innerHeight + verticalTravel)}px`);
    };

    const updateScrollTarget = () => {
      if (!containerRef.current || !scrollRef.current || nativeScrollQuery.matches) return;
      const container = containerRef.current;
      const scrollElement = scrollRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.clientHeight;
      const maxScroll = Math.max(1, containerHeight - window.innerHeight);
      let progress = (window.scrollY - containerTop) / maxScroll;
      progress = Math.max(0, Math.min(1, progress));
      const maxTranslate = Math.max(0, scrollElement.scrollWidth - window.innerWidth);
      targetX = -(progress * maxTranslate);
    };

    const tick = () => {
      if (nativeScrollQuery.matches) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      currentX = lerp(currentX, targetX, 0.11);
      if (Math.abs(targetX - currentX) < 0.08) currentX = targetX;

      if (scrollRef.current) {
        scrollRef.current.style.transform = `translate3d(${currentX}px, 0, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    syncMode();
    updateSectionHeight();
    updateScrollTarget();
    currentX = targetX;
    tick();

    resizeObserver = new ResizeObserver(() => {
      updateSectionHeight();
      updateScrollTarget();
    });

    if (scrollRef.current) resizeObserver.observe(scrollRef.current);

    nativeScrollQuery.addEventListener("change", syncMode);
    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('resize', updateSectionHeight);
    window.addEventListener('resize', updateScrollTarget);

    return () => {
      nativeScrollQuery.removeEventListener("change", syncMode);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('resize', updateSectionHeight);
      window.removeEventListener('resize', updateScrollTarget);
      resizeObserver?.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── 3D tilt handlers ────────────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);

    const rotY = nx * 14;
    const rotX = -ny * 10;

    card.style.transition = "";
    card.style.transform = `perspective(900px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = (i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.style.transition = "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)";
    card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    setTimeout(() => { if (card) card.style.transition = ""; }, 550);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative z-20 w-full"
      style={{ height: sectionHeight }}
    >
      <div className={`${useNativeScroll ? "relative min-h-0" : "sticky top-0 h-dvh"} flex w-full flex-col justify-center overflow-hidden pt-16 pb-8 md:pt-24 md:pb-12`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

        <div className="relative z-10 mb-8 w-full flex-shrink-0 px-4 text-center md:mb-12">
          <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">// Achievements</p>
          <AnimatedText className="mx-auto mb-4 max-w-[min(42rem,100%)] text-balance text-[clamp(2rem,11vw,3rem)] font-bold leading-tight sm:text-4xl md:text-5xl">
            My{" "}
            <TextManager effect="scramble">
              <ScrambleText text="certificates" className="font-serif italic text-gradient whitespace-normal" />
            </TextManager>
          </AnimatedText>
          <p className="mx-auto max-w-2xl text-pretty px-2 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Scroll down to navigate through my achievements horizontally.
          </p>
        </div>
        
        <div 
          ref={scrollRef}
          className={`${useNativeScroll ? "certificates-scroll w-full snap-x snap-mandatory overflow-x-auto px-4 sm:px-6" : "w-max px-[10vw]"} flex flex-grow-0 items-center gap-5 py-4 sm:gap-8 md:gap-12`}
          style={{ willChange: 'transform' }}
        >
          {certificates.map((cert, i) => (
            <div
              key={cert.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className={`${useNativeScroll ? "w-[min(82vw,22rem)] snap-center" : "w-[280px] sm:w-[350px] md:w-[450px]"} relative shrink-0 cursor-pointer overflow-hidden rounded-2xl p-3 glass transition-colors hover:border-primary/50`}
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                boxShadow: '0 8px 30px -8px oklch(0.05 0.015 165 / 0.5)',
              }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
                <img 
                  src={cert.src} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-5 px-2 pb-2 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-foreground line-clamp-2">{cert.title}</h3>
                  {cert.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {cert.description}
                    </p>
                  )}
                </div>
                <div className="w-12 h-1 bg-gradient-primary rounded-full mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
