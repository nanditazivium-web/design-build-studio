import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Paperclip, FileText, Mic, Send, Plus, Search, GitBranch, ChevronUp, ChevronDown,
  Download, Maximize2, Pen, Eye, ExternalLink,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AgentBadge, AgentDot, EsaLogo } from "@/components/EsaLogo";
import {
  MOCK_SESSIONS, SUGGESTED_PROMPTS, MOCK_CHART_REVENUE, MOCK_COMPETITORS, AGENT_META, type AgentKey, MOCK_USER,
} from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chat — ESA" }] }),
  component: ChatPage,
});

function ChatPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(MOCK_SESSIONS[0].id);

  const grouped: Record<string, typeof MOCK_SESSIONS> = {};
  MOCK_SESSIONS.forEach((s) => { (grouped[s.group] ||= []).push(s); });

  return (
    <DashboardLayout title="AI Chat" hideRight>
      <div className="flex h-full">
        {/* Chat history */}
        <aside className="w-[260px] bg-surface border-r border-border flex flex-col shrink-0">
          <div className="p-3 space-y-2 border-b border-border">
            <button className="w-full h-9 rounded-md bg-secondary hover:bg-surface-hover border border-border-strong flex items-center justify-center gap-2 text-[13px] font-medium text-text-primary">
              <Plus className="w-3.5 h-3.5" /> New Chat
            </button>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-tertiary" />
              <input placeholder="Search chats..." className="w-full h-8 pl-8 pr-3 rounded-md bg-background border border-border text-[13px] focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
            {Object.entries(grouped).map(([group, sessions]) => (
              <div key={group} className="mb-3">
                <div className="px-2 py-1.5 text-[11px] text-text-tertiary uppercase tracking-wider">{group}</div>
                {sessions.map((s) => (
                  <button key={s.id} onClick={() => setActive(s.id)} className={cn(
                    "w-full text-left rounded-md p-2 hover:bg-secondary relative",
                    active === s.id && "bg-primary/8",
                  )} style={active === s.id ? { background: "rgba(79,110,247,0.08)" } : undefined}>
                    {active === s.id && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-primary rounded-r" />}
                    <div className="text-[13px] text-text-primary truncate">{s.title}</div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[11px] text-text-tertiary">{s.time}</span>
                      <div className="flex gap-1">
                        {s.agents.map((a) => <AgentDot key={a} agent={a} />)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* User msg */}
              <div className="flex justify-end">
                <div className="bg-primary text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] text-[14px]">
                  Analyze our Q3 revenue performance and forecast Q4 based on current trends.
                </div>
              </div>

              {/* ESA response */}
              <div className="flex gap-3">
                <EsaLogo size={28} withWord={false} />
                <div className="flex-1 space-y-4">
                  <div className="text-[14px] text-text-primary leading-[1.65]">
                    Based on your uploaded Q3 data and historical patterns, here is the full analysis. September exceeded target by 5.8% — driven by enterprise tier upgrades. Q4 projection suggests 12-18% growth if current momentum holds.
                  </div>

                  <AgentOrchestration agents={["strategy","data"]} />
                  <ChartCard />
                  <StrategyCard />
                  <CompetitiveMatrix />
                  <DocumentExcerpt />
                </div>
              </div>
            </div>
          </div>

          {/* Fixed input bar */}
          <div className="border-t border-border bg-background/80 backdrop-blur px-6 py-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-surface rounded-2xl p-4 border border-border-strong shadow-l1">
                <textarea value={query} onChange={(e) => setQuery(e.target.value)}
                          placeholder="Continue the conversation..."
                          className="w-full resize-none bg-transparent border-0 outline-none text-[15px] text-text-primary placeholder:text-text-tertiary min-h-[40px]" />
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1 text-text-tertiary">
                    <button className="p-1.5 hover:bg-secondary rounded-md"><Paperclip className="w-4 h-4" strokeWidth={1.5} /></button>
                    <button className="p-1.5 hover:bg-secondary rounded-md"><FileText className="w-4 h-4" strokeWidth={1.5} /></button>
                    <button className="p-1.5 hover:bg-secondary rounded-md"><Mic className="w-4 h-4" strokeWidth={1.5} /></button>
                  </div>
                  <button className="w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.slice(0, 3).map((p) => (
                  <button key={p} onClick={() => setQuery(p)} className="px-3 py-1 rounded-full bg-surface border border-border text-[12px] text-text-secondary hover:text-text-primary hover:border-primary">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AgentOrchestration({ agents }: { agents: AgentKey[] }) {
  const [open, setOpen] = useState(true);
  const all = Object.keys(AGENT_META) as AgentKey[];
  return (
    <div className="bg-surface border border-border-strong rounded-xl p-4 shadow-l1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="w-3.5 h-3.5 text-text-tertiary" />
          <span className="text-[13px] font-semibold text-text-primary">Agent Orchestration</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-text-tertiary" style={{ fontFamily: "var(--font-mono)" }}>Total: 3.4s</span>
          <button onClick={() => setOpen(!open)} className="text-text-tertiary hover:text-text-primary">
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {open && (
        <>
          <svg viewBox="0 0 400 120" className="w-full h-[120px] mt-3">
            <circle cx="40" cy="60" r="20" fill="#F0F2FA" stroke="#D6DCF0" />
            <text x="40" y="64" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4B526B">Q</text>
            {all.map((a, i) => {
              const meta = AGENT_META[a];
              const isActive = agents.includes(a);
              const cy = 20 + i * 27;
              return (
                <g key={a}>
                  <path d={`M 60 60 Q 200 60 360 ${cy}`} fill="none"
                        stroke={isActive ? meta.color : "#D6DCF0"} strokeWidth={isActive ? 1.5 : 1}
                        strokeDasharray={isActive ? "6 4" : "2 4"}
                        className={isActive ? "dash-flow" : ""}
                        opacity={isActive ? 0.7 : 0.4} />
                  <circle cx="360" cy={cy} r="14" fill={isActive ? meta.color : "#F7F8FC"} stroke={isActive ? meta.color : "#E4E8F4"} />
                  <text x="360" y={cy + 3} textAnchor="middle" fontSize="10" fill={isActive ? "white" : "#8A93B0"} fontWeight="600">
                    {meta.name[0]}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="mt-2 space-y-1.5">
            {all.map((a) => {
              const meta = AGENT_META[a];
              const used = agents.includes(a);
              return (
                <div key={a} className="flex items-center gap-2.5 text-[12px]">
                  <AgentDot agent={a} active={used} />
                  <span className="font-semibold text-text-primary w-[110px]">{meta.name} Agent</span>
                  {used ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full text-white" style={{ background: meta.color }}>Used</span>
                  ) : (
                    <span className="text-text-tertiary">Not used</span>
                  )}
                  <span className="text-text-tertiary flex-1">{used ? `Generated ${meta.name.toLowerCase()} insights` : "Not needed"}</span>
                  <span className="text-text-tertiary text-[11px]" style={{ fontFamily: "var(--font-mono)" }}>{used ? "1.2s" : "—"}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function ChartCard() {
  return (
    <div className="bg-surface border border-border-strong rounded-xl p-5 shadow-l1">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[14px] font-semibold text-text-primary">Q3 Monthly Revenue (₹ Lakhs)</h4>
        <div className="flex items-center gap-1 text-text-tertiary">
          <button className="p-1.5 hover:bg-secondary rounded"><Maximize2 className="w-3.5 h-3.5" /></button>
          <button className="p-1.5 hover:bg-secondary rounded"><Download className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer>
          <BarChart data={MOCK_CHART_REVENUE}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E8F4" />
            <XAxis dataKey="month" stroke="#8A93B0" fontSize={12} />
            <YAxis stroke="#8A93B0" fontSize={12} />
            <Tooltip contentStyle={{ background: "#fff", border: "0.5px solid #D6DCF0", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
              {MOCK_CHART_REVENUE.map((_, i) => <Cell key={i} fill="#4F6EF7" />)}
            </Bar>
            <Bar dataKey="target" fill="#0FC4A7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-[12px] text-text-secondary italic">September exceeded target by 5.8% — driven by enterprise tier upgrades.</p>
    </div>
  );
}

function StrategyCard() {
  const sections = ["Situation", "Objectives", "Strategy", "Tactics", "KPIs", "Risks"];
  const [openSec, setOpenSec] = useState<string | null>("Situation");
  return (
    <div className="bg-surface border border-border-strong rounded-xl p-6 shadow-l1">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[14px] font-semibold" style={{ color: AGENT_META.strategy.color }}>Strategy Recommendations</h4>
        <Pen className="w-3.5 h-3.5 text-text-tertiary" />
      </div>
      <div className="space-y-1">
        {sections.map((s) => (
          <div key={s} className="border-b border-border last:border-0">
            <button onClick={() => setOpenSec(openSec === s ? null : s)}
                    className="w-full flex items-center justify-between py-2.5 text-[13px] font-semibold text-text-primary"
                    style={openSec === s ? { borderLeft: "2px solid rgba(74,108,247,0.5)", paddingLeft: 12 } : undefined}>
              {s}
              <ChevronDown className={cn("w-4 h-4 transition-transform", openSec === s && "rotate-180")} />
            </button>
            {openSec === s && (
              <div className="pb-3 pl-3 text-[13px] text-text-secondary leading-[1.65]">
                Q3 closed 8% above plan led by enterprise upsell. Pipeline coverage for Q4 currently 2.3x — sufficient for the proposed 12% YoY uplift target.
              </div>
            )}
          </div>
        ))}
      </div>

      <h5 className="mt-5 text-[13px] font-semibold text-text-primary mb-2">Action Plan</h5>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-secondary text-[12px] text-text-secondary text-left">
              {["Step", "Owner", "Timeline", "Priority", "Status"].map((h) => (
                <th key={h} className="px-3 py-2.5 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Validate Q4 pipeline coverage", "Priya", "Week 1", "High", "In progress"],
              ["Launch enterprise upsell play", "Arjun", "Week 2", "High", "Planned"],
              ["Refresh competitive deck", "Meera", "Week 3", "Medium", "Planned"],
            ].map((row, i) => (
              <tr key={i} className="border-t border-border">
                {row.map((c, j) => (
                  <td key={j} className="px-3 py-2.5 text-text-primary">
                    {j === 3 ? (
                      <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium",
                        c === "High" ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning")}>{c}</span>
                    ) : c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompetitiveMatrix() {
  return (
    <div className="bg-surface border border-border-strong rounded-xl shadow-l1 overflow-hidden">
      <div className="px-5 py-3 border-b border-border">
        <h4 className="text-[14px] font-semibold text-text-primary">Competitive Matrix — CRM</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-secondary text-[12px] text-text-secondary text-left">
              {["Vendor", "Price/mo", "Users", "API", "SSO", "NPS"].map((h) => (
                <th key={h} className="px-3 py-2.5 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_COMPETITORS.map((c) => (
              <tr key={c.name} className="border-t border-border" style={c.isYou ? { background: "rgba(79,110,247,0.04)" } : undefined}>
                <td className="px-3 py-2.5 font-semibold text-text-primary">{c.name}</td>
                <td className="px-3 py-2.5 text-text-primary">{c.price}</td>
                <td className="px-3 py-2.5 text-text-primary">{c.users}</td>
                <td className="px-3 py-2.5">{c.api ? "✓" : "—"}</td>
                <td className="px-3 py-2.5">{c.sso ? "✓" : "—"}</td>
                <td className="px-3 py-2.5 text-text-primary">{c.nps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DocumentExcerpt() {
  return (
    <div className="bg-surface border border-border-strong rounded-xl p-5 shadow-l1">
      <div className="flex items-center justify-between text-[12px] text-text-tertiary">
        <div className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> HR Policy Drive</div>
        <span className="text-success font-medium">94% match</span>
      </div>
      <h4 className="mt-2 text-[15px] font-semibold text-text-primary">Remote Work Leave Policy v3.2</h4>
      <p className="mt-2 text-[13px] text-text-secondary leading-[1.65]">
        Employees in <mark style={{ background: "rgba(79,110,247,0.18)", borderRadius: 2, padding: "0 2px" }}>Tier 2 cities</mark> are entitled to 24 paid leaves per calendar year, plus 12 sick leaves. Remote work is allowed for up to 60% of work days...
      </p>
      <div className="mt-3 flex gap-2">
        <button className="text-[12px] text-text-secondary hover:text-text-primary flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> Preview</button>
        <button className="text-[12px] text-text-secondary hover:text-text-primary flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Download</button>
        <button className="text-[12px] text-text-secondary hover:text-text-primary flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> Open</button>
      </div>
    </div>
  );
}

// Suppress unused
void MOCK_USER;
