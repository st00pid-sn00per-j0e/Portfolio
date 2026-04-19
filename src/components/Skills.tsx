import { useRef } from "react";

const skills = [
  { name: "React.js", level: 95, icon: "⚛️" },
  { name: "Python", level: 88, icon: "🐍" },
  { name: "Node.js", level: 90, icon: "⬢" },
  { name: "TypeScript", level: 92, icon: "TS" },
  { name: "Next.js", level: 87, icon: "▲" },
  { name: "Tailwind CSS", level: 88, icon: "🎨" },
  { name: "MongoDB", level: 85, icon: "🍃" },
  { name: "Docker", level: 80, icon: "🐳" },
  { name: "LangChain", level: 84, icon: "🔗" },
  { name: "PyTorch", level: 78, icon: "🔥" },
  { name: "Hugging Face", level: 82, icon: "🤗" },
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
    <section id="skills" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">// Tech Stack</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tools I <span className="text-gradient">build with</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Core engineering stack plus the AI & ML systems I ship in production.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              className="group glass rounded-2xl p-6 hover:border-primary/60 transition-[border-color,box-shadow] hover:glow"
              style={{ animationDelay: `${i * 50}ms`, willChange: "transform", transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-card flex items-center justify-center text-xl font-bold border border-border group-hover:border-primary/50 transition-colors">
                  {skill.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
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
          ))}
        </div>
      </div>
    </section>
  );
}