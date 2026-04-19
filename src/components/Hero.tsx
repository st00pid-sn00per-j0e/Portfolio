import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParallaxLayer } from "@/hooks/useParallax";

const ROLES = [
  "Software Developer",
  "AI Agent Engineer",
  "Full-Stack Architect",
  "LLM Fine-tuner",
];

function useTypewriter(words: string[], speed = 80, pause = 1600) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () =>
        setText((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1),
        ),
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

export function Hero() {
  const role = useTypewriter(ROLES);

  // Parallax layers — refs write transforms directly, zero re-renders
  const backLayer = useParallaxLayer(0.08);
  const midLayer = useParallaxLayer(0.3);
  const frontLayer = useParallaxLayer(0.6);
  const orbLeft = useParallaxLayer(0.25);
  const orbRight = useParallaxLayer(0.4);
  const svgRing = useParallaxLayer(0.55);
  const content = useParallaxLayer(-0.12);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern noise">
      {/* Back layer - slowest (0.08x) */}
      <div
        ref={backLayer as React.RefObject<HTMLDivElement>}
        className="parallax-layer absolute inset-0 z-10"
      >
        <img
src="/src/assets/Generated Image April 19, 2026 - 12_28AM.png"
          alt=""
className="absolute inset-0 w-full h-full object-cover opacity-60"
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>

      {/* Middle layer - medium (0.3x) */}
      <div
        ref={midLayer as React.RefObject<HTMLDivElement>}
        className="parallax-layer absolute inset-0 z-20"
      >
        <img
src="/src/assets/Generated Image April 19, 2026 - 12_29AM.png"
          alt=""
className="absolute inset-0 w-full h-full object-cover opacity-80"
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>

      {/* Front layer - fastest (0.6x) */}
      <div
        ref={frontLayer as React.RefObject<HTMLDivElement>}
        className="parallax-layer absolute inset-0 z-30"
      >
        <img
src="/src/assets/Generated_Image_April_18__2026_-_11_29PM-removebg-preview.png"
          alt=""
className="absolute inset-0 w-full h-full object-cover opacity-100"
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>

      {/* Light overlay */}
      <div className="absolute inset-0 z-40 bg-gradient-to-b from-background/20 via-background/10 to-background/5" />

      {/* Floating orbs */}
      <div
        ref={orbLeft as React.RefObject<HTMLDivElement>}
        className="parallax-layer absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/25 blur-[100px] animate-pulse-glow z-50"
      />
      <div
        ref={orbRight as React.RefObject<HTMLDivElement>}
        className="parallax-layer absolute bottom-1/4 -right-20 w-[28rem] h-[28rem] rounded-full bg-accent/25 blur-[120px] animate-pulse-glow z-50"
        style={{ animationDelay: "1.5s" }}
      />

      {/* SVG ring */}
      <svg
        ref={svgRing as React.RefObject<SVGSVGElement>}
        className="parallax-layer absolute top-10 right-10 w-40 h-40 animate-spin-slow hidden lg:block z-50"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="80" cy="80" r="78" stroke="hsl(var(--primary))" strokeWidth="4" strokeOpacity="0.2" strokeLinecap="round" />
        <circle cx="80" cy="80" r="10" fill="hsl(var(--primary))" className="glow" />
      </svg>

      {/* Content */}
      <div
        ref={content as React.RefObject<HTMLDivElement>}
        className="parallax-layer relative z-60 container mx-auto px-6 text-center animate-fade-up"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-sm font-mono text-muted-foreground">Available for opportunities</span>
          <Sparkles className="w-3.5 h-3.5 text-accent" />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tight mb-6 leading-[0.95]">
          <span className="block text-foreground">Syed Bilal</span>
          <span className="block">
            <span className="text-gradient">Hussain Nizami</span>
          </span>
        </h1>

        <p className="text-2xl md:text-3xl font-serif italic text-muted-foreground max-w-2xl mx-auto mb-3 min-h-[2.5rem]">
          <span className="text-foreground/90">{role}</span>
          <span className="inline-block w-[3px] h-7 md:h-8 bg-primary ml-1 align-middle animate-blink" />
        </p>
        <p className="text-base md:text-lg text-muted-foreground/70 max-w-xl mx-auto mb-12 font-mono text-sm">
          React · Node.js · Python · TypeScript · LangChain · Hugging Face
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button asChild size="lg" variant="hero">
            <a href="#contact">
              <Mail className="w-4 h-4" />
              Get In Touch
            </a>
          </Button>
          <Button asChild size="lg" variant="outline-glow">
            <a href="#projects">
              View Projects
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost" className="rounded-full">
            <a href="https://huggingface.co/Nizami98/LEGAL-BERT-By-Nizami" target="_blank" rel="noreferrer">
              <Download className="w-4 h-4" />
              LEGAL-BERT
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/st00pid-sn00per-j0e"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-primary hover:scale-110 transition-all"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/syed-bilal-hussain-b189991a3/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-primary hover:scale-110 transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://huggingface.co/Nizami98/LEGAL-BERT-By-Nizami"
            target="_blank"
            rel="noreferrer"
            aria-label="Hugging Face"
            className="w-11 h-11 rounded-full glass flex items-center justify-center hover:scale-110 transition-all text-base"
          >
            🤗
          </a>
        </div>

        <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float z-60" aria-label="Scroll down">
          <ArrowDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}
