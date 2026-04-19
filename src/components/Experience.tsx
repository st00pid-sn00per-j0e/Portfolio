import { useEffect, useRef } from "react";
import { Briefcase, GraduationCap, Award, Rocket } from "lucide-react";

const items = [
  {
    year: "Nov 2025 - Present",
    icon: Briefcase,
    title: "Automation Engineer",
    org: "Lime Software Logics · Full-time · Bahria Towers Tariq Road · Karachi Division, Sindh, Pakistan · On-site",
    logo: "/src/assets/lime_software_logics_logo.jpg",
    description: "Automation Engineer at Lime Software Logics.",
    tags: ["Automation", "Python", "Selenium", "Playwright", "CI/CD"],
  },
  {
    year: "Oct 2025 - Nov 2025",
    icon: Briefcase,
    title: "Monitoring And Evaluation Officer",
    org: "Texas Jasmine Wholesale · Full-time · Texas, United States · Remote",
    logo: "/src/assets/texas jasmine.jpg",
    description:
      "To provide ongoing feedback to managers and guide real-time management decisions to ensure the project stays on track.",
    tags: ["Monitoring", "Evaluation", "Management"],
  },
  {
    year: "Jan 2025 - Jul 2025",
    icon: Briefcase,
    title: "Python Developer",
    org: "Minsoft Technologies · Full-time · WeWork Office At Shahrah E Faisal · Karachi Division, Sindh, Pakistan · On-site",
    logo: "/src/assets/minsoft.jpg",
    description: "Python Developer at Minsoft Technologies.",
    tags: ["Python"],
  },
  {
    year: "2024 — Now",
    icon: Rocket,
    title: "Independent AI Engineer",
    org: "Freelance · Remote",
    description:
      "Building agentic LLM systems with LangChain, fine-tuning domain-specific transformers, and shipping React/Node SaaS products end-to-end.",
    tags: ["LangChain", "RAG", "Hugging Face"],
  },
  {
    year: "2023",
    icon: Award,
    title: "Published LEGAL-BERT",
    org: "Hugging Face · Open Source (FYP Project: LEXI-GUARD)",
    description:
      "Fine-tuned a BERT model for legal text understanding and published it openly. Used by researchers exploring legal NLP downstream tasks.",
    tags: ["PyTorch", "Transformers", "NLP"],
  },
  {
    year: "2022 — 2024",
    icon: Briefcase,
    title: "Full-Stack Developer",
    org: "Multiple Startups",
    description:
      "Designed and shipped marketplaces, dashboards, and internal tools using React, Next.js, Node and PostgreSQL — with Docker and CI pipelines.",
    tags: ["React", "Node.js", "Docker"],
  },
  {
    year: "2022 — 2026",
    icon: GraduationCap,
    title: "B.S. Computer Science",
    org: "Karachi, Pakistan",
    description:
      "Foundations in algorithms, distributed systems, and machine learning, with a degree exploring transformer architectures.",
    tags: ["CS", "ML", "Research", "AI", "Final Year Project"],
  },
];

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function Experience() {
  // wrapperRefs drive the scroll translateX + opacity
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  // cardRefs drive the 3D mouse tilt
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  // ── Scroll-driven slide-in ──────────────────────────────────────────────
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

  // ── 3D mouse-tilt handlers ──────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Normalize cursor offset to [-1, 1]
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);

    const rotY = nx * 12; // max ±12 deg on Y axis
    const rotX = -ny * 8; // max ±8 deg on X axis

    card.style.transform = `perspective(900px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    // Remove the transition after it settles so mouse-move feels instant again
    setTimeout(() => {
      if (card) card.style.transition = "";
    }, 500);
  };

  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">// Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="font-serif italic text-gradient">milestones</span>
          </h2>
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
                  key={item.title}
                  className={`relative grid md:grid-cols-2 gap-6 md:gap-12 items-center ${
                    left ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Scroll wrapper — owns translateX + opacity */}
                  <div
                    ref={(el) => { wrapperRefs.current[i] = el; }}
                    style={{ opacity: 0, willChange: "transform, opacity" }}
                    className="ml-12 md:ml-0"
                  >
                    {/* Card — owns 3D tilt */}
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
                      <div className={`flex flex-wrap gap-2 ${left ? "md:justify-end" : ""}`}>
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md text-xs font-mono bg-secondary/40 border border-border text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
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