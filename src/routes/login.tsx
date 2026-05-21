import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { EsaLogo } from "@/components/EsaLogo";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — ESA" }, { name: "description", content: "Sign in to your ESA workspace." }] }),
  component: Login,
});

function Login() {
  const [agreed, setAgreed] = useState(true);
  const [error] = useState(false);
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-[440px] bg-surface rounded-[20px] border border-border-strong shadow-l3 p-12">
        <div className="flex justify-center mb-8"><EsaLogo size={36} /></div>
        <h1 className="text-center text-[24px] font-semibold text-text-primary" style={{ fontFamily: "var(--font-display)" }}>Welcome back</h1>
        <p className="text-center text-[14px] text-text-secondary mt-2 mb-8">Sign in to your workspace</p>

        <button disabled={!agreed} onClick={() => nav({ to: "/dashboard" })}
                className="w-full h-11 rounded-md border border-border-strong bg-background hover:bg-secondary flex items-center justify-center gap-3 text-[14px] font-medium text-text-primary disabled:opacity-50 disabled:cursor-not-allowed">
          <svg width="18" height="18" viewBox="0 0 23 23"><path fill="#f25022" d="M0 0h11v11H0z"/><path fill="#7fba00" d="M12 0h11v11H12z"/><path fill="#00a4ef" d="M0 12h11v11H0z"/><path fill="#ffb900" d="M12 12h11v11H12z"/></svg>
          Continue with Microsoft
        </button>
        <button disabled={!agreed} onClick={() => nav({ to: "/dashboard" })}
                className="mt-2.5 w-full h-11 rounded-md border border-border-strong bg-background hover:bg-secondary flex items-center justify-center gap-3 text-[14px] font-medium text-text-primary disabled:opacity-50 disabled:cursor-not-allowed">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-[13px] text-text-tertiary">
          <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
        </div>

        <button className="block w-full text-center text-[13px] text-primary hover:underline">
          Sign in via Enterprise SSO (Okta, SAML)
        </button>

        <label className="mt-5 flex items-start gap-2 text-[12px] text-text-secondary">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5" />
          <span>I agree to the <a className="text-primary hover:underline">Terms of Service</a> and <a className="text-primary hover:underline">Privacy Policy</a></span>
        </label>

        {error && (
          <div className="mt-4 rounded-md px-3 py-2.5 flex items-center gap-2 text-[13px] text-danger"
               style={{ background: "rgba(239,68,68,0.08)", border: "0.5px solid rgba(239,68,68,0.3)" }}>
            <AlertCircle className="w-4 h-4" /> Authentication failed — please try again
          </div>
        )}

        <p className="mt-6 text-center text-[13px] text-text-secondary">
          Don't have an account? <Link to="/onboarding/profile" className="text-primary hover:underline">Start free →</Link>
        </p>
      </div>
    </div>
  );
}
