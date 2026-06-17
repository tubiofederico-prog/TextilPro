"use client";
import { ChevronUp, ChevronDown, Flame, Clock, Plane, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui";
import { StageBadge } from "@/components/badges";
import { useMovil } from "../store";
import { STEPS } from "../store";

export default function PanelPage() {
  const { queue, allOrders, move, toggleDelay } = useMovil();
  const delivered = allOrders.filter((o) => o.stage === "entregado" || o.done >= 5).length;

  return (
    <div className="animate-fade-in space-y-3">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Cola de producción</h1>
        <p className="text-xs text-ink-500">Panel tipo aeropuerto · turno de fabricación</p>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-ink-900 px-3 py-2.5 text-white">
        <Plane size={16} className="shrink-0 text-brand-300" />
        <p className="text-[11px] leading-snug">
          Los <span className="font-bold text-rose-300">urgentes</span> y <span className="font-bold text-amber-300">retrasados</span> se
          destacan. Al entregarse, el pedido <span className="font-bold text-emerald-300">desaparece</span> de la lista.
        </p>
      </div>

      <div className="flex gap-2 text-center">
        <div className="flex-1 rounded-xl bg-white p-2.5 shadow-card">
          <p className="text-2xl font-bold text-ink-900">{queue.length}</p>
          <p className="text-[10px] font-semibold uppercase text-ink-400">En cola</p>
        </div>
        <div className="flex-1 rounded-xl bg-white p-2.5 shadow-card">
          <p className="text-2xl font-bold text-amber-600">{queue.filter((o) => o.delayed).length}</p>
          <p className="text-[10px] font-semibold uppercase text-ink-400">Retrasados</p>
        </div>
        <div className="flex-1 rounded-xl bg-white p-2.5 shadow-card">
          <p className="text-2xl font-bold text-emerald-600">{delivered}</p>
          <p className="text-[10px] font-semibold uppercase text-ink-400">Entregados</p>
        </div>
      </div>

      <div className="space-y-2">
        {queue.map((o, i) => {
          const nextStep = STEPS[o.done];
          return (
            <div key={o.id}
              className={`flex items-stretch gap-2.5 rounded-2xl border p-3 transition ${
                o.priority === "urgente" ? "border-rose-200 bg-rose-50" :
                o.delayed ? "border-amber-200 bg-amber-50" : "border-ink-200/60 bg-white"
              }`}>
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-900 font-mono text-sm font-bold text-white">{i + 1}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-ink-900">{o.code}</span>
                  {o.priority === "urgente" && <Flame size={13} className="text-rose-500" />}
                  {o.delayed && <span className="chip bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-700"><Clock size={10} /> retraso</span>}
                </div>
                <p className="truncate text-[11px] text-ink-500">{o.clientName} · {o.product}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <StageBadge stage={o.stage} />
                  <span className={`text-[11px] ${o.delayed ? "font-bold text-rose-600" : "text-ink-400"}`}>Entrega {o.dueDate.slice(5)}</span>
                </div>
                <button
                  onClick={() => toggleDelay(o.id)}
                  className={`mt-2 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold ${
                    o.delayed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                  {o.delayed ? <><CheckCircle2 size={12} /> Resolver retraso</> : <><Clock size={12} /> Marcar retraso</>}
                </button>
              </div>
              <div className="flex shrink-0 flex-col justify-center gap-1">
                <button onClick={() => move(o.id, -1)} disabled={i === 0}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-ink-100 text-ink-600 active:bg-brand-100 active:text-brand-700 disabled:opacity-30">
                  <ChevronUp size={18} />
                </button>
                <button onClick={() => move(o.id, 1)} disabled={i === queue.length - 1}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-ink-100 text-ink-600 active:bg-brand-100 active:text-brand-700 disabled:opacity-30">
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>
          );
        })}
        {queue.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-white py-12 text-center">
            <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
            <p className="mt-2 text-sm font-semibold text-ink-700">No hay pedidos en cola</p>
            <p className="text-xs text-ink-400">Todo entregado 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}
