import { useRef, type SVGProps } from "react";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { TextManager } from "@/components/animations/TextManager";

function ArchitectureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 12 9 5 9-5" opacity="0.7" />
      <path d="m3 16 9 5 9-5" opacity="0.4" />
    </svg>
  );
}

function BlueprintIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h16M12 4v16" opacity="0.45" />
      <circle cx="8" cy="8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3.5 20 7v6c0 4.5-3.4 7.5-8 8-4.6-.5-8-3.5-8-8V7l8-3.5Z" />
      <path d="m9.5 12 2 2 3.5-3.5" />
    </svg>
  );
}

function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12 2.5 2.5 5-5" />
    </svg>
  );
}

function ReleaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 19c1.8-2.8 2.6-5.6 2.6-8.5 0-3.2 2.2-5.6 3.4-7 1.2 1.4 3.4 3.8 3.4 7 0 2.9.8 5.7 2.6 8.5" />
      <circle cx="12" cy="10" r="1.5" />
      <path d="M9 15.5h6" opacity="0.7" />
    </svg>
  );
}

function SupportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="m5 5 3.5 3.5M15.5 15.5 19 19M19 5l-3.5 3.5M8.5 15.5 5 19" opacity="0.7" />
    </svg>
  );
}

function RootCauseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m15 15 4.5 4.5" />
      <path d="M10.5 8v3.5M10.5 13h.01" opacity="0.8" />
    </svg>
  );
}

function ApiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M8 6h8M6 8v4l5 5M18 8v4l-5 5" opacity="0.7" />
    </svg>
  );
}

function DataModelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function GaugeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="M12 16 15.5 10" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ObservabilityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12h3l2.5-7 5 14 2.5-7h5" />
    </svg>
  );
}

function MentoringIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
      <circle cx="17" cy="8" r="2.2" opacity="0.7" />
      <path d="M15 13.5c2.5 0 4.5 1.8 4.5 4.5" opacity="0.7" />
    </svg>
  );
}

const skills = [
  { name: "Application Architecture", level: 92, icon: ArchitectureIcon },
  { name: "Technical Design", level: 90, icon: BlueprintIcon },
  { name: "Secure Coding", level: 86, icon: ShieldIcon },
  { name: "Automated Testing", level: 88, icon: CheckCircleIcon },
  { name: "Release & Deployment", level: 87, icon: ReleaseIcon },
  { name: "Production Support", level: 91, icon: SupportIcon },
  { name: "Root-Cause Analysis", level: 89, icon: RootCauseIcon },
  { name: "API Design", level: 90, icon: ApiIcon },
  { name: "Data Modeling", level: 87, icon: DataModelIcon },
  { name: "Query Optimization", level: 85, icon: GaugeIcon },
  { name: "Observability & Telemetry", level: 82, icon: ObservabilityIcon },
  { name: "Mentoring & Documentation", level: 84, icon: MentoringIcon },
];

export function Skills() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    card.style.transition = "";
    card.style.transform = `perspective(700px) rotateY(${nx * 12}deg) rotateX(${-ny * 9}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = (i: number) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.style.transition = "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)";
    card.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    setTimeout(() => { if (card) card.style.transition = ""; }, 550);
  };

  return (
    <section id="skills" className="relative py-20 md:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">// Capabilities</p>
          <AnimatedText className="text-4xl md:text-5xl font-bold mb-4">
            What I{" "}
            <TextManager effect="scramble">
              <ScrambleText text="lead with" className="text-gradient" />
            </TextManager>
          </AnimatedText>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The engineering disciplines I bring to every product — from first design sketch to steady state in production.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => {
            const Icon = skill.icon;

            return (
              <div
                key={skill.name}
                ref={(el) => { cardRefs.current[i] = el; }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
                className="group glass rounded-2xl p-6 hover:border-primary/60 transition-[border-color,box-shadow] hover:glow"
                style={{ animationDelay: `${i * 50}ms`, willChange: "transform", transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-card flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-semibold text-foreground">{skill.name}</h3>
                      <span className="text-sm font-mono text-primary">{skill.level}%</span>
                    </div>
                  </div>
                </div>
                <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary rounded-full transition-all duration-1000 group-hover:shadow-[0_0_12px_var(--primary)]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}