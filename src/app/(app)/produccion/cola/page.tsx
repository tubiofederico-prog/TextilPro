"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, LayoutGrid, ChevronUp, ChevronDown, Flame, Clock, Plane } from "lucide-react";
import { PageHeader, toast, Progress } from "@/components/ui";
import { StageBadge, PriorityBadge } from "@/components/badges";
import { orders } from "@/lib/data";

export default function ColaPage() {
  const [queue, setQueue] = useState(
    [...orders].filter((o) => o.stage !== "entregado").sort((a, b) => (a.queuePosition ?? 99) - (b.queuePosition ?? 99))
  );

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= queue.length) return;
    const next = [...queue];
    [next[i], next[j]] = [next[j], next[i]];
    setQueue(next);
    toast(`${next[j].code} ${dir === -1 ? "subió" : "bajó"} en la cola`, "info");
  };

  return (
    <div className="animate-fade-in">
      <Link href="/produccion" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> Producción</Link>
      <PageHeader title="Cola de producción" subtitle="Vista tipo aeropuerto · ordená la prioridad de fabricación"
        actions={<Link href="/produccion/kanban" className="btn-outline"><LayoutGrid size={16} /> Ver Kanban</Link>} />

      <div className="mb-4 flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-3 text-white">
        <Plane size={18} className="text-brand-300" />
        <p className="text-sm">Panel de embarque de producción — los pedidos <span className="font-bold text-rose-300">urgentes</span> y <span className="font-bold text-amber-300">retrasados</span> se destacan automáticamente.</p>
      </div>

      <div className="card divide-y divide-ink-50">
        <div className="grid grid-cols-[40px_1fr_auto] items-center gap-3 bg-ink-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink-300 sm:grid-cols-[40px_1fr_140px_120px_110px_70px]">
          <span>#</span><span>Pedido</span><span className="hidden sm:block">Estado</span>
          <span className="hidden sm:block">Prioridad</span><span className="hidden sm:block">Entrega</span><span className="text-right">Orden</span>
        </div>
        {queue.map((o, i) => (
          <div key={o.id}
            className={`grid grid-cols-[40px_1fr_auto] items-center gap-3 px-4 py-3 transition sm:grid-cols-[40px_1fr_140px_120px_110px_70px] ${
              o.priority === "urgente" ? "bg-rose-50/60" : o.delayed ? "bg-amber-50/50" : "hover:bg-ink-50/60"
            }`}>
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-ink-900 font-mono text-sm font-bold text-white">{i + 1}</div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <Link href={`/produccion/${o.id}`} className="font-semibold text-ink-800 hover:text-brand-600">{o.code}</Link>
                {o.priority === "urgente" && <Flame size={14} className="text-rose-500" />}
                {o.delayed && <span className="chip bg-amber-100 text-amber-700"><Clock size={11} /> retraso</span>}
              </div>
              <p className="truncate text-xs text-ink-400">{o.clientName} · {o.product}</p>
              <div className="mt-1 sm:hidden"><StageBadge stage={o.stage} /></div>
            </div>
            <div className="hidden sm:block"><StageBadge stage={o.stage} /></div>
            <div className="hidden sm:block"><PriorityBadge priority={o.priority} /></div>
            <div className={`hidden text-sm sm:block ${o.delayed ? "font-semibold text-rose-600" : "text-ink-600"}`}>{o.dueDate.slice(5)}</div>
            <div className="flex justify-end">
              <div className="flex flex-col">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="grid h-5 w-7 place-items-center rounded text-ink-400 hover:bg-ink-100 hover:text-ink-700 disabled:opacity-30"><ChevronUp size={16} /></button>
                <button onClick={() => move(i, 1)} disabled={i === queue.length - 1} className="grid h-5 w-7 place-items-center rounded text-ink-400 hover:bg-ink-100 hover:text-ink-700 disabled:opacity-30"><ChevronDown size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
