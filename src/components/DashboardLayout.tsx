import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, MessageSquare, BarChart2, Database, FileText, Users,
  Settings, CreditCard, ClipboardList, Bell, Search, ChevronDown,
  PanelLeftClose, PanelRightClose, PanelLeftOpen, PanelRightOpen,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { EsaLogo, AgentDot } from "./EsaLogo";
import { MOCK_USER, MOCK_DATA_SOURCES, MOCK_METRICS, AGENT_META, type AgentKey } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/chat", label: "AI Chat", icon: MessageSquare },
  { to: "/analytics", label: "Analytics", icon: BarChart2 },
  { to: "/data", label: "Data Sources", icon: Database },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/search", label: "Search", icon: Search },
  { to: "/team", label: "Team", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/billing", label: "Billing", icon: CreditCard },
  { to: "/audit", label: "Audit Logs", icon: ClipboardList },
];

export function DashboardLayout({
  title, children, right, hideRight = false,
}: {
  title: string;
  children: ReactNode;
  right?: ReactNode;
  hideRight?: boolean;
}) {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightOpen, setRightOpen] = useState(!hideRight);
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDEBAR */}
      <aside
        className="bg-surface border-r border-border flex flex-col shrink-0 transition-[width] duration-300"
        style={{ width: leftCollapsed ? 64 : 240 }}
      >
        <div className="px-4 pt-5 pb-3">
          <EsaLogo withWord={!leftCollapsed} />
          {!leftCollapsed && (
            <button className="mt-3 flex items-center gap-1 text-[12px] text-text-secondary hover:text-text-primary">
              {MOCK_USER.workspace} <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="h-px bg-border" />
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin">
          {NAV.map((item) => {
            const active = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2.5 h-9 rounded-md px-3 text-[14px] transition-colors relative",
                  active
                    ? "text-primary font-medium"
                    : "text-text-secondary hover:bg-secondary hover:text-text-primary",
                )}
                style={active ? { background: "rgba(79,110,247,0.08)" } : undefined}
                title={leftCollapsed ? item.label : undefined}
              >
                {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-primary" />}
                <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                {!leftCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="h-px bg-border" />
        <div className="p-3 flex items-center gap-2">
          <Link to="/profile" className="flex items-center gap-2 flex-1 min-w-0 group">
            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-[12px] font-semibold"
                 style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>
              {MOCK_USER.initials}
            </div>
            {!leftCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-[13px] text-text-primary truncate group-hover:text-primary">{MOCK_USER.name}</div>
                <div className="text-[11px] text-text-tertiary truncate">{MOCK_USER.role}</div>
              </div>
            )}
          </Link>
          <button
            className="text-text-tertiary hover:text-text-primary p-1"
            onClick={() => setLeftCollapsed((v) => !v)}
            aria-label="Toggle sidebar"
          >
            {leftCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="h-14 border-b border-border flex items-center justify-between px-6 sticky top-0 z-20"
             style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
          <h1 className="text-[16px] font-semibold text-text-primary">{title}</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-secondary rounded-md text-text-secondary"><Search className="w-5 h-5" strokeWidth={1.5} /></button>
            <button className="p-2 hover:bg-secondary rounded-md text-text-secondary relative">
              <Bell className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
            </button>
            <Link to="/profile" className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-semibold"
                  style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>
              {MOCK_USER.initials}
            </Link>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>

      {/* RIGHT PANEL */}
      {!hideRight && rightOpen && (
        <aside className="w-[260px] shrink-0 bg-surface border-l border-border flex flex-col">
          <div className="h-10 px-4 flex items-center justify-between border-b border-border">
            <span className="text-[13px] font-semibold text-text-primary">Workspace</span>
            <button onClick={() => setRightOpen(false)} className="text-text-tertiary hover:text-text-primary">
              <PanelRightClose className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
            {right ?? <DefaultRightPanel />}
          </div>
        </aside>
      )}
      {!hideRight && !rightOpen && (
        <button
          onClick={() => setRightOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 w-4 h-12 bg-surface border border-border rounded-l-md shadow-l1 flex items-center justify-center text-text-tertiary z-10"
          aria-label="Open panel"
        >
          <PanelRightOpen className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

function DefaultRightPanel() {
  return (
    <>
      <section>
        <h3 className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-3">Agents</h3>
        <div className="space-y-2">
          {(Object.keys(AGENT_META) as AgentKey[]).map((k, i) => (
            <div key={k} className="flex items-center gap-2.5 h-7">
              <AgentDot agent={k} active={i < 2} />
              <span className="text-[13px] text-text-primary flex-1">{AGENT_META[k].name}</span>
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full",
                i < 2 ? "text-white" : "text-text-tertiary bg-secondary"
              )} style={i < 2 ? { background: AGENT_META[k].color } : undefined}>
                {i < 2 ? "Active" : "Ready"}
              </span>
            </div>
          ))}
        </div>
      </section>
      <div className="h-px bg-border" />
      <section>
        <h3 className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-3">Data Sources</h3>
        <div className="space-y-1.5">
          {MOCK_DATA_SOURCES.slice(0, 5).map((s) => (
            <div key={s.id} className="flex items-center gap-2 text-[13px]">
              <Database className="w-3.5 h-3.5 text-text-tertiary shrink-0" strokeWidth={1.5} />
              <span className="text-text-primary truncate flex-1">{s.name}</span>
              <span className={cn(
                "w-1.5 h-1.5 rounded-full shrink-0",
                s.status === "Active" ? "bg-success" : s.status === "Syncing" ? "bg-warning" : "bg-danger"
              )} />
            </div>
          ))}
          <Link to="/data" className="block text-[12px] text-primary mt-2 hover:underline">+ Add Source</Link>
        </div>
      </section>
      <div className="h-px bg-border" />
      <section>
        <h3 className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-3">Today</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Queries", value: MOCK_METRICS.today.queries },
            { label: "Reports", value: MOCK_METRICS.today.reports },
            { label: "Agents", value: MOCK_METRICS.today.agents },
            { label: "Avg Resp", value: MOCK_METRICS.today.avg },
          ].map((m) => (
            <div key={m.label} className="rounded-[10px] p-3 bg-secondary border border-border">
              <div className="text-[11px] text-text-tertiary">{m.label}</div>
              <div className="text-[20px] font-bold text-text-primary leading-tight" style={{ fontFamily: "var(--font-display)" }}>{m.value}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// Imported by Database icon usage above
import { Database as _Db } from "lucide-react";
void _Db;

import { cn as _cn } from "@/lib/utils";
void _cn;
