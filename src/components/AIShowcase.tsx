import {
  Brain,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import fypRecommendationLetterPdf from "@/assets/DOC-20251111-WA0032..pdf";

const features = [
  { icon: Cpu, label: "Base Model", value: "LEGAL-BERT" },
  { icon: Database, label: "Domain", value: "Legal NLP" },
  { icon: Zap, label: "Status", value: "Live on Hugging Face" },
];

const supportingDocument = {
  title: "FYP Recommendation Letter",
  description:
    "Recommendation letter attached as supporting academic material for the LEGAL-BERT final year project.",
  href: fypRecommendationLetterPdf,
  downloadName: "Syed-Bilal-Hussain-Nizami-FYP-Recommendation-Letter.pdf",
};

export function AIShowcase() {
  return (
    <section id="ai" className="relative overflow-hidden px-6 py-32">
      <div className="absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute top-1/2 right-0 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-4 font-mono text-sm tracking-widest text-accent uppercase">
            // Featured Model
          </p>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Fine-tuning <span className="text-gradient">domain intelligence</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A transformer model specialized for legal text understanding, published openly on
            Hugging Face with an attached recommendation letter for the final year project.
          </p>
        </div>

        <div className="glass relative overflow-hidden rounded-3xl border-primary/20 p-8 md:p-12">
          <div className="pointer-events-none absolute inset-0 rounded-3xl">
            <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/15 px-3 py-1.5">
                <Brain className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs tracking-wider text-accent uppercase">
                  Open Source | Hugging Face
                </span>
              </div>

              <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                LEGAL-BERT <span className="text-gradient">By Nizami</span>
              </h3>

              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                A BERT-based transformer fine-tuned on legal corpora for downstream tasks like
                document classification, clause extraction, and legal question answering. Built to
                bring production-grade NLP capabilities to the legal domain.
              </p>

              <div className="mb-8 flex flex-wrap gap-2">
                {["Transformers", "PyTorch", "Hugging Face", "NLP", "Fine-tuning", "BERT"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>

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
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.label}
                    className="glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:border-accent/50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
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
                ))}

                <div className="glass rounded-2xl p-5 font-mono text-xs leading-relaxed">
                  <div className="mb-3 flex items-center gap-2 border-b border-border pb-2">
                    <div className="h-2 w-2 rounded-full bg-destructive/60" />
                    <div className="h-2 w-2 rounded-full bg-chart-4/80" />
                    <div className="h-2 w-2 rounded-full bg-primary/80" />
                    <span className="ml-2 text-muted-foreground">inference.py</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-muted-foreground">
                    <span className="text-accent">from</span> transformers{" "}
                    <span className="text-accent">import</span> AutoModel
                    {"\n"}
                    {"\n"}model = AutoModel.from_pretrained(
                    {"\n"}  <span className="text-primary">"Nizami98/LEGAL-BERT-By-Nizami"</span>
                    {"\n"})
                  </pre>
                </div>

                <div className="glass overflow-hidden rounded-2xl border-primary/15">
                  <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
                    <div>
                      <div className="mb-1 font-mono text-xs tracking-wider text-primary uppercase">
                        Academic Endorsement
                      </div>
                      <div className="text-base font-bold text-foreground">
                        {supportingDocument.title}
                      </div>
                    </div>

                    <a
                      href={supportingDocument.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
                    >
                      Open PDF
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="bg-white/95 p-3">
                    <object
                      data={`${supportingDocument.href}#toolbar=0&navpanes=0&scrollbar=0`}
                      type="application/pdf"
                      className="h-[420px] w-full rounded-xl"
                    >
                      <div className="flex h-[420px] items-center justify-center rounded-xl border border-border bg-background px-6 text-center">
                        <div className="max-w-sm">
                          <FileText className="mx-auto mb-3 h-8 w-8 text-primary" />
                          <p className="mb-4 text-sm text-muted-foreground">
                            PDF preview is unavailable in this browser.
                          </p>
                          <a
                            href={supportingDocument.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
                          >
                            Open recommendation letter
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </object>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
