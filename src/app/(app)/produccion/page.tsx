"use client";
import Link from "next/link";
import { useState } from "react";
import { LayoutGrid, ListOrdered, Factory, Play, Square, AlertTriangle } from "lucide-react";
import { PageHeader, Progress, StatCard } from "@/components/ui";
import { StageBadge, PriorityBadge } from "@/components/badges";
import { ConfirmModal, IncidentModal } from "@/components/modals";
import { toast } from "@/components/ui";
import { orders } from "@/lib/data";

export default function ProduccionPage() {
  const inProd = orders.filter((o) => !["entregado"].includes(o.stage));
  const [confirm, setConfirm] = useState<{ type: string; code: string } | null>(null);
  const [incident, setIncident] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Producción"
        subtitle="Control de la planta y el flujo productivo"
        actions={
          <>
            <Link href="/produccion/kanban" className="btn-outline"><LayoutGrid size={16} /> Kanban</Link>
            <Link href="/produccion/cola" className="btn-primary"><ListOrdered size={16} /> Cola priorizada</Link>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="En producción" value={7} icon={<Factory size={20} />} tone="violet" />
        <StatCard label="En corte" value={3} icon={<Factory size={20} />} tone="brand" />
        <StatCard label="En confección" value={3} icon={<Factory size={20} />} tone="cyan" />
        <StatCard label="Detenidos" value={1} icon={<AlertTriangle size={20} />} tone="rose" />
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-ink-100 px-5 py-4"><h3 className="font-bold text-ink-900">Órdenes de producción activas</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-ink-100 bg-ink-50/50 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-5 py-3">Orden</th><th className="px-3 py-3">Etapa</th><th className="px-3 py-3">Prioridad</th>
              <th className="px-3 py-3">Responsable</th><th className="px-3 py-3 w-28">Avance</th><th className="px-5 py-3 text-right">Acciones</th></tr></thead>
            <tbody className="divide-y divide-ink-50">
              {inProd.map((o) => (
                <tr key={o.id} className="group hover:bg-ink-50/60">
                  <td className="px-5 py-3">
                    <Link href={`/produccion/${o.id}`} className="font-semibold text-ink-800 group-hover:text-brand-600">{o.code}</Link>
                    <p className="text-xs text-ink-400">{o.clientName} · {o.product}</p>
                  </td>
                  <td className="px-3 py-3"><StageBadge stage={o.stage} /></td>
                  <td className="px-3 py-3"><PriorityBadge priority={o.priority} /></td>
                  <td className="px-3 py-3 text-ink-600">{o.responsible}</td>
                  <td className="px-3 py-3"><div className="flex items-center gap-2"><Progress value={o.progress} className="w-14" /><span className="text-xs font-semibold text-ink-500">{o.progress}%</span></div></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {o.stage === "detenido"
                        ? <button onClick={() => setConfirm({ type: "reactivar", code: o.code })} className="chip bg-emerald-50 text-emerald-600 hover:bg-emerald-100"><Play size={13} /> Reactivar</button>
                        : <>
                            <button onClick={() => setConfirm({ type: "finalizar", code: o.code })} className="chip bg-emerald-50 text-emerald-600 hover:bg-emerald-100"><Play size={13} /> Finalizar etapa</button>
                            <button onClick={() => setConfirm({ type: "detener", code: o.code })} title="Detener" className="grid h-7 w-7 place-items-center rounded-lg text-rose-500 hover:bg-rose-50"><Square size={14} /></button>
                          </>}
                      <button onClick={() => setIncident(o.code)} title="Incidencia" className="grid h-7 w-7 place-items-center rounded-lg text-amber-500 hover:bg-amber-50"><AlertTriangle size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)}
        title={confirm?.type === "detener" ? "Detener pedido" : confirm?.type === "reactivar" ? "Reactivar pedido" : "Finalizar etapa"}
        message={confirm?.type === "detener"
          ? `¿Detener ${confirm?.code}? Quedará marcado como incidencia en la línea.`
          : confirm?.type === "reactivar"
          ? `¿Reactivar ${confirm?.code} y devolverlo a la cola de producción?`
          : `¿Confirmás finalizar la etapa actual de ${confirm?.code}? Avanzará a la siguiente etapa del flujo.`}
        tone={confirm?.type === "detener" ? "danger" : "primary"}
        confirmLabel={confirm?.type === "detener" ? "Detener" : confirm?.type === "reactivar" ? "Reactivar" : "Finalizar etapa"}
        onConfirm={() => toast(confirm?.type === "detener" ? `${confirm?.code} detenido` : confirm?.type === "reactivar" ? `${confirm?.code} reactivado` : `Etapa de ${confirm?.code} finalizada`)} />
      <IncidentModal open={!!incident} onClose={() => setIncident(null)} orderCode={incident ?? undefined} />
    </div>
  );
}
