import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, UserMinus, MoreHorizontal } from "lucide-react";
import { MOCK_TEAM } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Team — ESA" }] }),
  component: Team,
});

const TABS = ["Members", "Teams", "Pending Invites"];

function Team() {
  const [tab, setTab] = useState("Members");
  return (
    <DashboardLayout title="Team">
      <div className="p-6 max-w-6xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-6 border-b border-border">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn(
                "pb-3 text-[14px] border-b-2 -mb-px",
                tab === t ? "text-text-primary border-primary" : "text-text-tertiary border-transparent hover:text-text-primary"
              )}>{t}</button>
            ))}
          </div>
          <button className="h-9 px-4 rounded-md bg-primary text-white text-[13px] font-medium flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Invite Member
          </button>
        </div>

        {tab === "Members" && (
          <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-l1">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-secondary text-[12px] text-text-secondary text-left">
                  {["Member", "Role", "Team", "Last Active", "Status", ""].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {MOCK_TEAM.map((m) => (
                  <tr key={m.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-semibold" style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>{m.initials}</div>
                        <div>
                          <div className="text-text-primary">{m.name}</div>
                          <div className="text-[11px] text-text-tertiary">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select defaultValue={m.role} className="bg-secondary border border-border rounded-md px-2 py-1 text-[12px]">
                        <option>Super Admin</option><option>Admin</option><option>Analyst</option><option>Researcher</option><option>Viewer</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{m.team}</td>
                    <td className="px-4 py-3 text-text-tertiary">{m.lastActive}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium",
                        m.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning")}>{m.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 text-text-tertiary">
                        <button className="p-1.5 hover:bg-secondary rounded"><UserMinus className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 hover:bg-secondary rounded"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Teams" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Strategy", "Analytics", "Market Intel"].map((name, i) => (
              <div key={name} className="bg-surface border border-border-strong rounded-xl p-5 shadow-l1 hover:-translate-y-0.5 transition-all">
                <div className="text-[15px] font-semibold text-text-primary">{name}</div>
                <div className="text-[12px] text-text-tertiary mt-1">{[3,4,2][i]} members</div>
                <div className="flex -space-x-2 mt-3">
                  {MOCK_TEAM.slice(0, [3,4,2][i]).map((m) => (
                    <div key={m.id} className="w-7 h-7 rounded-full border-2 border-white text-white text-[10px] font-semibold flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4F6EF7,#9B72F7)" }}>{m.initials}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Pending Invites" && (
          <div className="bg-surface border border-border rounded-xl p-6 text-[13px] text-text-secondary shadow-l1">
            1 pending invite — Karan Bose (Analyst). Sent yesterday.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
