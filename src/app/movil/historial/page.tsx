"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Search, Copy, Activity as ActivityIcon, Package, Move, Clock, Camera, Check, Plus } from "lucide-react";
import { toast } from "@/components/ui";
import { useMovil } from "../store";

const toneMeta: Record<string, { icon: any; cls: string }> = {
  step: { icon: Check, cls: "bg-brand-100 text-brand-600" },
  done: { icon: Check, cls: "bg-emerald-100 text-emerald-600" },
  photo: { icon: Camera, cls: "bg-violet-100 text-violet-600" },
  move: { icon: Move, cls: "bg-amber-100 text-amber-600" },
  delay: { icon: Clock, cls: "bg-rose-100 text-rose-600" },
  new: { icon: Plus, cls: "bg-cyan-100 text-cyan-600" },
};

export default function HistorialPage() {
  const { allOrders, activity, repeatOrder } = useMovil();
  const router = useRouter();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return [...allOrders]
      .filter((o) => !t || `${o.code} ${o.clientName} ${o.product} ${o.category}`.toLowerCase().includes(t))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [allOrders, q]);

  const onRepeat = (id: string) => {
    const nid = repeatOrder(id);
    toast("Pedido repetido idéntico — quedó primero en la cola");
    if (nid) router.push(`/movil/operario/${nid}`);
  };

  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Historial</h1>
        <p className="text-xs text-ink-500">Buscá qué le vendiste a un cliente y repetilo idéntico.</p>
      </div>

      {/* búsqueda */}
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Cliente, producto o código…"
          className="input pl-9" />
      </div>

      {/* pedidos históricos */}
      <div className="space-y-2">
        {results.map((o) => (
          <div key={o.id} className="rounded-2xl border border-ink-200/60 bg-white p-3.5 shadow-card">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-bold text-ink-900">{o.product}</p>
                <p className="truncate text-[11px] text-ink-500">{o.code} · {o.clientName}</p>
                <p className="mt-0.5 text-[11px] text-ink-400">{o.qty} u · {o.techSheet.fabric} · {o.techSheet.color}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase text-ink-400">Creado {o.createdAt}</p>
              </div>
              <button onClick={() => onRepeat(o.id)}
                className="flex shrink-0 flex-col items-center gap-0.5 rounded-xl bg-brand-50 px-3 py-2 text-[10px] font-bold text-brand-700 active:bg-brand-100">
                <Copy size={16} /> Repetir
              </button>
            </div>
          </div>
        ))}
        {results.length === 0 && (
          <p className="rounded-2xl border border-dashed border-ink-200 bg-white py-8 text-center text-sm text-ink-400">
            Sin resultados para “{q}”
          </p>
        )}
      </div>

      {/* actividad en vivo */}
      <div>
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-ink-900"><ActivityIcon size={16} className="text-brand-600" /> Actividad reciente</h2>
        {activity.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink-200 bg-white py-6 text-center text-xs text-ink-400">
            Acá aparece quién hizo qué, a qué hora. Marcá una etapa para verlo.
          </p>
        ) : (
          <div className="space-y-2">
            {activity.map((a) => {
              const m = toneMeta[a.tone] ?? toneMeta.step;
              const Icon = m.icon;
              return (
                <div key={a.id} className="flex gap-2.5 rounded-xl bg-white p-3 shadow-card">
                  <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${m.cls}`}><Icon size={15} /></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-tight text-ink-800">{a.text}</p>
                    <p className="text-[11px] text-ink-400">{a.orderCode} · {a.by.split(" (")[0]} · {a.date} {a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
