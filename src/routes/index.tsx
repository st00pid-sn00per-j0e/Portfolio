import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/Nav";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { MeetMe } from "@/components/MeetMe";
import { Skills } from "@/components/Skills";
import { AIShowcase } from "@/components/AIShowcase";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Certificates } from "@/components/Certificates";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Syed Bilal Hussain Nizami — Software Developer & AI Engineer" },
      {
        name: "description",
        content:
          "Full-stack developer specializing in React, Node.js, TypeScript, and AI agents. Creator of LEGAL-BERT on Hugging Face.",
      },
      { property: "og:title", content: "Syed Bilal Hussain Nizami — Software Developer & AI Engineer" },
      {
        property: "og:description",
        content: "Building production-grade web apps and AI systems with React, LangChain, and fine-tuned transformers.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen">
      <ParallaxBackground />
      <NeuralCanvas />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <MeetMe />
        <Skills />
        <AIShowcase />
        <Projects />
        <Experience />
        <Certificates />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
      <Toaster theme="dark" position="bottom-right" />
    </main>
  );
}
