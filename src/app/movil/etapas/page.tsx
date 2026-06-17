"use client";
import Link from "next/link";
import { Check, ChevronRight, CircleDot } from "lucide-react";
import { toast } from "@/components/ui";
import { useMovil, STEPS } from "../store";

export default function EtapasPage() {
  const { queue, completeStep, user } = useMovil();

  const handle = (id: string, code: string) => {
    completeStep(id);
    toast(`Etapa registrada a ${user} ✓`);
  };

  return (
    <div className="animate-fade-in space-y-3">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Seguimiento por etapas</h1>
        <p className="text-xs text-ink-500">Cada uno aprieta su botón al terminar. Queda registrado quién, cuándo y a qué hora.</p>
      </div>

      <div className="space-y-3">
        {queue.map((o) => {
          const next = STEPS[o.done];
          const NextIcon = next?.icon;
          return (
            <div key={o.id} className="rounded-2xl border border-ink-200/60 bg-white p-3.5 shadow-card">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink-900">{o.code}</p>
                  <p className="truncate text-[11px] text-ink-500">{o.clientName} · {o.product}</p>
                </div>
                <Link href={`/movil/operario/${o.id}`} className="shrink-0 text-ink-300"><ChevronRight size={18} /></Link>
              </div>

              {/* stepper */}
              <div className="mt-3 flex items-center justify-between">
                {STEPS.map((s, idx) => {
                  const done = idx < o.done;
                  const current = idx === o.done;
                  const Icon = s.icon;
                  return (
                    <div key={s.key} className="flex flex-1 flex-col items-center">
                      <div className="flex w-full items-center">
                        {idx > 0 && <div className={`h-0.5 flex-1 ${idx <= o.done ? "bg-brand-500" : "bg-ink-200"}`} />}
                        <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                          done ? "bg-brand-600 text-white" : current ? "bg-brand-100 text-brand-700 ring-2 ring-brand-400" : "bg-ink-100 text-ink-400"
                        }`}>
                          {done ? <Check size={14} /> : current ? <CircleDot size={14} /> : <Icon size={13} />}
                        </div>
                        {idx < STEPS.length - 1 && <div className={`h-0.5 flex-1 ${idx < o.done ? "bg-brand-500" : "bg-ink-200"}`} />}
                      </div>
                      <span className={`mt-1 text-[9px] font-semibold ${idx <= o.done ? "text-ink-700" : "text-ink-400"}`}>{s.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* registro de quién hizo qué */}
              {o.done > 0 && (
                <div className="mt-3 space-y-1 rounded-xl bg-ink-50 p-2.5">
                  {STEPS.slice(0, o.done).map((s) => {
                    const reg = o.steps[s.key];
                    return (
                      <div key={s.key} className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-ink-700">{s.verb}</span>
                        <span className="text-ink-500">{reg ? `${reg.by.split(" (")[0]} · ${reg.at}` : "registrado previamente"}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* botón de etapa */}
              {next ? (
                <button onClick={() => handle(o.id, o.code)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-bold text-white transition active:bg-brand-700">
                  {NextIcon && <NextIcon size={18} />} {next.verb} — terminé {next.label.toLowerCase()}
                </button>
              ) : (
                <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-50 py-3 text-sm font-bold text-emerald-700">
                  <Check size={18} /> Pedido entregado
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
