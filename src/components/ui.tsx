"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

// ===== Badge =====
export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`chip ${className}`}>{children}</span>;
}

// ===== Stat Card =====
export function StatCard({
  label, value, hint, icon, tone = "brand", trend,
}: {
  label: string; value: string | number; hint?: string; icon?: React.ReactNode;
  tone?: "brand" | "emerald" | "amber" | "rose" | "violet" | "cyan" | "slate";
  trend?: { value: string; up?: boolean };
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    violet: "bg-violet-50 text-violet-600",
    cyan: "bg-cyan-50 text-cyan-600",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <div className="card p-5 hover:shadow-soft transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink-900 tracking-tight">{value}</p>
        </div>
        {icon && <div className={`grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}>{icon}</div>}
      </div>
      {(hint || trend) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {trend && (
            <span className={`font-semibold ${trend.up ? "text-emerald-600" : "text-rose-600"}`}>
              {trend.up ? "▲" : "▼"} {trend.value}
            </span>
          )}
          {hint && <span className="text-ink-400">{hint}</span>}
        </div>
      )}
    </div>
  );
}

// ===== Modal =====
export function Modal({
  open, onClose, title, children, footer, size = "md",
}: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
  footer?: React.ReactNode; size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} card shadow-pop animate-scale-in`}>
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <h3 className="text-base font-bold text-ink-900">{title}</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-ink-100 px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}

// ===== Toast =====
type Toast = { id: number; msg: string; type: "success" | "error" | "info" };
let toastListeners: ((t: Toast) => void)[] = [];
export function toast(msg: string, type: "success" | "error" | "info" = "success") {
  toastListeners.forEach((l) => l({ id: Date.now() + Math.floor(performance.now()), msg, type }));
}
export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    const l = (t: Toast) => {
      setItems((prev) => [...prev, t]);
      setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== t.id)), 3200);
    };
    toastListeners.push(l);
    return () => { toastListeners = toastListeners.filter((x) => x !== l); };
  }, []);
  const colors = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-rose-200 bg-rose-50 text-rose-800",
    info: "border-brand-200 bg-brand-50 text-brand-800",
  };
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2">
      {items.map((t) => (
        <div key={t.id} className={`animate-fade-in rounded-xl border px-4 py-3 text-sm font-semibold shadow-soft ${colors[t.type]}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ===== Progress bar =====
export function Progress({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-ink-100 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all"
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

// ===== Page header =====
export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// ===== Empty state =====
export function EmptyState({ icon, title, desc, action }: { icon: React.ReactNode; title: string; desc: string; action?: React.ReactNode }) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400">{icon}</div>
      <h3 className="text-base font-bold text-ink-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-500">{desc}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ===== Avatar =====
export function Avatar({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-12 w-12 text-sm" };
  return <div className={`grid place-items-center rounded-full font-bold text-white ${color} ${sizes[size]}`}>{initials}</div>;
}
