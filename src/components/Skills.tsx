import { useRef, type SVGProps } from "react";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { TextManager } from "@/components/animations/TextManager";

function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <circle cx="12" cy="12" r="2.35" />
      <path d="M3.5 12c2.8-4.2 6.5-6.3 8.5-6.3S17.7 7.8 20.5 12c-2.8 4.2-6.5 6.3-8.5 6.3S6.3 16.2 3.5 12Z" />
      <path d="M12 3.7v16.6M3.5 12h17" opacity="0.45" />
    </svg>
  );
}

function PythonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 4.5h6a2 2 0 0 1 2 2v2.5H8.5V6.5a2 2 0 0 1 2-2Z" />
      <path d="M8 9.5h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" />
      <path d="M9.5 12.5v3M14.5 12.5v3" opacity="0.7" />
      <path d="M10 4.5V3m4 1.5V3" opacity="0.7" />
    </svg>
  );
}

function NodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3.5 18.5 7v10L12 20.5 5.5 17V7L12 3.5Z" />
      <path d="M12 8.2v7.6M8.6 10.3l6.8 3.4M15.4 10.3l-6.8 3.4" opacity="0.7" />
    </svg>
  );
}

function TypeScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 7.5h12M6 16.5h8M6 12h12" opacity="0.7" />
      <path d="M16.5 12v4.5m0-9v1.5M8 4.5h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function NextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 18V6l8 9V6" />
      <path d="M16 18V6" opacity="0.7" />
      <path d="M6 18l5.5-6.5" opacity="0.55" />
    </svg>
  );
}

function TailwindIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 17c2-5 4.5-7.5 7.5-7.5C15.6 9.5 17 11 18 13.5 16 10.5 13.5 8 10 8c-3 0-5 2.3-5 9Z" />
      <path d="M7 18.5c1.4-3.1 3.2-4.5 5.4-4.5 2 0 3.3.8 4.6 2.7-1.8-1.2-3.5-1.7-5.3-1.3-1.7.4-3.1 1.7-4.7 3.1Z" opacity="0.8" />
    </svg>
  );
}

function DatabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function DockerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 14h2.5v2H5zm3.5-3h2.5v2H8.5zm3.5-3h2.5v2H12zm3.5 0h2.5v2H15.5zm-3.5 6h2.5v2H12zm7 0h2.5v2H19zm-7.5 3.5h2.5v2h-2.5z" />
      <path d="M5 17.5h14" opacity="0.7" />
    </svg>
  );
}

function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 13.5 8.7 14.8a3 3 0 0 1-4.2-4.2L5.8 9.3" />
      <path d="M14 10.5 15.3 9.2a3 3 0 1 1 4.2 4.2l-1.3 1.3" />
      <path d="M8.5 15.5 15.5 8.5" opacity="0.7" />
    </svg>
  );
}

function FlameIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3.5c1.5 2 2.5 3.3 2.5 5.2A3.3 3.3 0 0 1 11.2 12c0 2.1 1.3 3.4 2.8 4.8C15.8 18.2 17 19.8 17 21.5c-5.1.2-8.7-3.8-8.7-8 0-2.6 1.4-4.8 3.7-6.5Z" />
    </svg>
  );
}

function HuggingFaceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 12.5c1.2 1.6 2.3 2.4 4 2.4s2.8-.8 4-2.4" />
      <circle cx="9" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M7.5 18.5A8.5 8.5 0 1 0 16.5 18.5" />
    </svg>
  );
}

function JavaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 16.5c0-2.1 1.6-3.8 3.8-4.2V9.7c-1.8.3-3.3 1.4-4.1 3.1C6.2 13.7 6 15 6 16.5v1.1h1Zm10 0c0-2.1-1.6-3.8-3.8-4.2V9.7c1.8.3 3.3 1.4 4.1 3.1.5 1.1.7 2.4.7 3.7v1.1h-1ZM9 8h6" opacity="0.72" />
      <path d="M12 6.5v2.3M9.5 18.5h5" />
    </svg>
  );
}

function KotlinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 19.5 12 12l8 7.5" />
      <path d="M12 12V4.5L4 12h8Zm0 0 8-7.5" />
      <path d="M8 16.5 12 12l4 4.5" opacity="0.7" />
    </svg>
  );
}

function SpringIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5.5c4.1 0 7 2.6 7 6.3 0 2.8-2.3 5.2-5.8 5.2-2.2 0-3.8-.9-4.8-2.6-.8-1.4-1.1-3.1-.5-4.6.5-1.4 1.8-2.8 4.1-4.3Z" />
      <path d="M8.5 16c-1.4-1.1-2.2-2.7-2.2-4.6 0-2.5 2.1-4.8 5.2-5.6" opacity="0.7" />
      <path d="M12 9.5c-1.5 1.3-2.2 2.8-2.2 4.7 0 2 1.1 3.6 3.2 4.8" opacity="0.7" />
    </svg>
  );
}

function AspNetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 16.5V8.5l7-4 7 4v8l-7 4-7-4Z" />
      <path d="M9 8.5h6M12 8.5v7" opacity="0.8" />
      <path d="M7.5 12.5h9" opacity="0.7" />
    </svg>
  );
}

const skills = [
  { name: "React.js", level: 95, icon: ReactIcon },
  { name: "Python", level: 88, icon: PythonIcon },
  { name: "Node.js", level: 90, icon: NodeIcon },
  { name: "TypeScript", level: 92, icon: TypeScriptIcon },
  { name: "Next.js", level: 87, icon: NextIcon },
  { name: "Tailwind CSS", level: 88, icon: TailwindIcon },
  { name: "MongoDB", level: 85, icon: DatabaseIcon },
  { name: "Docker", level: 80, icon: DockerIcon },
  { name: "LangChain", level: 84, icon: LinkIcon },
  { name: "PyTorch", level: 78, icon: FlameIcon },
  { name: "Hugging Face", level: 82, icon: HuggingFaceIcon },
  { name: "Java", level: 76, icon: JavaIcon },
  { name: "Kotlin", level: 72, icon: KotlinIcon },
  { name: "Spring Boot", level: 74, icon: SpringIcon },
  { name: "ASP.NET", level: 73, icon: AspNetIcon },
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
          <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">// Tech Stack</p>
          <AnimatedText className="text-4xl md:text-5xl font-bold mb-4">
            Tools I{" "}
            <TextManager effect="scramble">
              <ScrambleText text="build with" className="text-gradient" />
            </TextManager>
          </AnimatedText>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Core engineering stack plus the AI & ML systems I ship in production.
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
