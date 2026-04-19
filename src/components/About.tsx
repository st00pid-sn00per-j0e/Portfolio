import { Code2, Sparkles, Rocket, Github } from "lucide-react";
import avatarImg from "@/assets/avatar-abstract.jpeg";

const stats = [
  { icon: Code2, label: "Years Building", value: "3+" },
  { icon: Sparkles, label: "AI Projects", value: "10+" },
  { icon: Rocket, label: "Deployments", value: "25+" },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          {/* Avatar visual */}
          <div className="relative mx-auto lg:mx-0 max-w-sm w-full">
            <div className="absolute -inset-4 bg-gradient-primary opacity-30 blur-3xl rounded-full animate-pulse-glow" />
            <div className="relative aspect-square rounded-3xl overflow-hidden glass p-1.5">
              <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-40" />
              <img
                src={avatarImg}
                alt="Syed Bilal Hussain Nizami"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative w-full h-full object-cover rounded-[1.3rem]"
              />
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 animate-float">
              <div className="text-xs font-mono text-muted-foreground">Currently</div>
              <div className="text-sm font-bold text-primary">Building AI agents</div>
            </div>
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">@st00pid-sn00per-j0e</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">// About Me</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Building the future with{" "}
              <span className="font-serif italic text-gradient">code & intelligence</span>
            </h2>
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm a passionate full-stack developer specializing in modern web technologies and applied AI.
                I architect performance, scalable systems with React, Node.js, TypeScript, Python, and push them
                further with LLMs and agentic workflows.
              </p>
              <p>
                Currently exploring AI agents with <span className="text-primary font-semibold">LangChain</span>,
fine-tuning domain-specific transformers like my LEGAL-BERT model with RAG pipelines in Qdrant vector database{" "}
                <a
                  href="https://huggingface.co/Nizami98/LEGAL-BERT-By-Nizami"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline font-semibold"
                >
                  LEGAL-BERT
                </a>{" "}
                model, and shipping production-grade apps with Docker & CI/CD.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-5 text-center hover:border-primary/50 transition-all hover:-translate-y-1"
                >
                  <s.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">{s.value}</div>
                  <div className="text-[10px] md:text-xs text-muted-foreground font-mono uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
