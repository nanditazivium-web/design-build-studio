import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Paperclip, FileText, Mic, Send, RotateCcw, Download } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AgentBadge } from "@/components/EsaLogo";
import { MOCK_RECENT, SUGGESTED_PROMPTS, MOCK_USER } from "@/lib/mockData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ESA" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [query, setQuery] = useState("");
  return (
    <DashboardLayout title="Dashboard">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-[28px] font-semibold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>
            Welcome back, {MOCK_USER.name.split(" ")[0]}
          </h2>
          <p className="text-[14px] text-text-secondary mt-1">What should we work on today?</p>
        </div>

        {/* Query box */}
        <div className="bg-surface rounded-2xl p-5 border border-border-strong"
             style={{ boxShadow: "0 2px 16px rgba(79,110,247,0.07)" }}>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask ESA anything about your business..."
            className="w-full resize-none bg-transparent border-0 outline-none text-[15px] text-text-primary placeholder:text-text-tertiary min-h-[56px]"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-text-tertiary">
              <button className="p-2 hover:bg-secondary rounded-md"><Paperclip className="w-5 h-5" strokeWidth={1.5} /></button>
              <button className="p-2 hover:bg-secondary rounded-md"><FileText className="w-5 h-5" strokeWidth={1.5} /></button>
              <button className="p-2 hover:bg-secondary rounded-md"><Mic className="w-5 h-5" strokeWidth={1.5} /></button>
            </div>
            <Link to="/chat" className="w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center disabled:opacity-30">
              <Send className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Suggested prompts */}
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.slice(0, 4).map((p) => (
            <button key={p} onClick={() => setQuery(p)}
                    className="px-3.5 py-1.5 rounded-full bg-surface border border-border-strong text-[13px] text-text-secondary hover:text-text-primary hover:border-primary transition-all shadow-l1 hover:-translate-y-0.5">
              {p}
            </button>
          ))}
        </div>

        {/* Recent */}
        <div className="mt-10">
          <h3 className="text-[13px] font-semibold text-text-secondary mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {MOCK_RECENT.map((s) => (
              <div key={s.id} className="bg-surface border border-border rounded-xl p-4 hover:-translate-y-0.5 transition-all hover:shadow-l2"
                   style={{ borderColor: "#E4E8F4" }}>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[14px] text-text-primary truncate flex-1">{s.title}</p>
                  <span className="text-[12px] text-text-tertiary shrink-0">{s.time}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {s.agents.map((a) => <AgentBadge key={a} agent={a} />)}
                </div>
                <div className="mt-3 flex gap-4 text-[12px] text-text-secondary">
                  <button className="flex items-center gap-1 hover:text-text-primary"><RotateCcw className="w-3.5 h-3.5" /> Re-run</button>
                  <button className="flex items-center gap-1 hover:text-text-primary"><Download className="w-3.5 h-3.5" /> Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
