import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Check, X, TrendingUp, BarChart2, Search, Globe, Layers, Cloud, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { EsaLogo } from "@/components/EsaLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ESA — Enterprise Strategy Agent | AI-first business intelligence" },
      { name: "description", content: "One conversational interface powered by 4 specialized AI agents for strategy, data, search, and research across your enterprise." },
      { property: "og:title", content: "ESA — Enterprise Strategy Agent" },
      { property: "og:description", content: "AI-powered enterprise intelligence, one interface." },
    ],
  }),
  component: Landing,
});

const BRIEFS = [
  "Build me a fraud-detection agent for our bank",
  "Benchmark our SaaS pricing against competitors",
  "Analyze Q3 revenue and forecast Q4",
];

function TypingBrief() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  useEffect(() => {
    const full = BRIEFS[idx];
    let i = 0;
    const t = setInterval(() => {
      i++;
      setText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(t);
        setTimeout(() => setIdx((p) => (p + 1) % BRIEFS.length), 2200);
      }
    }, 45);
    return () => clearInterval(t);
  }, [idx]);
  return (
    <div className="rounded-xl px-4 py-3.5 text-[14px] text-text-primary"
         style={{ background: "rgba(79,110,247,0.06)", border: "0.5px solid rgba(79,110,247,0.18)" }}>
      <span>{text}</span>
      <span className="inline-block w-[2px] h-4 bg-primary animate-pulse align-middle ml-0.5" />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] transition-all duration-200"
         style={{
           background: scrolled ? "rgba(247,248,252,0.92)" : "transparent",
           backdropFilter: scrolled ? "blur(20px)" : "none",
           borderBottom: scrolled ? "0.5px solid #E4E8F4" : "0.5px solid transparent",
         }}>
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <EsaLogo />
        <div className="hidden md:flex items-center gap-8 text-[14px] text-text-secondary">
          <a href="#" className="hover:text-text-primary">Home</a>
          <a href="#features" className="hover:text-text-primary">Features</a>
          <a href="#pricing" className="hover:text-text-primary">Pricing</a>
          <a href="#" className="hover:text-text-primary">Docs</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="h-9 px-4 rounded-md text-[14px] text-text-secondary border border-border hover:bg-secondary flex items-center">Log In</Link>
          <Link to="/login" className="h-9 px-5 rounded-md text-[14px] font-medium bg-primary text-primary-foreground hover:bg-primary-hover flex items-center shadow-glow">Start Free Trial</Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-[760px] mx-auto text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium text-primary"
              style={{ background: "rgba(79,110,247,0.10)", border: "0.5px solid rgba(79,110,247,0.3)" }}>
          ✦ AI-First Enterprise Intelligence
        </span>
        <h1 className="mt-6 text-[44px] md:text-[64px] font-bold text-text-primary leading-[1.05] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}>
          AI-powered enterprise<br />
          <span className="grad-text">intelligence</span>, one interface
        </h1>
        <p className="mt-6 text-[18px] md:text-[20px] text-text-secondary max-w-[560px] mx-auto leading-[1.5]">
          Strategy. Data. Research. Search. All in one query.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link to="/login" className="h-12 px-7 rounded-[10px] bg-primary text-white text-[16px] font-medium flex items-center gap-2 animate-pulse-glow">
            Launch Trial Now <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="h-12 px-6 rounded-[10px] border border-border bg-surface text-text-primary text-[15px] flex items-center gap-2 hover:bg-secondary">
            <Play className="w-4 h-4 fill-current" /> Watch Demo
          </button>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-[13px] text-text-secondary">
          <div className="flex -space-x-2">
            {["#4F6EF7","#0FC4A7","#9B72F7","#F7924A","#16A34A"].map((c,i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white" style={{ background: c }} />
            ))}
          </div>
          Trusted by 500+ enterprise teams
        </div>
      </div>

      {/* Architecture diagram */}
      <div className="mt-14 max-w-[1100px] mx-auto grid md:grid-cols-3 gap-0">
        <div className="glass rounded-l-2xl md:rounded-r-none rounded-2xl p-5">
          <h3 className="text-center text-[18px] font-semibold text-text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>Your Brief</h3>
          <TypingBrief />
          <div className="my-4 flex justify-center"><EsaLogo size={32} withWord={false} /></div>
          <div className="text-center text-[10px] font-semibold text-text-tertiary tracking-[0.1em]">PLAIN ENGLISH — OR CODE</div>
        </div>
        <div className="glass p-5 md:rounded-none rounded-2xl border-l-0 border-r-0">
          <h3 className="text-center text-[18px] font-semibold text-text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>ESA Platform</h3>
          <div className="rounded-2xl p-5 mb-4 text-center"
               style={{ background: "linear-gradient(135deg,#0A0B1E 0%,#1a1040 50%,#2d0a3e 100%)", border: "1px solid rgba(79,110,247,0.4)" }}>
            <div className="text-[40px] font-bold grad-text-tri leading-none" style={{ fontFamily: "var(--font-display)" }}>SAI</div>
            <div className="text-[10px] tracking-[0.15em] mt-1" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}>SUPERAGENT AI</div>
          </div>
          <div className="text-[10px] text-text-tertiary tracking-[0.12em] text-center mb-2">5 STUDIOS</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: "Agent Studio", color: "rgba(79,110,247,0.12)" },
              { label: "App Studio", color: "rgba(155,114,247,0.12)" },
              { label: "Model Studio", color: "rgba(247,146,74,0.15)", active: true },
              { label: "Cloud Studio", color: "rgba(15,17,23,0.06)" },
            ].map((s) => (
              <div key={s.label} className="rounded-[10px] px-3 py-2 text-[12px] font-medium text-text-primary"
                   style={{ background: s.color, border: s.active ? "1px solid #F7924A" : "0.5px solid #E4E8F4" }}>
                {s.label}
              </div>
            ))}
            <div className="col-span-2 rounded-[10px] px-3 py-2 text-[12px] font-medium text-text-primary"
                 style={{ background: "rgba(155,114,247,0.12)", border: "0.5px solid #E4E8F4" }}>
              Marketplace — publish & purchase
            </div>
          </div>
          <div className="text-[10px] text-text-tertiary tracking-[0.12em] text-center mb-2">CORE IP</div>
          <div className="grid grid-cols-3 gap-1.5">
            {["AGP", "MAN", "ESM"].map((c) => (
              <div key={c} className="rounded-md px-2 py-2 text-center text-[10px] font-semibold"
                   style={{ background: "rgba(15,17,23,0.85)", color: "rgba(255,255,255,0.85)" }}>
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-r-2xl md:rounded-l-none rounded-2xl p-5">
          <h3 className="text-center text-[18px] font-semibold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>150+ LLMs</h3>
          <div className="text-center text-[11px] text-text-tertiary mb-3">300+ MCPs</div>
          <div className="grid grid-cols-3 gap-2 justify-items-center mb-3">
            {[TrendingUp, BarChart2, Search, Globe, Layers, Cloud, Shield, Play, Check].map((Icon, i) => (
              <div key={i} className="w-[52px] h-[52px] rounded-[10px] flex items-center justify-center"
                   style={{ background: "rgba(79,110,247,0.07)", border: "0.5px solid rgba(79,110,247,0.15)" }}>
                <Icon className="w-5 h-5" style={{ color: ["#4F6EF7","#0FC4A7","#9B72F7","#F7924A"][i%4] }} strokeWidth={1.5} />
              </div>
            ))}
          </div>
          <div className="h-px bg-border my-3" />
          <button className="w-full rounded-md px-3 py-2 text-[13px] font-medium text-text-primary mb-2"
                  style={{ background: "#F0F2FA", border: "0.5px solid #D6DCF0" }}>Custom Models</button>
          <button className="w-full rounded-md px-3 py-2 text-[13px] font-medium text-text-primary"
                  style={{ background: "#F0F2FA", border: "0.5px solid #D6DCF0" }}>Fine-Tuned Models</button>
        </div>
        <div className="md:col-span-3 rounded-b-2xl px-8 py-4 flex flex-wrap items-center justify-center gap-8 text-[13px] text-text-secondary"
             style={{ background: "rgba(79,110,247,0.05)", borderTop: "0.5px solid rgba(79,110,247,0.12)" }}>
          <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-text-tertiary" strokeWidth={1.5} /> Model-agnostic</span>
          <span className="flex items-center gap-2"><Cloud className="w-4 h-4 text-text-tertiary" strokeWidth={1.5} /> Multi-cloud / on-prem / BYO</span>
          <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-text-tertiary" strokeWidth={1.5} /> Your data stays yours</span>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { agent: "Strategy", color: "#4A6CF7", icon: TrendingUp, desc: "Business strategies, GTM plans, competitive analysis, decision support", keywords: ["strategy", "GTM", "growth"] },
  { agent: "Data Analyst", color: "#0FC4A7", icon: BarChart2, desc: "Statistical analysis, pattern detection, chart generation from your data", keywords: ["analyze", "trends", "visualize"] },
  { agent: "Search", color: "#9B72F7", icon: Search, desc: "Semantic search across internal documents, policies, reports", keywords: ["find", "policy", "document"] },
  { agent: "Research", color: "#F7924A", icon: Globe, desc: "External market research, competitor benchmarking, industry trends", keywords: ["market", "benchmark", "competitor"] },
];

function Features() {
  return (
    <section id="features" className="py-20 px-6" style={{ background: "#F0F2FA" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <div className="text-[11px] font-semibold text-primary tracking-[0.1em] mb-3">WHAT ESA CAN DO</div>
          <h2 className="text-[36px] font-bold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>
            One query. Four agents. Infinite insight.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.agent} className="group bg-surface border border-border rounded-2xl p-7 shadow-l1 hover:-translate-y-1 transition-all duration-200 hover:shadow-l2"
                   style={{ borderLeftWidth: 2, borderLeftColor: "transparent" }}
                   onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = f.color)}
                   onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "transparent")}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: f.color + "1A" }}>
                  <Icon className="w-5 h-5" style={{ color: f.color }} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-text-primary">{f.agent} Agent</h3>
                <p className="mt-2 text-[14px] text-text-secondary leading-[1.6]">{f.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.keywords.map((k) => (
                    <span key={k} className="px-2.5 py-1 rounded-md text-[12px] text-text-tertiary"
                          style={{ background: "#F0F2FA", border: "0.5px solid #D6DCF0" }}>{k}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "Starter", price: { INR: "₹2,999", USD: "$35" }, popular: false,
    features: [["Up to 100 queries/mo", true],["2 data sources", true],["1 user seat", true],["PDF export", true],["Custom LLM", false],["Audit logs", false],["SSO", false]],
    cta: "Start Free Trial",
  },
  {
    name: "Growth", price: { INR: "₹9,999", USD: "$119" }, popular: true,
    features: [["Unlimited queries", true],["10 data sources", true],["10 user seats", true],["PDF / PPT / CSV export", true],["Custom LLM keys", true],["Audit logs", true],["SSO (Google, Microsoft)", false]],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise", price: { INR: "Custom", USD: "Custom" }, popular: false,
    features: [["Unlimited everything", true],["Unlimited sources & seats", true],["SAML / Okta SSO", true],["On-prem / private cloud", true],["Dedicated CSM", true],["Custom SLAs", true],["Priority support", true]],
    cta: "Contact Sales",
  },
];

function Pricing() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [annual, setAnnual] = useState(false);
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-8">
          <div className="text-[11px] font-semibold text-primary tracking-[0.1em] mb-3">PRICING</div>
          <h2 className="text-[36px] font-bold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>Simple, transparent pricing</h2>
        </div>
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="inline-flex rounded-full p-1" style={{ background: "#F0F2FA", border: "0.5px solid #D6DCF0" }}>
            {(["INR","USD"] as const).map((c) => (
              <button key={c} onClick={() => setCurrency(c)} className={`px-4 py-1.5 rounded-full text-[13px] ${currency===c?"bg-surface text-text-primary border border-primary":"text-text-tertiary"}`}>
                {c === "INR" ? "₹ INR" : "$ USD"}
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-full p-1 items-center" style={{ background: "#F0F2FA", border: "0.5px solid #D6DCF0" }}>
            {(["Monthly","Annual"] as const).map((b) => (
              <button key={b} onClick={() => setAnnual(b==="Annual")} className={`px-4 py-1.5 rounded-full text-[13px] ${(b==="Annual")===annual?"bg-surface text-text-primary border border-primary":"text-text-tertiary"}`}>
                {b} {b === "Annual" && <span className="ml-1 text-[10px] text-success font-semibold">−20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((p) => (
            <div key={p.name} className="relative bg-surface rounded-2xl p-8 shadow-l1 hover:-translate-y-1 transition-all"
                 style={{ border: p.popular ? "1.5px solid #4F6EF7" : "0.5px solid #D6DCF0" }}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-[13px] font-semibold text-text-secondary tracking-[0.08em] uppercase">{p.name}</div>
              <div className="mt-3 text-[40px] font-bold text-text-primary leading-none" style={{ fontFamily: "var(--font-display)" }}>
                {p.price[currency]}
                {p.price[currency] !== "Custom" && <span className="text-[14px] font-normal text-text-tertiary">/mo</span>}
              </div>
              <div className="text-[12px] text-text-tertiary mt-1">billed {annual?"annually":"monthly"}</div>
              <button className={`mt-6 w-full h-11 rounded-md font-medium text-[14px] ${p.cta==="Contact Sales"?"border border-border text-text-primary hover:bg-secondary":"bg-primary text-white hover:bg-primary-hover"}`}>
                {p.cta}
              </button>
              <div className="h-px bg-border my-6" />
              <ul className="space-y-3">
                {p.features.map(([label, ok], i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px]">
                    {ok ? <Check className="w-4 h-4 text-success shrink-0 mt-0.5" /> : <X className="w-4 h-4 text-text-tertiary shrink-0 mt-0.5" />}
                    <span className={ok ? "text-text-secondary" : "text-text-tertiary line-through"}>{label as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl px-8 py-5 text-center text-[14px] text-text-primary"
             style={{ background: "rgba(79,110,247,0.07)", border: "0.5px solid rgba(79,110,247,0.2)" }}>
          🎉 Start with a 14-day free trial of the Growth plan — no credit card required.{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Get Started Free →</Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border" style={{ background: "#F0F2FA" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-[13px] text-text-secondary">
        <div>
          <EsaLogo />
          <p className="mt-3">AI-first enterprise intelligence for modern teams.</p>
        </div>
        <div>
          <div className="text-text-primary font-semibold mb-3">Product</div>
          <ul className="space-y-2"><li>Features</li><li>Pricing</li><li>Docs</li><li>Changelog</li></ul>
        </div>
        <div>
          <div className="text-text-primary font-semibold mb-3">Company</div>
          <ul className="space-y-2"><li>About</li><li>Blog</li><li>Careers</li></ul>
        </div>
        <div>
          <div className="text-text-primary font-semibold mb-3">Legal</div>
          <ul className="space-y-2"><li>Terms</li><li>Privacy</li><li>Security</li></ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border text-[12px] text-text-tertiary">© 2026 ESA. All rights reserved.</div>
    </footer>
  );
}

function Landing() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </>
  );
}
