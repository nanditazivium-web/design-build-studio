import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Search as SearchIcon, FileText, Eye, Download, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — ESA" }] }),
  component: SearchPage,
});

const RESULTS = [
  { title: "Remote Work Leave Policy v3.2", source: "HR Drive", score: 94, excerpt: "Employees in Tier 2 cities are entitled to 24 paid leaves per year plus 12 sick leaves..." },
  { title: "Q3 Pricing Review — APAC", source: "Strategy Folder", score: 88, excerpt: "Recommended pricing adjustments for the APAC region following competitive analysis..." },
  { title: "Customer NPS Q1 2026", source: "Analytics DW", score: 82, excerpt: "NPS climbed from 41 to 54 driven by improved onboarding and faster support resolution..." },
  { title: "Vendor Compliance Checklist", source: "Legal Drive", score: 76, excerpt: "All vendor agreements must include SOC2 attestation, DPA, and named DPO contact details..." },
];

function SearchPage() {
  return (
    <DashboardLayout title="Enterprise Search">
      <div className="p-6 max-w-5xl mx-auto space-y-5">
        <div className="relative">
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
          <input placeholder="Search across all your data..."
                 className="w-full h-[52px] pl-12 pr-16 rounded-2xl bg-surface border border-border-strong text-[15px] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-l1" />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[11px] text-text-tertiary px-1.5 py-0.5 rounded border border-border">⌘K</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {["All sources","All types","Any date","All teams"].map((f) => (
            <button key={f} className="h-8 px-3 rounded-md bg-surface border border-border text-[12px] text-text-secondary hover:border-primary">{f} ▾</button>
          ))}
        </div>

        <div className="space-y-3">
          {RESULTS.map((r) => (
            <div key={r.title} className="bg-surface border border-border rounded-xl p-5 shadow-l1 hover:-translate-y-0.5 transition-all hover:shadow-l2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-text-tertiary"><FileText className="w-3.5 h-3.5" /> {r.source}</div>
                <span className="text-success font-semibold">{r.score}%</span>
              </div>
              <h3 className="text-[15px] font-semibold text-text-primary mt-1.5">{r.title}</h3>
              <p className="text-[13px] text-text-secondary mt-1 leading-[1.6]">{r.excerpt}</p>
              <div className="mt-3 flex gap-3 text-[12px] text-text-secondary">
                <button className="flex items-center gap-1 hover:text-text-primary"><Eye className="w-3.5 h-3.5" /> Preview</button>
                <button className="flex items-center gap-1 hover:text-text-primary"><Download className="w-3.5 h-3.5" /> Download</button>
                <button className="flex items-center gap-1 hover:text-text-primary"><ExternalLink className="w-3.5 h-3.5" /> Open</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
