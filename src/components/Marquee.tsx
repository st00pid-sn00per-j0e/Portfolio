const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "LangChain",
  "PyTorch",
  "Hugging Face",
  "Docker",
  "PostgreSQL",
  "MongoDB",
  "Tailwind",
  "Vite",
  "GraphQL",
  "Redis",
  "AWS",
  "CI/CD",
];

export function Marquee() {
  return (
    <div className="relative py-10 border-y border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden">
      <div className="mask-fade-x">
        <div className="flex gap-12 animate-marquee whitespace-nowrap w-max">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-2xl md:text-4xl font-bold text-stroke hover:text-foreground transition-colors"
            >
              {item}
              <span className="w-2 h-2 rounded-full bg-primary/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
