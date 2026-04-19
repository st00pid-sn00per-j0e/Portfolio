import { Github, ExternalLink } from "lucide-react";
import aiDashboard from "@/assets/project-ai-dashboard.jpg";
import legalBert from "@/assets/project-legal-bert.jpg";
import ecommerce from "@/assets/project-ecommerce.jpg";
import portfolio from "@/assets/project-portfolio.jpg";

const projects = [
  {
    title: "AI Agent Dashboard",
    description:
      "LangChain-powered autonomous agents with real-time observability. Tool execution, memory, and reasoning traces visualized in a live dashboard.",
    tags: ["React", "Node.js", "LangChain", "Tailwind"],
    image: aiDashboard,
  },
  {
    title: "LEGAL-BERT Model",
    description:
      "Fine-tuned BERT transformer for legal document understanding. Published openly on Hugging Face for downstream NLP tasks.",
    tags: ["PyTorch", "Transformers", "NLP", "HuggingFace"],
    image: legalBert,
    href: "https://huggingface.co/Nizami98/LEGAL-BERT-By-Nizami",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack marketplace with Stripe payments, JWT auth, and containerized deployment. Built for scale.",
    tags: ["Next.js", "Express", "PostgreSQL", "Docker"],
    image: ecommerce,
  },
  {
    title: "Portfolio Site",
    description:
      "This very site — design-forward portfolio crafted with React, TypeScript, and a custom design system.",
    tags: ["React", "TypeScript", "Tailwind", "Vite"],
    image: portfolio,
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">// Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Recent <span className="font-serif italic text-gradient">projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Production-ready applications and research showcasing the modern stack.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="group glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 hover:glow"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.title} preview`}
                  width={1280}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass text-[10px] font-mono uppercase tracking-wider text-primary">
                  {p.tags[0]}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {p.title}
                </h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">{p.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-secondary/40 border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={p.href ?? "#"}
                    target={p.href ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <a
                    href={p.href ?? "#"}
                    target={p.href ? "_blank" : undefined}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
