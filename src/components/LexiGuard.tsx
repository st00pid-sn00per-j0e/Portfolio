import { useEffect, useRef } from "react";
import {
  Brain,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  GraduationCap,
  ImageIcon,
  LayoutDashboard,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import finalImg from "@/assets/final.jpg";
import screenshot1 from "@/assets/1.png";
import screenshot2 from "@/assets/2.png";
import screenshot3 from "@/assets/3.png";
import screenshot4 from "@/assets/4.png";
import fypRecommendationLetterPdf from "@/assets/DOC-20251111-WA0032..pdf";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { TextManager } from "@/components/animations/TextManager";

const features = [
  { icon: Cpu, label: "Base Model", value: "LEGAL-BERT By NIZAMI" },
  { icon: Database, label: "Domain", value: "Legal Document NLP" },
  { icon: GraduationCap, label: "Status", value: "Final Year Project" },
  { icon: Shield, label: "Focus", value: "Clause Extraction & QA" },
];

const screenshots = [
  { src: screenshot1, alt: "Lexi-Guard Dashboard Overview" },
  { src: screenshot2, alt: "Lexi-Guard Document Analysis" },
  { src: screenshot3, alt: "Lexi-Guard Feature View" },
  { src: screenshot4, alt: "Lexi-Guard Results Panel" },
];

const supportingDocument = {
  title: "FYP Recommendation Letter",
  description:
    "Recommendation letter attached as supporting academic material for the Lexi-Guard final year project.",
  href: fypRecommendationLetterPdf,
  downloadName: "Syed-Bilal-Hussain-Nizami-FYP-Recommendation-Letter.pdf",
};

export function LexiGuard() {
  // ── Scroll-driven fade-in animation ──────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  // ── 3D tilt refs for screenshot cards ────────────────────────────
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      wrapperRefs.current.forEach((wrapper, i) => {
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        const enterPoint = vh * 1.2;
        const settlePoint = vh * 0.35;
        const raw = (enterPoint - rect.top) / (enterPoint - settlePoint);
        const progress = Math.min(Math.max(raw, 0), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const maxOffset = 60;
        const isLeft = i % 2 === 0;
        const offset = (1 - eased) * maxOffset * (isLeft ? -1 : 1);
        wrapper.style.transform = `translateX(${offset}px)`;
        wrapper.style.opacity = String(Math.min(eased * 1.2, 1));
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

  // ── 3D mouse-tilt handlers for screenshot cards ──────────────────
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
    setTimeout(() => {
      if (card) card.style.transition = "";
    }, 550);
  };

  return (
    <section
      id="lexi-guard"
      ref={sectionRef}
      className="relative overflow-hidden px-4 sm:px-6 py-20 md:py-32"
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 left-0 h-80 w-80 -translate-y-1/2 rounded-full bg-accent/8 blur-[120px]" />
      <div className="absolute bottom-1/3 right-0 h-80 w-80 translate-y-1/2 rounded-full bg-primary/8 blur-[120px]" />

      <div className="container relative mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-mono text-sm tracking-widest text-accent uppercase">
            // Lexi-Guard FYP
          </p>
          <AnimatedText className="mb-4 text-4xl font-bold md:text-5xl">
            <TextManager effect="scramble">
              <ScrambleText text="Lexi-Guard" className="font-serif italic text-gradient" />
            </TextManager>
          </AnimatedText>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A comprehensive legal document analysis platform — fine-tuning LEGAL-BERT with an
            interactive dashboard for clause extraction, document classification, and legal QA.
          </p>
        </div>

        {/* ── Main Hero Image ────────────────────────────────────── */}
        <div
          ref={(el) => { wrapperRefs.current[0] = el; }}
          style={{ opacity: 0, willChange: "transform, opacity" }}
          className="mb-12"
        >
          <div className="glass group relative overflow-hidden rounded-3xl border-primary/20 p-2 transition-all hover:border-primary/50 hover:glow">
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <img
                src={finalImg}
                alt="Lexi-Guard Final Year Project"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-3xl">
              <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 rounded-2xl bg-background/70 p-3 backdrop-blur-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-3 py-1.5">
                <Brain className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs tracking-wider text-accent uppercase">
                  Final Year Project
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1.5">
                <LayoutDashboard className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs tracking-wider text-primary uppercase">
                  Interactive Dashboard
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content Grid ──────────────────────────────────── */}
        <div className="grid items-start gap-12 lg:grid-cols-2 mb-16">
          {/* Left: Description + Tags + Buttons */}
          <div
            ref={(el) => { wrapperRefs.current[1] = el; }}
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            <div className="glass rounded-3xl border-primary/20 p-8 md:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-3 py-1.5">
                <GraduationCap className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs tracking-wider text-accent uppercase">
                  University of Karachi
                </span>
              </div>

              <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                Lexi-Guard:{" "}
                <span className="text-gradient">Legal NLP Platform</span>
              </h3>

              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                Lexi-Guard is a full-stack legal document analysis system that combines a
                fine-tuned LEGAL-BERT transformer model with an intuitive React dashboard. It
                enables users to upload legal documents, extract clauses, classify document types,
                and ask natural-language questions — all powered by a custom-trained NLP pipeline.
              </p>

              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                The model was fine-tuned on legal corpora for downstream tasks including document
                classification, clause extraction, and legal question answering. The dashboard
                provides real-time visualization of model outputs, confidence scores, and document
                analytics.
              </p>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "LEGAL-BERT",
                    "PyTorch",
                    "Transformers",
                    "Hugging Face",
                    "NLP",
                    "Fine-tuning",
                    "React",
                    "Dashboard",
                    "Tailwind CSS",
                    "Python",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mb-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <a
                    href="https://huggingface.co/Nizami98/LEGAL-BERT-By-Nizami"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Hugging Face
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>

                <Button asChild variant="outline-glow" size="lg">
                  <a href={supportingDocument.href} target="_blank" rel="noreferrer">
                    View Recommendation Letter
                    <FileText className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              {/* Supporting Document Card */}
              <div className="glass rounded-2xl border-primary/20 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/12">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1 font-mono text-xs tracking-wider text-primary uppercase">
                      Supporting Document
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-foreground">
                      {supportingDocument.title}
                    </h4>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {supportingDocument.description}
                    </p>
                    <a
                      href={supportingDocument.href}
                      download={supportingDocument.downloadName}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
                    >
                      Download PDF
                      <FileText className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Feature Cards + Code Snippet */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <div
                key={feature.label}
                ref={(el) => { wrapperRefs.current[i + 2] = el; }}
                style={{ opacity: 0, willChange: "transform, opacity" }}
              >
                <div className="glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:border-accent/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary">
                    <feature.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                      {feature.label}
                    </div>
                    <div className="text-lg font-bold text-foreground">{feature.value}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Code Snippet */}
            <div className="glass rounded-2xl p-5 font-mono text-xs leading-relaxed">
              <div className="mb-3 flex items-center gap-2 border-b border-border pb-2">
                <div className="h-2 w-2 rounded-full bg-destructive/60" />
                <div className="h-2 w-2 rounded-full bg-chart-4/80" />
                <div className="h-2 w-2 rounded-full bg-primary/80" />
                <span className="ml-2 text-muted-foreground">lexi_guard.py</span>
              </div>
              <pre className="whitespace-pre-wrap text-muted-foreground">
                <span className="text-accent">from</span> transformers{" "}
                <span className="text-accent">import</span> AutoModel, AutoTokenizer
                {"\n"}
                {"\n"}model = AutoModel.from_pretrained(
                {"\n"}  <span className="text-primary">"Nizami98/LEGAL-BERT-By-Nizami"</span>
                {"\n"})
                {"\n"}tokenizer = AutoTokenizer.from_pretrained(
                {"\n"}  <span className="text-primary">"Nizami98/LEGAL-BERT-By-Nizami"</span>
                {"\n"})
                {"\n"}
                {"\n"}# Analyze a legal document
                {"\n"}inputs = tokenizer(
                {"\n"}  <span className="text-chart-4">"The defendant shall..."</span>,
                {"\n"}  return_tensors=<span className="text-chart-4">"pt"</span>
                {"\n"})
                {"\n"}outputs = model(**inputs)
              </pre>
            </div>
          </div>
        </div>

        {/* ── Screenshots Gallery ────────────────────────────────── */}
        <div
          ref={(el) => { wrapperRefs.current[7] = el; }}
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          <div className="glass rounded-3xl border-primary/20 p-8 md:p-10">
            <div className="mb-8 text-center">
              <p className="mb-2 font-mono text-xs tracking-widest text-primary uppercase">
                // Dashboard Screenshots
              </p>
              <h3 className="text-2xl font-bold md:text-3xl">
                Platform <span className="font-serif italic text-gradient">in action</span>
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                Key features and interfaces of the Lexi-Guard legal document analysis platform.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {screenshots.map((shot, i) => (
                <div
                  key={shot.alt}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  onMouseMove={(e) => handleMouseMove(e, i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  className="glass group relative overflow-hidden rounded-2xl p-1.5 transition-colors hover:border-primary/50"
                  style={{
                    willChange: "transform",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl">
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="rounded-lg bg-background/70 px-3 py-1.5 backdrop-blur-sm">
                      <span className="text-xs font-mono text-muted-foreground">
                        <ImageIcon className="mr-1.5 inline-block h-3 w-3 text-primary" />
                        {shot.alt}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
