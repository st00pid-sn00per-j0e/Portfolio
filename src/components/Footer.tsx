import { Github, Linkedin, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold text-gradient mb-1">Syed Bilal Hussain Nizami</div>
            <p className="text-sm text-muted-foreground font-mono">
              © {new Date().getFullYear()} — Built with React, TypeScript & ❤️
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/st00pid-sn00per-j0e"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-primary hover:scale-110 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/syed-bilal-hussain-b189991a3/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-primary hover:scale-110 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://huggingface.co/Nizami98/LEGAL-BERT-By-Nizami"
              target="_blank"
              rel="noreferrer"
              aria-label="Hugging Face"
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-all"
            >
              🤗
            </a>
            <a
              href="#"
              aria-label="Back to top"
              className="ml-2 inline-flex items-center gap-2 px-4 h-10 rounded-full glass hover:text-primary hover:border-primary/50 transition-all text-sm font-mono"
            >
              <ArrowUp className="w-4 h-4" />
              Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
