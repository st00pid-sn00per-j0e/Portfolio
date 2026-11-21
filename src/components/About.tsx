
import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";

import {
  Code2,
  Sparkles,
  Rocket,
  Github,
  Send,
  Bot,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

import avatarImg from "@/assets/avatar-abstract.jpeg";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { TextManager } from "@/components/animations/TextManager";

const stats = [
  { icon: Code2, label: "Years Building", value: "2.8+" },
  { icon: Sparkles, label: "AI Projects", value: "10+" },
  { icon: Rocket, label: "Deployments", value: "25+" },
];

const CHAT_API_URL =
  "https://bilal-portfolio-chat.stoopid-snooper-joe.workers.dev/api/chat";

const TURNSTILE_SITE_KEY = "0x4AAAAAAGLnOraDyzo--jTR";
const TURNSTILE_ACTION = "bilal_chat";
const SESSION_STORAGE_KEY = "nizami_chat_session";

type Message = {
  role: "user" | "assistant";
  content: string;
  animate?: boolean;
};

type ChatResponse = {
  reply?: string;
  sessionToken?: string;
  error?: string;
  code?: string;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: any
      ) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

// Share one script-loading promise across React StrictMode mounts.
let turnstileScriptPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) {
    return Promise.resolve();
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(
      'script[src*="challenges.cloudflare.com/turnstile"]'
    );

    const timeout = window.setTimeout(() => {
      turnstileScriptPromise = null;

      reject(
        new Error(
          "Cloudflare security script timed out. Check your connection or browser extensions."
        )
      );
    }, 15000);

    const handleLoad = () => {
      window.clearTimeout(timeout);

      if (window.turnstile) {
        resolve();
      } else {
        turnstileScriptPromise = null;

        reject(
          new Error(
            "Cloudflare security script loaded, but Turnstile is unavailable."
          )
        );
      }
    };

    const handleError = () => {
      window.clearTimeout(timeout);
      turnstileScriptPromise = null;

      reject(
        new Error(
          "Could not load Cloudflare security verification. Check your connection or ad blocker."
        )
      );
    };

    if (!script) {
      script = document.createElement("script");

      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

      script.async = true;
      script.defer = true;

      document.head.appendChild(script);
    }

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (window.turnstile) {
      window.clearTimeout(timeout);
      resolve();
    }
  });

  return turnstileScriptPromise;
}

// Markdown renderer with progressive typing.
function AssistantMarkdown({
  content,
  animate = false,
}: {
  content: string;
  animate?: boolean;
}) {
  const [visibleContent, setVisibleContent] = useState(
    animate ? "" : content
  );

  useEffect(() => {
    if (!animate) {
      setVisibleContent(content);
      return;
    }

    const characters = Array.from(content);
    let currentIndex = 0;

    setVisibleContent("");

    const interval = window.setInterval(() => {
      currentIndex = Math.min(
        currentIndex + 4,
        characters.length
      );

      setVisibleContent(
        characters.slice(0, currentIndex).join("")
      );

      if (currentIndex >= characters.length) {
        window.clearInterval(interval);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [content, animate]);

  return (
    <div
      className="
        markdown-message
        break-words
        text-sm
        leading-7
        [&_p]:mb-3
        [&_p:last-child]:mb-0
        [&_h1]:text-xl
        [&_h1]:font-bold
        [&_h1]:mb-3
        [&_h2]:text-lg
        [&_h2]:font-bold
        [&_h2]:mb-2
        [&_h3]:font-semibold
        [&_h3]:mb-2
        [&_ul]:list-disc
        [&_ul]:pl-6
        [&_ol]:list-decimal
        [&_ol]:pl-6
        [&_li]:my-1
        [&_strong]:font-bold
        [&_blockquote]:border-l-2
        [&_blockquote]:border-primary
        [&_blockquote]:pl-3
        [&_blockquote]:italic
        [&_blockquote]:my-3
        [&_a]:text-primary
        [&_a]:underline
        [&_a]:underline-offset-4
        [&_table]:w-full
        [&_table]:border-collapse
        [&_table]:my-3
        [&_th]:border
        [&_th]:border-border
        [&_th]:p-2
        [&_th]:font-bold
        [&_td]:border
        [&_td]:border-border
        [&_td]:p-2
        [&_hr]:my-4
        [&_hr]:border-border
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),

          pre: ({ children }) => (
            <pre className="my-3 overflow-x-auto rounded-xl bg-black/40 border border-border/60 p-4 text-xs leading-6">
              {children}
            </pre>
          ),

          code: ({ children, className, ...props }) => (
            <code
              className={`rounded bg-black/20 px-1.5 py-0.5 font-mono text-xs ${
                className ?? ""
              }`}
              {...props}
            >
              {children}
            </code>
          ),
        }}
      >
        {visibleContent}
      </ReactMarkdown>
    </div>
  );
}

// Animated three-dot indicator.
function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-3 text-primary text-sm"
      aria-label="Nizami AI is typing"
    >
      <div className="flex items-center gap-1 rounded-2xl bg-secondary/50 border border-border/50 px-4 py-3">
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
      </div>

      <span className="text-xs text-muted-foreground">
        Thinking of something clever...
      </span>
    </div>
  );
}

