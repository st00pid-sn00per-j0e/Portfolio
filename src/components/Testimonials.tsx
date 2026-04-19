import { Quote } from "lucide-react";

const quotes = [
  {
    text: "Bilal delivered our AI dashboard in record time. The LangChain integration was rock-solid and the UI felt like a finished product on day one.",
    author: "Ahmed Siddiqui.",
    role: "CEO, Minsoft Technologies",
  },
  {
    text: "Rare combination of strong engineering instincts and genuine ML depth. He shipped a fine-tuned model and an entire app around it without breaking stride.",
    author: "Ms Mahanoor Iftikhar.",
    role: "FYP Committee Member (Super-Visior), Sir Syed University of Engineering and Technology",
  },
  {
    text: "Clean code, clear communication, and a real eye for design. Easy hire, would absolutely work with him again.",
    author: "Ali Raza.",
    role: "Founder, White Label Partner (Lime Software Logics)",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">// Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="font-serif italic text-gradient">teams that ship</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <figure
              key={q.author}
              className="glass rounded-2xl p-7 flex flex-col hover:border-primary/40 transition-all hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Quote className="w-8 h-8 text-primary/60 mb-4" />
              <blockquote className="text-foreground/90 leading-relaxed flex-1 mb-6 font-serif italic text-lg">
                "{q.text}"
              </blockquote>
              <figcaption className="border-t border-border/40 pt-4">
                <div className="font-semibold text-foreground">{q.author}</div>
                <div className="text-xs text-muted-foreground font-mono">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
