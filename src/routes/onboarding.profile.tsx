import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Camera, Lock, Info } from "lucide-react";
import { OnboardingSteps } from "@/components/OnboardingSteps";

export const Route = createFileRoute("/onboarding/profile")({
  head: () => ({ meta: [{ title: "Create your profile — ESA" }] }),
  component: ProfilePage,
});

function Field({ label, required, locked, children }: { label: string; required?: boolean; locked?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[13px] font-medium text-text-primary mb-1.5">
        {label} {required && <span className="text-danger">*</span>}
        <Info className="w-3.5 h-3.5 text-text-tertiary" />
        {locked && <Lock className="w-3 h-3 text-text-tertiary ml-auto" />}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full h-10 px-3.5 rounded-md bg-surface border border-border-strong text-[14px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10";

function ProfilePage() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <OnboardingSteps active={1} />
      <div className="w-[520px] bg-surface rounded-[20px] border border-border-strong shadow-l3 p-12">
        <h1 className="text-[22px] font-semibold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>Create your profile</h1>
        <p className="text-[14px] text-text-secondary mt-1 mb-7">Tell us about you — takes 60 seconds</p>

        <div className="flex justify-center mb-6">
          <button className="w-[72px] h-[72px] rounded-full border border-dashed border-border-strong flex flex-col items-center justify-center text-text-tertiary hover:bg-secondary">
            <Camera className="w-5 h-5" />
            <span className="text-[10px] mt-1">Add photo</span>
          </button>
        </div>

        <div className="space-y-4">
          <Field label="Full Name" required locked><input className={inputClass} defaultValue="Arjun Mehta" /></Field>
          <Field label="Organization" required locked><input className={inputClass} defaultValue="Acme Corp" /></Field>
          <Field label="Role / Designation" required>
            <select className={inputClass}><option>VP of Strategy</option><option>CEO</option><option>Director</option><option>Manager</option><option>Analyst</option><option>Other</option></select>
          </Field>
          <Field label="Industry" required>
            <select className={inputClass}><option>SaaS</option><option>BFSI</option><option>Manufacturing</option><option>Healthcare</option><option>Retail</option></select>
          </Field>
          <Field label="Country" required><input className={inputClass} defaultValue="India" /></Field>
          <Field label="Workspace Name" required>
            <input className={inputClass} defaultValue="Acme Strategy Hub" />
            <p className="text-[12px] text-text-tertiary mt-1">This is your team workspace name</p>
          </Field>
        </div>

        <p className="text-[12px] text-text-tertiary mt-4">* Required fields</p>
        <button onClick={() => nav({ to: "/onboarding/workspace" })} className="mt-6 w-full h-11 rounded-md bg-primary text-white font-medium text-[14px] hover:bg-primary-hover">
          Create Profile →
        </button>
        <Link to="/login" className="block text-center mt-4 text-[13px] text-text-secondary hover:text-text-primary">← Back to login</Link>
      </div>
    </div>
  );
}
