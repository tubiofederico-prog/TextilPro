"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ListOrdered, Flame, AlertTriangle, GripVertical } from "lucide-react";
import { PageHeader, toast } from "@/components/ui";
import { PriorityBadge } from "@/components/badges";
import { orders } from "@/lib/data";
import { STAGE_META, KANBAN_STAGES } from "@/lib/constants";
import { OrderStage } from "@/lib/types";

// map detailed stages into kanban columns
const COLUMN_OF: Record<OrderStage, OrderStage> = {
  recibido: "recibido", pendiente_materiales: "pendiente_materiales",
  en_corte: "en_corte", corte_terminado: "en_corte",
  en_confeccion: "en_confeccion", confeccion_terminada: "en_confeccion",
  en_bordado: "en_bordado", bordado_terminado: "en_bordado",
  en_empaque: "en_empaque", listo_entrega: "listo_entrega",
  entregado: "entregado", detenido: "recibido",
};

export default function KanbanPage() {
  const [items, setItems] = useState(orders);
  const detenidos = items.filter((o) => o.stage === "detenido");

  const moveTo = (id: string, stage: OrderStage) => {
    setItems((prev) => prev.map((o) => (o.id === id ? { ...o, stage } : o)));
    const o = items.find((x) => x.id === id);
    toast(`${o?.code} movido a ${STAGE_META[stage].short}`, "info");
  };

  return (
    <div className="animate-fade-in">
      <Link href="/produccion" className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-brand-600"><ArrowLeft size={15} /> Producción</Link>
      <PageHeader title="Tablero Kanban" subtitle="Flujo de producción por etapas · arrastrá entre columnas (clic para mover)"
        actions={<Link href="/produccion/cola" className="btn-outline"><ListOrdered size={16} /> Ver cola</Link>} />

      {detenidos.length > 0 && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
          <AlertTriangle size={18} className="text-rose-600" />
          <p className="text-sm text-rose-700"><strong>{detenidos.length} pedido detenido:</strong> {detenidos.map((d) => d.code).join(", ")} — requiere atención.</p>
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto pb-4">
        {KANBAN_STAGES.map((col) => {
          const colOrders = items.filter((o) => COLUMN_OF[o.stage] === col && o.stage !== "detenido");
          const m = STAGE_META[col];
          return (
            <div key={col} className="flex w-72 shrink-0 flex-col rounded-2xl bg-ink-100/50 p-2.5">
              <div className="mb-2 flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${m.dot}`} />
                  <span className="text-sm font-bold text-ink-700">{m.short}</span>
                </div>
                <span className="chip bg-white text-ink-500">{colOrders.length}</span>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                {colOrders.map((o) => (
                  <div key={o.id} className="group rounded-xl border border-ink-100 bg-white p-3 shadow-card transition hover:shadow-soft">
                    <div className="flex items-start justify-between">
                      <Link href={`/produccion/${o.id}`} className="text-sm font-bold text-ink-800 hover:text-brand-600">{o.code}</Link>
                      {o.priority === "urgente" && <Flame size={14} className="text-rose-500" />}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-ink-400">{o.clientName}</p>
                    <p className="mt-1 line-clamp-2 text-xs font-medium text-ink-600">{o.product}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <PriorityBadge priority={o.priority} />
                      <span className="text-[11px] text-ink-400">{o.qty}u · {o.dueDate.slice(5)}</span>
                    </div>
                    {/* quick move */}
                    <div className="mt-2 hidden gap-1 group-hover:flex">
                      <select
                        value={col}
                        onChange={(e) => moveTo(o.id, e.target.value as OrderStage)}
                        className="w-full rounded-lg border border-ink-200 bg-ink-50 px-2 py-1 text-[11px] font-medium text-ink-600"
                      >
                        {KANBAN_STAGES.map((s) => <option key={s} value={s}>Mover a: {STAGE_META[s].short}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
                {colOrders.length === 0 && (
                  <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-ink-200 py-6 text-xs text-ink-300">Sin pedidos</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
