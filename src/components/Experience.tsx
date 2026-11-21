import { useEffect, useRef } from "react";
import { Briefcase, GraduationCap, Award, Rocket } from "lucide-react";
import limeLogo from "@/assets/lime_software_logics_logo.jpg";
import texasJasmineLogo from "@/assets/texas jasmine.jpg";
import minsoftLogo from "@/assets/minsoft.jpg";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { TextManager } from "@/components/animations/TextManager";

const items = [
  {
    year: "Dec 2024 — Present",
    icon: Briefcase,
    title: "Software Developer",
    org: "Lime Software Logics (SMC-PVT) Ltd. · Full-time · Bahria Towers, Tariq Road · Karachi, Pakistan · On-site",
    logo: limeLogo,
    description:
      "Owned 56 services and features end to end across API, business-logic, and data layers. Improved application response time by 45% through query tuning and indexing. Designed versioned APIs and drove weekly-release CI/CD. Resolved 88 production incidents with 30% fewer repeats. Recognized with the Star of the Quarter award.",
  },
  {
    year: "Oct 2025 — Nov 2025",
    icon: Briefcase,
    title: "Monitoring And Evaluation Officer",
    org: "Texas Jasmine Wholesale · Full-time · Texas, United States · Remote",
    logo: texasJasmineLogo,
    description:
      "Provided ongoing feedback to managers and guided real-time management decisions to ensure the project stayed on track.",
  },
  {
    year: "Jan 2024 — Dec 2024",
    icon: Briefcase,
    title: "Junior Software Developer",
    org: "Minsoft Technologies · Full-time · WeWork Office at Shahrah-e-Faisal · Karachi, Pakistan · On-site",
    logo: minsoftLogo,
    description:
      "Delivered 15+ backend services and API endpoints from specification through testing and release, achieving a 95% first-pass QA acceptance rate. Improved response times by 20% across 15+ high-traffic endpoints. Implemented validation, authentication, and structured exception handling, reducing input-related defects by 45%.",
  },
  {
    year: "2024 — Now",
    icon: Rocket,
    title: "Independent AI Engineer",
    org: "Freelance · Remote",
    description:
      "Built agentic AI systems, fine-tuned domain-specific transformer models, and shipped end-to-end SaaS products for clients.",
  },
  {
    year: "May 2025",
    icon: Award,
    title: "Published LEGAL-BERT by Nizami",
    org: "Hugging Face · Open Source (FYP: Lexi-Guard)",
    description:
      "Fine-tuned and published a legal-domain NLP model (approximately 100M parameters) evaluated with F1 score. Applications include legal text classification, semantic analysis, and contract risk detection.",
  },
  {
    year: "2022 — 2024",
    icon: Briefcase,
    title: "Full-Stack Developer",
    org: "Multiple Startups",
    description:
      "Designed and shipped marketplaces, dashboards, and internal tools — with containerized deployment and CI pipelines.",
  },
  {
    year: "2020 — 2024",
    icon: GraduationCap,
    title: "B.E. Software Engineering",
    org: "Sir Syed University of Engineering and Technology · Karachi, Pakistan",
    description:
      "Coursework: OOP, Database Systems and SQL, Data Structures and Algorithms, Software Engineering, Software Design and Architecture, Operating Systems. Final Year Project: LEGAL-BERT / Lexi-Guard.",
  },
];

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function Experience() {
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;

      wrapperRefs.current.forEach((wrapper, i) => {
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const enterPoint = vh * 1.2;
        const settlePoint = vh * 0.35;

        const raw = (enterPoint - rect.top) / (enterPoint - settlePoint);
        const progress = easeOutCubic(clamp(raw, 0, 1));

        const isLeft = i % 2 === 0;
        const maxOffset = 80;
        const offset = (1 - progress) * maxOffset * (isLeft ? -1 : 1);

        wrapper.style.transform = `translateX(${offset}px)`;
        wrapper.style.opacity = String(clamp(progress * 1.2, 0, 1));
      });

      rafRef.current = null;
    };

    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);

    const rotY = nx * 12;
    const rotX = -ny * 8;

    card.style.transform = `perspective(900px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    setTimeout(() => {
      if (card) card.style.transition = "";
    }, 500);
  };

  return (
    <section id="experience" className="relative py-20 md:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">// Journey</p>
          <AnimatedText className="text-4xl md:text-5xl font-bold mb-4">
            Experience &{" "}
            <TextManager effect="scramble">
              <ScrambleText text="milestones" className="font-serif italic text-gradient" />
            </TextManager>
          </AnimatedText>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A timeline of the work, research, and projects that shaped how I build today.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:-translate-x-px" />

          <div className="space-y-12">
            {items.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={item.title + item.year}
                  className={`relative grid md:grid-cols-2 gap-6 md:gap-12 items-center ${
                    left ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <div
                    ref={(el) => { wrapperRefs.current[i] = el; }}
                    style={{ opacity: 0, willChange: "transform, opacity" }}
                    className="ml-12 md:ml-0"
                  >
                    <div
                      ref={(el) => { cardRefs.current[i] = el; }}
                      onMouseMove={(e) => handleMouseMove(e, i)}
                      onMouseLeave={() => handleMouseLeave(i)}
                      style={{ willChange: "transform", transformStyle: "preserve-3d" }}
                      className={`glass rounded-2xl p-6 hover:border-primary/50 transition-[border-color] ${left ? "md:text-right" : ""}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-xs font-mono text-primary tracking-wider flex-shrink-0">{item.year}</div>
                        {item.logo && (
                          <img
                            src={item.logo}
                            alt={item.org}
                            className="w-8 h-8 rounded object-contain flex-shrink-0"
                          />
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <div className="text-sm text-muted-foreground/80 font-mono mb-3">{item.org}</div>
                      <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:block" />

                  <div className="absolute left-5 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2">
                    <div className="relative w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-[0_0_20px_-2px_var(--primary)]">
                      <item.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}