import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contacts = [
  { icon: Mail, label: "Email", value: "billyxkhan98@gmail.com", href: "mailto:billyxkhan98@gmail.com" },
{ icon: Phone, label: "Phone", value: "+92 319241837", href: "tel:+92319241837" },
  { icon: MapPin, label: "Location", value: "Karachi, Pakistan" }
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:billyxkhan98@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">// Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's build something <span className="text-gradient">amazing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got a project in mind? I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {contacts.map((c) => {
              const Tag: any = c.href ? "a" : "div";
              return (
                <Tag
                  key={c.label}
                  href={c.href}
                  className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-primary/50 hover:-translate-y-0.5 transition-all block"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                      {c.label}
                    </div>
                    <div className="text-foreground font-medium truncate">{c.value}</div>
                  </div>
                </Tag>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="lg:col-span-3 glass rounded-2xl p-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-mono text-muted-foreground mb-2">
                Your Name
              </label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="bg-background/50 border-border h-12"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-mono text-muted-foreground mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="bg-background/50 border-border h-12"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-mono text-muted-foreground mb-2">
                Message
              </label>
              <Textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project…"
                className="bg-background/50 border-border resize-none"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">
              <Send className="w-4 h-4" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
