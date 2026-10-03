import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

const siteUrl = "https://yourportfolio.com";
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Syed Bilal Hussain Nizami",
  jobTitle: "Software Developer & AI Engineer",
  url: siteUrl,
  sameAs: [
    "https://www.linkedin.com/in/syed-bilal-hussain-nizami",
    "https://github.com/syedbilalhussainnizami",
  ],
  knowsAbout: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "AI Engineering",
    "Full-Stack Development",
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index,follow" },
      { name: "theme-color", content: "#09120f" },
      { title: "Syed Bilal Hussain Nizami — Software Developer & AI Engineer" },
      {
        name: "description",
        content:
          "Software developer and AI engineer building high-performance web experiences, AI systems, and full-stack products with React, TypeScript, Python, and modern cloud workflows.",
      },
      { name: "keywords", content: "software developer, AI engineer, full stack developer, React developer, TypeScript, Python, portfolio" },
      { name: "author", content: "Syed Bilal Hussain Nizami" },
      { property: "og:title", content: "Syed Bilal Hussain Nizami — Software Developer & AI Engineer" },
      {
        property: "og:description",
        content: "Building production-grade web apps and AI systems with React, TypeScript, Python, and modern full-stack engineering.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:site_name", content: "Syed Bilal Hussain Nizami" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Syed Bilal Hussain Nizami — Software Developer & AI Engineer" },
      { name: "twitter:description", content: "Software developer and AI engineer building high-performance digital products and intelligent systems." },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "canonical", href: siteUrl },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personSchema),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
