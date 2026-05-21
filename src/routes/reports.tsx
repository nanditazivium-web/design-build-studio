import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Search, Download, Link2 } from "lucide-react";
import { AgentBadge } from "@/components/EsaLogo";
import { MOCK_REPORTS } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — ESA" }] }),
  component: Reports,
});

function Reports() {
  return (
    <DashboardLayout title="Reports">
      <div className="p-6 max-w-6xl mx-auto space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input placeholder="Search reports..." className="w-full h-10 pl-10 pr-3 rounded-md bg-surface border border-border-strong text-[14px] focus:outline-none focus:border-primary" />
          </div>
          <select className="h-10 px-3 rounded-md bg-surface border border-border-strong text-[13px]">
            <option>All types</option><option>PDF</option><option>PPT</option><option>CSV</option><option>PNG</option>
          </select>
          <input type="date" className="h-10 px-3 rounded-md bg-surface border border-border-strong text-[13px]" />
        </div>

        <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-l1">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-secondary text-[12px] text-text-secondary text-left">
                {["Title", "Generated", "Type", "Agents", "Download", "Share"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_REPORTS.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-secondary/50">
                  <td className="px-4 py-3 text-text-primary font-medium">{r.title}</td>
                  <td className="px-4 py-3 text-text-tertiary">{r.time}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-[11px] px-2 py-0.5 rounded-full font-semibold",
                      r.type === "PDF" && "bg-danger/10 text-danger",
                      r.type === "PPT" && "bg-warning/10 text-warning",
                      r.type === "CSV" && "bg-success/10 text-success",
                    )}>{r.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">{r.agents.map((a) => <AgentBadge key={a} agent={a} />)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-primary text-[12px] hover:underline"><Download className="w-3.5 h-3.5" /> {r.type}</button>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-text-tertiary hover:text-text-primary"><Link2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
