import { useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import aiDashboard from "@/assets/project-ai-dashboard.jpg";
import legalBert from "@/assets/project-legal-bert.jpg";
import ecommerce from "@/assets/project-ecommerce.jpg";
import portfolio from "@/assets/project-portfolio.jpg";
import replitCloneProject from "@/assets/Replit Clone project.mp4";
import knowledgeGraphProject from "@/assets/Knowledge Graph.mp4";
import carMotionProject from "@/assets/Real time car moving.mp4";
import { Toaster } from "@/components/ui/sonner";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { MeetMe } from "@/components/MeetMe";
import { Skills } from "@/components/Skills";
import { AIShowcase } from "@/components/AIShowcase";
import { LexiGuard } from "@/components/LexiGuard";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Certificates } from "@/components/Certificates";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { usePreloader } from "@/hooks/usePreloader";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const preloaderAssets = [
  aiDashboard,
  legalBert,
  ecommerce,
  portfolio,
  replitCloneProject,
  knowledgeGraphProject,
  carMotionProject,
];

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
  const assetUrls = useMemo(() => preloaderAssets, []);
  const { progress, isLoaded } = usePreloader(assetUrls, 900);

  useSmoothScroll(isLoaded);

  useEffect(() => {
    document.body.style.overflow = isLoaded ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  return (
    <>
      <Loader progress={progress} visible={!isLoaded} />
      <main className={`relative min-h-screen ${isLoaded ? "site-ready" : "site-hidden"}`}>
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
          <LexiGuard />
          <Projects />
          <Experience />
          <Certificates />
          <Testimonials />
          <Contact />
          <Footer />
        </div>
        <Toaster theme="dark" position="bottom-right" />
      </main>
    </>
  );
}