export function About() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Well, well... look who decided to make my day interesting. 😉\n\nI'm Bilal's digital twin. I build backend systems, tame unruly APIs, and make complicated engineering look suspiciously attractive.\n\n56 services. 12 integrations. 88 production incidents handled. Not to brag, but I do have a thing for solving difficult problems. 😏\n\nSo, what's your excuse for being this interesting? Ask me anything.",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [securityReady, setSecurityReady] = useState(false);
  const [securityError, setSecurityError] = useState("");

  // Chat scrolling references.
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  // Whether the visitor is currently following the latest message.
  const shouldAutoScrollRef = useRef(true);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // Keep the signed session between page refreshes in this browser tab.
  const sessionToken = useRef<string | null>(
    typeof window !== "undefined"
      ? sessionStorage.getItem(SESSION_STORAGE_KEY)
      : null
  );

  const resolveToken = useRef<((token: string) => void) | null>(
    null
  );

  const rejectToken = useRef<((error: Error) => void) | null>(
    null
  );

  const tokenTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const clearTokenWait = () => {
    if (tokenTimeout.current) {
      clearTimeout(tokenTimeout.current);
      tokenTimeout.current = null;
    }

    resolveToken.current = null;
    rejectToken.current = null;
  };

  // Track whether the visitor is near the bottom of the chat.
  const handleChatScroll = () => {
    const viewport = chatScrollRef.current;

    if (!viewport) return;

    const distanceFromBottom =
      viewport.scrollHeight -
      viewport.scrollTop -
      viewport.clientHeight;

    shouldAutoScrollRef.current = distanceFromBottom < 100;
  };

  // Observe content height changes, including typewriter updates.
  useEffect(() => {
    const viewport = chatScrollRef.current;
    const content = chatContentRef.current;

    if (!viewport || !content) return;

    const scrollToLatest = () => {
      if (!shouldAutoScrollRef.current) return;

      viewport.scrollTop = viewport.scrollHeight;
    };

    const observer = new ResizeObserver(() => {
      scrollToLatest();
    });

    observer.observe(content);

    scrollToLatest();

    return () => observer.disconnect();
  }, []);

  // Initialize Cloudflare Turnstile.
  useEffect(() => {
    let isMounted = true;

    const initTurnstile = async () => {
      try {
        setSecurityError("");
        setSecurityReady(false);

        await loadTurnstileScript();

        if (!isMounted || !turnstileRef.current || !window.turnstile) {
          return;
        }

        if (widgetId.current) {
          window.turnstile.remove(widgetId.current);
          widgetId.current = null;
        }

        const id = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action: TURNSTILE_ACTION,
          size: "normal",
          appearance: "execute",
          execution: "execute",
          theme: "dark",

          callback: (token: string) => {
            if (!isMounted) return;

            if (tokenTimeout.current) {
              clearTimeout(tokenTimeout.current);
              tokenTimeout.current = null;
            }

            setSecurityError("");

            const resolve = resolveToken.current;

            resolveToken.current = null;
            rejectToken.current = null;

            resolve?.(token);
          },

          "error-callback": (errorCode?: string) => {
            if (!isMounted) return;

            console.error("Turnstile verification error:", errorCode);

            setSecurityReady(false);

            const message =
              String(errorCode) === "110200"
                ? "This website hostname is not authorized in Cloudflare Turnstile settings."
                : `Cloudflare verification failed (${errorCode ?? "unknown error"}).`;

            setSecurityError(message);

            if (tokenTimeout.current) {
              clearTimeout(tokenTimeout.current);
              tokenTimeout.current = null;
            }

            const reject = rejectToken.current;

            resolveToken.current = null;
            rejectToken.current = null;

            reject?.(new Error(message));
          },

          "expired-callback": () => {
            if (!isMounted) return;

            setSecurityError(
              "Security token expired. A fresh verification will be requested when needed."
            );
          },

          "timeout-callback": () => {
            if (!isMounted) return;

            setSecurityReady(false);
            setSecurityError(
              "Security verification timed out. Please try again."
            );

            const reject = rejectToken.current;

            clearTokenWait();

            reject?.(
              new Error("Security verification timed out.")
            );
          },
        });

        if (isMounted) {
          widgetId.current = id;
          setSecurityReady(true);
        }
      } catch (error) {
        console.error("Turnstile initialization error:", error);

        if (isMounted) {
          setSecurityReady(false);

          setSecurityError(
            error instanceof Error
              ? error.message
              : "Failed to initialize security verification."
          );
        }
      }
    };

    initTurnstile();

    return () => {
      isMounted = false;
      clearTokenWait();

      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  // Request a fresh, single-use Turnstile token.
  const getSecurityToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!window.turnstile || !widgetId.current) {
        reject(
          new Error(
            "Security verification is not ready. Refresh the page and try again."
          )
        );

        return;
      }

      clearTokenWait();

      resolveToken.current = resolve;
      rejectToken.current = reject;

      tokenTimeout.current = setTimeout(() => {
        const rejectPending = rejectToken.current;

        clearTokenWait();

        rejectPending?.(
          new Error(
            "Security verification timed out. Please try again."
          )
        );
      }, 20000);

      try {
        window.turnstile.reset(widgetId.current);
        window.turnstile.execute(widgetId.current);
      } catch (error) {
        const rejectPending = rejectToken.current;

        clearTokenWait();

        rejectPending?.(
          error instanceof Error
            ? error
            : new Error("Could not start Cloudflare verification.")
        );
      }
    });
  };

  // Send a message using either an existing session or Turnstile.
  const sendMessage = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const message = question.trim();

    if (!message || loading) return;

    setLoading(true);
    setSecurityError("");

    // Start following the latest message for this new exchange.
    shouldAutoScrollRef.current = true;

    let fetchTimeout: ReturnType<typeof setTimeout> | null = null;

    const conversationHistory = messages.slice(1).slice(-8);

    setMessages((previous) => [
      ...previous,
      { role: "user", content: message },
    ]);

    setQuestion("");

    const makeRequest = async (
      auth: { sessionToken: string } | { turnstileToken: string }
    ): Promise<Response> => {
      const controller = new AbortController();

      fetchTimeout = setTimeout(() => {
        controller.abort();
      }, 20000);

      try {
        return await fetch(CHAT_API_URL, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...auth,
            message,
            history: conversationHistory,
          }),

          signal: controller.signal,
        });
      } finally {
        if (fetchTimeout) {
          clearTimeout(fetchTimeout);
          fetchTimeout = null;
        }
      }
    };

    try {
      let response: Response;

      // Existing signed session.
      if (sessionToken.current) {
        response = await makeRequest({
          sessionToken: sessionToken.current,
        });

        // If the session expired, verify again.
        if (response.status === 403) {
          const errorData = (await response
            .clone()
            .json()
            .catch(() => ({}))) as ChatResponse;

          if (errorData.code === "CHAT_SESSION_EXPIRED") {
            sessionToken.current = null;
            sessionStorage.removeItem(SESSION_STORAGE_KEY);

            setSecurityError(
              "Session expired. Rechecking security..."
            );

            const freshToken = await getSecurityToken();

            response = await makeRequest({
              turnstileToken: freshToken,
            });
          }
        }
      } else {
        // First message: Turnstile verification.
        const turnstileToken = await getSecurityToken();

        response = await makeRequest({
          turnstileToken,
        });
      }

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Cloudflare Worker error:", {
          status: response.status,
          response: errorText,
        });

        let errorData: ChatResponse = {};

        try {
          errorData = JSON.parse(errorText);
        } catch {
          // Keep the original HTTP error.
        }

        throw new Error(
          errorData.error ||
            (response.status === 403
              ? "Request rejected by security verification."
              : `Chat server returned error ${response.status}.`)
        );
      }

      const data = (await response.json()) as ChatResponse;

      // Save the signed session returned after first verification.
      if (data.sessionToken) {
        sessionToken.current = data.sessionToken;

        sessionStorage.setItem(
          SESSION_STORAGE_KEY,
          data.sessionToken
        );
      }

      if (!data.reply || typeof data.reply !== "string") {
        throw new Error(
          "The chat server returned an invalid response."
        );
      }

      setSecurityError("");

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply!,
          animate: true,
        },
      ]);
    } catch (error) {
      console.error("Chat request error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "The request timed out. Please try again.";
        } else {
          errorMessage = error.message;
        }
      }

      setSecurityError(errorMessage);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Well, that's awkward. Even my circuits have the occasional dramatic moment. Try again, troublemaker. 😏",
          animate: true,
        },
      ]);
    } finally {
      if (fetchTimeout) {
        clearTimeout(fetchTimeout);
      }

      clearTokenWait();

      // Reset the widget without executing it again.
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetId.current);
        } catch (error) {
          console.warn("Turnstile reset error:", error);
        }
      }

      setLoading(false);
    }
  };

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 px-4 sm:px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">

          {/* Avatar */}
          <div className="relative mx-auto lg:mx-0 max-w-sm w-full lg:sticky lg:top-32">
            <div className="absolute -inset-4 bg-gradient-primary opacity-30 blur-3xl rounded-full animate-pulse-glow" />

            <div className="relative aspect-square rounded-3xl overflow-hidden glass p-1.5">
              <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-40" />

              <img
                src={avatarImg}
                alt="Syed Bilal Hussain Nizami"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative w-full h-full object-cover rounded-[1.3rem]"
              />
            </div>

            <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 animate-float">
              <div className="text-xs font-mono text-muted-foreground">
                Currently
              </div>

              <div className="text-sm font-bold text-primary">
                Building AI agents
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-primary" />

                <span className="text-sm font-mono">
                  @st00pid-sn00per-j0e
                </span>
              </div>
            </div>
          </div>

          {/* Bio and Chatbot */}
          <div>
            <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">
              // About Me
            </p>

            <AnimatedText className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              <span className="whitespace-nowrap">
                Building with
              </span>{" "}

              <TextManager effect="scramble">
                <ScrambleText
                  text="code & intelligence"
                  className="font-serif italic text-gradient"
                />
              </TextManager>
            </AnimatedText>

            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                Software engineer with 2.8+ years of software
                development experience, building backend systems,
                APIs, data workflows, and intelligent applications.
                I work across implementation, database integration,
                testing, deployment, and production support.
              </p>

              <p>
                I've delivered 56 backend services and features,
                integrated 12 third-party systems, resolved 88
                production incidents, and contributed to a 45%
                reduction in application response time.

                {" "}Outside of product work, I published{" "}

                <a
                  href="https://huggingface.co/Nizami98/LEGAL-BERT-By-Nizami"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline font-semibold"
                >
                  LEGAL-BERT
                </a>

                {" "}— a fine-tuned legal-domain language model.
              </p>
            </div>

            {/* Chatbot */}
            <div className="mt-10 space-y-4">

              {/* Chatbot Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      Talk to Nizami AI
                    </h3>

                    <p className="text-xs text-muted-foreground font-mono">
                      Outlier Intelligence · Dangerously Charming
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-2 text-xs text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Dialogue Cloud */}
              <div className="relative glass rounded-2xl p-5 border border-primary/20 shadow-lg shadow-primary/5">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />

                  <span className="text-xs font-mono uppercase tracking-widest text-primary">
                    NIZAMI.EXE
                  </span>

                  <span className="ml-auto text-[10px] text-muted-foreground font-mono">
                    DIGITAL TWIN
                  </span>
                </div>

                {/* Scrollable chat viewport */}
                <div
                  ref={chatScrollRef}
                  onScroll={handleChatScroll}
                  className="h-72 overflow-y-auto overscroll-contain pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
                  aria-live="polite"
                  aria-relevant="additions text"
                >
                  {/* Content wrapper observed by ResizeObserver */}
                  <div
                    ref={chatContentRef}
                    className="min-h-full space-y-4"
                  >
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-3 max-w-[92%] min-w-0 ${
                            msg.role === "assistant"
                              ? "bg-secondary/50 border border-border/50 text-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {msg.role === "assistant" && (
                            <div className="flex items-center gap-2 mb-2 text-primary">
                              <Bot className="w-4 h-4" />

                              <span className="text-[10px] font-mono uppercase tracking-widest">
                                Nizami AI
                              </span>
                            </div>
                          )}

                          {msg.role === "assistant" ? (
                            <AssistantMarkdown
                              content={msg.content}
                              animate={msg.animate}
                            />
                          ) : (
                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                              {msg.content}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                    {loading && <TypingIndicator />}
                  </div>
                </div>

                <div className="absolute -bottom-2 left-8 w-4 h-4 rotate-45 glass border-r border-b border-primary/20" />
              </div>

              {/* Chat Input */}
              <form
                onSubmit={sendMessage}
                className="glass rounded-2xl p-2 flex items-center gap-2 border border-primary/20 focus-within:border-primary/60 transition-all"
              >
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Careful... I might flirt back. 😉"
                  disabled={loading}
                  maxLength={1200}
                  className="flex-1 min-w-0 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={!question.trim() || loading || !securityReady}
                  aria-label="Send message"
                  className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition-all disabled:opacity-40"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>

              {/* Security Status */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />

                {securityError ? (
                  <span className="text-red-400 font-bold text-center">
                    {securityError}
                  </span>
                ) : securityReady ? (
                  sessionToken.current
                    ? "Protected by Cloudflare · Session active"
                    : "Protected by Cloudflare Turnstile"
                ) : (
                  "Loading security verification..."
                )}
              </div>

              <p className="text-[10px] text-muted-foreground font-mono text-center">
                Powered by Nizami's brain cells™ · Flirt responsibly.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-10">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-4 sm:p-5 text-center hover:border-primary/50 transition-all hover:-translate-y-1"
                >
                  <s.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-primary" />

                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-1">
                    {s.value}
                  </div>

                  <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-mono uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Turnstile container */}
            <div className="flex justify-center min-h-[65px] mt-3">
              <div ref={turnstileRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
